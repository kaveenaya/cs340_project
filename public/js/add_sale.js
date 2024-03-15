// Get the objects we need to modify
let addSaleForm = document.getElementById('add-sale-form-ajax');

// Modify the objects we need
addSaleForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomerID = document.getElementById("input-customerid");
    let inputEmployeeID = document.getElementById("input-employeeid");
    let inputSaleAmount = document.getElementById("input-amount");
    let inputSaleDate = document.getElementById("input-date");
    let inputSaleTime = document.getElementById("input-time");


    // Get the values from the form fields
    let customerIDValue = inputCustomerID.value;
    let employeeIDValue = inputEmployeeID.value;
    let saleAmountValue = inputSaleAmount.value;
    let saleDateValue = inputSaleDate.value;
    let saleTimeValue = inputSaleTime.value;

    // Put our data we want to send in a javascript object
    let data = {
        salesID: saleIDValue,
        customerID: customerIDValue,
        employeeID: employeeIDValue,
        saleAmount: saleAmountValue,
        saleDate: saleDateValue,
        saleTime: saleTimeValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-sale-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputCustomerID.value = '';
            inputEmployeeID.value = '';
            inputSaleAmount.value = '';
            inputSaleDate.value = '';
            inputSaleTime.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})



// Creates a single row from an Object representing a single record from
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("sales-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let salesIDCell = document.createElement("TD");
    let customerIDCell = document.createElement("TD");
    let employeeIDCell = document.createElement("TD");
    let saleDateCell = document.createElement("TD");
    let saleTimeCell = document.createElement("TD");
    let saleAmountCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
  
    // Fill the cells with correct data
    salesIDCell.innerText = newRow.salesID;
    customerIDCell.innerText = newRow.customerID;
    employeeIDCell.innerText = newRow.employeeID;
    saleDateCell.innerText = newRow.saleDate;
    saleTimeCell.innerText = newRow.saleTime;
    saleAmountCell.innerText = newRow.saleAmount;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteSale(newRow.salesID);
    };


      // Add the cells to the row 
      row.appendChild(salesIDCell);
      row.appendChild(customerIDCell);
      row.appendChild(employeeIDCell);
      row.appendChild(saleDateCell);
      row.appendChild(saleTimeCell);
      row.appendChild(saleAmountCell);
      row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.salesID);

    // Add the row to the table
    currentTable.appendChild(row);

    let selectID = document.getElementById("input-sale-ajax");
    let option = document.createElement("option");
    //option.text = newRow.customerID;
    option.value = newRow.salesID;
    selectID.add(option);
}
