// Citation for file delete_songs.js
// Date: 02/23/2024
// The code was adapted from the github starter code 
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

/**
 * This function deletes a song entry via AJAX.
 * param {string} songID - The ID of the song entry to delete.
 */
function deleteSong(songID) {
    let data = {
        id: songID
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-song-ajax/", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(songID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.");
        }
    }
    xhttp.send(JSON.stringify(data));
}

/**
 * This function deletes a row from the songs table based on the provided song ID.
 * param {string} songID - The ID of the song entry to delete.
 */
function deleteRow(songID) {
    let table = document.getElementById("songs-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].cells[0].innerText == songID) {
            table.deleteRow(i);
            break;
        }
    }
}
