function dropDown(doc) {
    var target = document.getElementById(doc);
    if (target.style.display === "none") {
        target.style.display = "block";
    } else {
        target.style.display = "none";
    }
    document.getElementById('one').style.backgroundColor = "#41F415";
}
