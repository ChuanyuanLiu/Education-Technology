import React from "react";
import {render, cleanup, waitForDomChange, fireEvent} from "@testing-library/react";
import FrameworkQuestionPage from "../FrameworkQuestionPage";
import get_data from "./get.json"
import post_data from "./post.json"


// Mock fetch by redefining it as a jest function before testing
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

// Create DOM before each test
function initial_render() {
    const history = {location: {state: {question_id: 1, published: 0}}};
    return render(<FrameworkQuestionPage history={history} />);
}

/** Acceptance test 2.2.8
 * Gerald updates New question's rating explanations with appropriate text
 *  */

/** Acceptance test 2.2.9
 * Gerald can edit the existing questions into what he wants 
 * */
describe("AC 2.2.9", () => {
    // Set DOM tree to empty after tests
    afterEach(cleanup);

    test("5 text areas", async () => {
        global.fetch = mock_fetch(true, {json:()=>Promise.resolve(get_data)})
        const {getByLabelText, getAllByText} = initial_render(get_data);
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

    test("Send correct post request", async() => {
        initial_render(get_data);        
        global.fetch = mock_fetch(true, {json:()=>Promise.resolve(get_data)})

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