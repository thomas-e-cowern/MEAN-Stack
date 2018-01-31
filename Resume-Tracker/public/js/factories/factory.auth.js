angular.module('Authentication')
    .factory('authFactory', authFactory);

authFactory.$inject = ['$http'];

function authFactory($http) {

    return {
        
        createUser: function (userData) {
            return $http.post('/register', userData);
        },

        getUserData: function () {
            console.log('Hit getUserData in factory');
            return $http.get('/api/getUserData')
        },
        
        updateUserData: function (userData) {
            console.log('Hit updateUserData in factory');
            return $http.put('/api/updateUserData', userData);
        },
    }

}