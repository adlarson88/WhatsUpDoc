// page onload function
function preparePage() {

    var tableClicked = document.getElementById("adminStudentControlsWindow");
    var tableUnclicked = document.getElementById("adminPhaseReviewWindow");

    tableClicked.style.display = "block";
    tableUnclicked.style.display = "none";
}




// Function that opens the admin student control window upon navigation button click
function openAdminStudentControlsWindow() {
    
    var tableClicked = document.getElementById("adminStudentControlsWindow");
    var tableUnclicked = document.getElementById("adminPhaseReviewWindow");

    if (tableClicked.style.display === "none" && tableUnclicked.style.display === "block" )
        {
            tableClicked.style.display = "block";
            tableUnclicked.style.display = "none";
        }
}

  // Function that opens the admin student control window upon navigation button click
function openPhaseReviewWindow() {
    
    var tableClicked = document.getElementById("adminPhaseReviewWindow");
    var tableUnclicked = document.getElementById("adminStudentControlsWindow");

    if (tableClicked.style.display === "none" && tableUnclicked.style.display === "block" )
        {
            tableClicked.style.display = "block";
            tableUnclicked.style.display = "none";
        }
}