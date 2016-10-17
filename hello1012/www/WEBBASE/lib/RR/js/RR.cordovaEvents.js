
// 如需空白範本的簡介，請參閱下列文件: 
// http://go.microsoft.com/fwlink/?LinkID=397704
// 若要針對在 Ripple 或 Android 裝置/模擬器上載入的頁面，偵錯程式碼: 請啟動您的應用程式，設定中斷點，
// 然後在 JavaScript 主控台中執行 "window.location.reload()"。
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // 處理 Cordova 暫停與繼續事件
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        document.addEventListener('backbutton', onBackbutton.bind(this), false);
        document.addEventListener('menubutton', onMenubutton.bind(this), false);
        document.addEventListener('volumedownbutton', onVolumedownbutton.bind(this), false);
        document.addEventListener('volumeupbutton', onVolumeupbutton.bind(this), false);

        window.addEventListener("batterystatus", onBatteryStatus, false);
        window.addEventListener("batterylow", onBatteryStatus, false);
        window.addEventListener("batterycritical", onBatteryCritical, false);

        if (StatusBar.isVisible) {
            console.log(StatusBar);
            StatusBar.hide();
        }

        document.addEventListener("online", function () {
            console.log('有網路了');
        }, false);

        document.addEventListener("offline", function () {
            console.log('沒網路了');
        }, false);

    };

    function onPause() {
        // TODO: 這個應用程式已暫停。請在這裡儲存應用程式狀態。
        alert('pause');
    };

    function onResume() {
        // TODO: 這個應用程式已重新啟動。請在這裡還原應用程式狀態。
        alert('resume');
    }; 

    //===

    function onBackbutton() {
        // TODO: 這個應用程式已重新啟動。請在這裡還原應用程式狀態。
        alert('onBackbutton');
    };

    function onMenubutton() {
        // TODO: 這個應用程式已重新啟動。請在這裡還原應用程式狀態。
        alert('onMenubutton');
    };

    function onVolumedownbutton() {
        // TODO: 這個應用程式已重新啟動。請在這裡還原應用程式狀態。
        alert('onVolumedownbutton');
    };

    function onVolumeupbutton() {
        // TODO: 這個應用程式已重新啟動。請在這裡還原應用程式狀態。
        alert('onVolumeupbutton');
    };

    function onBatteryStatus(status) {
        alert("onBatteryStatus Level: " + status.level + " isPlugged: " + status.isPlugged);
    }

    function onBatteryLow(status) {
        alert("onBatteryLow Battery Level Low " + status.level + "%");
    }

    function onBatteryCritical(status) {
        alert("onBatteryCritical Battery Level Critical " + status.level + "%\nRecharge Soon!");
    }

})();