
// Get the objects we need to modify
let updateInstrumentForm = document.getElementById('update-sale-form');

// Modify the objects we need
updateInstrumentForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputsaleID = document.getElementById("update-sale-id");
    let inputSaleCustomerID = document.getElementById("update-sale-customer-id");
    let inputSaleEmployeeID = document.getElementById("update-sale-employee-id");
    let inputSaleAmount = document.getElementById("update-sale-amount");
    let inputSaleDate = document.getElementById("update-sale-date");
    let inputSaleTime = document.getElementById("update-sale-time");

    // Get the values from the form fields 
    let saleIDValue = inputsaleID.value;
    let saleCustomerIDValue = inputSaleCustomerID.value;
    let saleEmployeeIDValue = inputSaleEmployeeID.value;
    let saleAmountValue = inputSaleAmount.value;
    let saleDateValue = inputSaleDate.value;
    let saleTimeValue = inputSaleTime.value;

    // Put our data we want to send in a javascript object
    let data = {
        salesID: saleIDValue,
        customerID: saleCustomerIDValue,
        employeeID: saleEmployeeIDValue,
        saleAmount: saleAmountValue,
        saleDate: saleDateValue,
        saleTime: saleTimeValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-sale-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, saleIDValue);

            // Clear the form
            inputsaleID.value = '';
            inputSaleCustomerID.value = '';
            inputSaleEmployeeID.value = '';
            inputSaleAmount.value = '';
            inputSaleDate.value = '';
            inputSaleTime.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    console.log("Data to be sent:", JSON.stringify(data));

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, saleID){
    console.log("Data received for updateRow:", data);

    let parsedData = JSON.parse(data);
    
    // Get the table we want to update
    let table = document.getElementById("sales-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows and update the one that matches the salesID
        if(table.rows[i].getAttribute("data-value") == saleID){
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            //get td of customerID
            let customerIDTD = updateRowIndex.getElementsByTagName("td")[1];

            //get td of employeeID
            let employeeIDTD = updateRowIndex.getElementsByTagName("td")[2];

            //get td of saleAmount
            let saleAmountTD = updateRowIndex.getElementsByTagName("td")[3];

            //get td of saleDate
            let saleDateTD = updateRowIndex.getElementsByTagName("td")[4];

            //get td of saleTime
            let saleTimeTD = updateRowIndex.getElementsByTagName("td")[5];

            //reassign the values of the row to the new values
            customerIDTD.innerHTML = parsedData[0].customerID;
            employeeIDTD.innerHTML = parsedData[0].employeeID;
            saleAmountTD.innerHTML = parsedData[0].saleAmount;
            saleDateTD.innerHTML = parsedData[0].saleDate;
            saleTimeTD.innerHTML = parsedData[0].saleTime;
        }
    }
}
