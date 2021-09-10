//Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Rolande",
    database: "employee_trackerDB"
});


//Connection ID
connection.connect(function(err) {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
    startPrompt();
});
//Initial Prompt
function startPrompt() {
    inquirer.prompt([{
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
            "View All Employees?",
            "View All Employees By Roles?",
            "View all Employees By Departments",
            "Update Employee",
            "Add Employee?",
            "Add Role?",
            "Add Department?"
        ]
    }]).then(function(val) {
        switch (val.choice) {
            case "View All Employees?":
                viewAllEmployees();
                break;

            case "View All Employees By Roles?":
                viewAllRoles();
                break;
            case "View all Employees By Departments":
                viewAllDepartments();
                break;

            case "Add Employee?":
                addEmployee();
                break;

            case "Update Employee":
                updateEmployee();
                break;

            case "Add Role?":
                addRole();
                break;

            case "Add Department?":
                addDepartment();
                break;

        }
    })
}
//View All Employees
function viewAllEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
        function(err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
}
//View All Roles
function viewAllRoles() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
        function(err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
}
//View All Employees By Departments
function viewAllDepartments() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
        function(err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
}

//Select Role queries Role Title for Add Employee Prompt
var roleArr = [];

function selectRole() {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }

    })
    return roleArr;
}
//Select Role queries The Managers for Add Employee Prompt
var managersArr = [];

function selectManager() {
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managersArr.push(res[i].first_name);
        }

    })
    return managersArr;
}
//Add Employee
function addEmployee() {
    inquirer.prompt([{
            name: "firstName",
            type: "input",
            message: "Enter employee first name "
        },
        {
            name: "lastName",
            type: "input",
            message: "Enter employee last name "
        },
        {
            name: "role",
            type: "list",
            message: "What is employee role? ",
            choices: selectRole()
        },
        {
            name: "choice",
            type: "rawList",
            message: "What is employee manager name?",
            choices: selectManager()
        }
    ]).then(function(val) {
        var roleId = selectRole().indexOf(val.role) + 1
        var managerId = selectManager().indexOf(val.choice) + 1
        connection.query("INSERT INTO employee SET ?", {
            first_name: val.firstName,
            last_name: val.lastName,
            manager_id: managerId,
            role_id: roleId

        }, function(err) {
            if (err) throw err
            console.table(val)
            startPrompt()
        })

    })
}
//Update Employee
function updateEmployee() {
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
        // console.log(res)
        if (err) throw err
        console.log(res)
        inquirer.prompt([{
                name: "lastName",
                type: "rawList",
                choices: function() {
                    var lastName = [];
                    for (var i = 0; i < res.length; i++) {
                        lastName.push(res[i].last_name);
                    }
                    return lastName;
                },
                message: "What is the Employee last name? ",
            },
            {
                name: "role",
                type: "rawList",
                message: "What is the Employee new title? ",
                choices: selectRole()
            },
        ]).then(function(val) {
            var roleId = selectRole().indexOf(val.role) + 1
            connection.query("UPDATE employee SET WHERE ?", {
                    last_name: val.lastName

                }, {
                    role_id: roleId

                },
                function(err) {
                    if (err) throw err
                    console.table(val)
                    startPrompt()
                })

        });
    });

}
//Add Employee Role
function addRole() {
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role", function(err, res) {
        inquirer.prompt([{
                name: "Title",
                type: "input",
                message: "What is the employee Title?"
            },
            {
                name: "Salary",
                type: "input",
                message: "What is the employee Salary?"

            }
        ]).then(function(res) {
            connection.query(
                "INSERT INTO role SET ?", {
                    title: res.Title,
                    salary: res.Salary,
                },
                function(err) {
                    if (err) throw err
                    console.table(res);
                    startPrompt();
                }
            )

        });
    });
}
//Add Department
function addDepartment() {

    inquirer.prompt([{
        name: "name",
        type: "input",
        message: "What Department would you like to add?"
    }]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ? ", {
                name: res.name

            },
            function(err) {
                if (err) throw err
                console.table(res);
                startPrompt();
            }
        )
    })
}