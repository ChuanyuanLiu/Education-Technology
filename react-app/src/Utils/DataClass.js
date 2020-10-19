/** @module
 *  Encapsulates #data using a class
 */

import { useRole } from "./UseRole";

/**
 * Compares two lists containting primative elements only
 */
function compareList(l1in, l2in) {
    const l1 = l1in.sort();
    const l2 = l2in.sort();
    if (l1.length !== l2.length) return false;
    for (const i in l1.length) {
        if (l1[i] instanceof Object || l2[i] instanceof Object) {
            console.error("You are comparing objects");
        }
        if (l1[i] !== l2[i]) return false;
    }
    return true;
}

// All fields are private to ensure nothing gets deleted or modified
// backendData: a json object
// propertyToFieldName: {property used by frontend: fieldName in the backend}
// subclassName: name of the subclass used for print out more useful error messages
class Data {
    #propertyToFieldName;
    #subclassName;
    #data;

    /** convert naming from backend to a shortform */
    constructor(backendData, propertyToFieldName, subclassName="unknow") {
        this.#propertyToFieldName = propertyToFieldName;
        this.#subclassName = subclassName;
        this.#data = {};

        for (const [property, backendFieldName] of Object.entries(this.#propertyToFieldName)) {
            if (!backendData.hasOwnProperty(backendFieldName)) {
                console.error(`Did not receive ${backendFieldName} when constructing ${this.#subclassName} class`);
            }
            this.#data[property] = backendData[backendFieldName];
        }
    }

    /** Exports the #data into an object that is comptable to backend API*/
    export() {
        var backendData;
        for (const [property, backendFieldName] of Object.entries(this.#propertyToFieldName)) {
            if (!this.#data.hasOwnProperty(property)) {
                console.error(`${this.#subclassName} class does not have ${property} thus can't export`);
            }
            backendData[backendFieldName] = this.#data[property];
        } 
        return backendData;
    }

    get(property) {
        return this.#data[property];
    }
}

class EvaluationInfoData extends Data {

    static #propertyToFieldName = {
        id            : "evaluation_id",
        author        : "evaluation_author",
        title         : "evaluation_title",
        creationTime  : "evaluation_creation_time",
        modifiedTime  : "evaluation_modified_time",
        summary       : "evaluation_summary",
        wasCompleted  : "evaluation_completed",
        frameworkId   : "framework_id",
        wasFinalised  : "evaluation_finalised",
        frameworkTitle: "framework_title",
    };

    constructor(backendData) {
        super(backendData, EvaluationInfoData.#propertyToFieldName, "EvaluationInfoData");
    }
    id() {
        return this.get("id");
    }
    author() {
        return this.get("author");
    }
    title() {
        return this.get("title");
    }
    creationTime() {
        return this.get("creationTime");
    }
    modifiedTime() {
        return this.get("modifiedTime");
    }
    summary() {
        return this.get("summary");
    }
    wasCompleted() {
        return this.get("wasCompleted");
    }
    frameworkId() {
        return this.get("frameworkId");
    }
    wasFinalised() {
        return this.get("wasFinalised");
    }
    frameworkTitle() {
        return this.get("frameworkTitle");
    }
}

class FrameworkInfoData extends Data {

    static #propertyToFieldName = {
        id          : "framework_id",
        author      : "framework_author",
        title       : "framework_title",
        creationTime: "framework_creation_time",
        isActive    : "framework_active_status",
        wasFinalised: "framework_finalised",
    };

    constructor(backendData) {
        super(backendData, FrameworkInfoData.#propertyToFieldName, "FrameworkInfoData");
    }
    id() {
        return this.get("id");
    }
    author() {
        return this.get("author");
    }
    title() {
        return this.get("title");
    }
    creationTime() {
        return this.get("creationTime");
    }
    isActive() {
        return this.get("isActive");
    }
    wasFinalised() {
        return this.get("wasFinalised");
    }
}

class ReportInfoData extends Data {

    static #propertyToFieldName = {
        id             : "report_id",
        author         : "report_author",
        title          : "report_title",
        creationTime   : "report_creation_time",
        modifiedTime   : "report_modified_time",
        recommendation : "report_recommendation",
        wasFinalised   : "report_finalised",
        evaluationId   : "evaluation_id",
        csv            : "report_csv",
        evaluationTitle: "evaluation_title"
    };

    constructor(backendData) {
        super(backendData, ReportInfoData.#propertyToFieldName, "ReportInfoData");
    }
    id() {
        return this.get("id");
    }
    author() {
        return this.get("author");
    }
    title() {
        return this.get("title");
    }
    creationTime() {
        return this.get("creationTime");
    }
    modifiedTime() {
        return this.get("modifiedTime");
    }
    recommendation() {
        return this.get("recommendation");
    }
    wasFinalised() {
        return this.get("wasFinalised");
    }
    evaluationId() {
        return this.get("evaluationId");
    }
    csv() {
        return this.get("csv");
    }
    evaluationTitle() {
        return this.get("evaluationTitle");
    }
}

class UserInfoData extends Data {

    static #propertyToFieldName = {
        createdAt   : "created_at",
        email       : "email",
        name        : "name",
        id          : "user_id",
        role        : "role",
        userMetadata: "user_metadata",
    }

    constructor(backendData) {
        super(backendData, UserInfoData.#propertyToFieldName, "UserInfoData");
    }

    createdAt() {
        return this.get("createdAt");
    }
    email() {
        return this.get("email");
    }
    name() {
        return this.get("name");
    }
    id() {
        return this.get("id");
    }
    role() {
        return this.get("role");
    }
    userMetadata() {
        return this.get("userMetadata");
    }

}

export { EvaluationInfoData, FrameworkInfoData, ReportInfoData, UserInfoData };
export default Data;