import React from "react";
import {
    render,
    cleanup,
    waitForDomChange,
    fireEvent,
    screen,
} from "@testing-library/react";
import FrameworkOverview from "../FrameworkOverview";
import {SERVER_ADDRESS} from "../../Utils/Constants";
import validatePostRequest from "../../Utils/ValidatePostRequest";

// data client receives after requesting for overview
import get_data from "./get_framework_overview.json";
import get_new_question from "./get_new_question.json";
import get_new_section from "./get_new_section.json";
import post_published from "./post_published.json";
import post_active from "./post_active.json";

const FRAMEWORK_ID = 1;
const SECTION_ID = 1;
const PUBLISHED_FRAMEWORK_DATA = {
        ...get_data,
        "framework_id": 1,
        "framework_published": 1,
        "framework_active_status": 0,
}
const UNPUBLISHED_FRAMEWORK_DATA = {
        ...get_data,
        "framework_id": 1,
        "framework_published": 0,
        "framework_active_status": 0,
}
const UNPUBLISHED_FRAMEWORK_DATA_NEW = {
        ...get_data,
        "framework_id": 2,
        "framework_published": 0,
        "framework_active_status": 0,
}


function mock_fetch(is_success, return_value) {
    const fetch = jest.fn();
    if (is_success) {
        fetch.mockReturnValue(Promise.resolve(return_value));
    } else {
        fetch.mockReturnValue(Promise.reject(return_value));
    }
    return fetch;
}

function inital_render() {
    const history = {location: {state: {framework_id: FRAMEWORK_ID}}, goBack: ()=>{}, replace:()=>{}};
    return render(<FrameworkOverview history={history} />);
}

// Add question and sections to a new framework
describe("AC 2.2", () => {
    afterEach(() => {
        fetch.mockClear();
        cleanup();
    });

    test("Correct fetch request", async () => {
        const url = `${SERVER_ADDRESS}/framework?framework_id=${FRAMEWORK_ID}`;
        global.fetch = mock_fetch(true, {
            json: () => Promise.resolve(UNPUBLISHED_FRAMEWORK_DATA),
        });
        inital_render();

        await waitForDomChange(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
        });

        expect(fetch.mock.calls[0][0]).toBe(url);
    });

    test("Add section and a question", async () => {
        const get_new_section_url = `${SERVER_ADDRESS}/framework/section/new?framework_id=${FRAMEWORK_ID}`;
        const get_new_question_url = `${SERVER_ADDRESS}/framework/section/question/new?section_id=${SECTION_ID}`;
        global.fetch = mock_fetch(true, {
            json: () => Promise.resolve(UNPUBLISHED_FRAMEWORK_DATA),
        });
        inital_render();

        await waitForDomChange(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
        });

        // Add section
        global.fetch = mock_fetch(true, {
            json: () => Promise.resolve(get_new_section),
        });
        const add_section_button = screen.getByText("Add Section");
        fireEvent.click(add_section_button);
        await waitForDomChange(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
        });
        expect(fetch.mock.calls[0][0]).toBe(get_new_section_url);

        // Expand section
        const section_button = screen.getByText("Section 1");
        fireEvent.click(section_button);

        // Add question
        global.fetch = mock_fetch(true, {
            json: () => Promise.resolve(get_new_question),
        });
        const add_question_button = screen.getByText(/Add Question/i);
        fireEvent.click(add_question_button);
        await waitForDomChange(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
        });
        expect(fetch.mock.calls[0][0]).toBe(get_new_question_url);
        screen.getAllByText(/.*New Question.*/);
    });
});

// mark as published
describe("AC 2.3", () => {
    afterEach(() => {
        fetch.mockClear();
        cleanup();
    });

    test("Mark as published", async () => {
        const publish_url = `${SERVER_ADDRESS}/framework/publishstatus/update?framework_id=${FRAMEWORK_ID}`;
        global.fetch = mock_fetch(true, {
            json: () => Promise.resolve(UNPUBLISHED_FRAMEWORK_DATA),
        });
        inital_render();
        await waitForDomChange(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
        });

        // post publish request
        global.fetch = mock_fetch(true, {
            text: () => Promise.resolve("success"),
        });
        const publish_button = screen.getByRole("button", {name: /publish/i});
        fireEvent.click(publish_button);
        expect(fetch.mock.calls[0][0]).toBe(publish_url);
        const param = fetch.mock.calls[0][1];
        expect(validatePostRequest(param)).toBeTruthy();
        expect(param.body).toBe(JSON.stringify(post_published));
    });
});

// mark as active
describe("AC 2.4", () => {
    afterEach(() => {
        fetch.mockClear();
        cleanup();
    });

    test("Mark as active", async () => {
        const publish_url = `${SERVER_ADDRESS}/framework/activestatus/update?framework_id=${FRAMEWORK_ID}`;
        global.fetch = mock_fetch(true, {
            json: () => Promise.resolve(PUBLISHED_FRAMEWORK_DATA),
        });
        inital_render();
        await waitForDomChange(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
        });

        // post publish request
        global.fetch = mock_fetch(true, {
            text: () => Promise.resolve("success"),
        });
        // switch now display non-active
        const active_button = screen.getByRole("switch", {"aria-checked": "0"});
        fireEvent.click(active_button);
        expect(fetch.mock.calls[0][0]).toBe(publish_url);
        // sent correct post message
        const param = fetch.mock.calls[0][1];
        expect(validatePostRequest(param)).toBeTruthy();
        expect(param.body).toBe(JSON.stringify(post_active));
        // switch now display active
        expect(active_button.getAttribute("aria-checked")).toBe("1");
    });
});

// Save as new
describe("AC 2.5", () => {
    afterEach(() => {
        fetch.mockClear();
        cleanup();
    });

    test("Save a copy of the published version", async () => {
        const create_new_url = `${SERVER_ADDRESS}/framework/version?framework_id=${FRAMEWORK_ID}`;
        global.fetch = mock_fetch(true, {
            json: () => Promise.resolve(PUBLISHED_FRAMEWORK_DATA),
        });
        const {getByText} = inital_render();
        await waitForDomChange(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
        });

        // post active request
        global.fetch = mock_fetch(true, {
            json: () => Promise.resolve(UNPUBLISHED_FRAMEWORK_DATA_NEW),
        });
        // switch now display non-active
        const save_new = getByText('Save As New');
        fireEvent.click(save_new);
        expect(fetch.mock.calls[0][0]).toBe(create_new_url);
    });
});
