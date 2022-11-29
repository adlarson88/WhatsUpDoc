// Editor/DataTables stuff
var selectedUserToEdit;
var allUsers, phaseReviewData;

var createUserModal;
var editUserModal;
var modalCloseButton;

// page onload function
async function preparePage() {
    createUserModal = document.getElementById("createUserModal");
    editUserModal = document.getElementById("editUserModal");
    modalCloseButton = document.getElementsByClassName("close");

    var studentTable = document.getElementById("adminStudentControlsWindow");
    var phaseReviewTable = document.getElementById("adminPhaseReviewWindow");
    var embeddedWindow = document.getElementById("studentProgressWindow");

    studentTable.style.display = "block";
    phaseReviewTable.style.display = "none";
    embeddedWindow.style.display = "none";
    

    const downloadRequest = 'https://doctracker.org:8443/user/all';
    const downloadSummaryRequest = 'https://doctracker.org:8443/user/all/summary';
    const downloadOptions = {
    
        headers: {'Content-Type' : 'application/json'},
    } ;
    
    // reqeust to populate student table
    const studentTableRequest = new Request(downloadRequest, downloadOptions);

    const studentTableResponse = await fetch(studentTableRequest);

    allUsers = await studentTableResponse.text();

    
    // console.log(allUsers);
    allUsers = JSON.parse(allUsers);

    // instantiate DataTables
    $(document).ready( function () {
        var studentTable = $('#adminStudentControlsTable').DataTable( {
            data: allUsers,
            autoWidth: true,
            select: 'single',
            paging: true,
            scrollY: 500,
            scrollCollapse: true,
            lengthChange: true,
            columns: [
                { data: 'userID' },
                { data: 'last_name' },
                { data: 'first_name' },
                { data: 'advisor' },
                { data: 'term_activation' },
                { data: 'enrollment_status'},
                { data: 'admin' },
            ],
            buttons: [
                {text: 'New User',
                 action: function ( e, dt, node, config ) {
                    var createUserModal = document.getElementById("createUserModal");
                    createUserModal.style.display = "block";
                 }},
                'spacer',
                {text: 'Edit User',
                 extend: 'selected',
                 action: function( e, dt, node, config ) {
                    var selectedUserToEdit = dt.row( { selected: true } ).data();
                    setSelectedUserToEdit(selectedUserToEdit.userID);
                    var editUserModal = document.getElementById("editUserModal");
                    editUserModal.style.display = "block";

                }},
                'spacer',
                {text: 'Delete User',
                 extend: 'selected',
                 action: function ( e, dt, node, config ) {
                    var selectedUserToDelete = dt.row( { selected: true } ).data();
                    deleteSelectedUser(selectedUserToDelete.userID);
                }}, 'spacer',
                {text: 'Refresh Table',
                action: function ( e, dt, node, config ) {
                    location.reload();
                }},
                'spacer',
                'spacer', 'spacer', 'spacer',
                'copy', 'spacer', 'csv', 'spacer', 'excel', 'spacer', 'pdf',
            ],
        } );

        studentTable.buttons().container()
        .appendTo( "#divBeforeStudentTable" );
    } );

    // reqeust to populate phase review table
    const phaseReviewTableRequest = new Request(downloadSummaryRequest, downloadOptions);

    const phaseReviewTableResponse = await fetch(phaseReviewTableRequest);

    phaseReviewData = await phaseReviewTableResponse.text();
    phaseReviewData = JSON.parse(phaseReviewData);

    $(document).ready( function () {
        var phaseReviewTable = $('#phaseReviewTable').DataTable( {
            data: phaseReviewData,
            autoWidth: true,
            scrollCollapse: true,
            lengthChange: true,
            columns: [
                { data: 'userID' },
                { data: 'last_name' },
                { data: 'first_name' },
                { data: 'term_activation' },
                { data: 'phase1Summary'},
                { data: 'phase2Summary'},
                { data: 'phase3Summary'},
                { data: 'phase4Summary'}
            ],
            buttons: [{text: 'Refresh Table',
                       action: function ( e, dt, node, config ) {
                           location.reload();
                           // This should also load the phaseReview table not the studentReview table
                           // openPhaseReviewWindow();
                      }},
                      'spacer','copy', 'spacer', 'csv', 'spacer', 'excel', 'spacer', 'pdf']
        } );
        
        phaseReviewTable.buttons().container()
        .appendTo( "#divBeforePhaseReviewTable" );
    } );
 
    modalCloseButton[0].addEventListener("click", closeCreateUserModal);
    modalCloseButton[1].addEventListener("click", closeEditUserModal);
}

async function submitNewUserForm() {

    var formUserID = document.getElementById('formUserID');
    var formFirstName = document.getElementById('formFirstName');
    var formLastName = document.getElementById('formLastName');
    var formAdvisor = document.getElementById('formAdvisor');
    var formTermActivation = document.getElementById('formTerm');
    var formEnrollmentStatus = document.getElementById('formEnrollmentStatus');
    var formAdminStatus = document.getElementById('formAdminStatus');
    
    var formDataArray = {"userID":formUserID.value, "first_name":formFirstName.value, 
                         "last_name":formLastName.value, "admin":formAdminStatus.value,
                         "advisor":formAdvisor.value, "enrollment_status":formEnrollmentStatus.value,
                         "term_activation":formTermActivation.value 
                        };
    
    let jsonFormData = JSON.stringify(formDataArray);

    const createUserRequestURL = 'https://doctracker.org:8443/user/create';

    fetch(createUserRequestURL, {
        method: 'POST',
        headers: {
            'Accept':'application/json','Content-type': 'application/json'
        },
        body: jsonFormData
      }).then(response => response.json()).then(json => console.log(json));
    
    return true;
}

