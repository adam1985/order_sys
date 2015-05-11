define(["./controllerMod"], function (controllerMod) {
    return controllerMod
        .controller("viewCtrl", ["$scope","serviceData", function($scope, serviceData){

        }])

        .controller("orderFormCtrl", ["$scope", function($scope){
            $scope.statusList = [
                {
                    id: 1,
                    name: "未投放"
                },
                {
                    id: 2,
                    name: "已投放"
                },
                {
                    id: 3,
                    name: "暂停"
                },
                {
                    id: 4,
                    name: "停止"
                }
            ];
        }]);
});


