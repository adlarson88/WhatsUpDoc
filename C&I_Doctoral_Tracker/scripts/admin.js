// Editor/DataTables stuff
var userIDdata = 'eml292'; // temp userID
var completeList;

// page onload function
async function preparePage() {

    var tableClicked = document.getElementById("adminStudentControlsWindow");
    var tableUnclicked = document.getElementById("adminPhaseReviewWindow");
    var embeddedWindowUnclicked = document.getElementById("studentProgressWindow");

    tableClicked.style.display = "block";
    tableUnclicked.style.display = "none";
    embeddedWindowUnclicked.style.display = "none";

    const downloadRequest = 'https://doctracker.org:8443/user/all';
    const downloadOptions = {
    
        headers: {'Content-Type' : 'application/json'},
    } ;
    
    const request = new Request(downloadRequest, downloadOptions);

    const response = await fetch(request);

    completeList = await response.text();

    console.log(completeList);

    completeList = JSON.parse(completeList);
    

    $(document).ready( function () {
        var studentTable = $('#adminStudentControlsTable').DataTable( {
            data: completeList,
            dom: 'Bfrtip',
            buttons: [
                'copy', 'excel', 'pdf'
            ],
            columns: [
                { data: 'userID' },
                { data: 'last_name' },
                { data: 'first_name' },
                { data: 'advisor' },
                { data: 'term_activation' },
                { data: 'admin' },
            ]
        } );

        studentTable.buttons().container()
        .appendTo( $('.col-sm-6:eq(0)', studentTable.table().container() ) );
    } );

}




// Function that opens the admin student control window upon navigation button click
function openAdminStudentControlsWindow() {
    
    var tableClicked = document.getElementById("adminStudentControlsWindow");
    var tableUnclicked = document.getElementById("adminPhaseReviewWindow");
    var embeddedWindowUnclicked = document.getElementById("studentProgressWindow");

    if (tableClicked.style.display === "none" && tableUnclicked.style.display === "block" && embeddedWindowUnclicked.style.display === "none")
        {
            tableClicked.style.display = "block";
            tableUnclicked.style.display = "none";
        }
    else if (tableClicked.style.display === "none" && tableUnclicked.style.display === "none" && embeddedWindowUnclicked.style.display === "block")
        {
            tableClicked.style.display = "block";
            embeddedWindowUnclicked.style.display = "none";
        }
}

  // Function that opens the admin phase review window upon navigation button click
function openPhaseReviewWindow() {
    
    var tableClicked = document.getElementById("adminPhaseReviewWindow");
    var tableUnclicked = document.getElementById("adminStudentControlsWindow");
    var embeddedWindowUnclicked = document.getElementById("studentProgressWindow");

    if (tableClicked.style.display === "none" && tableUnclicked.style.display === "block" && embeddedWindowUnclicked.style.display === "none")
        {
            tableClicked.style.display = "block";
            tableUnclicked.style.display = "none";
        }
    else if (tableClicked.style.display === "none" && tableUnclicked.style.display === "none" && embeddedWindowUnclicked.style.display === "block")
        {
            tableClicked.style.display = "block";
            embeddedWindowUnclicked.style.display = "none";
        }
}

// Function that opens the student progress viewer window upon navigation button click
function openStudentProgressWindow() {
    var embeddedWindowClicked = document.getElementById("studentProgressWindow");
    var tableOneUnclicked = document.getElementById("adminStudentControlsWindow");
    var tableTwoUnclicked = document.getElementById("adminPhaseReviewWindow");

    if (embeddedWindowClicked.style.display === "none" && tableOneUnclicked.style.display === "block" && tableTwoUnclicked.style.display === "none")
        {
            embeddedWindowClicked.style.display = "block";
            tableOneUnclicked.style.display = "none";
        }
    else if (embeddedWindowClicked.style.display === "none" && tableOneUnclicked.style.display === "none" && tableTwoUnclicked.style.display === "block")
        {
            embeddedWindowClicked.style.display = "block";
            tableTwoUnclicked.style.display = "none";
        }
}

// configure google sign-out button
function signOut() {
    google.accounts.id.disableAutoSelect();
    window.location.href = "https://ceias.nau.edu/capstone/projects/CS/2022/WhatsUpDoc_S22/C&I_Doctoral_Tracker/index.html?";
  }

