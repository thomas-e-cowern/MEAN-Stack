angular.module('Resume', [])
    .controller('homeController', homeController);


homeController.$inject = ['resumeFactory', "$http"];

function homeController(resumeFactory, $http) {
    var home = this;

    home.resumeInfo = {};
    home.editResume = {};
    home.resumeList = [];
    home.show = true;

    home.newbucket = {};
    home.bucket = {};
    home.bucketList = [];
    home.taskList = [];
    home.addbucket = {};
    home.BucketItem = {};
    home.greeting = 'Welcome to the resume tracker!';
    home.user = {
        complete: false
    };
    home.user = "";
    var task = "";
    home.days = [];
    home.userData = {}

    home.getResume = function () {
        resumeFactory.getResume()
            .then(function (resResponse) {
                console.log('getResume resp: ', resResponse.data);
                home.resumeList = resResponse.data;
            });
    };


    home.getResume();

    home.clearModal = function () {
        home.resumeInfo = {};
    };

    home.refresh = function () {
        console.log('page refreshed');


        $http.get('/api/getUserID')
            .then(function (res) {
                console.log(res.data);
                if (res.data === 'No user logged in') {

                    //                
                    $http.get('/homepage')
                    console.log('get homepage');
                    return;



                } else {

                    console.log("getUserID api :", res.data);
                    home.getBucket(res.data); // get one
                    //  home.BucketItem = {};
                    home.user = res.data;
                    console.log("Loser: ", home.user);
                    return home.user;


                }




                // console.log("Get attempt: ", user);
            })
            .catch(function (err) {
                console.log("getUserID error :", err);
            });

    }

    //    home.refresh();


    home.getUserData = function () {
        console.log('Hit get user data');

        $http.get('/api/getUserData').then((res) => {
            console.log('getUserData ', res);
            home.userData = res
        });
    }
    //    

    home.addResume = function () {
        console.log('Hit addResume function');
        console.log('newResInfo: ', home.resumeInfo)
        resumeFactory.addResume(home.resumeInfo)
            .then(function (returnData) {
                console.log('newRes return data: ', returnData)
                home.resumeList.push = returnData;
                console.log(home.resumeList.data);
            });
        home.clearModal();
        home.getResume();
    };

    home.createBucket = function () {
        bucketFactory.createBucket(home.newBucket)
            .then(function (returnData) {
                console.log('Response from server : ', returnData)
                home.newBucket = {}; // reset the form
                home.getBucket();

                window.location.href = "/";
            }).catch(function (err) {
                console.log("create bucket error", err);
            });
    }

    home.createUser = function () {
        resumeFactory.createUser(home.newUser)
            .then(function (returnData) {
                console.log('User reg res from server : ', returnData)
                home.newUser = {}; // reset the form

                window.location.href = "/";
            }).catch(function (err) {
                console.log("create user error", err);
            });
    }

    home.getUserInfo = function () {
        console.log('Hit the getUserInfo function')
        $http.get('/api/userID').then((res) => {
            console.log('getUserInfo ', res);
        });
    };

    home.removeResume = function (id) {
        console.log(id);

        resumeFactory.removeResume(id).then(function (returnData) {
            console.log('returned from remove: ', returnData.data);
            //            home.BucketItem.bucketname = returnData.data.bucketname;
            home.getResume();
        });
    };

    home.deselect = function () {

        console.log('hit deselect')

        home.restoreAdd();
        home.BucketItem.bucketname = null;
        document.getElementById('update').disabled = true;
    }

    home.restoreAdd = function () {
        console.log('hit restoreAdd')
        document.getElementById('add').disabled = false;
    }

    home.editResume = function (id) {
        console.log('editResume id: ', id);
        home.show = false;

        resumeFactory.editResume(id).then(function (returnData) {
            console.log('returned from resumeEdit: ', returnData.data);
            home.resumeInfo = returnData.data;
        });
        home.clearModal();
    };



    home.updateResume = function () {
        console.log(home.resumeInfo)

        console.log('Hit updateResume')

        resumeFactory.updateResume(home.resumeInfo).then(function (returnData) {
            console.log('returned from updateResume: ', returnData.data);
            home.getResume();
        });
        home.clearModal();
        home.show = true;
    };

}
