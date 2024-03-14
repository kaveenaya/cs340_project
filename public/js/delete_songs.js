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

function deleteRow(songID) {
    let table = document.getElementById("songs-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].cells[0].innerText == songID) {
            table.deleteRow(i);
            break;
        }
    }
}
