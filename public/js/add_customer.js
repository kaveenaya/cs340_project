// Citation for file add_customer.js
// Date: 02/23/2024
// The code was adapted from the github starter code 
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

// Get the objects we need to modify
let addCustomerForm = document.getElementById('add-customer-form-ajax');

/**
 * This Function is to handle form submission for adding a new customer via AJAX.
 * param {Event} e - The event object.
 */
// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomerFName = document.getElementById("input-fname");
    let inputCustomerLName = document.getElementById("input-lname");
    let inputCustomerPhone = document.getElementById("input-phone");
    let inputCustomerEmail = document.getElementById("input-email");

    // Get the values from the form fields
    let customerFNameValue = inputCustomerFName.value;
    let customerLNameValue = inputCustomerLName.value;
    let customerPhoneValue = inputCustomerPhone.value;
    let customerEmailValue = inputCustomerEmail.value;


    // Put our data we want to send in a javascript object
    let data = {
        customerFName: customerFNameValue,
        customerLName: customerLNameValue,
        customerPhone: customerPhoneValue,
        customerEmail: customerEmailValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputCustomerFName.value = '';
            inputCustomerLName.value = '';
            inputCustomerPhone.value = '';
            inputCustomerEmail.value = '';
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
    let currentTable = document.getElementById("customers-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let customerIDCell = document.createElement("TD");
    let customerFNameCell = document.createElement("TD");
    let customerLNameCell = document.createElement("TD");
    let customerPhoneCell = document.createElement("TD");
    let customerEmailCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
  
    // Fill the cells with correct data
    customerIDCell.innerText = newRow.customerID;
    customerFNameCell.innerText = newRow.customerFName;
    customerLNameCell.innerText = newRow.customerLName;
    customerPhoneCell.innerText = newRow.customerPhone;
    customerEmailCell.innerText = newRow.customerEmail;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteCustomer(newRow.customerID);
    };


      // Add the cells to the row 
      row.appendChild(customerIDCell);
      row.appendChild(customerFNameCell);
      row.appendChild(customerLNameCell);
      row.appendChild(customerPhoneCell);
      row.appendChild(customerEmailCell);
      row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.customerID);

    // Add the row to the table
    currentTable.appendChild(row);

    let selectID = document.getElementById("input-customer-ajax");
    let option = document.createElement("option");
    option.value = newRow.customerID;
    selectID.add(option);
}