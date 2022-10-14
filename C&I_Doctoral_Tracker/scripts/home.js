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
          target.style.fontWeight = "normal"
        } else {
          target.style.fontWeight = "bold"
        }
    } else {
      taskDoc = doc.split(" ");
      target = document.getElementById(taskDoc[1]);
      if (target.style.fontWeight === "bold") {
          target.style.fontWeight = "normal"
        } else {
          target.style.fontWeight = "bold"
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
  var children;
  var completed = true;
  target = document.getElementById(doc);
  children = document.getElementsByClassName(doc);
  for (var index = 0; index < children.length; index++) {
    if( !children[index].classList.contains('complete') )
    {
      completed = false;
    }
  }
  if( completed )
  {
  document.getElementById(doc).style.backgroundColor = "#41F415";
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
