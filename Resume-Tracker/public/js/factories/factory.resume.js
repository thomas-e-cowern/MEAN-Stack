angular.module('Resume')
    .factory('resumeFactory', resumeFactory);

resumeFactory.$inject = ['$http'];

function resumeFactory($http) {


    return {

//        createUser: function (userData) {
//            return $http.post('/register', userData);
//        },
//
//        getUserData: function () {
//            console.log('Hit getUserData in factory');
//            return $http.get('/api/getUserData')
//        },
//        
//        updateUserData: function (userData) {
//            console.log('Hit updateUserData in factory');
//            return $http.put('/api/updateUserData', userData);
//        },
        
        addResume: function (newResData) {
            console.log('Hit addResume in factory', newResData);
            return $http.post('/api/resume', newResData);
        },
        
        getResume: function () {
            console.log('Hit getResume in factory');
            return $http.get('/api/resume');
        },

        editResume: function (id) {
            console.log('editResumeFactory: ', id)
            return $http.get('/api/resume/' + id)
        },

        updateResume: function (resumeInfo) {
            console.log('updateResume factory:', resumeInfo)
            return $http.put('/api/resume/', resumeInfo)
        },

        removeResume: function (id) {
            console.log('removeResume factory', id)
            return $http.post('/api/resume/' + id)
        },

    }
}
