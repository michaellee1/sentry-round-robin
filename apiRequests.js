const { sentryAPIbase, projectID, orgSlug } = require("./constants");
const sendRequest = require("request-promise-native");

// Return array of users for given project (or [])
async function getProjectUsers(projectID, orgSlug) {
  const requestOptions = {
    url: `${sentryAPIbase}/organizations/${orgSlug}/users/?project=${projectID}`,
    json: true,
    headers: { Authorization: "Bearer " + process.env.SENTRY_TOKEN }
  };

  let result = await sendRequest(requestOptions);
  return result.map(userData => userData.user.username);
}

// Assign issue to a given user
async function assignIssue(issueID, username) {
  const requestOptions = {
    url: `${sentryAPIbase}/issues/${issueID}/`,
    method: "PUT",
    json: true,
    headers: { Authorization: "Bearer " + process.env.SENTRY_TOKEN },
    body: { assignedTo: username }
  };

  return await sendRequest(requestOptions);
}

module.exports = {
  getProjectUsers,
  assignIssue
};
