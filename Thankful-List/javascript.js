//var myApp = angular.module("myApp", []);
//
//myApp.controller("AppCtrl", ['$scope', '$http', function($scope, $http) {
//    
//    console.log("Hello from the controller");
//    
//    
//    
//}]) 

angular.module('myApp', []).controller("AppCtrl", AppCtrl);

function AppCtrl() {

    var home = this;

    home.newGL = [];

    home.retrievedGL = {};

    console.log("Hello from the this controller");

    home.getNewList = function () {

        for (i = 1; i < 4; i++) {

            var id = "Greatful" + i

            home.newGL.push(document.getElementById(id).value);

            document.getElementById(id).value = "";


            //            console.log(home.newGL);

        }

        var newDate = document.getElementById("date").value;

        console.log(newDate);

        var firebaseRef = firebase.database().ref();
        firebaseRef.child(newDate).set(home.newGL);

        home.newGL = [];

    }

    home.getGratefulList = function () {

        var firebaseGetGrafefulList = firebase.database().ref();

        firebaseGetGrafefulList.on('value', function (dataSanp) {

            home.retrievedGL = dataSanp.val();

            console.log(home.retrievedGL);
        });




    }


}
