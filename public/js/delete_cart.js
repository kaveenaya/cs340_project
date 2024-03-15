// Citation for file delete_cart.js
// Date: 02/23/2024
// The ciation scope was for the whole module
// The code was adapted from the github starter code 
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

/**
 * This function deletes a shopping cart entry via AJAX.
 * param {string} shoppingCartID - The ID of the shopping cart entry to delete.
 */
function deleteShoppingCart(shoppingCartID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: shoppingCartID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-shoppingcart-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(shoppingCartID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

/**
 * Deletes a row from the shopping cart table based on the provided shopping cart ID.
 * param {string} shoppingCartID - The ID of the shopping cart entry to delete.
 */
function deleteRow(shoppingCartID){

    let table = document.getElementById("shoppingCart-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == shoppingCartID) {
            table.deleteRow(i);
            break;
       }
    }
}
