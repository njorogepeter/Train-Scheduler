// initialize firebase
  var config = {
    apiKey: "AIzaSyCdKHUEOt9FTLNFJdUoPiODJJNC3Ud1w-M",
    authDomain: "trainscheduler-3e452.firebaseapp.com",
    databaseURL: "https://trainscheduler-3e452.firebaseio.com",
    projectId: "trainscheduler-3e452",
    storageBucket: "trainscheduler-3e452.appspot.com",
    messagingSenderId: "524072041156"
  };
  firebase.initializeApp(config);

  // database variable
  var database = firebase.database();

  // whenever user clicks add button
  $("#add-train-btn").on("click", function(){

    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var frequency = $("#frequency-input").val().trim();


    var newTrain = {

        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };

    // Firebase watcher + pushes train data into database upon clicking add button on webpage
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("frequency-input").val("");

    //checks for next train arrival
    return false; 

  });
  //retrieves train data from the database and populates into table
  database.ref().on("child_added", function(snap){

    console.log(snap.val().name);

    var val = snap.val();
  
    // Store everything into a variable.
    var name = val.name;
    var destination = val.destination;
    var frequency = val.frequency;
    var firstTrain = val.firstTrain;

    // First Time
    var timeArr = firstTrain.split(":");
    var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var tMinutes;
    var tArrival;

    if(maxMoment === trainTime){
        tArrival = trainTime.format("hh:mm A");
        tMinutes = trainTime.diff(moment(), "minutes");

    } else {
        // Difference between the times
        var differenceTimes = moment().diff(trainTime, "minutes");
        
        // Train apart (remainder)
        var tRemainder = differenceTimes % frequency;
        
        // Minute Until Train
        tMinutes = frequency - tRemainder;
        
        // Next Train
        tArrival = moment().add(tMinutes, "m").format("hh:mm A");
    }

    console.log("tMinutes:", tMinutes);
    console.log("tArrival:", tArrival);


    $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>"
    + tArrival + "</td><td>" + tMinutes + "</td></tr>");

  });