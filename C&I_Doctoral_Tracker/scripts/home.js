var userData = JSON.parse(sessionStorage.getItem("response")); //temporary userID. to be replaced by login token containing user information
                         // will need to update calls of userData in following code to ensure userID is pulled from userData
var userID = JSON.parse(sessionStorage.getItem("response")).userID;
var completeList; // global variable that contains the list of files present on database under current user. 
                  // stored as an array of key value pairs. uploadID is the unique file id on the database, uploaded as is the task the file fulfills
                  // [{"uploadID":"encoded database id","uploaded_as":"phasex_y"},{more}] 

// object class for containing the True False results for testing/timing purposes
class tester 
{
  constructor()
  {
    this.testResult = false;
  }
}

// function to show child objects of clicked elements. target elements class passed in as "doc"
function dropDown(doc)
{
    var target = document.getElementsByClassName(doc);
    var index;
    var taskDoc;
    for (index = 0; index < target.length; index++) {
      // reveals non "fileview" elements if
      if (!target[index].classList.contains('fileView')) {

        target[index].style.display = "block";

      }
      // if target class is "phase" and also contains 'fileView' reveals element 
      else if(doc.includes('phase')){

        target[index].style.display = "block";

      }
    }
  
    // implements styling changes to clicked element
    if (!doc.includes('phase')) {
      target = document.getElementById(doc);

      target.style.fontWeight = "bold";
      target.style.borderStyle = 'solid';
      target.style.borderWidth = '.4vw';
      if (!(target.classList.contains('complete')))
      {
        target.style.borderColor = '#C3B8B2';
      }

    } else {
      // pulls the phase from the class list to target specific sub menu element by id
      taskDoc = doc.split(" ");
      target = document.getElementById(taskDoc[1]);

      target.style.fontWeight = "bold"; 
      target.style.borderStyle = 'solid';
      target.style.borderWidth = '.4vw';
      if (!(target.classList.contains('complete')))
      {
        target.style.borderColor = '#C3B8B2';
      }

    }
}

// function called on page load to set default state of page
// CONTAINS USE OF USERDATA
function prepare()
{
  var target = document.getElementsByClassName('milestoneDataText');
  var index;
  
  // hides dropdown elements
  for (index = 0; index < target.length; index++) {
    target[index].style.display = "none";
  }
  target = document.getElementsByClassName('milestoneData');
  for (index = 0; index < target.length; index++) {
    target[index].style.display = "none";
  }
target = document.getElementsByClassName('fileView');
  for (index = 0; index < target.length; index++) {
    target[index].style.display = "none";
  }

  // sets the userID to appear in the top left of page
  target = document.getElementById("currUser");
  target.innerHTML = userID;


  // calls uploadEventListener for each task. not looped since each phase has different amount of tasks
  uploadEventListener('file1_1');
  uploadEventListener('file1_2');
  uploadEventListener('file1_3');

  uploadEventListener('file2_1');
  uploadEventListener('file2_2');
  uploadEventListener('file2_3');
  uploadEventListener('file2_4');
  uploadEventListener('file2_5');
  uploadEventListener('file2_6');

  uploadEventListener('file3_1');
  uploadEventListener('file3_2');
  uploadEventListener('file3_3');
  uploadEventListener('file3_4');
  uploadEventListener('file3_5');
  
  uploadEventListener('file4_1');
  uploadEventListener('file4_2');
  uploadEventListener('file4_3');
  uploadEventListener('file4_4');

  pingDB();

}

// creates an event listener for each upload button to call uploadFile when the field changes
function uploadEventListener(targetID)
{
  var target = document.getElementById(targetID);
  var classes = target.classList;
  target.addEventListener('change', () => {
    uploadFile(classes.item(1), target.files[0])
  });
}

// asynchronus function to handle post requests to db, target phase and file to upload passed in as parameters
// USE OF USERDATA HERE
async function uploadFile(phase, upFile)
{
  var uploadTest = new tester();
  var pingTest = new tester();
  // sets the url for the POST request to include userID in USERDATA and the apropriate phase
  const uploadRequest = 'https://doctracker.org:8443/user/'+userID+'/upload/'+phase;
  

  // function that creates and sends POST
  const upload = (file) => {
    const formData = new FormData()

    formData.append('file', file)

    fetch(uploadRequest, {
      method: 'POST',
      body: formData,
    }).then(
      response => response.text()
    ).then(
      success => {console.log(success)
      
      uploadTest.testResult = true}
    ).catch(
      error => console.error(error)
    );

  };

  upload(upFile);
  
  // recursively checks for completed upload before checking database 
  recurse(uploadTest, () => {pingDB(pingTest);});

  // recursively checks for finished database ping before calling replacePreview
  recurse(pingTest, () => {replacePreview(phase)});
}

