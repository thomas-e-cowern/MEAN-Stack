angular.module('Career')
    .factory('careerFactory', careerFactory);

careerFactory.$inject = ['$http'];

function careerFactory($http) {
    
    return {
        
        addCareer: function (careerInfo) {
            console.log('addCareer in factory', careerInfo);
            return $http.post('/api/career', careerInfo);
        },
        
        getCareer: function () {
            console.log('getCareer in factory');
            return $http.get('/api/career');
        },
        
        editCareer: function (id) {
            console.log('editCareer in factory', id);
            return $http.get('/api/career/' + id);
        },
        
        removeCareer: function (id) {
            console.log('removeCareer in factory', id);
            return $http.post('/api/career/' + id);
        },
        
        updateCareer: function (careerInfo) {
            console.log('updateCareer factory:', careerInfo)
            return $http.put('/api/career/', careerInfo)
        },
    }
    
}