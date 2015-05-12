define(["./controllerMod"], function (controllerMod) {
    return controllerMod
        .controller("viewCtrl", ["$scope",function($scope){

        }])

        .controller("orderFormCtrl", ["$scope", "remoteResource", function($scope, remoteResource){
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

            remoteResource.getOrderList({
                page: 1,
                rows: 5
            }).success(function(res){
                if(res.success){
                    var data = res.data,
                        page = data.page,
                        total = data.total;
                        $scope.order_list = data.rows;
                }
            });


        }]);
});


