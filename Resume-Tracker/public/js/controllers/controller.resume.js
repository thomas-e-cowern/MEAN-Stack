angular.module('Resume', [])
    .controller('homeController', homeController);


homeController.$inject = ['resumeFactory', "$http"];

function homeController(resumeFactory, $http) {
    var home = this;

    home.resumeInfo = {};
    home.editResume = {};
    home.resumeList = [];
    home.showEdit = true;
    home.showAdd = false;
    home.daystoadd = 10;

    home.generateDate = function () {
        home.datesubmitted = new Date();
        home.followupdate = moment(home.datesubmitted).add(home.daystoadd, 'days')
        home.resumeInfo.datesubmitted = home.datesubmitted;
        home.resumeInfo.followupdate = home.followupdate;
    };

    home.getResume = function () {
        resumeFactory.getResume()
            .then(function (resResponse) {
                console.log('getResume resp: ', resResponse.data);
                    if (resResponse.data === 'No session info') {
                        window.location.href = "/html/start.html";
                    }
                home.resumeList = resResponse.data;
            });
        
    };


    home.getResume();

    home.clearModal = function () {
        home.resumeInfo = {};
        home.showEdit = true;
        home.showAdd = false;
    };

//    home.getUserData = function () {
//        console.log('Hit get user data');
//        resumeFactory.getUserData()
//            .then(function (returnUser) {
//                console.log('getUserData ', returnUser.data);
//                home.userData = returnUser.data;
//                home.userData.created = moment(returnUser.data.created);
//            });
//
//    }
//    
//    home.getUserData();
    
    home.addResume = function () {
        console.log('Hit addResume function');
        console.log('newResInfo: ', home.resumeInfo)
        resumeFactory.addResume(home.resumeInfo)
            .then(function (returnData) {
                console.log('newRes return data: ', returnData)
            });
        home.clearModal();
        home.getResume();
    };
    
//    home.updateUserData = function () {
//      console.log('Hit updateUserData');  
//        console.log('updateUserData: ', home.userData);
//        resumeFactory.updateUserData(home.userData)
//            .then(function (returnData) {
//                console.log('updateUserData return: ', returnData); 
//        });
//    };
//
//    home.createUser = function () {
//        resumeFactory.createUser(home.newUser)
//            .then(function (returnData) {
//                console.log('User reg res from server : ', returnData)
//                home.newUser = {}; // reset the form
//                window.location.href = "/";
//            }).catch(function (err) {
//                console.log("create user error", err);
//            });
//    };

    home.removeResume = function (id) {
        console.log(id);

        resumeFactory.removeResume(id).then(function (returnData) {
            console.log('returned from remove: ', returnData.data);
            home.getResume();
        });
    };

    home.editResume = function (id) {
        console.log('editResume id: ', id);
        home.showEdit = false;
        home.showAdd = true;

        resumeFactory.editResume(id).then(function (returnData) {
            console.log('returned from resumeEdit: ', returnData.data);
            home.resumeInfo = returnData.data;
        });
    };

    home.updateResume = function () {
        console.log(home.resumeInfo)
        resumeFactory.updateResume(home.resumeInfo).then(function (returnData) {
            console.log('returned from updateResume: ', returnData.data);
            home.getResume();
        });
        home.clearModal();
    };

}
