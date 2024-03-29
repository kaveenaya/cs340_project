// Citation for file add_shoppingCart.js
// Date: 02/23/2024
// The code was adapted from the github starter code 
// The ciation scope was for the whole module
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

// Get the objects we need to modify
let addShoppingCartForm = document.getElementById('add-shoppingCart-form-ajax');

/**
 * This Function is to handle form submission for adding a new shoppingCart via AJAX.
 * param {Event} e - The event object.
 */
// Modify the objects we need
addShoppingCartForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputSaleID = document.getElementById("input-saleid");
    let inputSongID = document.getElementById("input-songid");
    let inputInstrumentID = document.getElementById("input-instrumentid");
    let inputSQuantity = document.getElementById("input-squantity");
    let inputIQuantity = document.getElementById("input-iquantity");
    let inputTotalPrice = document.getElementById("input-totalprice");



    // Get the values from the form fields
    let cartSaleIDValue = inputSaleID.value;
    // Check if 'NULL' was selected and assign null otherwise parse the value
    let cartSongIDValue = inputSongID.value === 'NULL' ? null : parseInt(inputSongID.value);
    let cartInstrumentIDValue = inputInstrumentID.value === 'NULL' ? null : parseInt(inputInstrumentID.value);
    let cartSQuantityValue = inputSQuantity.value;
    let cartIQuantityValue = inputIQuantity.value;
    let cartTotalPriceValue = inputTotalPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        salesID: cartSaleIDValue,
        songID: cartSongIDValue,
        instrumentID: cartInstrumentIDValue,
        songQuantity: cartSQuantityValue,
        instrumentQuantity: cartIQuantityValue,
        inputTotalPrice: cartTotalPriceValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-shoppingCart-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputSaleID.value = '';
            inputSongID.value = '';
            inputInstrumentID.value = '';
            inputSQuantity.value = '';
            inputIQuantity.value = '';
            inputTotalPrice.value = '';
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
    let currentTable = document.getElementById("shoppingCart-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let cartIDCell = document.createElement("TD");
    let saleIDCell = document.createElement("TD");
    let songIDCell = document.createElement("TD");
    let instrumentIDCell = document.createElement("TD");
    let squantityCell = document.createElement("TD");
    let iquantityCell = document.createElement("TD");
    let totalPriceCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
  
    // Fill the cells with correct data
    cartIDCell.innerText = newRow.shoppingCartID;
    saleIDCell.innerText = newRow.salesID;
    songIDCell.innerText = newRow.songID;
    instrumentIDCell.innerText = newRow.instrumentID;
    squantityCell.innerText = newRow.songQuantity;
    iquantityCell.innerText = newRow.instrumentQuantity;
    totalPriceCell.innerText = newRow.itemTotalPrice;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteShoppingCart(newRow.shoppingCartID);
    };


      // Add the cells to the row 
      row.appendChild(cartIDCell);
      row.appendChild(saleIDCell);
      row.appendChild(songIDCell);
      row.appendChild(instrumentIDCell);
      row.appendChild(squantityCell);
      row.appendChild(iquantityCell);
      row.appendChild(totalPriceCell);
      row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.shoppingCartID);

    // Add the row to the table
    currentTable.appendChild(row);

    let selectID = document.getElementById("input-shoppingCart-ajax");
    let option = document.createElement("option");
    //option.text = newRow.salesID;
    option.value = newRow.shoppingCartID;
    selectID.add(option);
}