// Citation for file add_instrumnet.js
// Date: 02/23/2024
// The ciation scope was for the whole module
// The code was adapted from the github starter code 
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main


// Get the objects we need to modify
let addInstrumentForm = document.getElementById('add-instrument-form-ajax');

/**
 * This Function is to handle form submission for adding a new instrument via AJAX.
 * param {Event} e - The event object.
 */
// Modify the objects we need
addInstrumentForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputInstrumentName = document.getElementById("input-name");
    let inputInstrumentColor = document.getElementById("input-color");
    let inputInstrumentMaterial = document.getElementById("input-material");
    let inputInstrumentSize = document.getElementById("input-size");
    let inputInstrumentYear = document.getElementById("input-year");
    let inputInstrumentPrice = document.getElementById("input-price");

    // Get the values from the form fields
    let instrumentNameValue = inputInstrumentName.value;
    let instrumentColorValue = inputInstrumentColor.value;
    let instrumentMaterialValue = inputInstrumentMaterial.value;
    let instrumentSizeValue = inputInstrumentSize.value;
    let instrumentYearValue = inputInstrumentYear.value;
    let instrumentPriceValue = inputInstrumentPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        instrumentName: instrumentNameValue,
        instrumentColor: instrumentColorValue,
        instrumentMaterial: instrumentMaterialValue,
        instrumentSize: instrumentSizeValue,
        instrumentYear: instrumentYearValue,
        instrumentPrice: instrumentPriceValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-instrument-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputInstrumentName.value = '';
            inputInstrumentColor.value = '';
            inputInstrumentMaterial.value = '';
            inputInstrumentSize.value = '';
            inputInstrumentYear.value = '';
            inputInstrumentPrice.value = '';
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
    let currentTable = document.getElementById("instruments-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let instrumentIDCell = document.createElement("TD");
    let instrumentNameCell = document.createElement("TD");
    let instrumentColorCell = document.createElement("TD");
    let instrumentMaterialCell = document.createElement("TD");
    let instrumentSizeCell = document.createElement("TD");
    let instrumentYearCell = document.createElement("TD");
    let instrumentPriceCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
  
    // Fill the cells with correct data
    instrumentIDCell.innerText = newRow.instrumentID;
    instrumentNameCell.innerText = newRow.instrumentName;
    instrumentColorCell.innerText = newRow.instrumentColor;
    instrumentMaterialCell.innerText = newRow.instrumentMaterial;
    instrumentSizeCell.innerText = newRow.instrumentSize;
    instrumentYearCell.innerText = newRow.instrumentYear;
    instrumentPriceCell.innerText = newRow.instrumentPrice;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteInstrument(newRow.instrumentID);
    };


      // Add the cells to the row 
      row.appendChild(instrumentIDCell);
      row.appendChild(instrumentNameCell);
      row.appendChild(instrumentColorCell);
      row.appendChild(instrumentMaterialCell);
      row.appendChild(instrumentSizeCell);
      row.appendChild(instrumentYearCell);
      row.appendChild(instrumentPriceCell);
      row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.instrumentID);

    // Add the row to the table
    currentTable.appendChild(row);

    let selectID = document.getElementById("input-instrument-ajax");
    let option = document.createElement("option");
    option.text = newRow.instrumentName;
    option.value = newRow.instrumentID;
    selectID.add(option);
}