const fs = require('fs'); 
const inquirer = require('inquirer');
const generatePage = require('./src/page-template')

// team profiles
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer= require('./lib/Engineer');
const Intern = require('./lib/Intern'); 

// array for the boys
const teamArray = [];

// start of user prompts 
const addManager = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: "What is the manager's name?", 
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("Please enter the manager's  name!");
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the manager's ID?",
            validate: nameInput => {
                if (nameInput ) {
                    return true;
                } else {
                    console.log ('Please enter the managers ID')
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter manager's email.",
            validate: nameInput => {
                if (nameInput ) {
                    return true;
                } else {
                    console.log ('Please enter an email')
                }
            }
        },
        {
            type: 'input',
            name: 'officenumber',
            message: "Please enter the manager's office number.",
            validate: nameInput => {
                if (nameInput ) {
                    return true;
                } else {
                    console.log ('Please enter an office number!')
                }
            }
        }
    ])
    .then(managerInput => {
        const { name, id, email, officeNumber } = managerInput;
        const manager = new Manager (name, id, email, officeNumber);
        
        teamArray.push(manager);
        console.log(manager);
    })
};

const addEmployee = () => {
    console.log(`
    Adding employee to the team
    `);

return inquirer.prompt ([
    {
        type: 'list',
        name: 'role',
        message: "Please choose your employee's role",
        choices: ['Engineer', 'Intern']
    },
    {
        type: 'input',
        name: 'name',
        message: "What's the name of the employee?",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log ("Please enter an employee's name!");
                return false; 
            }
    }
},
{ 
    type: 'input',
    name: 'id',
    message: "Please enter the employee's ID.",
    validate: nameInput => {
        if  (isNaN(nameInput)) {
            console.log ("Please enter the employee's ID!")
            return false; 
        } else {
            return true;
        }
    }  
},
{
    type: 'input',
    name: 'email',
    message: "Please enter the employee's email.",
    validate: nameInput => {
        if (nameInput ) {
            return true;
        } else {
            console.log ('Please enter an email!')
        }
    }  
},
{
    type: 'input',
    name: 'github',
    message: "Please enter the employee's github username.",
    when: (input) => input.role === "Engineer",
    validate: nameInput => {
        if (nameInput ) {
            return true;
            } else {
                console.log ("Please enter the employee's github username!")
            }
        }
},
{
    type: 'input',
    name: 'school',
    message: "Please enter the intern's school",
    when: (input) => input.role === "Intern",
    validate: nameInput => {
        if (nameInput) {
            return true;
        } else {
            console.log ("Please enter the intern's school!")
        }
    }
},
{
    type: 'confirm',
    name: 'confirmAddEmployee',
    message: 'Would you like to add more team members?',
    default: false
}
])

.then(employeeData => {
    let { name, id, email, role, github, school, confirmAddEmployee } = employeeData; 
        let employee; 

        if (role === "Engineer") {
            employee = new Engineer (name, id, email, github);
            console.log(employee);
        } else {
            employee = new Intern (name, id, email, school);
            console.log(employee);
        }
        teamArray.push(employee); 
        if (confirmAddEmployee) {
            return addEmployee(teamArray); 
        } else {
            return teamArray;
        }
    })
};

const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Team profile has been created! CHeck out the index.html for the results")
        }
    })
};

addManager()
.then(teamArray => {
    return generateHTML(teamArray);
})
.then(pageHTML => {
    return writeFile(pageHTML);
})
.catch(err => {
    const teamArr = generateHTML(err);
    writeFile(teamArr);
});