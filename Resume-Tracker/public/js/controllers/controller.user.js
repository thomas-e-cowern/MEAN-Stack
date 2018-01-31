angular.module('User', [])
    .controller('userController', userController);

userController.$inject = ['$http', 'userFactory'];

function userController($http, userFactory) {
    var user = this;
        
    user.userData = {};
    user.newUser = {};
    
    user.login = function () {
        console.log(user.login);

        $http({
            method: 'POST',
            url: '/login',
            data: {
                email: user.email,
                password: user.password
            }
        }).then(function (res) {
            console.info("login response: ", res.data);

            location.href = '/';
        }, function (err) {
            // DO NOT FORGET!!!! an error callback

            // when things go bad, you need this!!!!!!!!
            console.error('Login error: ', err.data.message);
            user.message = err.data.message;
        });
    };

    user.getUserData = function () {
        console.log('Hit get user data');
        userFactory.getUserData()
            .then(function (returnUser) {
                console.log('getUserData ', returnUser.data);
                user.userData = returnUser.data;
                user.userData.created = moment(returnUser.data.created);
            });

    };
    
    user.getUserData();
    
    user.updateUserData = function () {
      console.log('Hit updateUserData');  
        console.log('updateUserData: ', user.userData);
        userFactory.updateUserData(user.userData)
            .then(function (returnData) {
                console.log('updateUserData return: ', returnData); 
        });
    };
    
      user.createUser = function () {
        userFactory.createUser(user.newUser)
            .then(function (returnData) {
                console.log('User reg res from server : ', returnData)
                user.newUser = {}; // reset the form
                window.location.href = "/";
            }).catch(function (err) {
                console.log("create user error", err);
            });
    };
};
