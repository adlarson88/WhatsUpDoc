function doFetchRequest() {
	require(['require', 'axios'], function (require) {
		axios.get("http:142.11.236.52:8080/student/bjs397")
		  .then(function (response) {
				console.log(response);
			})
			.then(function (error) {
				console.log(error);
			})
			.then(function () {
			});
	});

}

function dropDown(doc) {
    var target = document.getElementById(doc);
    if (target.style.display === "none") {
        target.style.display = "block";
    } else {
        target.style.display = "none";
    }
}
