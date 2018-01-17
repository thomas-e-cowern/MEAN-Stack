angular.module("myApp", [])
    .controller("appCtrl", appCtrl);

appCtrl.$inject = ["$http"];

function appCtrl($http) {
    var home = this;
//    home.dummyData = [];
    home.dummyName = {};

    home.message = "Second Hello";

    console.log('Second Hello');

    home.refresh = function () {
        $http.get("/dummydata").then(function (response) {
            console.log("Data received");
            home.dummyData = response.data;
            console.log(home.dummyData);
            home.dummyName = {};

        });
    }

    home.refresh();

    home.addDummyData = function () {

        console.log(home.dummyName);

        $http.post("/dummydata", home.dummyName).then(function (response) {
            console.log(response);
            home.refresh();
        });

        
    }

    home.deleteDummyData = function (id) {

        console.log("Delete Clicked ID:" + id);

        $http.delete("/dummydata/" + id).then(function (response) {
            console.log(response);
            home.refresh();
        });

        

    }
    
    home.editDummyData = function (id) {
        console.log("Edit clicked ID:" + id);
        $http.get("/dummydata/" + id).then(function (response) {
           home.dummyName = response.data; 
        });
        document.getElementById("add").disabled = true;
    }

        
    home.updateDummyData = function () {
        console.log(home.dummyName._id);
        $http.put("/dummydata/" + home.dummyName._id, home.dummyName).then(function (response) {
            console.log(response.data);
            home.refresh();
        });
        
        document.getElementById("add").disabled = false;
//        home.refresh();
    }

    
}



//var myApp = angular.module("myApp", []);
//
//myApp.controller("appCtrl", [
//    console.log("Hello from the controller")
//    
//           
//]);
