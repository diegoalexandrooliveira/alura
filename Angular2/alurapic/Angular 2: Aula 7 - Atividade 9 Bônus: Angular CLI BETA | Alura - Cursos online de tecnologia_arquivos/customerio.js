var _cio=_cio||[],CustomerIO=function(a){var b={};return function(){var b,c,d;for(b=function(a){return function(){_cio.push([a].concat(Array.prototype.slice.call(arguments,0)))}},c=["identify","track"],d=0;d<c.length;d++)_cio[c[d]]=b(c[d]);var e=document.createElement("script"),f=document.getElementsByTagName("script")[0];e.async=!0,e.id="cio-tracker",e.setAttribute("data-site-id",a),e.src="https://assets.customer.io/assets/track.js",f.parentNode.insertBefore(e,f)}(),b.identify=function(a,b,c){_cio.identify({id:a,email:b,created_at:c})},{identify:b.identify}};