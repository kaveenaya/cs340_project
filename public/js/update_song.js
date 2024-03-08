
// Get the objects we need to modify
let updatesongForm = document.getElementById('update-song-form');

// Modify the objects we need
updatesongForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputsongID = document.getElementById("update-song-id");
    let inputsongName = document.getElementById("update-song-name");
    let inputsongArtist = document.getElementById("update-song-artist");
    let inputsongGenre = document.getElementById("update-song-genre");
    let inputsongLength = document.getElementById("update-song-length");
    let inputsongYear = document.getElementById("update-song-year");


    // Get the values from the form fields
    let songIDValue = inputsongID.value;
    let songNameValue = inputsongName.value;
    let songArtistValue = inputsongArtist.value;
    let songGenreValue = inputsongGenre.value;
    let songLengthValue = inputsongLength.value;
    let songYearValue = inputsongYear.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(songIDValue))
    {
        return;
    }
    if (songNameValue == "")
    {
        return;
    }
    if (songArtistValue == "")
    {
        return;
    }
    if (songGenreValue == "")
    {
        return;
    }
    if (songLengthValue == "")
    {
        return;
    }
    if (songYearValue == "")
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        songID: songIDValue,
        songName: songNameValue,
        songArtist: songArtistValue,
        songGenre: songGenreValue,
        songLength: songLengthValue,
        songYear: songYearValue

    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-song-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, songIDValue);

            // Clear the form
            inputsongID.value = "";
            inputsongName.value = "";
            inputsongArtist.value = "";
            inputsongGenre.value = "";
            inputsongLength.value = "";
            inputsongYear.value = "";

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, songID){
    let parsedData = JSON.parse(data);
    
    // Get the table we want to update
    let table = document.getElementById("songs-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows and update the one that matches the songID
        if(table.rows[i].getAttribute("data-value") == songID){
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            //get td of song name
            let songNameTD = updateRowIndex.getElementsByTagName("td")[1];
            //get td of song artist 
            let songArtistTD = updateRowIndex.getElementsByTagName("td")[2];
            //get td of song genre
            let songGenreTD = updateRowIndex.getElementsByTagName("td")[3];
            //get td of song length
            let songLengthTD = updateRowIndex.getElementsByTagName("td")[4];
            //get td of song year
            let songYearTD = updateRowIndex.getElementsByTagName("td")[5];

            //reassign the values of the row to the new values
            songNameTD.innerHTML = parsedData[0].songName;
            songArtistTD.innerHTML = parsedData[0].songArtist;
            songGenreTD.innerHTML = parsedData[0].songGenre;
            songLengthTD.innerHTML = parsedData[0].songLength;
            songYearTD.innerHTML = parsedData[0].songYear;

        }
    }
}
