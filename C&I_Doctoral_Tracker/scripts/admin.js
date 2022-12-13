/* Code written and commented by Brandon James Shaffer. With acknowledgements made to 
     Google and DataTables where appropriate, as their docuumentation was immensely helpful
     in the development of this web application. */

// Editor/DataTables global variables

/* Initializes selectedUserToEdit which will hold the user being selected
within the Add/Remove user table.*/
var selectedUserToEdit;

/* Initializes two important data sets that will hold our MySQL Database user
information as well as our Phase Review Data. Both of these are queried from our
MySQL database using fetch.*/
var allUsers, phaseReviewData;

// The final three global variables house some key elements we will be manipulating.
var createUserModal;
var editUserModal;
var modalCloseButton;

// Page onload function (async). This function is called after every page load/refresh.
async function preparePage() {

    // The function begins by assigning elements from the html document to our JS variables for further manipulation.
    createUserModal = document.getElementById("createUserModal");
    editUserModal = document.getElementById("editUserModal");
    modalCloseButton = document.getElementsByClassName("close");

    var studentTable = document.getElementById("adminStudentControlsWindow");
    var phaseReviewTable = document.getElementById("adminPhaseReviewWindow");
    var embeddedWindow = document.getElementById("studentProgressWindow");


    // The default is to "show" the Add/Remove Users DataTable/div and "hide" the other two divs.
    studentTable.style.display = "block";
    phaseReviewTable.style.display = "none";
    embeddedWindow.style.display = "none";
    

    // This code begins the few steps needed to query dynamic data from our MySQL database and display it in our DataTable.
    // Here we create two constants which will hold the request URLs for each of our database calls.

    // downloadRequest requests all the user information for the Add/Remove Users DataTable
    const downloadRequest = 'https://doctracker.org:8443/user/all';

     // downloadSummaryRequest requests all the user's program summary information for the Phase Review DataTable
    const downloadSummaryRequest = 'https://doctracker.org:8443/user/all/summary';
    
    // downloadOptions describes the needed headers when working with JSON bodies.
    const downloadOptions = {
    
        headers: {'Content-Type' : 'application/json'},
    } ;
    
    // reqeust to populate Add/Remove Users DataTable: we pass the request our downloadRequest URL and our downloadOptions constant
    const studentTableRequest = new Request(downloadRequest, downloadOptions);

    /* This constant will hold the response from the request made for all the user information. I utilized fetch to successfully 
    query data from our MySQL database. ( I tried AJAX and XMLHttp Requests before getting fetch to do what I wanted. ) */
    const studentTableResponse = await fetch(studentTableRequest);

    // Here we await the response as text and save it into our global allUsers variable.
    allUsers = await studentTableResponse.text();

    // Now we have to JSON Parse our allUsers dataset in order to get it into JSON format, which we pass to our DataTable during creation.
    allUsers = JSON.parse(allUsers);

    
    // instantiate Add/Remove Users DataTable. DataTable's specific syntax and variable names are used here!!
    // DataTables.net documentation/manual was very helpful during the development of this chunk of code.
    $(document).ready( function () {
        /* First DataTable is named studentTable and refers to the HTML table, adminStudentControlsTable, which we 
        created and named in our admin.html code. 
        
        data: is asking for the JSON data that will populate the DataTable.
        
        autoWidth: establishes whether the table should auto size according to page size.
        
        select: should the table allow the user to select a single cell or multiple cells within the table? 
        
        paging: pagination
        
        scrollY: if the table is large enough, include a scroll bar with this Y length.
        
        scrollCollapse: should the scroll bar collapse if the table is small enough?
        
        lengthChange: allow the user to determine how many cells of the table they want to view on each page
        
        columns: THIS IS ONE OF THE MORE IMPORTANT DATATABLES ATTRIBUTES!!! The data described here must exactly match 
        your HTML table columns created in admin.html AND your DataBase field names, IN THE ORDER IN WHICH YOU 
        WANT TO DISPLAY THE DATA!

        buttons: THIS IS ALSO A VERY IMPORTANT DATATABLES ATTRIBUTE! This describes all the buttons to be used within
        the DataTable. Some buttons like, copy, csv, pdf, and excel are built into DataTables. I had to create
        two new buttons in order to properly integrate CRUD capabilities into our DataTable. The first button
        I created expecially for the Add/Remove Users DataTable is the 'New User' button. Once this button is 
        pressed, the createUserModal is opened and shown. The second button I created is the 'Edit User' button.
        Once this button is pressed, the editUserModal is opened and shown. I created a third new 
        button named 'Refresh Table' in order to refresh the table after an admin deletes a user. And finally, I created a 
        'Delete User' button which deletes the selected user from the DataTable and DataBase. **NOTE** The user must
        hit the 'Refresh Table' button after each user deletion in order for the change to be made to the DataTable.

        After the buttons are explicitly described, you must append the buttons container to a div. 
        This is why we have a blank div before each DataTables div in admin.html.
        */
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

    // reqeust to populate Phase Review DataTable: we pass the request our downloadSummaryRequest URL and our downloadOptions constant
    const phaseReviewTableRequest = new Request(downloadSummaryRequest, downloadOptions);

    /* This constant will hold the response from the request made for all the user summary information. I utilized fetch to successfully 
    query data from our MySQL database. ( I tried AJAX and XMLHttp Requests before getting fetch to do what I wanted. ) */
    const phaseReviewTableResponse = await fetch(phaseReviewTableRequest);

    // Here we await the response as text and save it into our global phaseReviewData variable.
    phaseReviewData = await phaseReviewTableResponse.text();

    // Now we have to JSON Parse our phaseReviewData dataset in order to get it into JSON format, which we pass to our DataTable during creation.
    phaseReviewData = JSON.parse(phaseReviewData);


    // instantiate Phase Review DataTable. DataTable's specific syntax and variable names are used here!!
    // DataTables.net documentation/manual was very helpful during the development of this chunk of code.
    $(document).ready( function () {
        /* Second DataTable is named phaseReviewTable and refers to the HTML table, phaseReviewTable, which we 
        created and named in our admin.html code. 
        
        data: is asking for the JSON data that will populate the DataTable.
        
        autoWidth: establishes whether the table should auto size according to page size.
        
        scrollCollapse: should the scroll bar collapse if the table is small enough?
        
        lengthChange: allow the user to determine how many cells of the table they want to view on each page
        
        columns: THIS IS ONE OF THE MORE IMPORTANT DATATABLES ATTRIBUTES!!! The data described here must exactly match 
        your HTML table columns created in admin.html AND your DataBase field names, IN THE ORDER IN WHICH YOU 
        WANT TO DISPLAY THE DATA!

        buttons: THIS IS ALSO A VERY IMPORTANT DATATABLES ATTRIBUTE! This describes all the buttons to be used within
        the DataTable. Some buttons like, copy, csv, pdf, and excel are built into DataTables. I had to create
        one new button named 'Refresh Table' in order to refresh the table. 

        After the buttons are explicitly described, you must append the buttons container to a div. 
        This is why we have a blank div before each DataTables div in admin.html.
        */
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
                           // This should load the phaseReview table not the add/Remove Users table, which it currently does not do
                           // openPhaseReviewWindow();
                      }},
                      'spacer','copy', 'spacer', 'csv', 'spacer', 'excel', 'spacer', 'pdf']
        } );
        
        phaseReviewTable.buttons().container()
        .appendTo( "#divBeforePhaseReviewTable" );
    } );
 
    // These are two event listeners placed at the end of our preparePage() function. They listen for when the X button is clicked to close each modal properly.
    modalCloseButton[0].addEventListener("click", closeCreateUserModal);
    modalCloseButton[1].addEventListener("click", closeEditUserModal);
}


