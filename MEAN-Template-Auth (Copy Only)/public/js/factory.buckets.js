angular.module('Buckets')
    .factory('bucketFactory', bucketFactory);



bucketFactory.$inject = ['$http'];

function bucketFactory($http) {


    return {


        getBucket: function (bucketID) {
            console.log("Hit the getBucket in factory");
            bucketID = bucketID ? '/' + bucketID : ''
            return $http.get('/api/buckets' + bucketID)
        },

        getUserId: function () {
            console.log('Hit getUserId in factory');
            $http.get('/api/getUserId')
        },

        getUserData: function () {
            console.log('Hit getUserData in factory');
            $http.get('/api/getUserData')
        },

        edit: function (id) {
            console.log('editFactory: ', id)
            return $http.get('/api/buckets/' + id)
        },

        update: function (newData) {
            console.log('updateFactory:', newData)
            return $http.put('/api/buckets/', newData)
        },

        remove: function (id) {
            console.log('removeFactory', id)
            return $http.post('/api/buckets/' + id)
        },

        addBucket: function (bucketItem) {
            return $http.post('/api/buckets', bucketItem);
        },

        createUser: function (userData) {
            return $http.post('/register', userData);
        },

    }
}
