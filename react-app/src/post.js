const fetch = require('node-fetch');

const url = "http://localhost:3001/evaluation/update/title?evaluation_id=1";
data = {evaluation_title: "new title", evaluation_summary: "new summary"};
data_text = JSON.stringify(data);
param = {
    headers: {"Content-Type": "application/json"},
    body: data_text,
    method: "POST",
};

// curl --location --request POST 'localhost:3001/evaluation/update/title?evaluation_id=1' \
// --header 'Content-Type: application/json' \
// --data-raw '{
//     "evaluation_title": "New title",
//     "evaluation_summary": "New summary"
// }'
fetch(url, param)
    .then(data => console.log(data))
    .catch(error => console.log(error));