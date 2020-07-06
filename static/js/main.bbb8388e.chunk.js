(this["webpackJsonppolice-brutality-ui"]=this["webpackJsonppolice-brutality-ui"]||[]).push([[0],{172:function(e,t,a){e.exports=a(232)},177:function(e,t,a){},220:function(e,t){},230:function(e,t,a){},232:function(e,t,a){"use strict";a.r(t);var n=a(2),r=a.n(n),o=a(170),c=a.n(o),l=(a(177),a(40)),s=a(73),i=a.n(s),u=(a(230),{0:"Browse all",1:"Browse by date",2:"Browse by state"}),m=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",timeZone:"UTC"}),d=function(e){var t=e.allReports,a=e.sidebarMode,n=e.setSidebarMode,o=e.selectedDate,c=e.setSelectedDate,l=e.selectedState,s=e.setSelectedState,i=function(e){var t=e.unique("state").transpose().toArray()[0],a={};return t.forEach((function(t){a[t]=e.countValue(t,"state")})),Object.keys(a).map((function(e){return[e,a[e],e]})).sort((function(e,t){return e[0].localeCompare(t[0])}))},d=function(e){var t=e.unique("date").transpose().toArray()[0],a={};return t.forEach((function(t){a[t]=e.countValue(t,"date")})),Object.keys(a).map((function(e){return parseInt(e)})).map((function(e){return[new Date(e),a[e],e]})).sort((function(e,t){return t[2]-e[2]})).map((function(e){return[e[0].getFullYear()<2020?"Unknown Date":m.format(e[0]),e[1],e[2]]}))},f=function(e){return 1===a?e===o:e===l};return r.a.createElement(r.a.Fragment,null,null!==t&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"flex flex-col items-start mb-4"},Object.keys(u).map((function(e){return r.a.createElement("div",{key:e,className:"cursor-pointer px-2 py-1 rounded-md ".concat(parseInt(e)===parseInt(a)?"bg-orange-200":""),onClick:function(){return function(e){n(parseInt(e))}(e)}},u[e])}))),r.a.createElement("div",{className:"flex flex-col items-start"},function(){var e=parseInt(a);return 0===e?[]:1===e?d(t):i(t)}().map((function(e){return r.a.createElement("div",{onClick:function(){return t=e[2],void(1===a?c(t):s(t));var t},className:"cursor-pointer px-2 py-1 rounded-md transition-all ease-linear duration-300 hover:text-black\n                          ".concat(f(e[2])?"font-semibold bg-orange-200 text-black":"text-gray-600"),key:e[2]},r.a.createElement("span",null,e[0]),r.a.createElement("span",{className:"ml-2 px-1 rounded-md ".concat(f(e[2])?"bg-orange-400":"bg-gray-400")},e[1]))})))))},f=(new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",timeZone:"UTC"}),new Intl.DateTimeFormat("en-US",{year:"numeric",month:"numeric",day:"numeric",timeZone:"UTC"})),p={twitter:"bg-blue-500 text-gray-100",reddit:"bg-orange-400",redd:"bg-orange-400"};var b=function(){var e=Object(n.useState)(""),t=Object(l.a)(e,2),a=(t[0],t[1],Object(n.useState)(null)),o=Object(l.a)(a,2),c=o[0],s=o[1],u=Object(n.useState)(1),m=Object(l.a)(u,2),b=m[0],g=m[1],y=Object(n.useState)(null),h=Object(l.a)(y,2),v=h[0],w=h[1],E=Object(n.useState)(null),x=Object(l.a)(E,2),k=x[0],D=x[1],S=Object(n.useState)([]),j=Object(l.a)(S,2),N=j[0],O=j[1];Object(n.useEffect)((function(){fetch("https://raw.githubusercontent.com/2020PB/police-brutality/data_build/all-locations.json").then((function(e){return e.json()})).then((function(e){if(!("data"in e))throw"Missing key 'data' in Github response";var t=e.data,a=new i.a(t,["id","state","city","date","name","links"]);return a=a.map((function(e){var t=new Date(e.get("date"));return e.get("date")?e.set("date",new Date(t.getFullYear(),t.getMonth(),t.getDate()+1).getTime()+252e5):e.set("date",9466848e5)}))})).then((function(e){s(e),w(C(e)),D(U(e))})).catch((function(e){return console.error(e)}))}),[]);var C=function(e){var t=e.unique("date").transpose().toArray()[0];return t.sort((function(e,t){return e-t}))[t.length-1]},U=function(e){return e.unique("state").transpose().toArray()[0].sort()[0]};Object(n.useEffect)((function(){F()}),[b,k,v]);var F=function(){if(null!==c){var e=[];0===b?(e=c.toCollection()).sort((function(e,t){return t.date===e.date?e.state.localeCompare(t.state):new Date(t.date)-new Date(e.date)})):1===b?(e=c.filter((function(e){return e.get("date")===v})).toCollection()).sort((function(e,t){return new Date(t.date)-new Date(e.date)})):2===b&&(e=c.filter((function(e){return e.get("state")===k})).toCollection()).sort((function(e,t){return new Date(t.date)-new Date(e.date)})),O(e)}},I=function(e){var t;try{t=new URL(e)}catch(o){return"opacity-50 border border-gray-400"}for(var a=0,n=Object.keys(p);a<n.length;a++){var r=n[a];if(t.host.includes(r))return p[r]}return"bg-gray-400"};return r.a.createElement("div",{className:"container mx-auto"},r.a.createElement("div",{className:"my-6 text-3xl"},"Police Brutality During the 2020 George Floyd Protests"),r.a.createElement("div",{className:"flex my-4"},r.a.createElement("div",{className:"w-1/4"},r.a.createElement(d,{allReports:c,sidebarMode:b,setSidebarMode:g,selectedDate:v,setSelectedDate:w,selectedState:k,setSelectedState:D})),r.a.createElement("div",{className:"w-3/4"},N.map((function(e){return new Date(e.date).getFullYear()<2020&&(e.date=null),r.a.createElement("div",{key:e.pb_id,className:"max-w-full rounded overflow-hidden border border-gray-400 mb-4"},r.a.createElement("div",{className:"px-6 py-4"},r.a.createElement("div",{className:"mb-2"},r.a.createElement("span",{className:"font-bold text-gray-800 mr-2"},e.date?f.format(new Date(e.date)):"Unknown Date"),r.a.createElement("span",{className:"uppercase font-semibold text-sm text-gray-700 mr-1"},e.city,","),r.a.createElement("span",{className:"uppercase font-semibold text-sm text-gray-600"},e.state)),r.a.createElement("div",{className:"mb-2"},r.a.createElement("p",null,e.title?e.title:e.name)),r.a.createElement("div",null,r.a.createElement("span",{className:"uppercase font-bold text-gray-600 text-xs mr-2"},"Sources: "),e.links.map((function(e){return r.a.createElement("span",{className:"inline-block rounded-full px-3 py-1 mt-2 font-semibold text-sm mr-2 ".concat(I(e))},r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:e},function(e){var t;try{t=new URL(e)}catch(r){return"(bad link)"}if(t.host.includes("twitter.com")&&t.pathname){var a,n=t.pathname.split("/");return n.length>=2&&(a=n[1]),"@"+a}return t.host}(e)))})))))})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(b,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[172,1,2]]]);
//# sourceMappingURL=main.bbb8388e.chunk.js.map