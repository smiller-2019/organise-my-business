const inquirer = require("inquirer");
const express = require("express");
require("console.table");
// Import and require mysql2
const mysql = require("mysql2");
const { default: PasswordPrompt } = require("inquirer/lib/prompts/password");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database.  use .promise() so that we can use await on connection
const db = mysql.createConnection({
  host: "localhost",
  // MySQL username,
  user: "root",
  // MySQL password
  password: "1@am9881NE*",
  database: "business_db",
});
// .promise();

// Query database
// let deletedRow = 2;

// db.query(
//   `DELETE FROM favorite_books WHERE id = ?`,
//   deletedRow,
//   (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   }
// );

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const mainMenuQuestions = [
  {
    type: "list",
    default: "View all departments",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Quit",
    ],
    message: "Select an option to start organising your business: ",
    name: "option",
  },
];

const addDepartmentQuestions = [
  {
    type: "input",
    message: "Enter the department name: ",
    name: "departmentName",
  },
];

// const deptChoices = async () => {
//   const allDepartments = await db.query("SELECT id, dept_name FROM department");
//
// };

// const addEmployeeQuestions = [
//   {
//     type: "input",
//     message: "Enter first name: ",
//     name: "roleName",
//   },
//   {
//     type: "input",
//     message: "Enter last name: ",
//     name: "salary",
//   },
//   {
//     type: "list",
//     message: "Manager"
//   },
// ];

const viewAllDepartments = () => {
  // Query database
  db.query("SELECT id, dept_name FROM department", function (err, results) {
    console.log("\n");
    console.table(results);
  });

  // display the main menu
  mainMenu();
};

const viewAllRoles = () => {
  // Query database
  db.query("SELECT * FROM roles", function (err, results) {
    console.table(results);
  });

  // display the main menu
  mainMenu();
};

const viewAllEmployees = () => {
  // Query database
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
  });

  // display the main menu
  mainMenu();
};

const addDepartment = () => {
  inquirer.prompt(addDepartmentQuestions).then((response) => {
    console.log(response.departmentName);

    // Query database insert new department
    db.query(
      `INSERT INTO department (dept_name)
    VALUES (?)`,
      [response.departmentName],
      function (err, results) {
        console.log(err);
        if (err) throw err;
      }
    );
    // display the main menu
    mainMenu();
  });
};

const addRole = () => {
  // Query database
  db.query("SELECT id, dept_name FROM department", function (err, results) {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the role name: ",
          name: "roleName",
        },
        {
          type: "input",
          message: "Enter the role salary: ",
          name: "salary",
        },
        {
          type: "list",
          message: "Select a department: ",
          choices: results,
        },
      ])
      .then((response) => {
        //results
      });
  });
  // display the main menu
  mainMenu();
};

const addEmployee = () => {
  // inquirer.prompt(addEmployeeQuestions).then((response) => {
  //   console.log(response.departmentName);

  //   // Query database insert new department
  //   db.query(
  //     `INSERT INTO department (dept_name)
  //   VALUES (?)`,
  //     [response.departmentName],
  //     function (err, results) {
  //       console.log(err);
  //       if (err) throw err;
  //     }
  //   );
  // display the main menu
  //   mainMenu();
  // });
  mainMenu();
};

const updateEmployee = () => {
  // inquirer.prompt(addEmployeeQuestions).then((response) => {
  //   console.log(response.departmentName);

  //   // Query database insert new department
  //   db.query(
  //     `INSERT INTO department (dept_name)
  //   VALUES (?)`,
  //     [response.departmentName],
  //     function (err, results) {
  //       console.log(err);
  //       if (err) throw err;
  //     }
  //   );
  // display the main menu
  //   mainMenu();
  // });
  mainMenu();
};

const mainMenu = () => {
  inquirer.prompt(mainMenuQuestions).then((response) => {
    console.log(response);
    switch (response.option) {
      case "View all departments":
        // ask manager questions
        viewAllDepartments();
        break;

      case "View all roles":
        // ask manager questions
        viewAllRoles();
        break;

      case "View all employees":
        // ask manager questions
        viewAllEmployees();
        break;

      case "Add a department":
        // ask manager questions
        addDepartment();
        break;

      case "Add a role":
        // ask manager questions
        addRole();
        break;

      case "Add an employee":
        // ask manager questions
        addEmployee();
        break;

      case "Update an employee role":
        // ask manager questions
        updateEmployee();
        break;
      case "Quit":
        //quit menu
        break;
    }
  });
};

mainMenu();
