define(["./directiveMod", "component/template", "component/utility", "chosen", "component/bootstrap-datepicker",  'component/bootstrap-paginator'],
    function (directiveMod, template, utility) {
        return directiveMod
            // 日历指令
            .directive("datePicker", function(){
                return {
                    restrict: "AE",
                    require: "?ngModel",
                    //scope: {},
                    link: function($scope, $element, $attrs, $ngModel){
                        $element.datepicker({
                            format: 'yyyy-mm-dd',
                            language: 'zh-CN',
                            autoclose: true
                        });
                        $element.next('.input-group-addon').on('click', function(){
                            $element.focus();
                        });
                    }
                }
            })

            // 新建与编辑订单
            .directive("newOrder", function(){
                return {
                    restrict: "AE",
                    //require: "^ngController",
                    controller : ["$scope", "$element", "$attrs", "$compile", "$rootScope", "$q", function($scope, $element,$attrs, $compile, $rootScope, $q){

                        $scope.compile = $compile;
                        $scope.$rootScope = $rootScope;
                        //$scope.$q = $q;
                        $scope.modalCof = {
                            id : 'global-modal',
                            title: '提示',
                            cls: 'modal-lg',
                            body : template.render('new-order-template')
                        };
                    }],
                    template: '<a href="javascript:void(null)" ng-transclude></a>',
                    replace: true,
                    transclude: true,
                    controllerAs: "saveModelController",
                    scope: true,
                    link: function($scope, $element, $attrs, saveModelController){

                        $element.on('click', function(){
                            var orderid = $attrs.orderid, readDefer;

                            var modalComplete = function(modal, jqModal){
                                var isCheckValid = utility.isCheckValid($('#newOrderForm'));

                                if(isCheckValid){
                                    var promise;
                                    if($scope.$rootScope.orderAction.isCreate){
                                        promise = $scope.createOrder();
                                    } else {
                                        promise = $scope.updateOrder();
                                    }

                                    modal.hide();

                                    promise.then(function(){
                                        $scope.allOrder({
                                             page: 1,
                                             rows: $scope.rows
                                         });
                                    }, function(){
                                        utility.modal( 'modal-template', {
                                            data : {
                                                id : 'alert-model',
                                                title : '提示',
                                                body : $scope.errMsg
                                            },
                                            buttons : [
                                                {"ty" : "remove", "type" : "cancel"}
                                            ]
                                        });
                                    });

                                } else {
                                    $('#err-tiper').show();
                                }
                            };

                            modalComplete.keeplive = 1;

                            if(orderid){
                                readDefer = $scope.readOrder(orderid);
                            } else {
                                readDefer = $scope.emptyOrder();
                            }

                            utility.modal( 'modal-template', {
                                data : $scope.modalCof,
                                cb: modalComplete
                            }, $scope);

                        });

                    }
                }
            }).


            // 查询订单
            directive("filterOrder", function(){
                return {
                    restrict: "AE",
                    //require: "^ngController",
                    template: '<a href="javascript:void(null)" ng-transclude></a>',
                    controller : ["$scope", "$element", "$attrs", "$compile", function($scope, $element,$attrs, $compile){

                        $scope.compile = $compile;
                    }],
                    replace: true,
                    transclude: true,
                    scope: true,
                    link: function($scope, $element, $attrs){
                        $element.on('click', function(){
                            $scope.searchOrder().then(function(){
                                $('#page-box').html($scope.compile('<pagebar></pagebar>')($scope));
                            });
                        });
                    }
                }
            }).

            // 展开广告
            directive("expandAd", function(){
                return {
                    restrict: "AE",
                    //require: "^ngController",
                    template: '<a href="javascript:void(null)" ng-transclude></a>',
                    controller : ["$scope", "$element", "$attrs", function($scope, $element,$attrs){
                        var adtypes = {
                            "qiantie" : "前贴",
                            "zhongbo" : "中播",
                            "jiaobiao" : "角标",
                            "tuding" : "图钉",
                            "web" : "web"
                        };
                        this.disposeData = function(data){
                            data = data || {};
                            var arr = [];
                            angular.forEach(data, function(val, key){
                                var item = {};
                                if(adtypes[key]){
                                    item.posi = adtypes[key];
                                }
                                if(key == 'web'){
                                    item.url = '/web/?original_order_id=' + val.order_id;
                                } else {
                                    item.url = '/ad/search?original_order_id=' + val.order_id;
                                }
                                angular.extend(item, val);
                                arr.push(item);
                            });

                            return arr;
                        };
                    }],
                    replace: true,
                    transclude: true,
                    controllerAs: "expandAdCtrl",
                    scope: true,
                    link: function($scope, $element, $attrs, expandAdCtrl){
                        $scope.item.ad_list = {};
                        $element.on('click', function(){
                            if(!$scope.item.expandAdStatus){
                                $scope.readAd($attrs.orderid).then(function(data){
                                    $scope.item.ad_list = expandAdCtrl.disposeData(data);
                                });
                            }
                            $scope.$apply(function(){
                                $scope.item.expandAdStatus = !$scope.item.expandAdStatus;
                            });

                        });
                    }
                }
            }).


            // 删除订单
            directive("delOrder", function(){
                return {
                    restrict: "AE",
                    //require: "^ngController",
                    template: '<a href="javascript:void(null)" ng-transclude></a>',
                    replace: true,
                    transclude: true,
                    scope: true,
                    link: function($scope, $element, $attrs){
                        $element.on('click', function(){
                            utility.modal( 'modal-template', {
                                data : {
                                    id : 'alert-model',
                                    title : '提示',
                                    body : '是否确认删除'
                                },
                                buttons : [
                                    {"ty" : "modify", "type" : "ok", "text" : "确认删除"},
                                    {"ty" : "modify", "type" : "cancel", "text" : "暂不删除"}
                                ],
                                cb: function() {
                                    $scope.removeOrder($attrs.orderid).then(function(){
                                        $scope.allOrder({
                                            page: 1,
                                            rows: $scope.rows
                                        });
                                    }, function(){
                                        utility.modal( 'modal-template', {
                                            data : {
                                                id : 'alert-model',
                                                title : '提示',
                                                body : $scope.errMsg
                                            },
                                            buttons : [
                                                {"ty" : "modify", "type" : "ok", "text" : "返回"},
                                                {"ty" : "remove", "type" : "cancel"}
                                            ]
                                        });
                                    });
                                }
                            });

                        });

                    }
                }
            }).

            // 分页指令
            directive("pagebar", function(){
                return {
                    restrict: "AE",
                    controller : ["$scope", "$element", "$attrs", function($scope, $element,$attrs){

                    }],
                    template: ' <ul class="pagination"></ul>',
                    replace: true,
                    scope: true,
                    link: function($scope, $element, $attrs){
                        $scope.orderResourcePromise.then(function(res){
                            if( $scope.order_list && $scope.order_list.length && $scope.totalPages > 1 ) {
                                $element.bootstrapPaginator({
                                    bootstrapMajorVersion: 3,
                                    alignment: 'center',
                                    currentPage: $scope.page,
                                    totalPages: $scope.totalPages,
                                    numberOfPages: 5,
                                    tooltipTitles: function (type, page, current) {
                                        switch (type) {
                                            case "first":
                                                return "第一页";
                                            case "prev":
                                                return "上一页";
                                            case "next":
                                                return "下一页";
                                            case "last":
                                                return "最一页";
                                            case "page":
                                                return "第" + page + "页";
                                        }
                                    },
                                    itemContainerClass: function (type, page, current) {
                                        return (page === current) ? "active" : "pointer-cursor";
                                    },
                                    onPageClicked: function(e,originalEvent,type,page){
                                        $scope.allOrder({
                                            page: page,
                                            rows: $scope.rows
                                        }, $scope.order_extra);
                                    }
                                });
                            } else {
                                $element.empty();
                            }
                        });

                    }
                }
            }).

            // 广告主指令
            directive("aderGroup", function(){
                return {
                    restrict: "AE",
                    template: '<select class="hide" ng-options="option.value as option.name group by option.group for option in aderCroups"></select>',
                    replace: true,
                    scope: true,
                    //transclude: true,
                    controller: ["$scope", "$element", "$attrs", "$timeout", "renderChosenServer", function($scope, $element, $attrs, $timeout, renderChosenServer){
                        $scope.$timeout = $timeout;
                        $scope.renderChosenServer = renderChosenServer;
                    }],
                    link: function($scope, $element, $attrs){
                        if($attrs.isrender){
                            //$element.attr('ignore-option', "广告主一共有" + $scope.$rootScope.aderCroups.length + "个");
                            $scope.aderGroupPromise.then(function(){
                                $scope.$timeout(function(){
                                    $scope.renderChosenServer($element);
                                }, 10);
                            });
                        } else {
                            $scope.$watch('order.advertiser', function(){
                                if($element.data('chosen')){
                                    $element.trigger("chosen:updated");
                                } else {
                                    $scope.renderChosenServer($element);
                                }
                            });
                        }
                    }
                }
            });
    });



