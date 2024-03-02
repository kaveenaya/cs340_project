
// Get the objects we need to modify
let updateInstrumentForm = document.getElementById('update-instrument-form');

// Modify the objects we need
updateInstrumentForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputInstrumentID = document.getElementById("input-instrument-ajax");

    // Get the values from the form fields
    let instrumentIDValue = inputInstrumentID.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(instrumentIDValue)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        instrumentID: instrumentIDValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/update-instrument-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, instrumentIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, personID){
    let parsedData = JSON.parse(data);
    
    // Get the table we want to update
    let table = document.getElementById("instruments-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        if (row.cells[0].innerHTML == personID) {
            row.cells[1].innerHTML = parsedData[0].instrumentName;
            row.cells[2].innerHTML = parsedData[0].instrumentColor;
            row.cells[3].innerHTML = parsedData[0].instrumentMaterial;
            row.cells[4].innerHTML = parsedData[0].instrumentSize;
            row.cells[5].innerHTML = parsedData[0].instrumentYear;
            row.cells[6].innerHTML = parsedData[0].instrumentPrice;
        }
    }
}
