
// Get the objects we need to modify
let updatecustomerForm = document.getElementById('update-customer-form');

// Modify the objects we need
updatecustomerForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputcustomerID = document.getElementById("update-customer-id");
    let inputcustomerFName = document.getElementById("update-customer-fname");
    let inputcustomerLName = document.getElementById("update-customer-lname");
    let inputcustomerphone = document.getElementById("update-customer-phone");
    let inputcustomeremail = document.getElementById("update-customer-email");


    // Get the values from the form fields
    let customerIDValue = inputcustomerID.value;
    let customerFNameValue = inputcustomerFName.value;
    let customerLNameValue = inputcustomerLName.value;
    let customerphoneValue = inputcustomerphone.value;
    let customeremailValue = inputcustomeremail.value;

    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(customerIDValue))
    {
        return;
    }
    if (customerFNameValue == "")
    {
        return;
    }
    if (customerLNameValue == "")
    {
        return;
    }
    if (customerphoneValue == "")
    {
        return;
    }
    if (customeremailValue == "")
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        customerID: customerIDValue,
        customerFname: customerFNameValue,
        customerLname: customerLNameValue,
        customerPhone: customerphoneValue,
        customerEmail: customeremailValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, customerIDValue);

            // Clear the form
            inputcustomerID.value = "";
            inputcustomerFName.value = "";
            inputcustomerLName.value = "";
            inputcustomerphone.value = "";
            inputcustomeremail.value = "";

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    console.log("Data to be sent:", JSON.stringify(data));
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, customerID){
    console.log("Data received for updateRow:", data);

    let parsedData = JSON.parse(data);
    console.log("Parsed data:", parsedData);

    // Get the table we want to update
    let table = document.getElementById("customers-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows and update the one that matches the customerID
        if(table.rows[i].getAttribute("data-value") == customerID){
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            //get td of customer first name'
            let customerFNameTD = updateRowIndex.getElementsByTagName("td")[1];
            //get td of customer last name
            let customerLNameTD = updateRowIndex.getElementsByTagName("td")[2];
            //get td of customer phone 
            let customerphoneTD = updateRowIndex.getElementsByTagName("td")[3];
            // get the td of customer email
            let customeremailTD = updateRowIndex.getElementsByTagName("td")[4];

            //reassign the values of the row to the new values
            customerFNameTD.innerHTML = parsedData[0].customerFname;
            customerLNameTD.innerHTML = parsedData[0].customerLname;
            customerphoneTD.innerHTML = parsedData[0].customerPhone;
            customeremailTD.innerHTML = parsedData[0].customerEmail;


        }
    }
}
