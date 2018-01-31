angular.module('Interview')
    .factory('interviewFactory', interviewFactory);

interviewFactory.$inject = ['$http'];

function interviewFactory($http) {
    
    return {
        
        addInterview: function (interviewInfo) {
            console.log('addInt in factory', interviewInfo);
            return $http.post('/api/interview', interviewInfo);
        },
        
        getInterview: function () {
            console.log('getInterview in factory');
            return $http.get('/api/interview');
        },
        
        editInterview: function (id) {
            console.log('editInt in factory', id);
            return $http.get('/api/interview/' + id);
        },
        
        removeInterview: function (id) {
            console.log('removeInt in factory', id);
            return $http.post('/api/interview/' + id);
        },
        
        updateInterview: function (interviewInfo) {
            console.log('updateInterview factory:', interviewInfo)
            return $http.put('/api/interview/', interviewInfo)
        },
    }
    
}