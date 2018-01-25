angular.module('Resume')
    .factory('resumeFactory', resumeFactory);



resumeFactory.$inject = ['$http'];

function resumeFactory($http) {


    return {

        createUser: function (userData) {
            return $http.post('/register', userData);
        },

        getUserId: function () {
            console.log('Hit getUserId in factory');
            $http.get('/api/getUserId')
        },

        getUserData: function () {
            console.log('Hit getUserData in factory');
            $http.get('/api/getUserData')
        },
        
        addResume: function (newResData) {
            console.log('Hit addResume in factory', newResData);
            return $http.post('/api/resume', newResData);
        },
        
        getResume: function () {
            console.log('Hit getResume in factory');
            return $http.get('/api/resume');
        },

        getBucket: function (bucketID) {
            console.log("Hit the getBucket in factory");
            bucketID = bucketID ? '/' + bucketID : ''
            return $http.get('/api/buckets' + bucketID)
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

        addBucket: function (bucketItem) {
            return $http.post('/api/buckets', bucketItem);
        },



    }
}
