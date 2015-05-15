define(["./directiveMod", "component/template", "component/utility", "chosen", "component/bootstrap-datepicker",  'component/bootstrap-paginator'],
    function (directiveMod, template, utility) {
        return directiveMod
            // 日历指令
            .directive("datePicker", function(){
                return {
                    restrict: "AE",
                    require: "?ngModel",
                    scope: {},
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

            // 新建订单
            .directive("newOrder", function(){
                return {
                    restrict: "AE",
                    //require: "^ngController",
                    controller : ["$scope", "$element", "$attrs", "$compile", "$rootScope", function($scope, $element,$attrs, $compile, $rootScope){

                        $scope.compile = $compile;
                        $scope.$rootScope = $rootScope;
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

                            var orderid = $attrs.orderid;

                            if(orderid){
                                $scope.readOrder(orderid, function(){

                                });
                            } else {
                                $scope.emptyOrder();
                            }

                            $scope.$rootScope.$apply(function(){
                                $scope.orderAction.isCreate = !orderid;
                            });


                            utility.modal( 'modal-template', {
                                data : $scope.modalCof,
                                cb: function(){
                                    var isCheckValid = utility.isCheckValid($('#newOrderForm'));
                                    if(isCheckValid){
                                        $scope.createOrder();
                                    } else {
                                        $('#err-tiper').show();
                                    }
                                    return !isCheckValid;

                                }
                            }, $scope);
                        });

                    }
                }
            }).

            // 分页指令
            directive("pagebar", function(){
                return {
                    restrict: "AE",
                    controller : ["$scope", "$element", "$attrs", "orderResource", function($scope, $element,$attrs, orderResource){
                        $scope.orderResource = orderResource;
                    }],
                    template: ' <ul class="pagination"></ul>',
                    replace: true,
                    //scope: true,
                    link: function($scope, $element, $attrs){
                        $scope.orderResourcePromise.then(function(res){
                            if( $scope.order_list.length && $scope.totalPages > 1 ) {
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
                                        $scope.orderResource.readAll({
                                            page: page,
                                            rows: $scope.rows
                                        }, function(res){
                                            if(res.success){
                                                $scope.order_list = res.data.rows;
                                                $scope.page = res.data.page
                                            }
                                        });

                                    }
                                });
                            }
                        });

                    }
                }
            }).

            // 广告主指令
            directive("aderGroup", function(){
                return {
                    restrict: "AE",
                    template: '<select class="hide" ng-options="option.name group by option.group for option in aderCroups"></select>',
                    replace: true,
                    //scope: true,
                    controller: ["$scope", "$element", "$attrs", "$timeout", function($scope, $element, $attrs, $timeout){
                        $scope.$timeout = $timeout;
                    }],
                    link: function($scope, $element, $attrs, $timeout){
                        $scope.aderGroupPromise.then(function(){
                            $scope.$timeout(function(){
                                $element.chosen({
                                    width: '100%',
                                    allow_single_deselect: true,
                                    search_contains : true,
                                    disable_search_threshold: 10,
                                    no_results_text: "没有找到任何结果!"
                                });
                            }, 10);

                        });

                        $scope.$watch('order.advertiser', function(){
                            //if($scope.order)
                            //$element.trigger("chosen:updated");
                        });
                    }
                }
            });

    });



