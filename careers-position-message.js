document.addEventListener("DOMContentLoaded", function() {
    // Check if the collection list is empty
    if(document.querySelectorAll('.fs_accordion-2_component').length === 0) {
        // If it's empty, hide the first div and show the second div
        document.getElementById('open-positions').style.display = 'none';
        document.getElementById('no-positions').style.display = 'block';
    } else {
        // If it's not empty, show the first div and hide the second div
        document.getElementById('open-positions').style.display = 'block';
        document.getElementById('no-positions').style.display = 'none';
    }
});