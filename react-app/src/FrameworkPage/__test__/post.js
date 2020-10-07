const fetch = require('node-fetch');
// Test post requests
const url = "http://localhost:3001/framework/section/question/rate/update?question_id=1";
data = {
    rate_1_criterion: "1",
    rate_2_criterion: "2",
    rate_3_criterion: "3",
    rate_4_criterion: "4",
    rate_5_criterion: "5"
};
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