async function submitEditUserForm() {

    const localSelectedUser = getSelectedUserToEdit();

    var editFirstName = document.getElementById('editFirstName');
    var editLastName = document.getElementById('editLastName');
    var editAdvisor = document.getElementById('editAdvisor');
    var editTermActivation = document.getElementById('editTerm');
    var editEnrollmentStatus = document.getElementById('editEnrollmentStatus');
    var editAdminStatus = document.getElementById('editAdminStatus');
    

    var editedDataArray = {"first_name":editFirstName.value, "last_name":editLastName.value, 
                           "admin":editAdminStatus.value, "advisor":editAdvisor.value, 
                           "enrollment_status":editEnrollmentStatus.value, "term_activation":editTermActivation.value 
                        };
    
    let jsonEditedData = JSON.stringify(editedDataArray);

    const editUserRequestURL = 'https://doctracker.org:8443/user/'+localSelectedUser+'/update';

    fetch(editUserRequestURL, {
        method: 'PUT',
        headers: {
            'Accept':'application/json','Content-type': 'application/json'
        },
        body: jsonEditedData
      }).then(response => response.json()).then(json => console.log(json));
    
    return true;
}

async function deleteSelectedUser(selectedUser) {
    const deleteUserRequestURL = 'https://doctracker.org:8443/user/'+selectedUser+'/deleteStudent';

    fetch(deleteUserRequestURL, {
        method: 'DELETE',
      }).then(response => response.json()).then(json => console.log(json));
    return true;
}

// Function that opens the admin student control window upon navigation button click
function openAdminStudentControlsWindow() {

    var studentTable = document.getElementById("adminStudentControlsWindow");
    var phaseReviewTable = document.getElementById("adminPhaseReviewWindow");
    var embeddedWindow = document.getElementById("studentProgressWindow");
    // if phase Review Table tab is open, close it and open the add/remove student window
    if (studentTable.style.display === "none" && phaseReviewTable.style.display === "block" && embeddedWindow.style.display === "none")
        {
            phaseReviewTable.style.display = "none";
            studentTable.style.display = "block";
        }
    // if the embeddedWindow tab is open, close it and open the add/remove student window
    else if (studentTable.style.display === "none" && phaseReviewTable.style.display === "none" && embeddedWindow.style.display === "block")
        {
            embeddedWindow.style.display = "none";
            studentTable.style.display = "block";
        }
}

  // Function that opens the admin phase review window upon navigation button click
function openPhaseReviewWindow() {
    
    var studentTable = document.getElementById("adminStudentControlsWindow");
    var phaseReviewTable = document.getElementById("adminPhaseReviewWindow");
    var embeddedWindow = document.getElementById("studentProgressWindow");
    // if student table tab is open, close it and open the phase review table
    if (phaseReviewTable.style.display === "none" && studentTable.style.display === "block" && embeddedWindow.style.display === "none")
        {
            studentTable.style.display = "none";
            phaseReviewTable.style.display = "block";
        }
    else if (phaseReviewTable.style.display === "none" && studentTable.style.display === "none" && embeddedWindow.style.display === "block")
        {
            embeddedWindow.style.display = "none";
            phaseReviewTable.style.display = "block";
        }
}

// Function that opens the student progress viewer window upon navigation button click
function openStudentProgressWindow() {

    var studentTable = document.getElementById("adminStudentControlsWindow");
    var phaseReviewTable = document.getElementById("adminPhaseReviewWindow");
    var embeddedWindow = document.getElementById("studentProgressWindow");
    // if student table tab is open, close it and open the embeddedWindow view
    if (embeddedWindow.style.display === "none" && studentTable.style.display === "block" && phaseReviewTable.style.display === "none")
        {
            studentTable.style.display = "none";
            embeddedWindow.style.display = "block";
        }
    // if phase review tab is open, close it and open the embeddedWindow view
    else if (embeddedWindow.style.display === "none" && studentTable.style.display === "none" && phaseReviewTable.style.display === "block")
        {
            phaseReviewTable.style.display = "none";
            embeddedWindow.style.display = "block";
        }
}

function setSelectedUserToEdit(selectedUserToReplace) {
    selectedUserToEdit = selectedUserToReplace;
    return true;
}

function getSelectedUserToEdit() {
    return selectedUserToEdit;
}

function searchForStudentHomePage() {
    var searchThisStudent = document.getElementById('studentSearchBar');
    
    var addStudentTab = document.getElementById('adminStudentControlsWindow');
    var phaseReviewTab = document.getElementById('adminPhaseReviewWindow');
    var studentProgressTab = document.getElementById('studentProgressWindow');

    addStudentTab.style.display = "none";
    phaseReviewTab.style.display = "none";
    studentProgressTab.style.display = "block";

    console.log("Here is your userID:"+searchThisStudent.value); 

    /*
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = "https://ceias.nau.edu/capstone/projects/CS/2022/WhatsUpDoc_S22/C&I_Doctoral_Tracker/";
    document.body.appendChild(iframe);

    */
    return true;

}

function closeCreateUserModal() {
    createUserModal.style.display = "none";
    
}

function closeEditUserModal() {
    editUserModal.style.display = "none";
}


// configure google sign-out button
function signOut() {
    google.accounts.id.disableAutoSelect();
    window.location.href = "index.html";
  }
