
// Get the objects we need to modify
let updateemployeeForm = document.getElementById('update-employee-form');

// Modify the objects we need
updateemployeeForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputemployeeID = document.getElementById("update-employee-id");
    let inputemployeeName = document.getElementById("update-employee-name");


    // Get the values from the form fields
    let employeeIDValue = inputemployeeID.value;
    let employeeNameValue = inputemployeeName.value;

    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(employeeIDValue))
    {
        return;
    }
    if (employeeNameValue == "")
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        employeeID: employeeIDValue,
        name: employeeNameValue

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
            inputemployeeName.value = "";

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    console.log("Data to be sent:", JSON.stringify(data));
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


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
            let employeeNameTD = updateRowIndex.getElementsByTagName("td")[1];

            //reassign the values of the row to the new values
            employeeNameTD.innerHTML = parsedData[0].name;

        }
    }
}
