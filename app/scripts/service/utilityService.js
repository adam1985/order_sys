define(["./serviceMod", "jquery", "chosen"], function (serviceMod, $) {
    return serviceMod.
        factory("renderChosenServer", [function(){
            return  function($element){
                $element.chosen({
                    width: '99%',
                    allow_single_deselect: true,
                    search_contains : true,
                    disable_search_threshold: 10,
                    no_results_text: "没有找到任何结果!"
                });
            };
        }])
});