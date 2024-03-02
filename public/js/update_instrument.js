document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.getElementById('input-instrument');

    selectElement.addEventListener('change', function(event) {
        const instrumentID = event.target.value;
        // Fetch the instrument details
        fetch('/get-instrument-details/' + instrumentID)
            .then(response => response.json())
            .then(data => {
                // Update form fields
                document.getElementById('input-instrument-name').value = data.instrumentName || '';
                document.getElementById('input-instrument-color').value = data.instrumentColor || '';
                document.getElementById('input-instrument-material').value = data.instrumentMaterial || '';
                document.getElementById('input-instrument-size').value = data.instrumentSize || '';
                document.getElementById('input-instrument-year').value = data.instrumentYear || '';
                document.getElementById('input-instrument-price').value = data.instrumentPrice || '';
            });
    });

    const updateInstrumentForm = document.getElementById('update-instrument-form');

    updateInstrumentForm.addEventListener("submit", function(e) {
        e.preventDefault();

        // Collect data from form...
        const formData = {
            id: document.getElementById("input-instrument").value,
            name: document.getElementById("input-instrument-name").value,
            color: document.getElementById("input-instrument-color").value,
            material: document.getElementById("input-instrument-material").value,
            size: document.getElementById("input-instrument-size").value,
            year: document.getElementById("input-instrument-year").value,
            price: document.getElementById("input-instrument-price").value
        };

        fetch('/put-instrument-ajax', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (response.ok) {
                console.log("Instrument updated successfully!");
                // Optionally, refresh the page or update the UI accordingly
            } else {
                console.log("There was an error with the update.");
            }
        });
    });
});
