// Format joined tables of section and questions into nested hierarchy
function formatSectionHierarchy(joined, checkCompleteness = false) {

    // Setup map for section indices to formatted index
    let sidToIndex = new Map();
    let index = 0;
    let formatted = [];

    // console.log(joined);

    for (let i = 0; i < joined.length; i++) {

        let row = joined[i];
        let sid = row.section_id;
        // Check for resolved duplicate section_id during LEFT JOIN
        if (row.defined_section_id != null) {
            sid = row.defined_section_id;
        }

        // Initialise new section
        if (!sidToIndex.has(sid)) {
            sidToIndex.set(sid, index);
            let newS = {
                'section_id': sid,
                'section_title': row.section_title,
                'questions': []
            };
            if (checkCompleteness) {
                newS.section_completed = 1;
            };
            formatted[index++] = newS;
        }

        // Insert formatted question into section
        let qid = row.question_id;
        // Check for resolved duplicate question_id during LEFT JOIN
        if (row.defined_question_id != null) {
            qid = row.defined_question_id;
        }

        // Check if there are any questions to add, null if none due to LEFT JOIN
        if (qid != null) {

            let q = {
                'question_id': qid,
                'question_title': row.question_title
            };
            
            // Update question/section completeness
            if (checkCompleteness) {
                if (row.evaluation_id != null) {
                    q.question_completed = 1;
                } else {
                    q.question_completed = 0;
                    formatted[sidToIndex.get(sid)].section_completed = 0;
                }
            }
    
            formatted[sidToIndex.get(sid)].questions.push(q);

        }

    }

    return formatted;

}

module.exports = { formatSectionHierarchy };