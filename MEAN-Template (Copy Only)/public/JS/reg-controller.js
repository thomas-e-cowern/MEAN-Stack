angular.module("regApp",[])
    .controller("regCtrl", regCtrl);

regCtrl.$inject = ["$http"];

function regCtrl($http) {
    var reg = this;
    
    reg.message = "Welcome to the registration page";
    
    reg.createUser = function () {
        console.log('Create user clicked');
        console.log(reg.newUser);
        
        $http.post("/register", reg.newUser).then(function (response) {
            console.log("Resister response: ",response);
        });
    }
}