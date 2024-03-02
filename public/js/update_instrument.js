// Get the objects we need to modify
let updateInstrumentForm = document.getElementById('update-instrument-form');

// Modify the objects we need
updateInstrumentForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputInstrument = document.getElementById("input-instrument");
    let inputInstrumentName = document.getElementById("input-instrument-name");
    let inputInstrumentColor = document.getElementById("input-instrument-color");
    let inputInstrumentMaterial = document.getElementById("input-instrument-material");
    let inputInstrumentSize = document.getElementById("input-instrument-size");
    let inputInstrumentYear = document.getElementById("input-instrument-year");
    let inputInstrumentPrice = document.getElementById("input-instrument-price");

    // Get the values from the form fields
    let instrumentID = inputInstrument.value;
    let instrumentName = inputInstrumentName.value;
    let instrumentColor = inputInstrumentColor.value;
    let instrumentMaterial = inputInstrumentMaterial.value;
    let instrumentSize = inputInstrumentSize.value;
    let instrumentYear = inputInstrumentYear.value;
    let instrumentPrice = inputInstrumentPrice.value;

    // Put our data we want to send in a JavaScript object
    let data = {
        id: instrumentID,
        name: instrumentName,
        color: instrumentColor,
        material: instrumentMaterial,
        size: instrumentSize,
        year: instrumentYear,
        price: instrumentPrice
    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-instrument-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the form
            updateForm(data);
            console.log("Instrument updated successfully!");
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

function updateForm(data) {
    // Populate form fields with updated data
    document.getElementById("input-instrument-name").value = data.name;
    document.getElementById("input-instrument-color").value = data.color;
    document.getElementById("input-instrument-material").value = data.material;
    document.getElementById("input-instrument-size").value = data.size;
    document.getElementById("input-instrument-year").value = data.year;
    document.getElementById("input-instrument-price").value = data.price;
}
