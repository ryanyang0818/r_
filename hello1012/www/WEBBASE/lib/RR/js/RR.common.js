if (!$.isFunction(window.cl)) {
    var cl = function() {
        
        $.each(arguments, function(idx, arg) {
            console.trace(arg) ;
        }) ;

    }
}

if (!$.isFunction( window.formatSec )) {
    var formatSec = function(sec) {
        
        if (sec < 0) return '' ;
         
        var sec_num = parseInt(sec, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        if (hours == '00') {
            var time    = minutes+':'+seconds;
        } else {
            var time    = hours+':'+minutes+':'+seconds;
        }
        
        return time;
    }
}

if (!$.isFunction( String.prototype.format )) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) { 
          return typeof args[number] != 'undefined'
            ? args[number]
            : match
          ;
        });
    }
}

if (!$.isFunction(window.isMobile)) {
    var isMobile = function() {
        
        return (
            (navigator.userAgent.match(/Android/i)) ||
            (navigator.userAgent.match(/webOS/i)) ||
            (navigator.userAgent.match(/iPhone/i)) ||
            (navigator.userAgent.match(/iPod/i)) ||
            (navigator.userAgent.match(/iPad/i)) ||
            (navigator.userAgent.match(/BlackBerry/))
        ) ;
    }
}

if (!$.isFunction(window.date_format)) {
    var date_format = function(d, t) { 
        var Y=d.getFullYear();
        var M=d.getMonth()+1;
        var D=d.getDate();
        var MM=(M>9)?M:'0'+M;
        var DD=(D>9)?D:'0'+D;
        var H = d.getHours() ;
            H = ('0'+H).substr(-2) ;
        var i = d.getMinutes() ;
        var s = d.getSeconds() ;
        switch(t){
            case 'YYYYMMDD':
                return Y+''+MM+''+DD;
            break;
            case 'YYYY-MM-DD':
                return Y+'-'+MM+'-'+DD;
            break;
            case 'YYYY/MM/DD':
                return Y+'/'+MM+'/'+DD;
            break;
            case 'YYYY/MM':
                return Y+'/'+MM;
            break;
            case 'YYYY-MM-DD H:i:s':
                return Y+'-'+MM+'-'+DD+' '+H+':'+i+':'+s;
            break;
            case 'MM/DD/YYYY H:i':
                return MM+'/'+DD+'/'+Y+' '+H+':'+i ;
            break;
            case 'MM/DD/YYYY H:i:s':
                return MM+'/'+DD+'/'+Y+' '+H+':'+i+':'+s;
            break;
        }
    }
}

if (!$.isFunction(window.fileSize_format)) {
    var fileSize_format = function(bytes) {
        
        if (!bytes) return '0 bytes' ;
        bytes = Number(bytes) ;
        var si = false ;
        
        var thresh = si ? 1000 : 1024;
        if(Math.abs(bytes) < thresh) {
            return bytes + ' B';
        }
        var units = si
            ? ['KB','MB','GB','TB','PB','EB','ZB','YB']
            : ['KB','MB','GB','TB','PB','EB','ZB','YB'];
        var u = -1 ;
        do {
            bytes /= thresh;
            ++u;
        } while(Math.abs(bytes) >= thresh && u < units.length - 1) ;
        
        if (units[u]==='GB') {
            return bytes.toFixed(2)+' '+units[u];
        }
        else if (units[u]==='MB') {
            return bytes.toFixed(1)+' '+units[u];
        }
        else if (units[u]==='KB') {
            return Math.round(bytes.toFixed(1))+' '+units[u];
        }
        
    }
}

if (!$.isFunction(aesEncrypt)) {
    var aesEncrypt = function(msg) {
        
        if (!msg) return '' ;
        
        var _key = 'a16byteslongkey!a16byteslongkey!' ;
        
        var _block_size = 16 ;

        paddingLength = _block_size - (msg.length % _block_size) ;
        
        var tmpPadding = String.fromCharCode(paddingLength) ;
        var tmpPaddingTotal = '' ;
        
        for (var i=0;i<paddingLength;i++) {
            tmpPaddingTotal += tmpPadding ;
        }

        paddingContent = msg+tmpPaddingTotal ;

        // var tmpIv = 'a' ;
        var tmpIv = Math.floor(Math.random()*9) ;
        var ivString = '' ;
        
        for (var i=0;i<_block_size;i++) {
            ivString += tmpIv ;
        }

        var ivBase64 = btoa(ivString) ;

        iv = CryptoJS.enc.Base64.parse(ivBase64);

        var key = CryptoJS.enc.Latin1.parse(_key) ;

        var encrypted = CryptoJS.AES.encrypt(paddingContent, key, { mode: CryptoJS.mode.CBC, iv: iv });

        var secretBase64 = encrypted.toString() ;

        var byteArray = base64js.toByteArray(secretBase64) ;

        var ivByteArray = base64js.toByteArray(ivBase64) ;
        
        var byteArraySum = new byteArray.constructor(byteArray.length + ivByteArray.length);

        byteArraySum.set(byteArray) ;

        byteArraySum.set(ivByteArray, byteArray.length) ;

        var base64encode = base64js.fromByteArray(byteArraySum) ;

        return base64encode ;
    }
}

if (!$.isFunction(aesDecrypt)) {
    var aesDecrypt = function(secret) {
        var _key = 'a16byteslongkey!a16byteslongkey!' ;
        
        var _block_size = 16 ;

        var byteArray = base64js.toByteArray(secret) ;

        var blen = byteArray.length ;

        var secretByteArray = Array.prototype.slice.apply(byteArray, [0, (blen-_block_size)]) ;

        var ivByteArray = Array.prototype.slice.apply(byteArray, [(blen-_block_size)]) ;

        var secretBase64 = base64js.fromByteArray(secretByteArray) ;

        var ivBase64 = base64js.fromByteArray(ivByteArray) ;

        var iv = CryptoJS.enc.Base64.parse(ivBase64) ;

        var key = CryptoJS.enc.Latin1.parse(_key) ;
        
        var decrypted = CryptoJS.AES.decrypt(secretBase64, key, { mode: CryptoJS.mode.CBC, iv: iv });

        return decrypted.toString(CryptoJS.enc.Utf8) ;
        
    }
}

// var msg = 'test' ;
// var encode = aesEncrypt(msg) ;
// var decode = aesDecrypt(encode) ;
// console.log(decode) ;


