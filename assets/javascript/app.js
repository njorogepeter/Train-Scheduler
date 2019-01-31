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


  $("#add-tain-btn").on("click", function(){

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

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

  });