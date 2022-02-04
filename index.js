const fs = require('fs'); 
const inquirer = require('inquirer');
const generatePage = require

// start of user prompts 
const promptUser = () => {
    return inquirer. prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?', 
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ('Please enter your name!');
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is your ID?',
            validate: nameInput => {
                if (nameInput ) {
                    return true;
                } else {
                    console.log ('Please enter a valid work ID')
                }
            }
        },

    ])
} 