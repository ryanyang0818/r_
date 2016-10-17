if (!RR) var RR = {} ;
RR.api = (function() {

    return {
        ip: '',
        port: '',
        access_token: '',
        type:'',
        hostUrl: '',
        oauthQueryString:'',
        
        set: function(property, value) {
            var _protocol = 'http:' ;
            
            this[property] = value ;
            
            if (property === 'access_token') this.oauthQueryString = 'access_token='+value ;
            
            if (property === 'ip') {
                if (this['port']) {
                    this.hostUrl = _protocol+'//'+value+':'+this['port']+'/' ;
                } else {
                    this.hostUrl = _protocol+'//'+value+'/' ;
                }
            }
            
            if (property === 'port') {
                if (this['ip'] && value) {
                    this.hostUrl = _protocol+'//'+this['ip']+':'+value+'/' ;
                }
            }
            
        },
        
        get: function(property) {
            return this[property] ;
        },
        
        makeQueryString: function(options) {
            var outputStr = '' ;
            $.each(options, function(key, value) {
                outputStr += '&'+key+'='+value ;
            }) ;
            return outputStr ;
        },
        
    } ;
    
})() ;
var g_QNASAPI = RR.api ;