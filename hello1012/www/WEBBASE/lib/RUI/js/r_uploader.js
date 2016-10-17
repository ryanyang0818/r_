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
//plugin: r_uploader
//用來處理上傳
;(function ( $, window, document, undefined ) {  
    var H = $("html") ;
    var W = $(window) ;
    var D = $(document) ;
    // Create the defaults once     
    var pgn = 'r_uploader',  
        defaults = {
            wrapCSS: 'r_uploader-container',
            sectionColor: '#007AFF',
            afterShow: function() {},
        } ;
    
    var _private = {} ;
    _private.tpl = {} ;
    _private.tpl.innerContainer = '<div class="{0}">'+
                                      '<div class="{1}">'+
                                        '<i class="fa fa-cloud-upload {2}" aria-hidden="true"></i></span>'+
                                        '<br>'+
                                        '<span class="{3}">Drag file to upload to {12}</span>'+
                                      '</div>'+
                                      '<div class="{4}"><input style="width: 100%;" class="file" type="file"></div>'+
                                      '<div class="{5}"><span class="{6}"></span></div>'+
                                      '<div class="{7}"><div class="{8}">'+
                                        '<div class="{9}">&nbsp;</div>'+
                                      '</div>'+
                                      '<div style="padding-top:3px;text-align:center;"><span class="{10}">0</span>/<span class="{11}">0</span></div>'+
                                  '</div>' ;
    
    _private.init = function() {
        
        _private.options = {} ;
        _private.options.totalNumber = 0 ;
        _private.options.nowNumber = 0 ;
        _private.pathCache = {} ;

    } ;
    
    _private.classObj = {
        innerContainer: 'r_uploader_innerContainer',
        dragZone: 'r_uploader_dragZone',
        cloudImg: 'r_uploader_cloudImg',
        cloudText: 'r_uploader_cloudText',
        fileInput: 'r_uploader_fileInput',
        fileNameZone: 'r_uploader_fileNameZone',
        fileName: 'r_uploader_fileName',
        progressbarZone: 'r_uploader_progressbarZone',
        progressbar: 'r_uploader_progressbar',
        progressbarValue: 'r_uploader_progressbarValue',
        nowIdx: 'r_uploader_nowIdx',
        totalCount: 'r_uploader_totalCount'
    } ;
    
    _private.get_fancybox_option = function() {
        var opt = {
            // title: 'upload',
            message: _private.get_message(),
            yes_button_display: false,
            yes_button_text: '',
            yes_button_callback: function() {

            },
            no_button_display: true,
            no_button_text: 'Cancel',
            no_button_callback: function() {
                
            },
            afterClose: function() {
                
            }
        } ;
        
        opt.wrapCSS = _private.options.wrapCSS ;
        
        return opt ;
    } ;
    
    _private.get_message = function() {
        return _private.tpl.innerContainer.format(
            _private.classObj.innerContainer,
            _private.classObj.dragZone,
            _private.classObj.cloudImg,
            _private.classObj.cloudText,
            _private.classObj.fileInput,
            _private.classObj.fileNameZone,
            _private.classObj.fileName,
            _private.classObj.progressbarZone,
            _private.classObj.progressbar,
            _private.classObj.progressbarValue,
            _private.classObj.nowIdx,
            _private.classObj.totalCount,
            // _private.options.folder_name
            'here'
            
        ) ;
    } ;
    
    _private.setActors = function() {
        _private.actors = {} ;
        _private.actors.container = $('.'+_private.options.wrapCSS) ;
        _private.actors.dragZone = _private.actors.container.find('.'+_private.classObj.dragZone) ;
        
        _private.actors.fileInput = _private.actors.container.find('.'+_private.classObj.fileInput) ;
        
        _private.actors.fileName = _private.actors.container.find('.'+_private.classObj.fileName) ;
        _private.actors.progressbarValue = _private.actors.container.find('.'+_private.classObj.progressbarValue) ;
        
        _private.actors.nowIdx = _private.actors.container.find('.'+_private.classObj.nowIdx) ;
        _private.actors.totalCount = _private.actors.container.find('.'+_private.classObj.totalCount) ;

    } ;
    
    _private.bindEvents = function() {
        _private.actors.dragZone
            //drap drop upload
            .on('dragenter', function(e)
            {
                e.stopPropagation();
                e.preventDefault();
            })
            .on('dragover', function(e)
            {
                e.stopPropagation();
                e.preventDefault();
                $(this).css('background', _private.options.sectionColor);
            })
            .on('dragleave', function(e)
            {
                e.stopPropagation();
                e.preventDefault();
                $(this).css('background', 'white');
            })
            .on('drop', function(e)
            {
                var items = e.originalEvent.dataTransfer.items;
                _private.upload(items) ;

                e.stopPropagation(); 
                e.preventDefault();
                $(this).css('background', 'white');

            })
            
        _private.actors.fileInput
            .on('change', function(e) {
                var files = e.originalEvent.target.files;
                _private.upload_one(_private.options.folder_id, files[0]) ;
                
            }) ;
    } ;
    
    _private.upload = function(items) {
// cl(items) ;
        for (var i=0; i<items.length; i++) {
            // webkitGetAsEntry is where the magic happens
            var item = items[i].webkitGetAsEntry();
// cl(item) ;
            if (item) {
                _private.traverseFileTree(item);
            }
        }
    } ;
    
    _private.traverseFileTree = function  (item, path) {
        path = path || "";
        if (item.isFile) {
            
            //upload
            var itemPathArr = item.fullPath.split('/') ;
            item.file(function(file) {
                _private.upload_one(itemPathArr.slice(0, -1).join('/'), file) ;
            });
        } else if (item.isDirectory) {
            //mkdir
            var itemPathArr = item.fullPath.split('/') ;
            _private.mkdir(itemPathArr.slice(0, -1).join('/'), item.name, function() {
                var dirReader = item.createReader();
                dirReader.readEntries(function(entries) {
                    for (var i=0; i<entries.length; i++) {
                        _private.traverseFileTree(entries[i], path + item.name + "/");
                    }
                });
            
            }) ;
        }
    },
    
    _private.mkdir = function  (parent_path_str, name, cb) {
        
        var pathId ;
        if (!_private.pathCache[parent_path_str]) {
            pathId = _private.options.folder_id ;
        } else {
            pathId = _private.pathCache[parent_path_str] ;
        }

        var opt = {
            url: RR.api.hostUrl+RR.api.path+'/file/mkdir/'+'?'+RR.api.oauthQueryString,
            async: true,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                "folder_name": name ,
                "destination_folder_id":pathId
            }),
        }

        $.ajaxq(pgn, opt)
            .done(function(resp, textStatus, xhr) {

                if (String(xhr.status).substr(0,1) == '2') _private.pathCache[parent_path_str+'/'+name] = resp.data.record.folder_id ;
                
                cb() ;

            })
            .fail(function(xhr, textStatus, errorThrown) {
                
                setTimeout(function() {
                    $.fancybox.close() ;
                    if ($.isFunction(_private.options.fail)) _private.options.fail() ;
                }, 1000) ;
                
            }) ;
    } ;
    
    _private.upload_one = function  (parent_path_str, file) {

        _private.options.totalNumber += 1 ;
        _private.actors.totalCount.text(_private.options.totalNumber) ;
        _private.options.nowNumber = (_private.options.nowNumber)? _private.options.nowNumber:1 ;
        _private.actors.nowIdx.text(_private.options.nowNumber) ;

        var formdata = new FormData() ;

        formdata.append('file', file) ;
        formdata.append('policy', 1) ;
        formdata.append('ctime', Math.ceil(file.lastModified/1000)) ;
        formdata.size = file.size ;

        var filename = file.name ;
        var pathId ;
        
        if (!_private.pathCache[parent_path_str]) {
            pathId = _private.options.folder_id ;
        } else {
            pathId = _private.pathCache[parent_path_str] ;
        }
        var url = RR.api.file.getUploadUrl({folder_id: pathId}) ;

        $.ajaxq(pgn, {
            xhr: function() {
                var xhrobj = $.ajaxSettings.xhr();
                if (xhrobj.upload) {
                        xhrobj.upload.addEventListener('progress', function(event) {
                            var percent = 0;
                            var position = event.loaded || event.position;
                            var total = event.total;
                            if (event.lengthComputable) {
                                percent = Math.ceil(position / total * 100);
                            }
                            //Set progress
                            _private.actors.progressbarValue.css({width: percent+'%'}) ;
                            
                        }, false);
                }
                return xhrobj;
            },
            beforeSend: function(xhr, opt) {
                _private.actors.fileName.text(opt.filename) ;
            },
            url: url,
            type: 'POST',
            contentType:false,
            processData: false,
            cache: false,
            data: formdata,
            filename: filename,
            timeout: false,
        })
        .done(function(resp)
        {
            if (_private.options.nowNumber == _private.options.totalNumber) 
            {
                _private.actors.nowIdx.text(_private.options.nowNumber) ;
                
                setTimeout(function() {
                    _private.close() ;
                    if ($.isFunction(_private.options.callback)) _private.options.callback() ;
                }, 1000) ;
            }
            else
            {
                _private.options.nowNumber++ ;
                _private.actors.nowIdx.text(_private.options.nowNumber) ;
            }
        })
        .fail(function(){
            setTimeout(function() {
                _private.close() ;
                
                
                if ($.isFunction(_private.options.fail)) _private.options.fail() ;
            }, 1000) ;
        })
    } ;
    
    _private.close = function() {
        $.fancybox.close() ;
    } ;
    
    _private.fancybox = function() {
        
        var opt = _private.get_fancybox_option() ;
        
        $.r_confirm(opt) ;
        
        _private.setActors() ;
        _private.bindEvents() ;
    } ;
    
    $[pgn] = function(options) {

        _private.init() ;

        _private.options = $.extend({}, defaults, options, _private.options) ;

        return _private.fancybox() ;
        
    }
    
    $[pgn].close = function() {
        
        _private.close() ;
        
    }
    
})( jQuery, window, document ); 