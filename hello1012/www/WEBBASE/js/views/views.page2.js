//RR.pager.pages.main
RR.views.page2 = Backbone.View.extend({
    
    selector: '[data-role="page"][data-page-name="page2"]',

    initialize: function(options) {
        var viewer = this ;
        viewer.setElement($(this.selector)[0]) ;
        viewer.options = options ;
        
        viewer.initProperty() ;
    },
    
    initProperty: function() {
        var viewer = this ;
        
        console.log('page2', {}) ;
        if (true) {
            if (true) {
                
            }
        }
    },
    
    events: {
        'click .btn_main': function() {
            RR.pager.loadFrom('main') ;
        }
    },
    
}) ;