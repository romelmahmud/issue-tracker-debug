document
  .getElementById("issueInputForm")
  .addEventListener("submit", submitIssue);

function submitIssue(e) {
  const getInputValue = (id) => document.getElementById(id).value;
  const description = getInputValue("issueDescription");
  const severity = getInputValue("issueSeverity");
  const assignedTo = getInputValue("issueAssignedTo");
  const id = Math.floor(Math.random() * 100000000) + "";
  const status = "Open";
  const issueWarning = document.getElementById("issue-warning");
  const assignWarning = document.getElementById("assign-warning");
  issueWarning.classList.add("hidden");
  assignWarning.classList.add("hidden");

  if (!description) {
    issueWarning.classList.remove("hidden");
    return;
  }
  if (!assignedTo) {
    assignWarning.classList.remove("hidden");
    return;
  }

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem("issues")) {
    issues = JSON.parse(localStorage.getItem("issues"));
  }
  issues.push(issue);
  localStorage.setItem("issues", JSON.stringify(issues));

  document.getElementById("issueInputForm").reset();
  fetchIssues();
  e.preventDefault();
}

const toggleIssue = (id, status) => {
  console.log(id, status);
  const issues = JSON.parse(localStorage.getItem("issues"));
  const currentIssue = issues.find((issue) => issue.id === id + "");
  currentIssue.status = `${status === "Closed" ? "Open" : "Closed"}`;
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
};

const deleteIssue = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const remainingIssues = issues.filter((issue) => issue.id !== id + "");
  localStorage.setItem("issues", JSON.stringify(remainingIssues));
  fetchIssues();
};

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const issuesList = document.getElementById("issuesList");
  issuesList.innerHTML = "";

  for (var i = 0; i < issues.length; i++) {
    const { id, description, severity, assignedTo, status } = issues[i];

    issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label  ${
                                status === "Open"
                                  ? "label-info"
                                  : "label-danger"
                              }"> ${status} </span></p>
                              <h3 class=${
                                status === "Closed" ? "lineThrough" : ""
                              }> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <button  onclick="toggleIssue(${id}, '${status}')" class="btn  ${
      status === "Open" ? "btn-warning" : "btn-info"
    }"">${status === "Closed" ? "Open" : "Close"}</button>
                              <button  onclick="deleteIssue(${id})" class="btn btn-danger">Delete</button>
                              </div>`;
  }
};
