require.config({
    baseUrl: 'scripts',
    "paths": {
        "jquery": "jquery/jquery",
        "bootstrap": "bootstrap/bootstrap",
        "angular": "angular/angular",
        'angular-route': 'angular/angular-route',
        "angular-ui-router": "angular/angular-ui-router",
        "angular-animate": "angular/angular-animate",
        "angular-aria": "angular/angular-aria",
        "angular-resource": "angular/angular-resource",
        "angular-material": "angular/angular-material",
        "restangular": "angular/restangular",
        "bootstrap-material": "bootstrap-material-design/material",
        "bootstrap-ripples": "bootstrap-material-design/ripples",
        "ztree": "component/jquery.ztree.all-3.5",
        "ext": "ext/ext-all",
        'ext-locale': 'ext/ext-locale-zh_CN',
        "My97DatePicker" : "component/My97DatePicker/WdatePicker",
        "chosen" : "component/chosen/chosen.jquery",
        "validform" : "component/validform/js/Validform_v5.3.2",
        "datatables" : "component/datatables",
        "amcharts" : "component/amcharts/amcharts",
        "serial" : "component/amcharts/serial"
    },
    "shim": {
        "My97DatePicker" : [],
        "angular": {
            "deps": ["jquery"],
            "exports": 'angular'
        },
        "angular-animate": ["angular"],
        "angular-aria": ["angular"],
        "restangular": ["angular"],
        "angular-resource": ["angular"],
        "angular-material":  {
            "deps": ["angular", "angular-animate", "angular-aria"],
            "exports": 'angular'
        },

        "bootstrap": ["jquery"],
        "angular-route": ["angular"],
        "angular-ui-router": ["angular"],
        "bootstrap-material": ["bootstrap"],
        "bootstrap-ripples": ["bootstrap"],
        'ext-locale':['ext'],
        "chosen" : ["jquery"],
        "validform" : ["jquery"],
        "amcharts" : [],
        "serial" : ["amcharts"]
    },
    //deps:['./boot'],
    "urlArgs": "bust=" + (new Date()).getTime()
});

require(['./boot']);
