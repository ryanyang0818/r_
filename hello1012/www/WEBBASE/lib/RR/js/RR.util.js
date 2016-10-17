RR.util = (function() {
    
    return {
        
        showSysLoading: function() {
            $.r_loader() ;
        },
        
        hideSysLoading: function() {
            $.r_loader('close') ;
        },
        
        toast: function(string) {
            $.r_toast(string) ;
        },
        
        showLoading: function() {
            $.r_loader({
                spinner: 'spinner2',
                bgColor: 'black',
                bgOpacity: '0.2',
            }) ;
        },
        
        hideLoading: function() {
            $.r_loader('close') ;
        },
        
    } ;
    
})() ;