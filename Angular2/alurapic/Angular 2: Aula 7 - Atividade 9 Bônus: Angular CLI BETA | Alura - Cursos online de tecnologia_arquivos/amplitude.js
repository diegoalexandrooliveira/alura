function amplitudeInit(a){amplitude.getInstance().init(a)}function amplitudeSetUserId(a){amplitude.getInstance().setUserId(a)}function amplitudeIdentify(a,b){amplitudeSetUserId(a),amplitude.getInstance().setUserProperties(b)}function unlogUser(){amplitude.getInstance().setUserId(null),amplitude.getInstance().regenerateDeviceId()}function track(a){var b=a.name;deleteElementFrom(a,"name"),amplitude.getInstance().logEvent(b,a)}function deleteElementFrom(a,b){delete a[b]}function amplitudeLogEvent(a){amplitude.getInstance().logEvent(a)}function amplitudeAnonymousUser(){amplitude.getInstance().setUserId(null)}function amplitudeTrackRevenue(a,b){var c=(new amplitude.Revenue).setProductId(a).setPrice(b).setQuantity(1);amplitude.getInstance().logRevenueV2(c)}!function(a,b){function c(a,b){a.prototype[b]=function(){return this._q.push([b].concat(Array.prototype.slice.call(arguments,0))),this}}function d(a){function b(b){a[b]=function(){a._q.push([b].concat(Array.prototype.slice.call(arguments,0)))}}for(var c=0;c<n.length;c++)b(n[c])}var e=a.amplitude||{_q:[],_iq:{}},f=b.createElement("script");f.type="text/javascript",f.async=!0,f.src="https://d24n15hnbwhuhn.cloudfront.net/libs/amplitude-3.0.2-min.gz.js",f.onload=function(){a.amplitude.runQueuedFunctions()};var g=b.getElementsByTagName("script")[0];g.parentNode.insertBefore(f,g);for(var h=function(){return this._q=[],this},i=["add","append","clearAll","prepend","set","setOnce","unset"],j=0;j<i.length;j++)c(h,i[j]);e.Identify=h;for(var k=function(){return this._q=[],this},l=["setProductId","setQuantity","setPrice","setRevenueType","setEventProperties"],m=0;m<l.length;m++)c(k,l[m]);e.Revenue=k;var n=["init","logEvent","logRevenue","setUserId","setUserProperties","setOptOut","setVersionName","setDomain","setDeviceId","setGlobalUserProperties","identify","clearUserProperties","setGroup","logRevenueV2","regenerateDeviceId"];d(e),e.getInstance=function(a){return a=(a&&0!==a.length?a:"$default_instance").toLowerCase(),e._iq.hasOwnProperty(a)||(e._iq[a]={_q:[]},d(e._iq[a])),e._iq[a]},a.amplitude=e}(window,document);