// This asynchronous function is the handler called when submitting the createNewUserForm.
async function submitNewUserForm() {

    // Here we initialize and instantiate all the relevant fields to be filled in on the createNewUserForm.
    var formUserID = document.getElementById('formUserID');
    var formFirstName = document.getElementById('formFirstName');
    var formLastName = document.getElementById('formLastName');
    var formAdvisor = document.getElementById('formAdvisor');
    var formTermActivation = document.getElementById('formTerm');
    var formEnrollmentStatus = document.getElementById('formEnrollmentStatus');
    var formAdminStatus = document.getElementById('formAdminStatus');

    // This array houses the information we will be sending to the DataBase VIA a POST request.
    // This information is queried from the user using the createNewUserForm within the createUserModal.    
    var formDataArray = {"userID":formUserID.value, "first_name":formFirstName.value, 
                         "last_name":formLastName.value, "admin":formAdminStatus.value,
                         "advisor":formAdvisor.value, "enrollment_status":formEnrollmentStatus.value,
                         "term_activation":formTermActivation.value 
                        };
    
    // Again, we are dealing with all JSON data on the back end so we must JSON.stringify our data array.
    let jsonFormData = JSON.stringify(formDataArray);

    /* Here is the constant for our create User Request URL. This specific URL is called with the correct
    port number and is unique for this specific POST request. */
    const createUserRequestURL = 'https://doctracker.org:8443/user/create';

    // Once again, fetch proved to work out in the end and allowed me to successfully communicate with our MySQL DB.
    // Need to specify the request URL, the method to be used, relevant headers, the body payload, and some final logging.
    fetch(createUserRequestURL, {
        method: 'POST',
        headers: {
            'Accept':'application/json','Content-type': 'application/json'
        },
        body: jsonFormData
      }).then(response => response.json()).then(json => console.log(json));
    
    return true;
}

