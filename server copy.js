const inquirer = require("inquirer");
const express = require("express");
// Import and require mysql2
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database.  use .promise() so that we can use await on connection
const db = mysql
  .createConnection({
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "1@am9881NE*",
    database: "business_db",
  })
  .promise();
console.log(`Connected to the business_db database.`);

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

const addRoleQuestions = [
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
    choices: await deptChoices(),
    when(department_id) {
      return department_id;
    },
  },
];

// const engineerQuestions = [
//   {
//     type: "input",
//     message: "Enter the engineer's name: ",
//     name: "engineerName",
//   },

//   {
//     type: "input",
//     message: "Enter the engineer's employee ID: ",
//     name: "engineerEmployeeID",
//   },
//   {
//     type: "input",
//     message: "Enter the engineer's email address: ",
//     name: "engineerEmail",
//   },
//   {
//     type: "input",
//     message: "Enter the engineer's github name: ",
//     name: "engineerGithub",
//   },
// ];

// const internQuestions = [
//   {
//     type: "input",
//     message: "Enter the intern's name: ",
//     name: "internName",
//   },

//   {
//     type: "input",
//     message: "Enter the intern's employee ID: ",
//     name: "internEmployeeID",
//   },
//   {
//     type: "input",
//     message: "Enter the intern's email address: ",
//     name: "internEmail",
//   },
//   {
//     type: "input",
//     message: "Enter the intern's school name: ",
//     name: "internSchoolName",
//   },
// ];

const viewAllDepartments = async () => {
  // Query database
  const dept = await db.query(
    "SELECT id, dept_name FROM department",
    function (err, results) {
      console.table(results);
    }
  );

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
        console.table(results);
      }
    );
    // display the main menu
    mainMenu();
  });
};

// Query database to select all departments for a new role

const deptChoices = async () => {
  const allDepartments = await db.query("SELECT id, dept_name FROM department");
};

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

// const addRoleQuestions = () => {
//   inquirer.prompt(engineerQuestions).then((response) => {

//     const engineer = new Engineer(
//       response.engineerEmployeeID,
//       response.engineerName,
//       response.engineerEmail,
//       response.engineerGithub
//     );

//     engineers.push(engineer);

//     mainMenu();
//   });
// };

// const addEmployeeQuestions = () => {
//   inquirer.prompt(internQuestions).then((response) => {

//     const intern = new Intern(
//       response.internEmployeeID,
//       response.internName,
//       response.internEmail,
//       response.internSchoolName
//     );

//     interns.push(intern);

//     mainMenu();
//   });
// };

// const updateEmployeeRoleQuestions = () => {
//   inquirer.prompt(internQuestions).then((response) => {

//     const intern = new Intern(
//       response.internEmployeeID,
//       response.internName,
//       response.internEmail,
//       response.internSchoolName
//     );

//     interns.push(intern);

//     mainMenu();
//   });
// };

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
        addRoleQuestions();
        break;

      case "Add an employee":
        // ask manager questions
        addEmployeeQuestions();
        break;

      case "Update an employee role":
        // ask manager questions
        updateEmployeeRoleQuestions();
        break;
      case "Quit":
        //quit menu
        break;
    }
  });
};

mainMenu();
