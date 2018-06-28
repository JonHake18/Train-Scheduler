$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyD6ErASWg7xq_jONxh7bFm4GD1lZ-cBfrA",
        authDomain: "train-scheduler-35cbb.firebaseapp.com",
        databaseURL: "https://train-scheduler-35cbb.firebaseio.com",
        projectId: "train-scheduler-35cbb",
        storageBucket: "",
        messagingSenderId: "663879190309"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    // 2. Button for adding Employees
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();
      
        // Grabs user input
        var trainName = $("#train-name-input").val().trim();
        var trainLine = $("#line-input").val().trim();
        var trainDest = $("#destination-input").val().trim();
        var trainTime = moment($("#train-time-input").val().trim(), "hh:mm").format("X");
        var trainFreq = $("#frequency-input").val().trim();
      
        // Creates local "temporary" object for holding employee data
        var newTrain = {
          name: trainName,
          line: trainLine,
          destination: trainDest,
          time: trainTime,
          frequency: trainFreq
        };
      
        // Uploads employee data to the database
        database.ref().push(newTrain);
      
        // Logs everything to console
        console.log(newTrain.name);
        console.log(newTrain.line);
        console.log(newTrain.destination);
        console.log(newTrain.time);
        console.log(newTrain.frequency);
      
        // Clears all of the text-boxes
        $("#train-name-input").val("");
        $("#line-input").val("");
        $("#destination-input").val("");
        $("#train-time-input").val("");
        $("#frequency-input").val("");
    });

    // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function (childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var trainLine = childSnapshot.val().line;
        var trainDest = childSnapshot.val().destination;
        var trainTime = childSnapshot.val().time;
        var trainFreq = childSnapshot.val().frequency;

        // Employee Info
        console.log(trainName);
        console.log(trainLine);
        console.log(trainDest);
        console.log(trainTime);
        console.log(trainFreq);

        // Prettify the employee start
        // var diffTime = moment().diff(moment.unix(trainTime), "minutes");
		var timeRemainder = moment().diff(moment.unix(trainTime), "minutes") % trainFreq ;
		var minutes = trainFreq - timeRemainder;

        // Calculate the months worked using hardcore math
        // To calculate the months worked
        var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 

        // Calculate the total billed rate
        console.log(minutes);
		console.log(nextTrainArrival);
		console.log(moment().format("hh:mm A"));
		console.log(nextTrainArrival);
		console.log(moment().format("X"));

        // Add each train's data into the table
        $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainLine + "</td><td>"+ trainDest + "</td><td>" + trainFreq + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");
    });
});

