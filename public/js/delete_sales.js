// Citation for file delete_sale.js
// Date: 02/23/2024
// The ciation scope was for the whole module
// The code was adapted from the github starter code 
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
/**
 * This function deletes a sales entry via AJAX.
 * param {string} salesID - The ID of the sales entry to delete.
 */
function deleteSale(salesID) {
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", `/delete-sales-ajax/${salesID}`, true);

        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4) {
                if (xhttp.status == 204) {
                    deleteRow(salesID);
                } else {
                    console.log("There was an error with the input.");
                }
            }
        }
        xhttp.send();
    }

 /**
 * This function deletes a row from the sales table based on the provided sales ID.
 * param {string} salesID - The ID of the sales entry to delete.
 */
function deleteRow(salesID) {
        let table = document.getElementById("sales-table");
        for (let i = 0; i < table.rows.length; i++) {
            if (table.rows[i].getAttribute("data-value") == salesID) {
                table.deleteRow(i);
                break;
            }
        }
    }

