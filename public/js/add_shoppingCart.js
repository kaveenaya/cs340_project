// Get the objects we need to modify
let addShoppingCartForm = document.getElementById('add-shoppingCart-form-ajax');

// Modify the objects we need
addShoppingCartForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputShoppingCartId = document.getElementById("input-cartId");
    let inputSaleId = document.getElementById("input-saleId");
    let inputType = document.getElementById("input-type");
    let inputItemId = document.getElementById("input-itemId");
    let inputQuantity = document.getElementById("input-quantity");
    let inputPrice = document.getElementById("input-price");
    let inputTotalPrice = document.getElementById("input-totalPrice");

    // Get the values from the form fields
    let cartIDValue = inputShoppingCartId.value;
    let cartSaleIDValue = inputSaleId.value;
    let cartTypeValue = inputType.value;
    let cartItemIDValue = inputItemId.value;
    let cartQuantityValue = inputQuantity.value;
    let cartPriceValue = inputPrice.value;
    let cartTotalPriceValue = inputTotalPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        shoppingCartID: cartIDValue,
        salesID: cartSaleIDValue,
        itemType: cartTypeValue,
        itemID: cartItemIDValue,
        itemQuantity: cartQuantityValue,
        itemPrice: cartPriceValue,
        itemTotalPrice: cartTotalPriceValue,
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
            inputShoppingCartId.value = '';
            inputSaleId.value = '';
            inputType.value = '';
            inputItemId.value = '';
            inputQuantity.value = '';
            inputPrice.value = '';
            inputTotalPrice.value = '';
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
    let currentTable = document.getElementById("shoppingCart-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let saleIDCell = document.createElement("TD");
    let cartTypeCell = document.createElement("TD");
    let itemIdCell = document.createElement("TD");
    let quantityCell = document.createElement("TD");
    let cartPriceCell = document.createElement("TD");
    let totalPriceCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
  
    // Fill the cells with correct data
    saleIDCell.innerText = newRow.salesID;
    cartTypeCell.innerText = newRow.itemType;
    itemIdCell.innerText = newRow.itemID;
    quantityCell.innerText = newRow.itemQuantity;
    cartPriceCell.innerText = newRow.itemPrice;
    totalPriceCell.innerText = newRow.itemTotalPrice;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteShoppingCart(newRow.id);
    };


      // Add the cells to the row 
      row.appendChild(saleIDCell);
      row.appendChild(cartTypeCell);
      row.appendChild(itemIdCell);
      row.appendChild(quantityCell);
      row.appendChild(cartPriceCell);
      row.appendChild(totalPriceCell);
      row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.id);

    // Add the row to the table
    currentTable.appendChild(row);

    let selectID = document.getElementById("input-shoppingCart-ajax");
    let option = document.createElement("option");
    //option.text = newRow.salesID;
    option.value = newRow.shoppingCartID;
    selectID.add(option);
}