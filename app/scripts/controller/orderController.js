define(["./controllerMod"], function (controllerMod) {
    return controllerMod
        .controller("rootViewCtrl", ["$scope",function($scope){

        }])

        .controller("orderOperateCtrl", ["$scope", "$rootScope", "$http", "$q", "orderResource", "aderGroupResource", "renderChosenServer", function($scope, $rootScope, $http, $q, orderResource, aderGroupResource){

            //分页条数
            $scope.rows = 5;

            $rootScope.orderAction = {
                isCreate: false
            };

            $scope.status = [
                {
                    id: 0,
                    name: "未投放"
                },
                {
                    id: -1,
                    name: "已投放"
                },
                {
                    id: 1,
                    name: "暂停"
                },
                {
                    id: 2,
                    name: "停止"
                }
            ];

            $scope.order_filter = {};
            $scope.order_extra = {};

            // 订单查询
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

                $scope.order_extra = angular.copy(order_filter);

                return $scope.allOrder(angular.extend(order_filter, {page: 1, rows: $scope.rows}));
            };


            // 订单列表
            $scope.allOrder = function( data, extra ){
                return orderResource.readAll($.extend(data,extra || {}), function(res){
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

            // 新建订单
            $scope.createOrder = function(){
                var defer = $q.defer(), p = defer.promise;
                orderResource.create($rootScope.order, function(res){

                    if(res.success){
                        $rootScope.order = {};
                        defer.resolve();
                    } else {
                        $scope.errMsg = res.msg;
                        defer.reject();
                    }

                });

                return p;
            };

            // 读取单条订单
            $scope.readOrder = function(id){
                var defer = $q.defer(), p = defer.promise;
                $rootScope.orderAction.isCreate = false;
                orderResource.read({id: id}, function(res){
                    if(res.success){
                        var data = res.data;
                        $rootScope.order = data;
                        $rootScope.order.hidden_end_date = data.end_date;
                        defer.resolve();
                    } else {
                        defer.reject();
                    }
                });

                return p;
            };

            // 清空订单
            $scope.emptyOrder = function(){
                var defer = $q.defer(), p = defer.promise;
                $rootScope.order = {};
                $rootScope.orderAction.isCreate = true;
                defer.resolve();
                return p;
            };

            // 更新订单
            $scope.updateOrder = function(){
                var defer = $q.defer(), p = defer.promise;
                orderResource.update($rootScope.order, function(res){
                    if(res.success){
                        $rootScope.order = {};
                        defer.resolve();
                    } else {
                        $scope.errMsg = res.msg;
                        defer.reject();
                    }

                });

                return p;
            };

            // 移除订单
            $scope.removeOrder = function(id){
                var defer = $q.defer(), p = defer.promise;
                orderResource.delete({id: id}, function(res){
                    if(res.success){
                        defer.resolve();
                    } else {

                        $scope.errMsg = res.msg;
                        defer.reject();
                    }
                });

                return p;
            };


            // 读取广告列表
            $scope.readAd = function(id){
                var defer = $q.defer(), p = defer.promise;
                orderResource.readAd({order_id: id}, function(res){
                    if(res.success){
                        defer.resolve(res.data);
                    } else {
                        defer.reject();
                    }
                });

                return p;
            };

            // 加载订单列表
            $scope.orderResourcePromise = $scope.allOrder({
                page: 1,
                rows: $scope.rows
            });

            // 加载广告主
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
                    $rootScope.aderCroups = aders;
                }
            }).$promise;

        }]);


});


