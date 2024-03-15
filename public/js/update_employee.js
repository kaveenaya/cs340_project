// Citation for file update_employee.js
// Date: 02/23/2024
// The ciation scope was for the whole module
// The code was adapted from the github starter code 
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

// Get the objects we need to modify
let updateemployeeForm = document.getElementById('update-employee-form');

/**
 * This function handles form submission for updating employee information via AJAX.
 * param {Event} e - The event object.
 */
// Modify the objects we need
updateemployeeForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputemployeeID = document.getElementById("update-employee-id");
    let inputemployeeFName = document.getElementById("update-employee-fname");
    let inputemployeeLName = document.getElementById("update-employee-lname");
    let inputemployeePhone = document.getElementById("update-employee-phone");
    let inputemployeeEmail = document.getElementById("update-employee-email");


    // Get the values from the form fields
    let employeeIDValue = inputemployeeID.value;
    let employeeFNameValue = inputemployeeFName.value;
    let employeeLNameValue = inputemployeeLName.value;
    let employeePhoneValue = inputemployeePhone.value;
    let employeeEmailValue = inputemployeeEmail.value;

    if (isNaN(employeeIDValue))
    {
        return;
    }
    if (employeeFNameValue == "")
    {
        return;
    }
    if (employeeLNameValue == "")
    {
        return;
    }
    if (employeePhoneValue == "")
    {
        return;
    }
    if (employeeEmailValue == "")
    {
        return;
    }
    // Put our data we want to send in a javascript object
    let data = {
        employeeID: employeeIDValue,
        employeeFName: employeeFNameValue,
        employeeLName: employeeLNameValue,
        employeePhone: employeePhoneValue,
        employeeEmail: employeeEmailValue

    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-employee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, employeeIDValue);

            // Clear the form
            inputemployeeID.value = "";
            inputemployeeFName.value = "";
            inputemployeeLName.value = "";
            inputemployeePhone.value = "";
            inputemployeeEmail.value = "";
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    console.log("Data to be sent:", JSON.stringify(data));
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

/**
 * This function updates a row in the employees table with new data received from the server.
 * param {string} data - The JSON string representing the updated employee data.
 * param {string} employeeID - The ID of the employee to be updated.
 */

function updateRow(data, employeeID){
    console.log("Data received for updateRow:", data);

    let parsedData = JSON.parse(data);
    console.log("Parsed data:", parsedData);

    // Get the table we want to update
    let table = document.getElementById("employees-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows and update the one that matches the employeeID
        if(table.rows[i].getAttribute("data-value") == employeeID){
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            //get td of employee name
            let employeeFNameTD = updateRowIndex.getElementsByTagName("td")[1];
            let employeeLNameTD = updateRowIndex.getElementsByTagName("td")[2];
            let employeePhoneTD = updateRowIndex.getElementsByTagName("td")[3];
            let employeeEmailTD = updateRowIndex.getElementsByTagName("td")[4];

            //reassign the values of the row to the new values
            employeeFNameTD.innerHTML = parsedData[0].employeeFname;
            employeeLNameTD.innerHTML = parsedData[0].employeeLname;
            employeePhoneTD.innerHTML = parsedData[0].employeePhone;
            employeeEmailTD.innerHTML = parsedData[0].employeeEmail;
        }
    }
}
