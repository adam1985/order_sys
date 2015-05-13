define(["./controllerMod"], function (controllerMod) {
    return controllerMod
        .controller("viewCtrl", ["$scope",function($scope){

        }])

        .controller("orderOperateCtrl", ["$scope", "orderResource", function($scope, orderResource){

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

            $scope.rows = 5;

            $scope.orderResourcePromise = orderResource.readAll({
                page: 1,
                rows: $scope.rows
            }).$promise.then(function(res){
                if(res.success){
                    var data = res.data,
                        page = +data.page,
                        total = +data.totle,
                        totalPages = Math.ceil( total / $scope.rows );

                        $scope.order_list = data.rows;
                        $scope.totalPages = totalPages;
                        $scope.page = page;
                }
            });

        }]);
});


