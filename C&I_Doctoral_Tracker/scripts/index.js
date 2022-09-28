function doFetchRequest() {
	const axios = require('axios');
	axios.get("http:142.11.236.52:8080/student/bjs397")
	.then(response => {
		console.log(response.data);
	}, (error) => {
		console.log(error);
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
