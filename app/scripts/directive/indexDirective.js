define(["./directiveMod", "component/template", "component/utility", "component/bootstrap-datepicker", "ztree"], function (directiveMod, template, utility) {
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

        .directive("saveModal", function(){
            return {
                restrict: "AE",
                //require: "^ngController",
                controller : ["$scope", "$element", "$attrs", "$transclude", function($scope, $element,$attrs){
                    $scope.modalCof = {
                        id : 'global-modal',
                        title: '提示',
                        body : template.render('create-group-template',{})
                    };
                }],
                template: '<a href="javascript:void(null)" class="btn btn-primary">保存</a>',
                replace: true,
                controllerAs: "saveModelController",
                link: function($scope, $element, $attrs, saveModelController){
                    $element.on('click', function(){
                        utility.modal( 'modal-template', {
                            data : $scope.modalCof
                        });
                    });
                }
            }
        })

        .directive("ztree", function(){
            return {
                restrict: "AE",
                controller: ["$scope", "serviceData", function($scope, serviceData){
                    $scope.ztree = serviceData.ztree;
                }],
                controllerAs: "ztreeCtrl",
                link: function($scope, $element, $attrs, ztreeCtrl){

                    var setting = {
                        data: {
                            simpleData: {
                                enable: true
                            }
                        }
                    };
                    $.fn.zTree.init($element, setting, $scope.ztree);
                }
            }
        });
});



