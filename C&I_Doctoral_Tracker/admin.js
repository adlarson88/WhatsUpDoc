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

// configure google sign-out button
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      window.location.href = "https://ceias.nau.edu/capstone/projects/CS/2022/WhatsUpDoc_S22/C&I_Doctoral_Tracker/index.html";
      console.log('User signed out.');
    });
}