
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
    xhttp.open("PUT", "/update-instrument-ajax", true);
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


function updateRow(data, instrumentID){
    let parsedData = JSON.parse(data);
    
    // Get the table we want to update
    let table = document.getElementById("instruments-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows and update the one that matches the instrumentID
        if(table.rows[i].getAttribute("data-value") == instrumentID){
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            //get td of instrument name
            let instrumentNameTD = updateRowIndex.getElementsByTagName("td")[1];

            //get td of instrument color
            let instrumentColorTD = updateRowIndex.getElementsByTagName("td")[2];

            //get td of instrument Material
            let instrumentMaterialTD = updateRowIndex.getElementsByTagName("td")[3];

            //get td of instrument size
            let instrumentSizeTD = updateRowIndex.getElementsByTagName("td")[4];

            //get td of instrument year
            let instrumentYearTD = updateRowIndex.getElementsByTagName("td")[5];

            //get td of instrument price
            let instrumentPriceTD = updateRowIndex.getElementsByTagName("td")[6];

            //reassign the values of the row to the new values
            instrumentNameTD.innerHTML = parsedData[0].instrumentName;
            instrumentColorTD.innerHTML = parsedData[0].instrumentColor;
            instrumentMaterialTD.innerHTML = parsedData[0].instrumentMaterial;
            instrumentSizeTD.innerHTML = parsedData[0].instrumentSize;
            instrumentYearTD.innerHTML = parsedData[0].instrumentYear;
            instrumentPriceTD.innerHTML = parsedData[0].instrumentPrice;

        }
    }
}