// This asynchronous function is the handler called when submitting the editUserForm.
async function submitEditUserForm() {

    // Here we initialize and instantiate the constant used to house each selected table cell to be edited.
    const localSelectedUser = getSelectedUserToEdit();

    // Here we initialize and instantiate all the relevant fields to be filled in on the editUserForm.
    var editFirstName = document.getElementById('editFirstName');
    var editLastName = document.getElementById('editLastName');
    var editAdvisor = document.getElementById('editAdvisor');
    var editTermActivation = document.getElementById('editTerm');
    var editEnrollmentStatus = document.getElementById('editEnrollmentStatus');
    var editAdminStatus = document.getElementById('editAdminStatus');
    
    // This array houses the information we will be sending to the DataBase VIA a PUT request.
    // This information is queried from the user using the editUserForm within the editUserModal. 
    var editedDataArray = {"first_name":editFirstName.value, "last_name":editLastName.value, 
                           "admin":editAdminStatus.value, "advisor":editAdvisor.value, 
                           "enrollment_status":editEnrollmentStatus.value, "term_activation":editTermActivation.value 
                        };
    
    // Again, we are dealing with all JSON data on the back end so we must JSON.stringify our data array.
    let jsonEditedData = JSON.stringify(editedDataArray);

    /* Here is the constant for our edit User Request URL. This specific URL is called with the correct
    port number and unique user userID, taken from a table cell that has been selected. Here we make
    a PUT instead of a POST since we are updating existing data in the DB. We use the same JSON header. We pass it
    our edited JSON data and our final logging. */
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

/* This function is called when the 'Delete User' button created earlier is clicked. It requires that a user be
selected within the table before the button is pressed, otherwise nothing happens. The selectedUser element
is passed as a parameter. */
async function deleteSelectedUser(selectedUser) {
    
    // We need to make another request to the DB so here is our unique delete URL. The selected users userID is added to the URL.
    const deleteUserRequestURL = 'https://doctracker.org:8443/user/'+selectedUser+'/deleteStudent';

    // Again, we got fetch to do what we needed to do. We passed it our requestURL, the method to be performed (DELETE) and 
    // any final logging to be done after the request is made.
    fetch(deleteUserRequestURL, {
        method: 'DELETE',
      }).then(response => response.json()).then(json => console.log(json));
    return true;
}

// Function that opens the admin student control window upon task bar button click
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

  // Function that opens the admin phase review window upon task bar button click
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

// Function that opens the student progress viewer window upon task bar button click
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

// This setter function sets the a new selected user to be edited using our 'Edit User' button.
function setSelectedUserToEdit(selectedUserToReplace) {
    selectedUserToEdit = selectedUserToReplace;
    return true;
}

// This getter function gets the selected user to edit using our 'Edit User' button.
function getSelectedUserToEdit() {
    return selectedUserToEdit;
}

// This function 
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

// This function closes our createUserModal.
function closeCreateUserModal() {
    createUserModal.style.display = "none";
    
}

// This function closes our editUserModal.
function closeEditUserModal() {
    editUserModal.style.display = "none";
}


// configure current (and future) google sign-out button
function signOut() {
    google.accounts.id.disableAutoSelect();
    window.location.href = "index.html";
  }
