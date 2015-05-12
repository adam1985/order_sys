define(["./directiveMod", "component/template", "component/utility", "component/bootstrap-datepicker"], function (directiveMod, template, utility) {
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
                        body : template.render('create-group-template')
                    };
                }],
                template: '<a href="javascript:void(null)" class="btn btn-primary" ng-transclude></a>',
                replace: true,
                transclude: true,
                controllerAs: "saveModelController",
                link: function($scope, $element, $attrs, saveModelController){
                    $element.on('click', function(){
                        utility.modal( 'modal-template', {
                            data : $scope.modalCof
                        }, $scope);
                    });

                }
            }
        })

});



