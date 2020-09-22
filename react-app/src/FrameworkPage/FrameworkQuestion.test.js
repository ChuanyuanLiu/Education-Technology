import React from "react";
import {render, cleanup, waitForDomChange} from "@testing-library/react";
import FrameworkQuestionPage from "./FrameworkQuestionPage";
import data from "./frameworkQuestion.json"

/** Acceptance test 2.2.8
 * Gerald updates the question's rating explanations with appropriate text
 * Assumes this is a new question, and only must be 5 questions
 *  */

// Set DOM to empty after each clean up
afterEach(cleanup);

// Mock fetch by redefining it
global.fetch = jest.fn(()=>Promise.resolve(({
    json: () => Promise.resolve(data)
})));

describe("AC 2.2.8", () => {
    test("5 text areas", async () => {
        const history = {location: {state: {question_id: 1}}};
        const {getByLabelText} = render(
            <FrameworkQuestionPage history={history} />
        );
        const labels = [
            "Not Applicable",
            "Below Basic",
            "Basic",
            "Adequate",
            "Exceptional",
        ];

        // Wait for initial loading
        await waitForDomChange(() => expect(fetch).toHaveBeenCalledTimes(1));

        for (const label_text of labels) {
            const label = getByLabelText(label_text);
            expect(label).toBeTruthy();
        }
    });
});

// Gerald can edit the existing questions into what he wants
