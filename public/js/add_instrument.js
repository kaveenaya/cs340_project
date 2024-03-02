// Get the objects we need to modify
let addInstrumentForm = document.getElementById('add-instrument-form-ajax');

// Modify the objects we need
addInstrumentForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputInstrumentID = document.getElementById("input-id");
    let inputInstrumentName = document.getElementById("input-name");
    let inputInstrumentColor = document.getElementById("input-color");
    let inputInstrumentMaterial = document.getElementById("input-material");
    let inputInstrumentSize = document.getElementById("input-size");
    let inputInstrumentYear = document.getElementById("input-year");
    let inputInstrumentPrice = document.getElementById("input-price");

    // Get the values from the form fields
    let instrumentIDValue = inputInstrumentID.value;
    let instrumentNameValue = inputInstrumentName.value;
    let instrumentColorValue = inputInstrumentColor.value;
    let instrumentMaterialValue = inputInstrumentMaterial.value;
    let instrumentSizeValue = inputInstrumentSize.value;
    let instrumentYearValue = inputInstrumentYear.value;
    let instrumentPriceValue = inputInstrumentPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        instrumentID: instrumentIDValue,
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
            inputInstrumentID.value = '';
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


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("people-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let homeworldCell = document.createElement("TD");
    let ageCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.id;
    firstNameCell.innerText = newRow.fname;
    lastNameCell.innerText = newRow.lname;
    homeworldCell.innerText = newRow.homeworld;
    ageCell.innerText = newRow.age;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deletePerson(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(homeworldCell);
    row.appendChild(ageCell);
    row.appendChild(deleteCell);
    
    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.id);

    // Add the row to the table
    currentTable.appendChild(row);
}





// Creates a single row from an Object representing a single record from
// bsg_people
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
    let instrumentNameCell = document.createElement("TD");
    let instrumentColorCell = document.createElement("TD");
    let instrumentMaterialCell = document.createElement("TD");
    let instrumentSizeCell = document.createElement("TD");
    let instrumentYearCell = document.createElement("TD");
    let instrumentPriceCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
  
    // Fill the cells with correct data
    instrumentNameCell.innerText = newRow.instrumentName;
    instrumentColorCell.innerText = newRow.instrumentColor;
    instrumentMaterialCell.innerText = newRow.instrumentMaterial;
    instrumentSizeCell.innerText = newRow.instrumentSize;
    instrumentYearCell.innerText = newRow.instrumentYear;
    instrumentPriceCell.innerText = newRow.instrumentPrice;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deletePerson(newRow.id);
    };


      // Add the cells to the row 
      row.appendChild(instrumentNameCell);
      row.appendChild(instrumentColorCell);
      row.appendChild(instrumentMaterialCell);
      row.appendChild(instrumentSizeCell);
      row.appendChild(instrumentYearCell);
      row.appendChild(instrumentPriceCell);
      row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.id);

    // Add the row to the table
    currentTable.appendChild(row);

    let selectID = document.getElementById("input-instrument-ajax");
    let option = document.createElement("option");
    option.text = newRow.instrumentName;
    option.value = newRow.instrumentID;
    selectID.add(option);
}