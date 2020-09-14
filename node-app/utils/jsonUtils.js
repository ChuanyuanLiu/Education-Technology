// Format joined tables of section and questions into nested hierarchy
function formatSectionHierarchy(joined) {

    // Setup map for section indices to formatted index
    let sidToIndex = new Map();
    let index = 0;
    let formatted = [];

    for (let i = 0; i < joined.length; i++) {

        let row = joined[i];
        let sid = row.section_id;

        // Initialise new section
        if (!sidToIndex.has(sid)) {
            sidToIndex.set(sid, index);
            let newS = {
                'section_id': sid,
                'section_title': row.section_title,
                'questions': []
            };
            formatted[index++] = newS;
        }

        // Insert formatted question into section
        let q = {
            'question_id': row.question_id,
            'question_title': row.question_title
        };
        formatted[sidToIndex.get(sid)].questions.push(q);

    }

    return formatted;

}

module.exports = { formatSectionHierarchy };