
var RR = $.extend((RR)?RR:{}, (function() {
    return {pager: (function() {
        return {
            pages:{},
            
            wrapperSelecter: '#PAGE_WRAPPER',
            $wrapper: '',

            /*
            options {
                duration: 
                pageOptions: 
                kill:
            }
            */
            _load: function(page, options, method) {
                var pagerObj = this ;
                
                var pageMgropt = {} ;
                if (options) {

                    if (options.duration!=='undefined') pageMgropt['duration'] = options.duration ;
                    if (options.kill && RR.pager.pages[page]) {
                        RR.pager.pages[page].$el.remove() ;
                        RR.pager.pages[page] = '' ;
                    }
                }

                if ( ! RR.views[page] || ! $.isFunction(RR.views[page])) {
                    cl('load page fail') ;
                }
                
                pagerObj.$wrapper = $(pagerObj.wrapperSelecter) ;

                pagerObj.beforeLoad() ;

                if (RR.pager.pages[page]) {
                    if (options && options.stay && options.stay===true) {
                        
                    } else {
                        if (method==='loadFrom') {
                            $.r_pageMgr.loadFrom(page, pageMgropt) ;
                        } else {
                            $.r_pageMgr.load(page, pageMgropt) ;
                        }
                    }
                    
                    RR.system.i18n() ;
                    return ;
                }
                
                var opt = {
                    url : RR.config.dir.tpl+'/views.'+page+'.html',
                    dataType: 'text'
                } ;

                $.ajax(opt)
                    .done(function(resp) {

                        var $resp = $(resp) ;
                        
                        pagerObj.$wrapper.append($resp.find('[data-role="page"]')) ;

                        RR.pager.pages[page] = new RR.views[page]((options && options.pageOptions)?options.pageOptions:{}) ;
                        RR.views.viewsCollections[page] = RR.pager.pages[page] ;

                        if (options && options.stay && options.stay===true) {
                            
                        } else {
                            if (method==='loadFrom') {
                                $.r_pageMgr.loadFrom(page, pageMgropt) ;
                            } else {
                                $.r_pageMgr.load(page, pageMgropt) ;
                            }
                        }

                        RR.system.i18n() ;
                    }) ;
            },
            
            load: function(page, options) {
                var pagerObj = this ;

                pagerObj._load(page, options, 'load') ;
                
            },
            
            loadFrom: function(page, options) {
                var pagerObj = this ;

                pagerObj._load(page, options, 'loadFrom') ;
            },
            
            //所有page lv 1的隱藏起來
            hide: function(cb) { 
                /*
                一定要寫:visible，如果document裡面有兩個pageLv1，有的看得到，有的看不到
                這樣會引發看得到的還沒有fadeOut結束時，就被別的pageLv1觸發了callback
                */
                var pagerObj = this ;
                var pages = pagerObj.wrapper_all.find('[data-role="RR-page"]:visible') ;
                if (pages.size()) {
                    pages.fadeOut(cb) ;
                }
                else {
                    cb() ;
                }
            },
            
            //某一頁，顯示
            show: function(page) {

            },
            
            //trigger page init
            init: function(page) {

            },            
            
            beforeLoad: function() {

                
            },
            
            afterLoad: function() {

            },            
            
        } ;
    })()} ;
})()) ;
