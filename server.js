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
          "Add Employee",
          "Add Department",
          "Add Role",
          "Delete Employee",
          "Delete Department",
          "Delete Role",
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
        case "Add Employee":
          addEmploy();
          break;
        case "Add Department":
          addDepart();
          break;
        case "Add Role":
          addRole();
          break;
        case "Delete Employee":
          delEmploy();
          break;
        case "Delete Department":
          delDepart();
          break;
        case "Delete Role":
          delRol();
          break;
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

const addEmploy = () => {
  dbconnect.promise().query(`SELECT * FROM roles`)
    .then(([rows]) => {
      let roles = rows;
      const roleMap = roles.map(({ id, title }) => ({
        name: title,
        value: id
      }));

      dbconnect.promise().query(`SELECT * FROM employee`)
        .then(([rows]) => {
          let employ = rows;

          const manageMap = employ.map(({ first_name, last_name, id }) => ({
            name: first_name + " " + last_name,
            value: id
          }));
          inquirer
            .prompt([
              {
                name: "first_name",
                type: "input",
                message: "What is the FIRST NAME of the employee?",
              },
              {
                name: "last_name",
                type: "input",
                message: "What is the LAST NAME of the employee?",
              },
              {
                name: "role",
                type: "list",
                message: "What is the ROLE of the employee?",
                choices: roleMap
              },
              {
                name: "manager",
                type: "list",
                message: "Who is the MANAGER of the employee?",
                choices: manageMap
              },
            ])
            .then(function (res) {
              dbconnect.query("INSERT INTO employee SET ?", {
                first_name: res.first_name,
                last_name: res.last_name,
                role_id: res.role,
                manager_id: res.manager
              }, function (err) {
                if (err) throw err
                console.table("Added " + res.first_name + "  as a new Employee!")
                renderPrompt()
              })

            })
        })
    })
};

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
          console.log("Added " + res.dept_name + " to department database!");
          renderPrompt();
        }
      )
    })
};

const addRole = () => {
  dbconnect.promise().query(`SELECT * FROM department`)
    .then(([rows]) => {
      let rol = rows;
      const departmentRole = rol.map(({ id, dept_name }) => ({
        name: dept_name,
        value: id
      }));

      inquirer
        .prompt([
          {
            name: "title",
            type: "input",
            message: "What NAME is the new Role?"
          },
          {
            name: "salary",
            type: "input",
            message: "What SALARY will the new Role have?"
          },
          {
            name: "department_id",
            type: "list",
            message: "Which DEPARTMENT will you assign the new Role?",
            choices: departmentRole
          },
        ])
        .then(function (res) {
          dbconnect.query("INSERT INTO roles SET ? ", {
            title: res.title,
            salary: res.salary,
            department_id: res.department_id
          }, function (err) {
            if (err) throw err;
            console.log("Added " + res.title + " to the Role database!")
            renderPrompt();
          })
        })
    })
}

const delEmploy = () => {
  dbconnect.promise().query(`SELECT * FROM employee`)
    .then(([rows]) => {
      let employ = rows;
      const employList = employ.map(({ id, first_name, last_name }) => ({
        name: first_name + " " + last_name,
        value: id
      }));
      inquirer.prompt([{
        type: 'list',
        name: 'name',
        message: "Which EMPLOYEE do you wish to remove?",
        choices: employList
      }])
        .then(res => {
          dbconnect.query(`DELETE FROM employee WHERE employee.id = ${res.name} `,
            function (err) {
              if (err) throw err;
              console.log('Employee has been removed!')
              renderPrompt();
            })
        })
    })
}


const delDepart = () => {
  dbconnect.promise().query("SELECT * FROM department")
    .then(([rows]) => {
      let depart = rows;
      const departmentChoices = depart.map(({
        id,
        dept_name
      }) => ({
        name: dept_name,
        value: id
      }));

      inquirer.prompt([{
        type: 'list',
        name: 'dept_name',
        message: 'Which Department do you wish to remove?',
        choices: departmentChoices
      }])
        .then(res => {
          dbconnect.query(`DELETE FROM department WHERE department.id = ${res.dept_name}`,
            function (err) {
              if (err) throw err;
              console.log('Removed department choice from database!')
              renderPrompt()
            })
        });
    });
};

const delRol = () => {
  dbconnect.promise().query("SELECT * FROM roles")
    .then(([rows]) => {
      let rol = rows;
      const rolesList = rol.map(({ id, title }) => ({
        name: title,
        value: id
      }));

      inquirer
        .prompt([{
          type: 'list',
          name: 'title',
          message: "Which ROLE do you want to remove?",
          choices: rolesList
        }])
        .then(res => {
          dbconnect.query(`DELETE FROM roles WHERE roles.id = ${res.title} `,
            function (err) {
              if (err) throw err;
              console.log("Removed ROLE from Database!");

              renderPrompt();
            });
        });
    })
}

initPrompt();