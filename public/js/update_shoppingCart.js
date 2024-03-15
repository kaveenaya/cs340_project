
// Get the objects we need to modify
let updateInstrumentForm = document.getElementById('update-shoppingcart-form');

// Modify the objects we need
updateInstrumentForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputshoppingCartID = document.getElementById("update-shoppingcart-id");
    let inputSCSalesID = document.getElementById("update-shoppingcart-sales-id");
    let inputSCSongID = document.getElementById("update-shoppingcart-song-id");
    let inputSCInstrumentID = document.getElementById("update-shoppingcart-instrument-id");
    let inputSCSongQuantity = document.getElementById("update-shoppingcart-song-quantity");
    let inputSCInstrumentQuantity = document.getElementById("update-shoppingcart-instrument-quantity");
    let inputSCTotalPrice = document.getElementById("update-shoppingcart-item-total-price");

    // Get the values from the form fields
    let shoppingCartIDValue = inputshoppingCartID.value;
    let scSalesIDValue = inputSCSalesID.value;
    let scSongIDValue = inputSCSongID.value;
    let scInstrumentIDValue = inputSCInstrumentID.value;
    let scSongQuantityValue = inputSCSongQuantity.value;
    let scInstrumentQuantityValue = inputSCInstrumentQuantity.value;
    let scTotalPriceValue = inputSCTotalPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        shoppingCartID: shoppingCartIDValue,
        salesID: scSalesIDValue,
        songID: scSongIDValue,
        instrumentID: scInstrumentIDValue,
        songQuantity: scSongQuantityValue,
        instrumentQuantity: scInstrumentQuantityValue,
        itemTotalPrice: scTotalPriceValue

    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-shopping-cart-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, instrumentIDValue);

            // Clear the form
            inputshoppingCartID.value = '';
            inputSCSalesID.value = '';
            inputSCSongID.value = '';
            inputSCInstrumentID.value = '';
            inputSCSongQuantity.value = '';
            inputSCInstrumentQuantity.value = '';   
            inputSCTotalPrice.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, shoppingCartID){
    let parsedData = JSON.parse(data);
    
    // Get the table we want to update
    let table = document.getElementById("shoppingCart-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows and update the one that matches the shoppingCartIDValue
        if(table.rows[i].getAttribute("data-value") == shoppingCartID){
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            //get td of salesID
            let salesIDTD = updateRowIndex.getElementsByTagName("td")[1];

            //get td of songID
            let songIDTD = updateRowIndex.getElementsByTagName("td")[2];

            //get td of instrumentID
            let instrumentIDTD = updateRowIndex.getElementsByTagName("td")[3];

            //get td of songQuantity
            let songQuantityTD = updateRowIndex.getElementsByTagName("td")[4];

            //get td of instrumentQuantity
            let instrumentQuantityTD = updateRowIndex.getElementsByTagName("td")[5];

            //get td of itemTotalPrice
            let itemTotalPriceTD = updateRowIndex.getElementsByTagName("td")[6];

            //reassign the values of the row to the new values
            salesIDTD.innerHTML = parsedData[0].salesID;
            songIDTD.innerHTML = parsedData[0].songID;
            instrumentIDTD.innerHTML = parsedData[0].instrumentID;
            songQuantityTD.innerHTML = parsedData[0].songQuantity;
            instrumentQuantityTD.innerHTML = parsedData[0].instrumentQuantity;
            itemTotalPriceTD.innerHTML = parsedData[0].itemTotalPrice;
        }
    }
}
