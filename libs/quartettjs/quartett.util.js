(function(b,a){b.Util={isArray:function(c){return toString.call(c)==="[object Array]"},isFunction:function(c){return typeof c==="function"},isString:function(c){return typeof c==="string"},deepExtend:function(){var h=arguments[0]||{},f=1,g=arguments.length,c=false,e;if(h.constructor==Boolean){c=h;h=arguments[1]||{};f=2}if(typeof h!="object"&&typeof h!="function"){h={}}if(g==1){h=this;f=0}for(;f<g;f++){if((e=arguments[f])!=null){for(var d in e){if(h===e[d]){continue}if(c&&e[d]&&typeof e[d]=="object"&&h[d]&&!e[d].nodeType){h[d]=this.deepExtend(true,h[d],e[d])}else{if(e[d]!=a){h[d]=e[d]}}}}}return h},shuffleArray:function(c){for(var f=c.length-1;f>0;f--){var d=Math.floor(Math.random()*(f+1));var e=c[f];c[f]=c[d];c[d]=e}return c}}})(quartett);