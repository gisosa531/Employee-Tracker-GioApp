const inquirer = require("inquirer");
require('console.table');
const logo = require('asciiart-logo');
const db = require("./config/connection");
 
const initPrompt = () => {
  const logoInfo = logo({
    name: 'Employee Tracker',
    font: 'Doom',
    lineChars: 10,
    padding: 2.5,
    margin: 3.5,
    borderColor: 'grey',
    logoColor: 'bold-green',
    textColor: 'green',
})
.emptyLine()
.right('version by Giovanni Sosa')
.emptyLine()
.center('Administrating your work environment')
.render();

console.log(logoInfo);

};


