
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

    function deleteRow(salesID) {
        let table = document.getElementById("sales-table");
        for (let i = 0; i < table.rows.length; i++) {
            if (table.rows[i].getAttribute("data-value") == salesID) {
                table.deleteRow(i);
                break;
            }
        }
    }

