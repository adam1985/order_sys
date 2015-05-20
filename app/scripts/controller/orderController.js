define(["./controllerMod"], function (controllerMod) {
    return controllerMod
        .controller("viewCtrl", ["$scope",function($scope){

        }])

        .controller("orderOperateCtrl", ["$scope", "$rootScope", "$q", "orderResource", "aderGroupResource", "renderChosenServer", function($scope, $rootScope, $q, orderResource, aderGroupResource, renderChosenServer){

            $scope.renderChosenServer = renderChosenServer;

            $scope.rows = 5;

            $scope.orderAction = {
                isCreate: false
            };

            $scope.status = [
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

            $scope.order_filter = {};

            $scope.searchOrder = function(){
                var order_filter = angular.copy($scope.order_filter),
                    advertiser = order_filter.advertiser,
                    order_status = order_filter.order_status,
                    statusTems = [];

                if(advertiser){
                    order_filter.advertiser = advertiser.join(',');
                }

                if(order_status){
                    $.each(order_status, function(key, val){
                        if(val !== false){
                            statusTems.push(val);
                        }
                    });

                    order_filter.order_status = statusTems.join(',');
                }

                $scope.allOrder(angular.extend(order_filter, {page: 1, rows: $scope.rows}));
            };

            $scope.changeStatus = function(id){

            };


            $scope.allOrder = function( data ){
                return orderResource.readAll(data, function(res){
                    if(res.success){
                        var data = res.data,
                            page = +data.page,
                            total = +data.totle,
                            totalPages = Math.ceil( total / $scope.rows );

                        $scope.order_list = data.rows;
                        $scope.totalPages = totalPages;
                        $scope.page = page;
                    }
                }).$promise;
            };

            $scope.createOrder = function(){
                var defer = $q.defer(), p = defer.promise;
                orderResource.create($scope.order, function(res){

                    if(res.success){
                        $scope.order = null;
                        defer.resolve();
                    } else {
                        $scope.errMsg = res.msg;
                        defer.reject();
                    }

                });

                return p;
            };

            $scope.readOrder = function(id){
                var defer = $q.defer(), p = defer.promise;
                $scope.orderAction.isCreate = false;
                orderResource.read({id: id}, function(res){
                    if(res.success){
                        var data = res.data;

                        $scope.order = data;
                        $scope.order.hidden_end_date = data.end_date;

                        defer.resolve();

                    } else {
                        defer.reject();
                    }
                });

                return p;
            };

            $scope.emptyOrder = function(){
                var defer = $q.defer(), p = defer.promise;
                $scope.order = {};
                $scope.orderAction.isCreate = true;
                defer.resolve();
                return p;
            };

            $scope.updateOrder = function(){
                var defer = $q.defer(), p = defer.promise;
                orderResource.update($scope.order, function(res){
                    if(res.success){
                        $scope.order = null;
                        defer.resolve();
                    } else {
                        $scope.errMsg = res.msg;
                        defer.reject();
                    }

                });

                return p;
            };

            $scope.orderResourcePromise = $scope.allOrder({
                page: 1,
                rows: $scope.rows
            });

            $scope.aderGroupPromise = aderGroupResource.get(function(res){
                if(res.success){
                    var data = res.data, aders = [];
                    $.each(data, function(key, val){
                        if(angular.isArray(val)){
                            $.each(val, function(i, name){
                                aders.push({
                                    name: name,
                                    value: name,
                                    group: key
                                });
                            });
                        }
                    });
                    $scope.aderCroups = aders;
                }
            }).$promise;

        }]);


});


