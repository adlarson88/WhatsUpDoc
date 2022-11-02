var userData = 'eml292'; //temporary userID
// userData = 'al762'; // adam test id
var completeList;
var userID;

function dropDown(doc)
{
    var target = document.getElementsByClassName(doc);
    var index;
    var taskDoc;
    for (index = 0; index < target.length; index++) {
      if (!target[index].classList.contains('fileView')) {

        target[index].style.display = "block";

      }
      else if(doc.includes('phase')){

        target[index].style.display = "block";

      }
    }
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

function prepare()
{
  var target = document.getElementsByClassName('milestoneDataText');
  var index;
  var classes;
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

  target = document.getElementsByClassName("fileUpload");
  var elementByID;

  for (index = 0; index < target.length; index++){
    classes = target[index].classList;
    elementByID = document.getElementById(target[index].id);
    target[index].addEventListener('change', () => {
      uploadFile(classes.item(1), elementByID.files[0])
    })
  }

  pingDB();
  parseCompleteList();

  checkProgress('milOne');
  checkProgress('milTwo');
  checkProgress('milThree');
  checkProgress('milFour');

}

function checkProgress(doc)
{
  var index;
  var target;
  var tasks;
  var completed; 
  completed = true;
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
    else if (tasks[index].classList.contains('complete'))
    {
      tasks[index].style.backgroundColor = "#FAC01A";
      tasks[index].style.color = "#002454";
    }
  }
  if( completed )
  {
    target.style.backgroundColor = "#FAC01A";
    target.style.color = "#002454";
    target.classList.add('complete');
  }
}

function displayFile(doc)
{
  /* Database get Requests go here */
  var target;
  var parent;
  var index;
}

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

function phaseCheck(elementID)
{
  var target = document.getElementById(elementID);
  //if( completeList.querySelector(elementID) && !(target.classList.contains('complete')) )
  //{
  // target.classList.add('complete');
  // const newPre = document.createElement("embed");

  // newPre.setAttribute('src', url of file);
  // newPre.setAttribute('width, size)
  // repeat
  // target.appendChild(newPre);
  //}
}

async function pingDB()
{
  
  //const downloadRequest = 'https://doctracker.org:8443/user/all';
  const downloadRequest = 'https://doctracker.org:8443/user/'+userData+'/getFiles';
 
  const downloadOptions = {
    
    headers: {'Content-Type' : 'application/json'},
  } ;

  const request = new Request(downloadRequest, downloadOptions);

  const response = await fetch(request);
  
  completeList = await response.text();

  console.log(completeList);
  
}

async function download(fileID)
{
  const downloadRequest = 'https://doctracker.org:8443/user/files/'+fileID;

  const request = new Request(downloadRequest);

  const response = await fetch(request);

}

async function uploadFile(phase, upFile)
{
  const uploadRequest = 'https://doctracker.org:8443/user/'+userData+'/upload/'+phase;

  const upload = (file) => {
    const formData = new FormData()

    formData.append('file', file)

    fetch(uploadRequest, {
      method: 'POST',
      body: formData,
    }).then(
      response => response.text()
    ).then(
      success => console.log(success)
    ).catch(
      error => console.error(error)
    );
  };
    
  upload(upFile);

  pingDB();

}

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
