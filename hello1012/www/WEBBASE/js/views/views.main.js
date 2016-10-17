//RR.pager.pages.main
RR.views.main = Backbone.View.extend({

    selector: '[data-role="page"][data-page-name="main"]',

    initialize: function (options) {
        var viewer = this;
        viewer.setElement($(this.selector)[0]);
        viewer.options = options;

        viewer.initProperty();
    },

    initProperty: function () {
        var viewer = this;
        if (true) {
            if (true) {

            }
        }
        console.log('main');
    },

    events: {
        'click .btn_page2': function () {
            RR.pager.load('page2');
        },

        'click .btn_vibration': function () {
            navigator.vibrate(3000);
        },

        'click .btnNotificationAlert': function () {
            function alertDismissed() {
                console.log('do something');
            }

            navigator.notification.alert(
                'You are the winner!',  // message
                alertDismissed,         // callback
                'Game Over',            // title
                'Done'                  // buttonName
            );
        },

        'click .btnNotificationConfirm': function () {
            function onConfirm(buttonIndex) {
                alert('You selected button ' + buttonIndex);
            }

            navigator.notification.confirm(
                'You are the winner!', // message
                 onConfirm,            // callback to invoke with index of button pressed
                'Game Over',           // title
                ['Restart', 'Exit']     // buttonLabels
            );
        },

        'click .btnNotificationPrompt': function () {
            function onPrompt(results) {
                alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
            }

            navigator.notification.prompt(
                'Please enter your name',  // message
                onPrompt,                  // callback to invoke
                'Registration',            // title
                ['Ok', 'Exit'],             // buttonLabels
                'Jane Doe'                 // defaultText
            );
        },

        'click .btnNotificationBeep': function () {
            navigator.notification.beep(2);
        },

        'click .btnCameraByCamera': function () {
            function onSuccess(imageURI) {
                var image = document.getElementById('myImageByCamera');
                image.src = imageURI;
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }
            navigator.camera.getPicture(onSuccess, onFail, {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
                correctOrientation: true,
            });
        },

        'click .btnCameraByPhoto': function () {
            function onSuccess(imageURI) {
                var image = document.getElementById('myImageByPhoto');
                image.src = imageURI;
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }
            navigator.camera.getPicture(onSuccess, onFail, {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            });
        },

        'click .btnDeviceInfo': function () {

            console.log(device);

            navigator.notification.alert(JSON.stringify(device));
        },

        'click .btnFileSystemInfo': function () {

            alert('...');

            // return ;
            // var netry = window.resolveLocalFileSystemURL() ;

            // console.log(netry) ;

            // navigator.notification.alert(JSON.stringify(netry));
        },

        'click .btnGeolocation': function () {
            function onSuccess(position) {
                var element = document.getElementById('textGeolocation');
                element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
                                    'Longitude: ' + position.coords.longitude + '<br />' +
                                    '<hr />' + element.innerHTML;
            }

            // onError Callback receives a PositionError object
            //
            function onError(error) {
                alert('code: ' + error.code + '\n' +
                      'message: ' + error.message + '\n');
            }

            // Options: throw an error if no update is received every 30 seconds.
            //
            var watchID = navigator.geolocation.watchPosition(onSuccess, onError);
        },

        'click .btnOrientation': function () {
            function onSuccess(heading) {
                var element = document.getElementById('textOrientation');
                element.innerHTML = 'Heading: ' + heading.magneticHeading;
            };

            function onError(compassError) {
                alert('Compass error: ' + compassError.code);
            };

            var options = {
                frequency: 3000
            }; // Update every 3 seconds

            var watchID = navigator.compass.watchHeading(onSuccess, onError, options);
        },

    },

});