const fetch = require('node-fetch');

const url = "http://localhost:3001/evaluation/update/response?evaluation_id=1&question_id=1";
data = {rate_chosen: 1, response_comment: "new comment"};
data_text = JSON.stringify(data);
param = {
    headers: {"Content-Type": "application/json"},
    body: data_text,
    method: "POST",
};

fetch(url, param)
    .then(data => data.text())
    .then(data => console.log(data))
    .catch(error => console.log(error));