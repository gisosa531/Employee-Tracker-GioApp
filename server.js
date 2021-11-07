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
          "View all Departments",
          "View all Roles",
          // "View Employees by Department",
          // "View Employees by Manager",
          // "Add Employee",
          "Add Department",
          // "Add Role",
          // "Update Employee's Role",
          // "Update Employee Manager",
          // "Delete Employee",
          "Delete Department",
          // "View Budget by Department",
          "Exit App"
        ]
      }
    ]).then(res => {
      console.log(res.choice)
      switch (res.choice) {
        case "View all Employees":
          viewAllEmploy();
          break;
        case "View all Departments":
          viewAllDepart();
          break;
        case "View all Roles":
          viewAllRoles();
          break;
        // case "View Employees by Department":
        //   viewEmployByDepart();
        //   break;
        // case "View Employees by Manager":
        //   viewEmployByManage();
        //   break;
        // case "Add Employee":
        //   addEmploy();
        //   break;
        case "Add Department":
          addDepart();
          break;
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
        case "Delete Department":
          delDepart();
          break;
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
    function (err, res) {
      if (err) throw err
      console.table(res)
      renderPrompt();
    }
  )
}

const viewAllDepart = () => {
  dbconnect.query("SELECT id as 'ID', dept_name AS 'Department Name' FROM department;",
    function (err, res) {
      if (err) throw err
      console.table(res)
      renderPrompt();
    }
  )
}

const viewAllRoles = () => {
  dbconnect.query("SELECT roles.id, roles.title, department.dept_name AS 'Department Name', roles.salary FROM roles LEFT JOIN department on roles.department_id = department.id;",
    function (err, res) {
      if (err) throw err
      console.table(res)
      renderPrompt();
    }
  )
}
// const viewEmployByDepart = () => {

// }
// const viewEmployByManage = () => {

// }

// const addEmploy = () => {

// }
const addDepart = () => {
  inquirer.prompt([
    {
    type: "input",
    name: "dept_name",
    message: "What is the name of the new department that you want to add? "
  }]).then(res => {
    dbconnect.query("INSERT INTO department SET ? ", {
        dept_name: res.dept_name
      },
      function (err) {
        if (err) throw err
        console.log("Added " + res.dept_name +  " to department database!");
        renderPrompt();
      }
    )
  })
};

// const addRole = () => {

// }

// const updateEmployRole = () => {

// }
// const updateEmployManage = () => {

// }


// const delEmploy = () => {

// }
const delDepart = () => {
  dbconnect.query("SELECT * FROM department",
  function (err, res) {
    if (err) throw err;
    const departmentChoices = res.map(({
      id,
      dept_name
    }) => ({
      dept_name: dept_name,
      value: id
    }));
    inquirer.prompt([{
      type: 'list',
      name: 'dept_name',
      message: 'Which Department do you wish to remove?',
      choices: departmentChoices
    }])
    .then(res => dbconnect.query(`DELETE from department WHERE department.id = ${res.dept_name}`),
    function (err, res) {
      if (err) throw err; 
    console.log('Removed department choice from database!')
    renderPrompt()
  });
});
};

// const viewBudget = () => {

// }


initPrompt();