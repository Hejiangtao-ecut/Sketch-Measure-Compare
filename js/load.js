(()=>{let e=null;const t=({msg:e,payload:t})=>{"object"==typeof t&&(t=JSON.stringify(t)),void 0===t&&(t=""),window.postMessage({to:"content",msg:e,payload:t})};window.addEventListener("message",(o=>{const{msg:n,to:i,payload:d}=o.data||{};if("load"===i){if("getConfig"===n&&t({msg:"getConfig",payload:window.top.sketchMeasureCompare?.config}),"config"===n){const t=JSON.parse(d);e&&e.then((()=>{console.log("%c🎉 Sketch Measure Compare Config Success!","color: #ffffff; background-color: #87d068; padding:4px 10px;"),window.top.sketchMeasureCompare?.config?Object.keys(t).forEach((e=>{window.top.sketchMeasureCompare.config[e]!==t[e]&&(window.top.sketchMeasureCompare.config[e]=t[e])})):window.top.sketchMeasureCompare.init(t)}))}if("load"!==n||e||(e=new Promise((e=>{const t=document.createElement("script");t.src=d,document.head.appendChild(t),t.onload=e}))),"getScreenInfo"===n)try{const e=Array.from(document.querySelectorAll("iframe")).filter((e=>e.src===window.top.sketchMeasureCompare?.html))[0].contentDocument.querySelectorAll("iframe")[0].contentDocument.getElementById("screen").getBoundingClientRect();if(e&&e.x+e.width>0&&e.x+e.width+10<window.innerWidth){const o=window.top.sketchMeasureCompare.config.offsetY,n=window.top.sketchMeasureCompare.config.offsetX,i=o>0?o:0;let d=e.y+i;d<0&&(d=0);let c=e.y+e.height;c>window.innerHeight&&(c=window.innerHeight);const r=c-d,a=n>0?n:0;let s=e.x+a;s<0&&(s=0);let w=e.x+2*e.width+10;w>window.innerWidth&&(w=window.innerWidth);const h=e.x+e.width-s,g=w-(e.x+e.width+10),f=Math.min(h,g),l={win:{width:window.innerWidth,height:window.innerHeight},ui:{x:e.x+e.width-f,y:d,width:f,height:r},web:{x:e.x+e.width+10,y:d,width:f,height:r},title:document.title};t({msg:"getScreenInfo",payload:l})}}catch{}}})),t({msg:"getConfig",payload:window.top.sketchMeasureCompare?.config})})();