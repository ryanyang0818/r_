
RR.system = (function() {
    
    var isSysImgLoaded = false ;
var isSysImgLoaded = true ;  //for test
    var isI18nLoaded = true ;
    
    return {
        
        prepare: function() {
            
            RR.util.showSysLoading() ;
            
            //預載系統圖片
            RR.system.loadSysImg() ;
            //i18n
            RR.system.i18n() ;

            //每秒檢察是否載完
            RR.timer.set(1000, function() {
                return (isSysImgLoaded && isI18nLoaded) ;
            },
            function() {

                RR.system.prepareOK() ;

            })
            
        },
        
        loadSysImg: function() {
            
            var dir = RR.config.dir.imagesSystem ;
            var count=0 ;

            $.each(RR.config.images, function(idx, url)
            {
                var _img = new Image() ;

                _img.src = dir+'/'+url ;
                
                _img.onload = function() {
                    count++ ;
                    if (count == (Object.keys(RR.config.images).length)) {
                        isSysImgLoaded = true ;
                    }
                } ;
            }) ;
            
        },
        
        prepareOK: function() {
            var viewer = this ;
 
            RR.util.hideSysLoading() ;
            
            RR.api.set('ip', location.hostname) ;
            RR.api.set('port', location.port) ;
            
            //$.r_mqtt({
            //    handler: $.r_mqttHandler
            //}) ;
            
            RR.router.init() ;
            RR.pager.load('main') ;
            //
            
        },
        
        i18n: function() {
            $.r_i18n.setPath(RR.config.dir.i18n+'/') ;
            $.r_i18n({
                callback: function() {
                    isI18nLoaded = true ;
                }
            }) ;
        },
        
    } ;
    
})() ;
