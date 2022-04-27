// create Manager card
const buildManagerHtmlCard = function (manager) {
  return `
    <div class="col-4 mt-4">
        <div class="card h-100">
            <div>
                <h3>${manager.name}</h3>
                <h4>Manager</h4>
            </div>

            <div class="card-body">
                <p class="id">ID: ${manager.id}</p>
                <p class="email">Email:<a href="mailto:${manager.email}">${manager.email}</a></p>
                <p class="office">Office Number: ${manager.officeNumber}</p>
            </div>

        </div>
    </div>
    `;
};

// create Engineer card
const buildEngineerHtmlCard = function (engineer) {
  return `
    <div class="col-4 mt-4">
        <div class="card h-100">
            <div>
                <h3>${engineer.name}</h3>
                <h4>Engineer</h4>
            </div>
            <div class="card-body">
                <p class="id">ID: ${engineer.id}</p>
                <p class="email">Email:<a href="mailto:${engineer.email}">${engineer.email}</a></p>
                <p class="github">Github: <a href="https://github.com/${engineer.github}">${engineer.github}</a></p>
            </div>

        </div>
    </div>
    `;
};

// create Intern card
const buildInternHtmlCard = function (intern) {
  return `
    <div class="col-4 mt-4">
    <div class="card h-100">
        <div>
            <h3>${intern.name}</h3>
            <h4>Intern</h4>
        </div>

        <div class="card-body">
            <p class="id">ID: ${intern.id}</p>
            <p class="email">Email: <a href="mailto:${intern.email}">${intern.email}</a></p>
            <p class="school">School: ${intern.school}</p>
        </div>
    </div>
</div>
    `;
};

// push array to page
const buildHtml = (data) => {
  const MANAGER = "Manager";
  const ENGINEER = "Engineer";
  const INTERN = "Intern";

  const pageArray = [];

  for (let i = 0; i < data.length; i++) {
    const employee = data[i];
    const role = employee.getRole();

    if (role === MANAGER) {
      pageArray.push(buildManagerHtmlCard(employee));
    } else if (role === ENGINEER) {
      pageArray.push(buildEngineerHtmlCard(employee));
    } else if (role === INTERN) {
      pageArray.push(buildInternHtmlCard(employee));
    }
  }
  const employeeCards = pageArray.join("");

  const teamPage = buildTeamPage(employeeCards);
  return teamPage;
};

// generate html page
const buildTeamPage = function (employeeCards) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Team Cards</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
      <link rel="stylesheet" href="style.css">
  </head>
  
  <body>
      <header>
          <nav class="navbar" id="navbar">
              <span class="mb-0 h1 w-100 text-center" id="navbar-text">Team Cards</span>
          </nav>
      </header>
  
      <main>
            <div class="container">
                <div class="row justify-content-center" id="team-cards">
                ${employeeCards}
                </div>
            </div>
      </main>
      
  </body>
  
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
  </html>
`;
};

// export to index
module.exports = buildHtml;
