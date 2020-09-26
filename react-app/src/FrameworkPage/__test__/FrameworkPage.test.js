import React from "react";
import {
    render,
    cleanup,
    waitForDomChange,
    fireEvent,
    screen,
} from "@testing-library/react";
import FrameworkPage from "../FrameworkPage";
import {SERVER_ADDRESS} from "../../Utils/Constants";

import get_data from "./get_framework_list.json";
import get_new from "./get_new_framework.json";

// Returns a mocked fetch
function mock_fetch(is_success, return_value) {
    const fetch = jest.fn();
    if (is_success) {
        fetch.mockReturnValue(Promise.resolve(return_value));
    } else {
        fetch.mockReturnValue(Promise.reject(return_value));
    }
    return fetch;
}

// Returns a mocked history
function mock_history() {
    const history = {"push": jest.fn()};
    return history;
}

function inital_render(history) {
    return render(<FrameworkPage history={history} />);
}

// Create new framework
describe("AC 2.1", () => {
    afterEach(() => {
        fetch.mockClear();
        cleanup();
    });

    test.only("Save a copy of the published version", async () => {
        const create_new_url = `${SERVER_ADDRESS}/framework/new`;
        global.fetch = mock_fetch(true, {
            json: () => Promise.resolve(get_data),
        });
        const history = mock_history();
        inital_render(history);
        await waitForDomChange(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
        });

        // get a new framework with default values
        global.fetch = mock_fetch(true, {json: () => Promise.resolve(get_new)});
        const create_new = screen.getByRole("button", {name: /new framework/i});
        fireEvent.click(create_new);
        expect(fetch.mock.calls[0][0]).toBe(create_new_url);

    });
});
