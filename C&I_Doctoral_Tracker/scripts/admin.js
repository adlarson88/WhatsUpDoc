// Editor/DataTables stuff
var userIDdata = 'eml292'; // temp userID
var allUsers, phaseReviewData;



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
    
    // reqeust to populate student table
    const studentTableRequest = new Request(downloadRequest, downloadOptions);

    const studentTableResponse = await fetch(studentTableRequest);

    allUsers = await studentTableResponse.text();
    console.log(allUsers);
    allUsers = JSON.parse(allUsers);

    $(document).ready( function () {
        var studentTable = $('#adminStudentControlsTable').DataTable( {
            data: allUsers,
            dom: 'Bfrtip',
            columns: [
                { data: 'userID' },
                { data: 'last_name' },
                { data: 'first_name' },
                { data: 'advisor' },
                { data: 'term_activation' },
                { data: 'admin' },
            ],
            buttons: [
                {text: 'New Student'},
                'spacer',
                {text: 'Edit Student'},
                'spacer',
                {text: 'Delete Student'},
                'spacer',
                'spacer', 'spacer', 'spacer',
                'copy', 'spacer', 'csv', 'spacer', 'excel', 'spacer', 'pdf', 'spacer', 'spacer', 'spacer', 'spacer', 'spacer', 'spacer', 'spacer', 'spacer', 'spacer', 'spacer', 'spacer', 'spacer', 
            ],
        } );

        studentTable.buttons().container()
        .appendTo( $('.col-sm-6:eq(0)', studentTable.table().container() ) );
    } );

    // reqeust to populate phase review table
    const phaseReviewTableRequest = new Request(downloadRequest, downloadOptions);

    const phaseReviewTableResponse = await fetch(phaseReviewTableRequest);

    phaseReviewData = await phaseReviewTableResponse.text();
    phaseReviewData = JSON.parse(phaseReviewData);

    $(document).ready( function () {
        var phaseReviewTable = $('#phaseReviewTable').DataTable( {
            data: phaseReviewData,
            columns: [
                { data: 'userID' },
                { data: 'last_name' },
                { data: 'first_name' },
                { data: 'term_activation' },
            ]
        } );
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

