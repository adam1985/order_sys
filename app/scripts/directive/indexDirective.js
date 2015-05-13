define(["./directiveMod", "component/template", "component/utility", "component/bootstrap-datepicker",  'component/bootstrap-paginator'],
    function (directiveMod, template, utility) {
    return directiveMod

        .directive("datePicker", function(){
            return {
                restrict: "AE",
                require: "?ngModel",
                link: function($scope, $element, $attrs, $ngModel){

                    $element.datepicker({
                        format: 'yyyy-mm-dd',
                        language: 'zh-CN'
                    });

                    $element.next('.input-group-addon').on('click', function(){
                        $element.focus();
                    });

                }
            }
        })

        .directive("newOrder", function(){
            return {
                restrict: "AE",
                //require: "^ngController",
                controller : ["$scope", "$element", "$attrs", "$compile", function($scope, $element,$attrs, $compile){

                    $scope.compile = $compile;
                    $scope.modalCof = {
                        id : 'global-modal',
                        title: '提示',
                        cls: 'modal-lg',
                        body : template.render('new-order-template')
                    };
                }],
                template: '<a href="javascript:void(null)" class="btn btn-primary" ng-transclude></a>',
                replace: true,
                transclude: true,
                controllerAs: "saveModelController",
                link: function($scope, $element, $attrs, saveModelController){
                    $element.on('click', function(){
                        utility.modal( 'modal-template', {
                            data : $scope.modalCof,
                            cb: function(){
                                console.log($scope.new);
                            }
                        }, $scope);
                    });

                }
            }
        }).

        directive("pagebar", function(){
            return {
                restrict: "AE",
                controller : ["$scope", "$element", "$attrs", "orderResource", function($scope, $element,$attrs, orderResource){
                    $scope.orderResource = orderResource;
                }],
                template: ' <ul class="pagination"></ul>',
                replace: true,
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
        });

});