// helper function that recursively checks for a true tester object before calling in passed in function
function recurse(test, func)
{
  if (test.testResult)
  {
    func();
  }
  else
  {
    // recurses every half second until success
    setTimeout(() => {recurse(test, func)}, 500);
  }
}

// function that pulls list of uploaded files under current user
// tester default value set to null, can pass in tester object for use with the recurse function
// contains USERDATA
async function pingDB( tester = null )
{
  
  // sends database request with userID from USERDATA
  const downloadRequest = 'https://doctracker.org:8443/user/'+userID+'/getFiles';
 
  const downloadOptions = {
    
    headers: {'Content-Type' : 'application/json'},
  } ;

  const request = new Request(downloadRequest, downloadOptions);

  const response = await fetch(request);
  
  completeList = await response.text();

  // outputs list of files to console for debugging purposes
  console.log(completeList);

  completeList = JSON.parse(completeList);

  parseCompleteList();
  
  // call for each phase
  checkProgress('milOne');
  checkProgress('milTwo');
  checkProgress('milThree');
  checkProgress('milFour');

  if(tester != null)
  {
    tester.testResult = true;
  }
}

// if previewer already exists, removes old previewer and adds new one
function replacePreview(phase)
{
  var parent;
  var index;
  var fileID;
  parent = document.getElementsByClassName(phase + ' fileView');
  
  for (index = 0; index < completeList.length; index++)
  {
    if(completeList[index].uploaded_as == phase)
    {
      fileID = completeList[index].uploadID;
    }
  }

  for (index = 0; index < parent[0].children.length; index++)
  {
    if(parent[0].children[index].classList.contains("previewer"))
    {
      parent[0].children[index].remove();
      createPreviewer(fileID, phase);
    }
  }
}

// controller function to call phaseCheck for each phase task
function parseCompleteList()
{
  phaseCheck('phase1_1');
  phaseCheck('phase1_2');
  phaseCheck('phase1_3');

  
  phaseCheck('phase2_1');
  phaseCheck('phase2_2');
  phaseCheck('phase2_3');
  phaseCheck('phase2_4');
  phaseCheck('phase2_5');
  phaseCheck('phase2_6');
  

  phaseCheck('phase3_1');
  phaseCheck('phase3_2');
  phaseCheck('phase3_3');
  phaseCheck('phase3_4');
  phaseCheck('phase3_5');


  phaseCheck('phase4_1');
  phaseCheck('phase4_2');
  phaseCheck('phase4_3');
  phaseCheck('phase4_4');
}

// function that checks target phase for being complete, and changes the format accordingly
async function phaseCheck(elementID)
{
  var target = document.getElementById(elementID);
  var upDate;
  var fileID;
  var index;
  var search;
  var dateP;

  // finds the matching element by phase number, and checks if it is complete
  for (index = 0; index < completeList.length; index++)
  {
    if( completeList[index].uploaded_as == elementID && !(target.classList.contains('complete')) )
    {
      for (search = 0; search < completeList.length; search++)
      {
        if(completeList[search].uploaded_as == elementID)
        {
          fileID = completeList[search].uploadID;
        }
      }
      
      target.classList.add('complete');

      if(target.classList.contains("deleted"))
      {
        target.classList.remove("deleted");
      }

      dateP = document.getElementsByClassName("date " + elementID);
      // adds the upload date to the matching element of completed task
      upDate = completeList[index].uploadTime.split(".")[0]; // remove time from the date
      upDate = upDate.split("/");
      upDate = upDate[1] + "/" + upDate[0] + "/" + upDate[2]; // converte date to 'murican
      dateP[0].innerHTML = "Completed " + upDate +"!";
      

      createPreviewer(fileID, elementID);

    }
  }
}

// pulls an encoded blob of the uploaded file from the db and creates a preview in the proper element
async function createPreviewer(fileID, elementID)
{
  var blobData;
  var parent;
  var index;
  parent = document.getElementsByClassName(elementID + ' fileView');
  

  blobData = await dbPreview('https://doctracker.org:8443/user/preview/'+fileID);
  var newPre = document.createElement("object");
  // sets the preview's format
  newPre.style.width = '80%';
  newPre.style.height = '80%';
  newPre.style.display = "block";
  newPre.style.margin = "auto";
  newPre.style.border = "0";
  newPre.style.padding = "0";
  newPre.setAttribute('class', 'previewer ' + elementID);
  newPre.type = 'application/pdf';
  newPre.data = 'data:application/pdf;base64,' + blobData;
  newPre.filename = elementID; 
  //repeat all attributes needed;

  parent[0].appendChild(newPre);

}

