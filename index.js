const core = require('@actions/core');
const github = require('@actions/github');
const jwt = require("jsonwebtoken");
const rp = require("request-promise");
const fs = require('fs');

try {
  const tenantName = core.getInput('tenant-name');
  const jwtSecret = core.getInput('api-secret');

  const BASE_URL = "https://us.healthbot.microsoft.com/";
  const jwtToken = jwt.sign({
    tenantName: tenantName,
    iat: Math.floor(Date.now() / 1000)
  }, jwtSecret);

  const body = fs.readFileSync(core.getInput('template-file'));
  console.log(body);

  const options = {
    method: 'POST',
    uri: `${BASE_URL}api/account/${tenantName}/scenarios`,
    headers: {
        'Authorization': 'Bearer ' + jwtToken
    },
    body: body,
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