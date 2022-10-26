$(document).ready(function () {
    $('#studentTable').DataTable();
  });

// Function to embed student home pages after search has been made
function embedHomePage(form) {
    if (document.getElementById('searchBarResponse') == "bjs397")
        {
            form.action = "https://ceias.nau.edu/capstone/projects/CS/2022/WhatsUpDoc_S22/C&I_Doctoral_Tracker/home.html"
            return true;
        }
    else 
        {
            alert(form.action);
            return false;
        }
}

// Function that opens the admin student control window upon navigation button click
function openAdminStudentControlsWindow() {
    var buttonClicked = document.getElementById("adminStudentControlsWindow");
    var buttonUnclicked = document.getElementById("searchWindow");
    if (buttonClicked.style.display === "none" && buttonUnclicked.style.display === "none") 
        {
            buttonClicked.style.display = "block";
        } 
    else if(buttonClicked.style.display === "none" && buttonUnclicked.style.display != "none")
        {
            buttonClicked.style.display = "block";
            buttonUnclicked.style.display = "none";
        }
    else
        {
            buttonClicked.style.display = "none";
        }
}

  // Function that opens the admin student control window upon navigation button click
function openSearchWindow() {
    var buttonClicked = document.getElementById("searchWindow");
    var buttonUnclicked = document.getElementById("adminStudentControlsWindow");
    if (buttonClicked.style.display === "none" && buttonUnclicked.style.display === "none") 
        {
            buttonClicked.style.display = "block";
        } 
    else if(buttonClicked.style.display === "none" && buttonUnclicked.style.display != "none")
        {
            buttonClicked.style.display = "block";
            buttonUnclicked.style.display = "none";
        }
    else
        {
            buttonClicked.style.display = "none";
        }
}