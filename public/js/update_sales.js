
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


function updateRow(data, saleID) {
    console.log("Data received for updateRow:", data);

    let parsedData = JSON.parse(data);
    let formattedDate = formatDate(parsedData[0].saleDate); // Use a separate function for date formatting

    // Find the row in the table to update
    let table = document.getElementById("sales-table");

    for (let i = 0; i < table.rows.length; i++) {
        let row = table.rows[i];
        // Check if this row's salesID matches the one to update
        if (row.getAttribute("data-value") == saleID) {
            // Cells: [0]SalesID, [1]CustomerID, [2]EmployeeID, [3]SaleAmount, [4]SaleDate, [5]SaleTime
            row.cells[1].innerText = parsedData[0].customerID; // Assuming the order of cells matches
            row.cells[2].innerText = parsedData[0].employeeID;
            row.cells[3].innerText = parsedData[0].saleAmount;
            row.cells[4].innerText = formattedDate; // Use the formatted date here
            row.cells[5].innerText = parsedData[0].saleTime; // Optionally format the time
            break; // Stop the loop once the correct row is updated
        }
    }
}

// Helper function to format ISO date string to "YYYY-MM-DD"
function formatDate(isoDateString) {
    let date = new Date(isoDateString);
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2); // Ensure two digits
    let day = ('0' + date.getDate()).slice(-2); // Ensure two digits
    return `${year}-${month}-${day}`;
}
