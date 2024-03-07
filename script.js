// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// store previously entered employees
let prevEmployees = [];

// Collect employee data
const collectEmployees = function () {
  // for validation
  const isValid = {
    first: false,
    last: false,
    salary: false,
  };

  // true if you want to keep adding employees
  let continueAddingEmployee = true;

  // initial false, becomes true once user clicks on cancel on any of the prompts
  let cancelAddEmployee = false;

  // returns user's first name
  function getFirstName() {
    // prevents function from running if user has clicked cancel
    if (cancelAddEmployee) {
      return;
    }

    // loops through until valid response from user
    while (!isValid.first) {
      const newEmployeeFirst = prompt("Please enter the employee's first name");

      // sets cancel prompt and prevents other's from running until add button is clicked again when user clicks cancel
      if (newEmployeeFirst === null) {
        cancelAddEmployee = true;
        return;
      }

      // checks that user typed in the field
      if (!newEmployeeFirst) {
        alert("Please type the employee's first name");
        console.log(newEmployeeFirst.length);
      } else {
        // sets validation to true and returns name
        isValid.first = true;
        return newEmployeeFirst;
      }
    }
  }

  // function to get last name
  function getLastName() {
    // prevent code from running after cancel
    if (cancelAddEmployee) {
      return;
    }

    // loop through until valid
    while (!isValid.last) {
      const newEmployeeLast = prompt("Please enter the employee's last name");

      // set cancel to true to prevent other prompts from running
      if (newEmployeeLast === null) {
        cancelAddEmployee = true;
        return;
      }

      // checks that user typed in the field
      if (!newEmployeeLast) {
        alert("Please type the employee's last name");
      } else {
        //sets validation to true and returns name
        isValid.last = true;
        return newEmployeeLast;
      }
    }
  }

  function getSalary() {
    if (cancelAddEmployee) {
      return;
    }

    while (!isValid.salary) {
      const newEmployeeSalary = Number(
        prompt("Please enter the employee's salary")
      );

      if (newEmployeeSalary === null) {
        cancelAddEmployee = true;
        return;
      }

      // alerts if validation fails
      if (!newEmployeeSalary) {
        alert('Please enter a number for the salary');
      } else {
        // sets validation to true and returns salary
        isValid.salary = true;
        return newEmployeeSalary;
      }
    }
  }

  // resets all validation to false after user adds one employee
  function resetValidation() {
    isValid.first = false;
    isValid.last = false;
    isValid.salary = false;
  }

  // confirmation after a single loop to see if user wants to continue adding employees
  function shouldContinueAdding() {
    // prevents confirmation from running when cancel is true
    if (cancelAddEmployee) {
      return;
    }

    // confirmation
    const addMore = confirm('Do you want to add another employee?');
    if (addMore === false) {
      // sets continue adding employee condition to false
      continueAddingEmployee = false;
    }
  }

  // function that calls all other prompt functions
  function getData() {
    // init previous employees
    const employees = prevEmployees;

    // loops through other data getting functions to allow for multiple employees to be added together
    while (continueAddingEmployee) {
      // prevents loop from running if cancel employee conditional is true
      if (cancelAddEmployee) {
        break;
      }

      // calls the functions, stores the data in variables
      const firstName = getFirstName();
      const lastName = getLastName();
      const salary = getSalary();

      // assign variables to key-value pair in an object
      const newEmployee = {
        firstName,
        lastName,
        salary,
      };

      // push object to employees array
      employees.push(newEmployee);

      // resets all validation to false
      resetValidation();

      // asks the user if they want to add additional employees
      shouldContinueAdding();
    }
    prevEmployees = employees;
    return employees;
  }

  // returns the employees array to be displayed on the page
  return getData();
};

// Display the average salary
const displayAverageSalary = function (employeesArray) {
  // Calculate and display the average salary
  let totalSalary = 0;
  employeesArray.forEach((employee) => {
    // adds all salaries together
    totalSalary = totalSalary + employee.salary;
  });
  const length = employeesArray.length;

  // gets average salary
  const average = totalSalary / length;

  // console logs for acceptance criteria
  console.log(`The average salary among the employees is $${average}`);
  console.log(`Your company has ${length} employees`);
};

// Select a random employee
const getRandomEmployee = function (employeesArray) {
  // Select and display a random employee
  const employeeLength = employeesArray.length;

  // gets a random number between 0 and length of employees array
  function getRandomindex(length) {
    return Math.floor(Math.random() * length);
  }
  const randomEmployee =
    employeesArray[getRandomindex(employeeLength)].firstName;

  // console log random employee for acceptance criteria
  console.log(randomEmployee);
};

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement('tr');

    const firstNameCell = document.createElement('td');
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement('td');
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement('td');
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
};

const trackEmployeeData = function () {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
};

// Add event listener to 'Add Employees' button
// added a line down here to reset the cancelAddEmployee variable
addEmployeesBtn.addEventListener('click', trackEmployeeData);