// pulls the encoded blob from the database
async function dbPreview(fileURL)
{
  // fetch request with fileURL
  const downloadOptions = {
    
    headers: {'Content-Type' : 'text/plain'},
  } ;

  const request = new Request(fileURL, downloadOptions);

  const response = await fetch(request);

  var bD = await response.text();

  return bD;
}

// decodes blob object into usable file
function b64toBlob(b64Data, contentType='')
{
  var url = "data:"+contentType+";base64,"+b64Data;
  var blob;

  fetch(url)
  .then(res => res.blob())
  .then(blob)

  return blob;
}

// checks each element of doc for the complete tag. takes the phase class name (ie: milOne)
function checkProgress(doc)
{
  var index;
  var target;
  var tasks;
  var filePre;
  var phaseNum;
  var dateP;
  var completed = true;
  target = document.getElementById(doc);
  tasks = document.getElementsByClassName(doc);
  for (var index = 0; index < tasks.length; index++) 
  {
    if( !(tasks[index].classList.contains('complete') 
          || tasks[index].classList.contains('fileView') 
          || tasks[index].classList.contains('milestoneData') ) )
    {
      completed = false;
    }
    if(tasks[index].classList.contains('deleted'))
    {
      phaseNum = tasks[index].id;
      dateP = document.getElementsByClassName("date " + phaseNum);

      filePre = document.getElementsByClassName("previewer " + phaseNum)[0];
      console.log(phaseNum);

      tasks[index].style.backgroundColor = "#002454";
      tasks[index].style.color = "#ffffff";
      tasks[index].style.borderColor = '#000000';
      tasks[index].classList.remove('deleted');
      filePre.remove();
      dateP[0].innerHTML = "";
    }
    else if (tasks[index].classList.contains('complete'))
    {
      tasks[index].style.backgroundColor = "#FAC01A";
      tasks[index].style.color = "#002454";
      tasks[index].style.borderColor = '#000000';
    }
  }
  // if all sub tasks completed changes phase bar segment to complete
  if( completed )
  {
    target.style.backgroundColor = "#FAC01A";
    target.style.color = "#002454";
    target.style.borderColor = '#000000';
    target.classList.add('complete');
  }
}


function download(filename, tester)
{
  var fileID;
  var index;
  for (index = 0; index < completeList.length; index++)
  {
    if(completeList[index].uploaded_as == filename)
    {
      fileID = completeList[index].uploadID;
      window.open('https://doctracker.org:8443/user/files/'+fileID, '_blank');
      tester.testResult = true;
      break;
    }
  }
}

// handles DELETE requests with db
async function deleteFile(phase)
{
  var fileID;
  var index;
  var target = document.getElementById(phase);
  var deleteTest = new tester();
  var downloadTest = new tester();

  for (index = 0; index < completeList.length; index++)
  {
    if(completeList[index].uploaded_as == phase)
    {
      fileID = completeList[index].uploadID;
      break;
    }
  }

  const uploadRequest = 'https://doctracker.org:8443/user/delete/'+fileID;

  const remFile = () => {

    fetch(uploadRequest, {
      method: 'DELETE',
    }).then(
      response => response.text()
    ).then(
      success => {console.log(success)

      deleteTest.testResult = true}
    ).catch(
      error => console.error(error)
    );

  };
  
  if (confirm("Are you sure you want to remove this file?"))
  { 
    target.classList.remove("complete");
    target.classList.add("deleted");

    remFile();

    recurse(deleteTest, pingDB);

  }
}

// hides all members with class passed as parameter
function hideClass(doc)
{
  var target = document.getElementsByClassName(doc);
  var index;

  if(doc.includes('milestoneDataText')){
    hideClass('fileView');
    target = document.getElementsByClassName('milestoneDataText');
    for (index = 0; index < target.length; index++) {
      target[index].style.fontWeight = "normal";
      target[index].style.borderStyle = 'none';
      target[index].style.borderTopStyle = 'solid';
      target[index].style.borderWidth = '0.2vw';
      target[index].style.borderColor = '#000000';
    }
  }
  else if(doc.includes('milestoneData')){
    target = document.getElementsByClassName('milestoneData');
    for (index = 0; index < target.length; index++) {
      target[index].style.display = "none";
    }
  }
  else if(doc.includes('milestone')){
    hideClass('milestoneData');
    target = document.getElementsByClassName('milestone');
    for (index = 0; index < target.length; index++) {
      target[index].style.fontWeight = "normal";
      target[index].style.borderWidth = '0.2vw';
      target[index].style.borderColor = '#000000';
    }
  }
  if(doc.includes('fileView')){
    target = document.getElementsByClassName('fileView');
    for (index = 0; index < target.length; index++) {
      target[index].style.display = "none";
    }
  }
}
