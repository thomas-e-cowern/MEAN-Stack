angular.module('Buckets', ["xeditable"])
    .controller('homeController', homeController);


homeController.$inject = ['bucketFactory', "$http"];

function homeController(bucketFactory, $http) {
    var home = this;
    home.newbucket = {};
    home.bucket = {};
    home.bucketList = [];
    home.taskList = [];
    home.addbucket = {};
    home.BucketItem = {};
    home.greeting = 'Welcome to the bucket list!';
    home.user = {
        complete: false
    };
    home.user = "";
    var task = "";
    home.days = [];
    home.userData = {}



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

    home.refresh();


    home.getUserData = function () {
        console.log('Hit get user data');

        $http.get('/api/getUserData').then((res) => {
            console.log('getUserData ', res);
            home.userData = res
        });
    }
    //    

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
        bucketFactory.createUser(home.newUser)
            .then(function (returnData) {
                console.log('Response from server : ', returnData)
                home.newUser = {}; // reset the form
                // home.getBucket();

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

    home.getBucket = function () {
        console.log("Hit the GET function");
        bucketFactory.getBucket()
            .then(function (returnData) {
                console.log("buckets", returnData.data);
                if (returnData.data !== undefined) {
                    // if array (has length), store in bucketList

                    home.bucketList = returnData.data;
                    console.log("Bucekys", home.bucketList)

                } else {
                    // if not, store in bucket
                    home.bucketList = [];
                }
            });

    }

    home.addBucket = function () {
        console.log("Hit addBucket", home.BucketItem);

        bucketFactory.addBucket(home.BucketItem)
            .then(function (returnData) {
                home.BucketItem = {
                    userid: home.user
                }
                console.log("addBucket response from server: ", returnData);
                home.getBucket(); // get many

            }).catch(function (err) {
                console.log("addBucket error: ", err);
            });

        home.refresh();
    }


    home.remove = function (id) {
        console.log(id);

        bucketFactory.remove(id).then(function (returnData) {
            console.log('returned from remove: ', returnData.data);
            home.BucketItem.bucketname = returnData.data.bucketname;
            home.refresh();
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

    home.edit = function (id) {

        document.getElementById('add').disabled = true;
        document.getElementById('update').disabled = false;

        bucketFactory.edit(id).then(function (returnData) {
            console.log('returned from edit: ', returnData.data);
            home.BucketItem = returnData.data;
        });
    };

    home.update = function (data) {
        console.log(data)

        document.getElementById('add').disabled = true;
        document.getElementById('update').disabled = false;
        var newData = {
            _id: data._id,
            bucketname: data.bucketname
        }

        console.log(newData);
        bucketFactory.update(newData).then(function (returnData) {
            console.log('returned from update: ', returnData.data.bucketname);
            home.BucketItem.bucketname = returnData.data.bucketname;
            home.deselect();
            home.refresh();
        });



    };


}
