angular.module('Interview', [])
    .controller('interviewController', interviewController);


interviewController.$inject = ['interviewFactory', "$http"];

function interviewController(interviewFactory, $http) {
    var interview = this;

    interview.message = 'This is the interview controller';
    interview.interviewInfo = {};
    interview.editInterview = {};
    interview.interviewList = [];
    interview.showEdit = true;
    interview.showAdd = false;

    interview.getInterview = function () {
        console.log('hit getInterview');
        interviewFactory.getInterview()
            .then(function (intResponse) {
                console.log('getInt resp: ', intResponse.data);
                interview.interviewList = intResponse.data;
            });
    };

    interview.getInterview();

    interview.clearModal = function () {
        interview.interviewInfo = {};
        interview.showEdit = true;
        interview.showAdd = false;
    };

    interview.addInterview = function () {
        console.log('Interview info', interview.interviewInfo);

        interviewFactory.addInterview(interview.interviewInfo)
            .then(function (returnData) {
                console.log('addInt return data: ', returnData)
                interview.clearModal();
                interview.getInterview();
            });
    };

    interview.removeInterview = function (id) {
        console.log('removeInterveiw id:', id);

        interviewFactory.removeInterview(id).then(function (returnData) {
            console.log('returned from removeInt: ', returnData.data);
            interview.getInterview();
        });
    };

    interview.editInterview = function (id) {
        console.log('editInterview id: ', id);
        interview.showEdit = false;
        interview.showAdd = true;

        interviewFactory.editInterview(id).then(function (returnData) {
            console.log('returned from editInt: ', returnData.data);
            interview.interviewInfo = returnData.data;
        });
    };

    interview.updateInterview = function () {
        console.log(interview.interviewInfo)
        interviewFactory.updateInterview(interview.interviewInfo)
            .then(function (returnData) {
                console.log('returned from updateInterview: ', returnData.data);
                interview.getInterview();
            });

        interview.clearModal();
    };

};
