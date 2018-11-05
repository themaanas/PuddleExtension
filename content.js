window.onload = function () {
	firebase.initializeApp({
		apiKey: 'AIzaSyD2YTfH5lKGHP9Rh7W-cpNwj9faPZI2xl4',
		authDomain: 'groceries-1e035.firebaseapp.com',
		projectId: 'groceries-1e035'
	});

	// Initialize Cloud Firestore through Firebase
	var db = firebase.firestore();

	// Disable deprecated features
	db.settings({
		timestampsInSnapshots: true
	});
	db.collection("info").doc("info").get().then(function (doc) {
		if (doc.exists) {
			var todaysDate = new Date().toLocaleDateString("en-US");
			if (todaysDate !== doc.data().date) {
				$.get("https://api.unsplash.com/photos/random/?client_id=fbc3a193468c6e2e45a7134d4bd436dbb06416e4882f78decb8d11853e5dc1fc", {
						collections: 162213
					})
					.done(function (data) {
						console.log(data);
						db.collection("info").doc("info").set({
							text: doc.data().text,
							date: todaysDate,
							url: data.urls.regular
						})
						document.getElementById("image").src = data.urls.regular;
					});
			} else {
				document.getElementById("image").src = doc.data().url;
			}
			console.log("Document data:", doc.data().text);
			document.getElementById("info").innerHTML = doc.data().text.replace(/-n/g, "<br>");
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	}).catch(function (error) {
		console.log("Error getting document:", error);
	});
	document.getElementById("title").innerHTML = "HHS PUDDLE - " + new Date().toLocaleDateString("en-US");

	var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}