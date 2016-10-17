
var RR = $.extend((RR)?RR:{}, (function() {
    return {timer: (function() {
        return {
            //q
            q: [],

            set: function(sec, funcLoop, funcCallback) {
                var timerObj = this ;

                var _func = function() {
                    if (funcLoop()) {
                        //OK
                        timerObj.clear(taskId) ;
                        funcCallback() ;
                    }
                    
                } ;
                
                var taskId = setInterval(_func, sec) ;
                _func() ;
                
                timerObj.q.push(taskId) ;
                return taskId;
                
            },
            //kill the process
            clear: function(taskId) {
                var timerObj = this ;
                
                try {
                    clearInterval(taskId) ;
                    
                    var idx = timerObj.q.indexOf(taskId) ;
                    timerObj.q[idx] = false ;
                    taskId = false ;
                    return true ;
                } catch(e) {
                    return false ;
                }
            }, 
            //kill all process
            flush: function() {
                var timerObj = this ;
                
                if (timerObj.q.length>0) {
                    
                    _.each(timerObj.q, function(value, idx) {
                        
                        clearInterval(value) ;
                        
                    }) ;
                    
                    timerObj.q = [] ;
                    
                }
                
            },
            
        } ;
    })()} ;
})()) ;
