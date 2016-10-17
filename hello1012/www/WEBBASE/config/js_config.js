var RR = $.extend(true, (RR)?RR:{}, (function() {
    
    var baseDir = '..' ;
    
    return {config: (function() {
        return {
            dir: {
                css: baseDir+'/css',
                js: baseDir+'/js',
                tpl: baseDir+'/tpl',
                jslib: baseDir+'/lib',
                images: baseDir+'/images',
                imagesSystem: baseDir+'/images/system',
                i18n: baseDir+'/bundle',
            },
            
            images: {
                
            },
        } ;
    })()} ;
})()) ;
