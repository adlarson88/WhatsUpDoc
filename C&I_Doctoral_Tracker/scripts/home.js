function dropDown(doc)
{
    var target = document.getElementsByClassName(doc);
    var index;
    var taskDoc;
    for (index = 0; index < target.length; index++) {
      if (!target[index].classList.contains('fileView')) {
        if (target[index].style.display === "none") {
            target[index].style.display = "block";
        } else {
          target[index].style.display = "none";
        }
      }
      else if(doc.includes('task')){
        if (target[index].style.display === "none") {
            target[index].style.display = "block";
        } else {
          target[index].style.display = "none";
        }

      }
    }
    if (!doc.includes('task')) {
      target = document.getElementById(doc);
      if (target.style.fontWeight === "bold") {
          target.style.fontWeight = "normal";
          target.style.borderStyle = 'none';
          target.style.borderTopStyle = 'solid';
          target.style.borderWidth = '0px';
        } else {
          target.style.fontWeight = "bold";
          target.style.borderStyle = 'solid';
          target.style.borderWidth = '2px';
        }
    } else {
      taskDoc = doc.split(" ");
      target = document.getElementById(taskDoc[1]);
      if (target.style.fontWeight === "bold") {
          target.style.fontWeight = "normal";
          target.style.borderStyle = 'none';
          target.style.borderTopStyle = 'solid';
          target.style.borderWidth = '0px';
        } else {
          target.style.fontWeight = "bold"; 
          target.style.borderStyle = 'solid';
          target.style.borderWidth = '2px';
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
  }
}

function displayFile(doc)
{
  /* Database get Requests go here */
  var target;
  var parent;
  var index;
}

function upload(doc)
{

  checkProgress(doc);
}
