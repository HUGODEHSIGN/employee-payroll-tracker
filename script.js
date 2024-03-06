// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// store previously entered employees
let prevEmployees = [];

// Collect employee data
const collectEmployees = function () {
  // TODO: Get user input to create and return an array of employee objects

  // for validation
  const isValid = {
    first: false,
    last: false,
    salary: false,
  };

  let continueAddingEmployee = true;
  let cancelAddEmployee = false;

  console.log('test');
  function getFirstName() {
    if (cancelAddEmployee) {
      return;
    }

    while (!isValid.first) {
      const newEmployeeFirst = prompt("Please enter the employee's first name");
      if (newEmployeeFirst === null) {
        cancelAddEmployee = true;
        return;
      }

      // checks that user typed in the field
      if (!newEmployeeFirst) {
        alert("Please type the employee's first name");
        console.log(newEmployeeFirst.length);
      } else {
        isValid.first = true;
        return newEmployeeFirst;
      }
    }
  }

  function getLastName() {
    if (cancelAddEmployee) {
      return;
    }

    while (!isValid.last) {
      const newEmployeeLast = prompt("Please enter the employee's last name");

      if (newEmployeeLast === null) {
        cancelAddEmployee = true;
        return;
      }

      // checks that user typed in the field
      if (!newEmployeeLast) {
        alert("Please type the employee's last name");
      } else {
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

      if (!newEmployeeSalary) {
        alert('Please enter a number for the salary');
      } else {
        isValid.salary = true;
        return newEmployeeSalary;
      }
    }
  }

  function resetValidation() {
    isValid.first = false;
    isValid.last = false;
    isValid.salary = false;
  }

  function shouldContinueAdding() {
    if (cancelAddEmployee) {
      return;
    }

    const addMore = confirm('Do you want to add another employee?');
    if (addMore === false) {
      continueAddingEmployee = false;
    }
  }

  function getData() {
    const employees = prevEmployees;
    while (continueAddingEmployee) {
      if (cancelAddEmployee) {
        break;
      }
      const firstName = getFirstName();
      const lastName = getLastName();
      const salary = getSalary();

      const newEmployee = {
        firstName,
        lastName,
        salary,
      };

      employees.push(newEmployee);

      resetValidation();
      shouldContinueAdding();
    }
    prevEmployees = employees;
    return employees;
  }
  return getData();
};

// Display the average salary
const displayAverageSalary = function (employeesArray) {
  // TODO: Calculate and display the average salary
};

// Select a random employee
const getRandomEmployee = function (employeesArray) {
  // TODO: Select and display a random employee
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
