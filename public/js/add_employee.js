// Citation for file add_employee.js
// Date: 02/23/2024
// The code was adapted from the github starter code 
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main



// Get the objects we need to modify
let addEmployeeForm = document.getElementById('add-employee-form-ajax');

/**
 * This Function is to handle form submission for adding a new customer via AJAX.
 * param {Event} e - The event object.
 */
// Modify the objects we need
addEmployeeForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputEmployeeFName = document.getElementById("input-fname");
    let inputEmployeeLName = document.getElementById("input-lname");
    let inputEmployeePhone = document.getElementById("input-phone");
    let inputEmployeeEmail = document.getElementById("input-email");

    // Get the values from the form fields
    let employeeFNameValue = inputEmployeeFName.value;
    let employeeLNameValue = inputEmployeeLName.value;
    let employeePhoneValue = inputEmployeePhone.value;
    let employeeEmailValue = inputEmployeeEmail.value;


    // Put our data we want to send in a javascript object
    let data = {
        employeeFName: employeeFNameValue,
        employeeLName: employeeLNameValue,
        employeePhone: employeePhoneValue,
        employeeEmail: employeeEmailValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-employee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputEmployeeFName.value = '';
            inputEmployeeLName.value = '';
            inputEmployeePhone.value = '';
            inputEmployeeEmail.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


/**
 * This function is to add a single row to the table based on data received from AJAX response.
 * param {string} data - The JSON string representing data to be added.
 */
// Creates a single row from an Object representing a single record from
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("employees-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let employeeIDCell = document.createElement("TD");
    let employeeFNameCell = document.createElement("TD");
    let employeeLNameCell = document.createElement("TD");
    let employeePhoneCell = document.createElement("TD");
    let employeeEmailCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
  
    // Fill the cells with correct data
    employeeIDCell.innerText = newRow.employeeID;
    employeeFNameCell.innerText = newRow.employeeFName;
    employeeLNameCell.innerText = newRow.employeeLName;
    employeePhoneCell.innerText = newRow.employeePhone;
    employeeEmailCell.innerText = newRow.employeeEmail;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteCustomer(newRow.employeeID);
    };


      // Add the cells to the row 
      row.appendChild(employeeIDCell);
      row.appendChild(employeeFNameCell);
      row.appendChild(employeeLNameCell);
      row.appendChild(employeePhoneCell);
      row.appendChild(employeeEmailCell);
      row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.employeeID);

    // Add the row to the table
    currentTable.appendChild(row);

    let selectID = document.getElementById("input-employee-ajax");
    let option = document.createElement("option");
    //option.text = newRow.employeeName;
    option.value = newRow.employeeID;
    selectID.add(option);
}