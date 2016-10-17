
RR.router = (function() {

    return {
        init: function() {
            var AppRouter = Backbone.Router.extend({  
                routes : {  

                },  
            });  
              
            RR.router.router = new AppRouter();  
            Backbone.history.start();  
        },
    } ;
    
})() ;
