// move page creation to top
const generateHTML = require("./src/page-template");

// team profiles
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

//modules
const fs = require("fs");
const inquirer = require("inquirer");

// array for the boys
const teamArray = [];

const numberValidator = (input, messageFail) => {
  if (isNaN(+input)) {
    console.log(messageFail);
    return false;
  } else {
    return true;
  }
};

const stringValidator = (input, messageFail) => {
  if (input) {
    return true;
  } else {
    console.log(messageFail);
    return false;
  }
};

// start of user prompts
const enterTeamManager = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the team manager's name?",
        validate: (nameInput) =>
          stringValidator(nameInput, "Please enter a valid name"),
      },
      {
        type: "input",
        name: "id",
        message: "What is the team manager's ID?",
        validate: (idInput) =>
          numberValidator(idInput, "Team manager ID must be a valid Number"),
      },
      {
        type: "input",
        name: "email",
        message: "Please enter team manager's email.",
        validate: (emailInput) =>
          stringValidator(emailInput, "Please enter a valid email"),
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is the team manager's office number?",
        validate: (officeInput) =>
          numberValidator(officeInput, "Office number must be a valid Number"),
      },
    ])
    .then((managerInput) => {
      const { name, id, email, officeNumber } = managerInput;
      const manager = new Manager(name, id, email, officeNumber);

      teamArray.push(manager);
      console.log(manager);
    });
};

const enterEmployee = () => {
  console.log(`
    Adding employee to team
    `);

  const ENGINEER = "Engineer";
  const INTERN = "Intern";

  return inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Please choose your employee's role",
        choices: [ENGINEER, INTERN],
      },
      {
        type: "input",
        name: "name",
        message: "What's the name of the employee?",
        validate: (nameInput) =>
          stringValidator(nameInput, "Please enter a valid name"),
      },
      {
        type: "input",
        name: "id",
        message: "Please enter the employee's ID.",
        validate: (idInput) =>
          numberValidator(idInput, "Employee ID must be a valid number"),
      },
      {
        type: "input",
        name: "email",
        message: "Please enter the employee's email.",
        validate: (emailInput) =>
          stringValidator(emailInput, "Please enter a valid email"),
      },
      {
        type: "input",
        name: "github",
        message: "Please enter the employee's github username.",
        when: (input) => input.role === ENGINEER,
        validate: (nameInput) =>
          stringValidator(
            nameInput,
            "Please enter a valid employee's github username!"
          ),
      },
      {
        type: "input",
        name: "school",
        message: "Please enter the intern's school",
        when: (input) => input.role === INTERN,
        validate: (schoolInput) =>
          stringValidator(
            schoolInput,
            "Please enter a valid school! for the intern"
          ),
      },
      {
        type: "confirm",
        name: "confirmAddEmployee",
        message: "Would you like to add more team members?",
        default: false,
      },
    ])

    .then((employeeData) => {
      // for all employees
      let { name, id, email, role, github, school, confirmAddEmployee } =
        employeeData;
      let employee;

      if (role === "Engineer") {
        employee = new Engineer(name, id, email, github);
        console.log(employee);
      } else {
        employee = new Intern(name, id, email, school);
        console.log(employee);
      }
      teamArray.push(employee);

      if (confirmAddEmployee) {
        return enterEmployee(teamArray);
      } else {
        return teamArray;
      }
    });
};

// generates the html page using file
const writeFile = (data) => {
  fs.writeFile("./dist/index.html", data, (err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log(
        "Team profile has been created! CHeck out the index.html for the results"
      );
    }
  });
};

enterTeamManager()
  .then(enterEmployee)
  .then((teamArray) => {
    return generateHTML(teamArray);
  })
  .then((pageHTML) => {
    return writeFile(pageHTML);
  })
  .catch((err) => {
    console.log(err);
  });
