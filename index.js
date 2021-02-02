const core = require('@actions/core');
const github = require('@actions/github');
const jwt = require("jsonwebtoken");
const rp = require("request-promise");

try {
  const tenantName = core.getInput('tenant-name');
  const jwtSecret = core.getInput('api-secret');

  const BASE_URL = "https://us.healthbot.microsoft.com/";
  const jwtToken = jwt.sign({
    tenantName: tenantName,
    iat: Math.floor(Date.now() / 1000)
  }, jwtSecret);

  const options = {
    method: 'POST',
    uri: `${BASE_URL}api/account/${tenantName}/scenarios`,
    headers: {
        'Authorization': 'Bearer ' + jwtToken
    },
    body: [
        {
            "name":"Hello World",
            "scenario_trigger":"hello_world",
            "description":"",
            "code":"{\n  \"version\": 2,\n  \"steps\": [\n    {\n      \"id\": \"aaa3073dc553-32a44525cced8e2f-2200\",\n      \"type\": \"statement\",\n      \"designer\": {\n        \"xLocation\": 479,\n        \"yLocation\": 196\n      },\n      \"text\": \"Hello World!\"\n    }\n  ]\n}"
        },
        {
            "name":"Greetings",
            "scenario_trigger":"greetings",
            "description":"",
            "code":"{\n  \"version\": 2,\n  \"steps\": [\n    {\n      \"id\": \"aaa3073dc553-32a44525cced8e2f-2200\",\n      \"type\": \"statement\",\n      \"designer\": {\n        \"xLocation\": 479,\n        \"yLocation\": 196\n      },\n      \"text\": \"Greetings!\"\n    }\n  ]\n}"
        }
    ],
    json: true
};

rp(options)
    .then(function (parsedBody) {
        console.log(parsedBody);
    })
    .catch(function (err) {
        console.log(err.message);
    });

} catch (error) {
  core.setFailed(error.message);
}