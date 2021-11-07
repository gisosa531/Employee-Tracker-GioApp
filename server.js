const inquirer = require("inquirer");
require('console.table');
const logo = require('asciiart-logo');
const dbconnect = require("./config/connection");

//AsciiArt Logo 
const initPrompt = () => {
  const logoInfo = logo({
    name: 'Employee Management Tracker',
    font: 'Doom',
    lineChars: 10,
    padding: 1.5,
    margin: 2.5,
    borderColor: 'grey',
    logoColor: 'bold-green',
    textColor: 'green',
  })
    .emptyLine()
    .right('version 1')
    .emptyLine()
    .center('Administrating your work environment')
    .render();

  console.log(logoInfo);
  renderPrompt();
};

const renderPrompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which option do you want to choose?",
        name: "choice",
        choices: [
          "View all Employees",
          "View All Departments?",
          // "View All Roles?",
          // "View Employees by Department",
          // "View Employees by Manager",
          // "Add Employee?",
          // "Add Department?",
          // "Add Role?",
          // "Update Employee's Role?",
          // "Update Employee Manager?",
          // "Delete Employee",
          // "Delete Department",
          // "View Budget by Department",
          "Exit App"
        ]
      }
    ]).then(res => {
      switch (res.choice) {
        case "View All Employees":
          viewAllEmploy();
          break;
        case "View All Departments":
          viewAllDepart();
          break;
        // case "View All Roles":
        //   viewAllRoles();
        //   break;
        // case "View Employees by Department":
        //   viewEmployByDepart();
        //   break;
        // case "View Employees by Manager":
        //   viewEmployByManage();
        //   break;
        // case "Add Employee":
        //   addEmploy();
        //   break;
        // case "Add Department":
        //   addDepart();
        //   break;
        // case "Add Role":
        //   addRole();
        //   break;
        // case "Update Employee Role":
        //   updateEmployRole();
        //   break;
        // case "Update Employee Manager":
        //   updateEmployManage();
        //   break;
        // case "Delete Employee":
        //   delEmploy();
        //   break;
        // case "Delete Department":
        //   delDepart();
        //   break;
        // case "View Budget by Department":
        //   viewBudget();
        //   break;
        case "Exit App":
          console.log("Bye-bye!");
          dbconnect.end();
          break;
        default:
          break;
      }
    });
}





const viewAllEmploy = () => {
  dbconnect.query("SELECT * FROM employee",
  function (err, results) {
    if (err) throw err
    console.table(results)
    renderPrompt();
  })
}

const viewAllDepart = () => {
  dbconnect.query("SELECT department.id, department.depart_name FROM department;",
  function (err, res) {
    if (err) throw err 
    console.table(res)
    renderPrompt();
  }
  )
}
// const viewAllRoles = () => {
//   dbconnect.query("SELECT ")
// }
// const viewEmployByDepart = () => {

// }
// const viewEmployByManage = () => {

// }

// const addEmploy = () => {

// }
// const addDepart = () => {

// }
// const addRole = () => {

// }

// const updateEmployRole = () => {

// }
// const updateEmployManage = () => {

// }


// const delEmploy = () => {

// }
// const delDepart = () => {

// }

// const viewBudget = () => {

// }


initPrompt();