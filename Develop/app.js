
const Manager = require("../lib/Manager");
const Engineer = require("../lib/Engineer");
const Intern = require("../lib/Intern");
const inquirer = require("../node_modules/inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("../lib/htmlRenderer");
const team = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function employeeInput() {
    console.log(team)

    inquirer.prompt([
        {
            type: "list",
            name: "employeeType",
            message: "select the type of employee you would like to input",
            choices: ["Engineer", "Intern", "Manager", "show team"]
        }
    ]).then(result => {
        if (result.employeeType === "Manager") {
            managerInput()

        }
        else if (result.employeeType === "Intern") {
            internInput()

        } else if (result.employeeType === "Engineer") {
            engineerInput()

        } else {
            createHtml(outputPath, render(team))
        }
    })
}

function managerInput() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the employee's name"
        },
        {
            type: "input",
            name: "id",
            message: "Input the employee's id"
        },
        {
            type: "input",
            name: "email",
            message: "Enter your email address."
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Enter the Manager's office number"
        }
    ]).then(function (response) {
        let manager = new Manager(response.name, response.email, response.id, response.officeNumber)
        team.push(Manager);
        employeeInput()
    })
}
function internInput() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the employee's name"
        },
        {
            type: "input",
            name: "id",
            message: "Input the employee's id"
        },
        {
            type: "input",
            name: "email",
            message: "Enter your email address."
        },
        {
            type: "input",
            name: "school",
            message: "Enter the Intern's school"
        }
    ]).then(function (response) {
        let intern = new Intern(response.name, response.id, response.email, response.school)
        team.push(Intern);
        console.log(employee.getRole())
        employeeInput()

    })

}
function engineerInput() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the employee's name"
        },
        {
            type: "input",
            name: "id",
            message: "Input the employee's id"
        },
        {
            type: "input",
            name: "email",
            message: "Enter your email address."
        },
        {
            type: "input",
            name: "github",
            message: "Enter the Engineer's github id"
        }
    ]).then(function (response) {
        console.log(response)
        let engineer = new Engineer(response.name, response.id, response.email, response.github)
        team.push(engineer);
        employeeInput()
    })
}
function createHtml(file, data) {
    fs.writeFile(file, data, function (err) {
        if (err) {
            throw err
        }
        console.log("view employee team profile")
    })
}
employeeInput()

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
