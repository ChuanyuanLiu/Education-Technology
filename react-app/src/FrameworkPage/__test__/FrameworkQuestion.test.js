import React from "react";
import {render, cleanup, waitForDomChange, fireEvent} from "@testing-library/react";
import FrameworkQuestionPage from "../FrameworkQuestionPage";

// data client receives after requesting for questions
import get_data from "./get_questions.json"
// data client sends to server to update rating criteria 
import post_data from "./post_rate_criterions.json"
// data client sends to sever to update question title
import post_question_title_data from "./post_question_title.json"

// Mock fetch by redefining it as a jest function before testing
const QUESTION_ID = 1;

function mock_fetch(is_success, return_value) {
    const fetch = jest.fn();
    if (is_success) {
        fetch.mockReturnValue(
            Promise.resolve(return_value)
        );
    } else {
        fetch.mockReturnValue(
            Promise.reject(return_value)
        );
    }
    return fetch;    
}

/** Acceptance test 2.2.9
 * Gerald can edit the existing questions into what he wants 
 * Assumes question not published
 * */
describe("AC 2.2.9", () => {

    
    // Create DOM before each test
    // Assumes fetch has been defined
    function initial_render() {
        const history = {location: {state: {question_id: QUESTION_ID, published: 0}}};
        return render(<FrameworkQuestionPage history={history} />);
    }

    // Set DOM tree to empty after tests
    // Reset fetch
    afterEach(()=>{
        fetch.mockClear();
        cleanup();
    });

    test("Correct fetch request", async ()=> {
        global.fetch = mock_fetch(true, {json:()=>Promise.resolve(get_data)});
        initial_render();

        await waitForDomChange(()=> expect(fetch).toHaveBeenCalledTimes(1));

        expect(fetch.mock.calls[0][0]).toBe(`http://139.99.155.172:3001/framework?question_id=${QUESTION_ID}`);
    });

    test("5 text areas", async () => {
        global.fetch = mock_fetch(true, {json:()=>Promise.resolve(get_data)})
        const {getByLabelText, getAllByText} = initial_render();
        const {rates} = get_data;

        // Wait to loading
        await waitForDomChange(() => expect(fetch).toHaveBeenCalledTimes(1));

        // Labels exists 
        for (const {rate_title} of rates) {
            expect(getByLabelText(rate_title));
        }

        // Texts are filled
        for (const {rate_criterion} of rates) {
            expect(getAllByText(rate_criterion));
        }
    });

    test("Edit ratings", async() => {
        global.fetch = mock_fetch(true, {json:()=>Promise.resolve(get_data)})

        initial_render();        
        // Wait to loading
        await waitForDomChange(() => expect(fetch).toHaveBeenCalledTimes(1));

        const chosen_title = "Not Applicable";
        const field_name = "rate_1_criterion";
        const button = document.querySelector(`button[name='${chosen_title}']`);
        const textarea = document.querySelector(`textarea[name='${chosen_title}']`);

        global.fetch = mock_fetch(true, {text:()=>Promise.resolve("success")});

        expect(textarea.disabled).toBe(true);
        fireEvent.click(button);
        expect(textarea.disabled).toBe(false);
        fireEvent.change(textarea, {target:{value:post_data[field_name]}});
        fireEvent.click(button);
        // Check if the correct body of the post message has been send
        expect(fetch.mock.calls[0][1].body).toBe(JSON.stringify(post_data));
        expect(fetch.mock.calls[0][0]).toBe(`http://139.99.155.172:3001/framework/section/question/rate/update?question_id=${QUESTION_ID}`)
        // Only called once
        expect(fetch.mock.calls.length).toBe(1);
    })

    test("Edit question title", async()=> {
        global.fetch = mock_fetch(true, {json:()=>Promise.resolve(get_data)});
        initial_render();
        await waitForDomChange(()=> expect(fetch).toHaveBeenCalledTimes(1));

        const button = document.querySelector(`button[name='Question Title']`);
        const textarea = document.querySelector(`textarea[name='Question Title']`);
        const field_name = "question_title";

        global.fetch = mock_fetch(true, {text:()=>Promise.resolve("success")});

        expect(textarea.disabled).toBe(true);
        fireEvent.click(button);
        expect(textarea.disabled).toBe(false);
        fireEvent.change(textarea, {target:{value:post_question_title_data[field_name]}});
        fireEvent.click(button);
        // Check if the correct body of the post message has been send
        expect(fetch.mock.calls[0][1].body).toBe(JSON.stringify(post_question_title_data));
        expect(fetch.mock.calls[0][0]).toBe(`http://139.99.155.172:3001/framework/section/question/update?question_id=${QUESTION_ID}`)
        // Only called once
        expect(fetch.mock.calls.length).toBe(1);
    })
});

/** Additional Test
 * Question not editable if already published
 * */
describe("Publishing logic", () => {

    // Create DOM before each test
    function initial_render() {
        const history = {location: {state: {question_id: QUESTION_ID, published: 1}}};
        return render(<FrameworkQuestionPage history={history} />);
    }

    // Set DOM tree to empty after tests
    // Reset fetch
    afterEach(()=>{
        fetch.mockClear();
        cleanup();
    });

    test("Not editable because published", async () => {
        global.fetch = mock_fetch(true, {json: ()=>Promise.resolve(get_data)})
        const {queryAllByRole} = initial_render();

        await waitForDomChange(() => expect(fetch).toHaveBeenCalledTimes(1));

        // Buttons are hidden
        expect(queryAllByRole('button', { name: /edit/i })).toStrictEqual([]);
        // Text areas are not editable
        for (const textarea of queryAllByRole('textarea')) {
            expect(textarea.disabled).toBe(true);
        }
    })
});


/** Additional Test
 *  When can't connect to server,
 *  UI should display trying to connect to server and 
 *  attempt to reconnect after 10 seconds
 * */

 /** Additional Test
  *  When server returns a not a well formatted message, 
  *  UI should display a back button and state the data is corrupt. 
  * */