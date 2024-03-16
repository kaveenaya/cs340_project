// Citation for file add_song.js
// Date: 02/23/2024
// The ciation scope was for the whole module
// The code was adapted from the github starter code 
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main


// Get the objects we need to modify
let addSongForm = document.getElementById('add-song-form-ajax');

/**
 * This Function is to handle form submission for adding a new song via AJAX.
 * param {Event} e - The event object.
 */
// Modify the objects we need
addSongForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputSongName = document.getElementById("input-name");
    let inputSongArtist = document.getElementById("input-artist");
    let inputSongGenre = document.getElementById("input-genre");
    let inputSongLength = document.getElementById("input-length");
    let inputSongYear = document.getElementById("input-year");
    let inputSongPrice = document.getElementById("input-price");

    // Get the values from the form fields
    let songNameValue = inputSongName.value;
    let songArtistValue = inputSongArtist.value;
    let songGenreValue = inputSongGenre.value;
    let songLengthValue = inputSongLength.value;
    let songYearValue = inputSongYear.value;
    let songPriceValue = inputSongPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        songName: songNameValue,
        songArtist: songArtistValue,
        songGenre: songGenreValue,
        songLength: songLengthValue,
        songYear: songYearValue,
        songPrice: songPriceValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-song-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputSongName.value = '';
            inputSongArtist.value = '';
            inputSongGenre.value = '';
            inputSongLength.value = '';
            inputSongYear.value = '';
            inputSongPrice.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

/**
 * This function is to add a single row to the table based on data received from AJAX response.
 * param {string} data - The JSON string representing data to be added.
 */
// Creates a single row from an Object representing a single record from
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("songs-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let songIDCell = document.createElement("TD");
    let songNameCell = document.createElement("TD");
    let songArtistCell = document.createElement("TD");
    let songGenreCell = document.createElement("TD");
    let songLengthCell = document.createElement("TD");
    let songYearCell = document.createElement("TD");
    let songPriceCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
  
    // Fill the cells with correct data
    songIDCell.innerText = newRow.songName;
    songNameCell.innerText = newRow.songName;
    songArtistCell.innerText = newRow.songArtist;
    songGenreCell.innerText = newRow.songGenre;
    songLengthCell.innerText = newRow.songLength;
    songYearCell.innerText = newRow.songYear;
    songPriceCell.innerText = newRow.songYear;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteSong(newRow.songID);
    };


      // Add the cells to the row 
      row.appendChild(songIDCell);
      row.appendChild(songNameCell);
      row.appendChild(songArtistCell);
      row.appendChild(songGenreCell);
      row.appendChild(songLengthCell);
      row.appendChild(songYearCell);
      row.appendChild(songPriceCell);
      row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.songID);

    // Add the row to the table
    currentTable.appendChild(row);

    let selectID = document.getElementById("input-song-ajax");
    let option = document.createElement("option");
    option.text = newRow.songName;
    option.value = newRow.songID;
    selectID.add(option);
}