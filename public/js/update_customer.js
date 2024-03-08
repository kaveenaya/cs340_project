
// Get the objects we need to modify
let updatecustomerForm = document.getElementById('update-customer-form');

// Modify the objects we need
updatecustomerForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputcustomerID = document.getElementById("update-customer-id");
    let inputcustomerName = document.getElementById("update-customer-name");
    let inputcustomerphone = document.getElementById("update-customer-phone");
    let inputcustomerDOP = document.getElementById("update-customer-DOP");


    // Get the values from the form fields
    let customerIDValue = inputcustomerID.value;
    let customerNameValue = inputcustomerName.value;
    let customerphoneValue = inputcustomerphone.value;
    let customerDOPValue = inputcustomerDOP.value;

    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(customerIDValue))
    {
        return;
    }
    if (customerNameValue == "")
    {
        return;
    }
    if (customerphoneValue == "")
    {
        return;
    }
    if (customerDOPValue == "")
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        customerID: customerIDValue,
        customerName: customerNameValue,
        customerPhone: customerphoneValue,
        customerDateOfPurchase: customerDOPValue,

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
            inputcustomerName.value = "";
            inputcustomerphone.value = "";
            inputcustomerDOP.value = "";

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

            //get td of customer name
            let customerNameTD = updateRowIndex.getElementsByTagName("td")[1];
            //get td of customer phone 
            let customerphoneTD = updateRowIndex.getElementsByTagName("td")[2];
            //get td of customer DOP
            let customerDOPTD = updateRowIndex.getElementsByTagName("td")[3];

            //reassign the values of the row to the new values
            customerNameTD.innerHTML = parsedData[0].customerName;
            customerphoneTD.innerHTML = parsedData[0].customerPhone;
            customerDOPTD.innerHTML = parsedData[0].customerDateOfPurchase;

        }
    }
}
