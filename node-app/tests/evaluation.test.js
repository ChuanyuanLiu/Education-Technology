var sqlConnector = require('../routes/sqlConnector')

  describe("POST /update/title", () => {

    test("Should update evaluation title and summary for evaluation_id=1", done => {
    
        var title = "St. Arthur Evalutaion";
        var summary = "Requires a second audit";
        var id = 1; 
        
    const input = "UPDATE evaluation "
        + "SET evaluation_title = '" + title
        + "', evaluation_summary = '" + summary
        + "' WHERE evaluation_id = " + id;

         sqlConnector.sqlCall(input, function(res) 
        {
            expect(res).toEqual(expect.anything());
            done();
        });
    });
});

describe('the evaluation_id', () => {
    test('is 1', () => {
    
        var title = "St. Arthur Evalutaion";
        var summary = "Requires a second audit";
        var id = 1; 
        
    const input = "UPDATE evaluation "
        + "SET evaluation_title = '" + title
        + "', evaluation_summary = '" + summary
        + "' WHERE evaluation_id = " + id;

         sqlConnector.sqlCall(input, function(res) 
        {
                expect(res.id).toBe(1);
                expect(res.title).toBe('"St. Arthur Evalutaion"');
                expect(res.summary).toBe('"Requires a second audit"');
                done();    
            });
        });
    });

 afterAll(() => {
    sqlConnector.closeConnection();
});

const evaluation1 = {
    evaluation_title: '"St. Arthur Evalutaion"',
    evaluation_id: 1,
  };
  const evaluation2 = {
    evaluation_title: '"St. Arthur Evalutaion"',
    evaluation_id: 1,
  };
  
  describe('the evaluation with id 1 and 2', () => {
    test('have all the same values', () => {
      expect(evaluation1).toEqual(evaluation2);
    });
    test('are not the exact same can', () => {
      expect(evaluation1).not.toBe(evaluation2);
    });
  });