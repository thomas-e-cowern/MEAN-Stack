angular.module('Career', [])
    .controller('careerController', careerController);


careerController.$inject = ['careerFactory', "$http"];

function careerController(careerFactory, $http) {
    var career = this;

    career.message = 'This is the career controller';
    career.careerInfo = {};
    career.editCareer = {};
    career.careerList = [];
    career.showEdit = true;
    career.showAdd = false;

    career.getCareer = function () {
        console.log('hit getCareer');
        careerFactory.getCareer()
            .then(function (intResponse) {
                console.log('getCareer resp: ', intResponse.data);
                career.careerList = intResponse.data;
            });
    };

    career.getCareer();

    career.clearModal = function () {
        career.careerInfo = {};
        career.showEdit = true;
        career.showAdd = false;
    };

    career.addCareer = function () {
        console.log('Career info', career.careerInfo);

        careerFactory.addCareer(career.careerInfo)
            .then(function (returnData) {
                console.log('addCareer return data: ', returnData)
                career.clearModal();
                career.getCareer();
            });
    };

    career.removeCareer = function (id) {
        console.log('removeCareer id:', id);

        careerFactory.removeCareer(id).then(function (returnData) {
            console.log('returned from removeCareer: ', returnData.data);
            career.getCareer();
        });
    };

    career.editCareer = function (id) {
        console.log('editCareer id: ', id);
        career.showEdit = false;
        career.showAdd = true;

        careerFactory.editCareer(id).then(function (returnData) {
            console.log('returned from editCareer: ', returnData.data);
            career.careerInfo = returnData.data;
        });
    };

    career.updateCareer = function () {
        console.log(career.careerInfo)
        careerFactory.updateCareer(career.careerInfo)
            .then(function (returnData) {
                console.log('returned from updateCareer: ', returnData.data);
                career.getCareer();
            });

        career.clearModal();
    };

};
