define(["./controllerMod"], function (controllerMod) {
    return controllerMod
        .controller("viewCtrl", ["$scope",function($scope){

        }])

        .controller("orderOperateCtrl", ["$scope", "orderResource", "aderGroupResource", function($scope, orderResource, aderGroupResource){

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

            $scope.aderGroupPromise = aderGroupResource.get(function(res){
                if(res.success){
                    var data = res.data, aders = [];
                    $.each(data, function(key, val){
                        if(angular.isArray(val)){
                            $.each(val, function(i, name){
                                aders.push({
                                    name: name,
                                    group: key
                                });
                            });
                        }

                    });

                    $scope.aderCroups = aders;

                }


            }).$promise;

            $scope.rows = 5;

            $scope.orderAction = {
                isCreate: false
            };

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

            $scope.createOrder = function(){
                orderResource.create({}, $scope.order, function(res){
                    $scope.order = null;
                });
            };

            $scope.readOrder = function(id){
                orderResource.read({id: id}, function(order){
                    if(order.success){
                        $scope.order = order.data;
                    }
                });
            };

            $scope.emptyOrder = function(){
                $scope.order = {};
            };

            $scope.updateOrder = function(id){
                orderResource.read({id: id}, function(order){
                    if(order.success){
                        $scope.order = order.data;
                    }
                });
            };

        }]);
});


