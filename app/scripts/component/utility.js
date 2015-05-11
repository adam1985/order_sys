
define(['jquery', './template', 'interface/ajax'], function ($, template, ajax) {

    /**
     * 使用严格模式
     */
    'use strict';

    var utility_ = {};

    /** 模式窗口 */
    var modal = function( templateId, config ){
            this.templateId = templateId;
            this.data = config.data || {};
            this.cb = config.cb || $.noop;
            this.options = config.options || {};
            var buttons = [
                    { type : 'ok', class: 'btn btn-primary', btnClass: 'btn-ok', text : '确定' },
                    { type : 'cancel', class: 'btn', text : '取消' }
            ];

            this.buttons = this.disposeButtons(buttons, config.buttons);

            this.jqModal = this.createModal();
            this.addEvent();
    };

    modal.prototype.disposeButtons = function(def, butsConf) {
        def = def || [];
        butsConf = butsConf || [];
        var defClass = {
                "ok" : "btn btn-primary",
                "cancel" : "btn"
        },
        defText = {
            "ok" : "确定",
            "cancel" : "取消"
        };

        $.each( butsConf, function(i, v) {
            var ty = v.ty;
            if( ty == 'add' ){
                def.push({ type : v.type, class: v.class || defClass[v.type] || 'btn', btnClass: v.btnClass || null,
                    text : v.text || defText[v.type], cb : v.cb });
            } else if( ty == 'remove' ){
                $.each(def.concat(), function(index, val){
                    if(v.type == val.type ){
                        def.splice(index, 1);
                    }
                });
            } else if( ty == 'modify' ){
                delete v.ty;
                $.each(def.concat(), function(index, val){
                    if(v.type == val.type ){
                        delete v.type;
                        if( v ){
                            $.each(v, function(key, value){
                                val[key] = value;
                            });
                        }
                    }
                });
            }
        });

        this.data = $.extend(this.data, {
            buttons : def
        });

        return def;

    };


    modal.prototype.createModal = function(){
        $(document.body).append(template.render( this.templateId, {
            modal : this.data
        }));

        var modal = $('#' + this.data.id);
        modal.modal( this.options );
        return modal;
    };

    modal.prototype.show = function( cb ){
        var self = this;
        cb = cb || $.noop;
        self.jqModal.off('shown.bs.modal');
        self.jqModal.on('shown.bs.modal', function(){
            cb( self.jqModal );
        });

        this.jqModal.modal('show');

        return this;
    };

    modal.prototype.hide = function( cb ){
        var self = this;
        cb = cb || $.noop;
        self.jqModal.off('hidden.bs.modal');
        self.jqModal.on('hidden.bs.modal', function(){
            cb( self.jqModal );
        });
        this.jqModal.modal('hide');
        return this;
    };

    modal.prototype.addEvent = function(){
        var btn = this.jqModal.find('.modal-btn'),
            self = this,
            cb = $.noop;

        btn.on('click', function(){
            var index = parseInt($(this).attr('data-index'));
            if( self.buttons[index].type == 'ok'){
                cb = self.buttons[index].cb || self.cb;
            }

            if( !cb.keeplive ){
                self.hide(function(){
                    cb(self, self.jqModal);
                });
            } else {
                cb(self, self.jqModal);
            }
            
            
        });


        return this;
    };


    modal.prototype.update = function( config ){
        var self = this,
            jqModal = self.jqModal;
            self.cb = config.cb || $.noop;
            self.data = config.data || {};
            this.buttons = this.disposeButtons(this.buttons, config.buttons);
            jqModal.find('.modal-dialog').html(template.render( 'modal-content-template', {
                modal : this.data
            }));
            this.addEvent();
            self.show();

        return this;
    };

    var modalState = {};
    utility_.modal = function( templateId, config ){
        
        config.data = config.data || {};
        config.data = $.extend({
            title: '提示'
        }, config.data);
        var cacheId = config.data.id || templateId,
            _modal = modalState[cacheId];

        if( modalState[cacheId] ) {
            _modal.update( config );
        } else {
            modalState[cacheId] = _modal = new modal(templateId, config);
        }

        return _modal;
    };


    /** 验证表单 */
    utility_.Validform = function( config ){
        config = $.extend({
            type: 'ajax',
            label: '.label-text',
            cb: $.noop
        }, config);
        $(config.selector).Validform({
                btnSubmit: config.btnSubmit,
                tipSweep: true,
                tiptype:function(msg,o,cssctl){
                    var objtip=$("#err-tiper");
                    if(o.type != 2 ) {
                        cssctl(objtip,o.type);
                        objtip.show().text(msg);
                    } else {
                        objtip.hide();
                    }
                },
                label: config.label,
                datatype: {},
                beforeSubmit: function( form ) {
                    if( config.type == 'ajax'){
                        config.cb( form );
                        return false;
                    }
                }
            });
    };


    utility_.createPromise = function( fn ){
        var dtd = $.Deferred();
        fn( dtd );
        return dtd.promise(fn);
    };

    return utility_;

});


