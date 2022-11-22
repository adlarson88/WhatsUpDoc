var userData = 'eml292'; //temporary userID
// userData = 'al762'; // adam test id
var completeList;

class tester 
{
  constructor()
  {
    this.testResult = false;
  }
}

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

function uploadEventListener(targetID)
{
  var target = document.getElementById(targetID);
  var classes = target.classList;
  target.addEventListener('change', () => {
    uploadFile(classes.item(1), target.files[0])
  });
}

function checkProgress(doc)
{
  var index;
  var target;
  var tasks;
  var filePre;
  var phaseNum;
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

      filePre = document.getElementsByClassName("previewer " + phaseNum)[0];
      console.log(phaseNum);

      tasks[index].style.backgroundColor = "#002454";
      tasks[index].style.color = "#ffffff";
      tasks[index].style.borderColor = '#000000';
      tasks[index].classList.remove('deleted');
      filePre.remove();
    }
    else if (tasks[index].classList.contains('complete'))
    {
      tasks[index].style.backgroundColor = "#FAC01A";
      tasks[index].style.color = "#002454";
      tasks[index].style.borderColor = '#000000';
    }
  }
  if( completed )
  {
    target.style.backgroundColor = "#FAC01A";
    target.style.color = "#002454";
    target.style.borderColor = '#000000';
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

  return 0;
}

async function phaseCheck(elementID)
{
  var target = document.getElementById(elementID);
  var upDate;
  var fileID;
  var index;
  var search;
  var dateP;

  
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

      upDate = completeList[index].uploadTime.split(".")[0]; // remove time from the date
      upDate = upDate.split("/");
      upDate = upDate[1] + "/" + upDate[0] + "/" + upDate[2]; // converte date to 'murican
      dateP[0].innerHTML = "Completed " + upDate +"!";
      

      createPreviewer(fileID, elementID);

    }
  }
}

async function createPreviewer(fileID, elementID)
{
  var blobData;
  var parent;
  var index;
  parent = document.getElementsByClassName(elementID + ' fileView');
  

  blobData = await dbPreview('https://doctracker.org:8443/user/preview/'+fileID);
  var newPre = document.createElement("object");
  newPre.style.width = '80%';
  newPre.style.height = '80%';
  newPre.setAttribute('class', 'previewer ' + elementID);
  newPre.type = 'application/pdf';
  newPre.data = 'data:application/pdf;base64,' + blobData;
  newPre.filename = elementID; 
  //repeat all attributes needed;

  parent[0].appendChild(newPre);

}


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

function b64toBlob(b64Data, contentType='')
{
  var url = "data:"+contentType+";base64,"+b64Data;
  var blob;

  fetch(url)
  .then(res => res.blob())
  .then(blob)

  return blob;
}

async function pingDB( tester = null )
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

  completeList = JSON.parse(completeList);

  parseCompleteList();
  
  checkProgress('milOne');
  checkProgress('milTwo');
  checkProgress('milThree');
  checkProgress('milFour');

  if(tester != null)
  {
    tester.testResult = true;
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
      setTimeout(tester.testResult = true, 300);
      break;
    }
  }
}

async function uploadFile(phase, upFile)
{
  var uploadTest = new tester();
  var pingTest = new tester();
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
      success => {console.log(success)
      
      uploadTest.testResult = true}
    ).catch(
      error => console.error(error)
    );

  };

  upload(upFile);
  
  console.log(pingTest.testResult);
  recurse(uploadTest, () => {pingDB(pingTest);});

  recurse(pingTest, () => {replacePreview(phase)});
}

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

function recurse(test, func)
{
  if (test.testResult)
  {
    func();
  }
  else
  {
    setTimeout(() => {recurse(test, func)}, 500);
  }
}

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
