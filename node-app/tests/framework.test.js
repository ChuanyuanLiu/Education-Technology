var sqlAdapter = require('../utils/sqlAdapter');

afterAll(() => {
    sqlAdapter.closeConnection();
});

describe("POST /framework/update?framework_id={fid}", () => {

    const framework_title = "Test Title";
    const framework_title_empty = "";
    const framework_id = 1;
    const framework_id_empty = 0;
    let prev_title = "";

    const input = `UPDATE framework`
        + ` SET framework_title = '${framework_title}'`
        + ` WHERE framework_id = ${framework_id};`;
    
    const inputEmptyTitle = `UPDATE framework`
        + ` SET framework_title = '${framework_title_empty}'`
        + ` WHERE framework_id = ${framework_id};`;
    
    const inputInvalidId = `UPDATE framework`
        + ` SET framework_title = '${framework_title}'`
        + ` WHERE framework_id = ${framework_id_empty};`;

    const inputCheck = `SELECT framework_title `
        + `FROM framework `
        + `WHERE framework_id = ${framework_id};`;
    
    const inputCheckAll = `SELECT framework_title `
        + `FROM framework;`;

    // Obtain the previous title
    beforeEach(done => {
        sqlAdapter.sqlCall(inputCheck, function(prevRes) {
            prev_title = prevRes[0].framework_title;
            done();
        });
    });

    // Reset the title to the previous title after each test
    afterEach(done => {
        const resetTable = `UPDATE framework`
            + ` SET framework_title = '${prev_title}'`
            + ` WHERE framework_id = ${framework_id};`
        sqlAdapter.sqlCall(resetTable, function(resetRes) {
            done();
        });
    });

    test("Should correctly store the updated framework title", done => {
        sqlAdapter.sqlCall(input + inputCheck, function(inputRes) {
            expect(inputRes[1][0].framework_title).toEqual(framework_title);
            done();
        });
    });

    test("Should correctly store an empty framework title", done => {
        sqlAdapter.sqlCall(inputEmptyTitle + inputCheck, function(inputRes) {
            expect(inputRes[1][0].framework_title).toEqual(framework_title_empty);
            done();
        });
    });

    test("Should not update any of the titles for an invalid framework ID", done => {
        sqlAdapter.sqlCall(inputInvalidId + inputCheckAll, function(inputRes) {
            for (let i = 0; i < inputRes[1].length; i++) {
                expect(inputRes[1][i].framework_title).not.toEqual(framework_title);
            }
            done();
        }); 
    });

});

describe("POST /framework/section/update?section_id={sid}", () => {

    const section_title = "Test Section";
    const section_title_empty = "";
    const section_id = 1;
    const section_id_empty = 0;
    let prev_title = "";

    const input = `UPDATE framework_section`
        + ` SET section_title = '${section_title}'`
        + ` WHERE section_id = ${section_id};`;
    
    const inputEmptyTitle = `UPDATE framework_section`
        + ` SET section_title = '${section_title_empty}'`
        + ` WHERE section_id = ${section_id};`;
    
    const inputInvalidId = `UPDATE framework_section`
        + ` SET section_title = '${section_title}'`
        + ` WHERE section_id = ${section_id_empty};`;

    const inputCheck = `SELECT section_title `
        + `FROM framework_section `
        + `WHERE section_id = ${section_id};`;
    
    const inputCheckAll = `SELECT section_title `
        + `FROM framework_section;`;

    // Obtain the previous title
    beforeEach(done => {
        sqlAdapter.sqlCall(inputCheck, function(prevRes) {
            prev_title = prevRes[0].section_title;
            done();
        });
    });

    // Reset the title to the previous title after each test
    afterEach(done => {
        const resetTable = `UPDATE framework_section`
            + ` SET section_title = '${prev_title}'`
            + ` WHERE section_id = ${section_id};`
        sqlAdapter.sqlCall(resetTable, function(resetRes) {
            done();
        });
    });

    test("Should correctly store the updated section title", done => {
        sqlAdapter.sqlCall(input + inputCheck, function(inputRes) {
            expect(inputRes[1][0].section_title).toEqual(section_title);
            done();
        });
    });

    test("Should correctly store an empty section title", done => {
        sqlAdapter.sqlCall(inputEmptyTitle + inputCheck, function(inputRes) {
            expect(inputRes[1][0].section_title).toEqual(section_title_empty);
            done();
        });
    });

    test("Should not update any of the titles for an invalid section ID", done => {
        sqlAdapter.sqlCall(inputInvalidId + inputCheckAll, function(inputRes) {
            for (let i = 0; i < inputRes[1].length; i++) {
                expect(inputRes[1][i].section_title).not.toEqual(section_title);
            }
            done();
        }); 
    });

});