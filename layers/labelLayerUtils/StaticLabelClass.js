// COPYRIGHT © 2015 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.15/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","dojo/has","../../kernel","../GraphicsLayer","../../geometry/Extent","../../geometry/Point","../../geometry/Polygon"],function(e,t,i,a,s,n,r,h){var o=e(s,{declaredClass:"esri.layers.labelLayerUtils.StaticLabel",constructor:function(){this._preparedLabels=[],this._placedLabels=[],this._extent=null,this._xmin=0,this._xmax=0,this._ymin=0,this._ymax=0,this._scale=1,this._LINE_STEP_CONST=1.5,this._POLYGON_X_STEP_CONST=1,this._POLYGON_Y_STEP_CONST=.75,this._OVERRUN=2},setMap:function(e,t){this._labelLayer=t,this._map=e,this._xmin=e.extent.xmin,this._xmax=e.extent.xmax,this._ymin=e.extent.ymin,this._ymax=e.extent.ymax,this._scale=(this._xmax-this._xmin)/e.width},_process:function(e){var t,i,a,s,n,o,l,_,g,c,f;for(this._preparedLabels=e,this._placedLabels=[],t=this._preparedLabels.length-1;t>=0;t--){i=this._preparedLabels[t],l=i.labelWidth,_=i.labelHeight,g=i.options,c=g&&g.lineLabelPlacement?g.lineLabelPlacement:"PlaceAtCenter",f=g&&g.lineLabelPosition?g.lineLabelPosition:"Above",s=g&&g.labelRotation?g.labelRotation:!0,n=i.angle*(Math.PI/180),o=g&&g.howManyLabels?g.howManyLabels:"OneLabel";var m=[];if("point"===i.geometry.type)this._generatePointPositions(i.geometry.x,i.geometry.y,i.text,n,l,_,i.symbolWidth,i.symbolHeight,g,m);else if("multipoint"===i.geometry.type)for(a=0;a<i.geometry.points.length;a++)this._generatePointPositions(i.geometry.points[a][0],i.geometry.points[a][1],i.text,n,l,_,i.symbolWidth,i.symbolHeight,g,m);else if("polyline"===i.geometry.type)if("PlaceAtStart"===c)this._generateLinePositionsPlaceAtStart(i.geometry,!0,i.text,l,_,2*i.symbolHeight+_,c,f,s,m);else if("PlaceAtEnd"===c)this._generateLinePositionsPlaceAtEnd(i.geometry,!0,i.text,l,_,2*i.symbolHeight+_,c,f,s,m);else{var y=[],x=i.geometry.getExtent(),p=this._map.extent;if(x.getWidth()<l*this._scale/this._OVERRUN&&x.getHeight()<l*this._scale/this._OVERRUN)continue;if(.5*x.getWidth()<p.getWidth()&&.5*x.getHeight()<p.getHeight()){var P=.1*Math.min(this._map.width,this._map.height)*this._scale;this._generateLinePositionsPlaceAtCenter(i.geometry,!1,P,i.text,l,_,2*i.symbolHeight+_,c,f,s,y)}else{var u=this._LINE_STEP_CONST*Math.min(this._map.width,this._map.height)*this._scale;this._generateLinePositionsPlaceAtCenter(i.geometry,!0,u,i.text,l,_,2*i.symbolHeight+_,c,f,s,y)}this._postSorting(x,y,m)}else if("polygon"===i.geometry.type)for(a=0;a<i.geometry.rings.length;a++){var b=i.geometry.rings[a];if(h.prototype.isClockwise(b)){var d=this._calcRingExtent(b);d.xmax-d.xmin<4*l*this._scale/this._OVERRUN&&d.ymax-d.ymin<4*_*this._scale/this._OVERRUN||this._generatePolygonPositionsForManyLabels(b,i.geometry.spatialReference,i.text,n,l,_,m)}}for(a=0;a<m.length;a++){var v=m[a].x,L=m[a].y;void 0!==m[a].angle&&(n=m[a].angle);var M=this._findPlace(i,i.text,v,L,n,l,_);if("OneLabel"===o&&M&&this._labelLayer._isWithinScreenArea(new r(v,L,i.geometry.spatialReference)))break}}return this._placedLabels},_generatePointPositions:function(e,t,i,a,s,n,r,h,o,l){var _,g,c,f,m;switch(m=o&&o.pointPriorities?o.pointPriorities:"AboveRight",c=(r+s)*this._scale,f=(h+n)*this._scale,m.toLowerCase()){case"aboveleft":_=e-c,g=t+f;break;case"abovecenter":_=e,g=t+f;break;case"aboveright":_=e+c,g=t+f;break;case"centerleft":_=e-c,g=t;break;case"centercenter":_=e,g=t;break;case"centerright":_=e+c,g=t;break;case"belowleft":_=e-c,g=t-f;break;case"belowcenter":_=e,g=t-f;break;case"belowright":_=e+c,g=t-f;break;default:return}l.push({x:_,y:g})},_generateLinePositionsPlaceAtStart:function(e,t,i,a,s,n,r,h,o,l){var _,g,c,f,m,y,x,p,P,u=a*this._scale,b=this._LINE_STEP_CONST*Math.min(this._map.width,this._map.height)*this._scale;for(_=0;_<e.paths.length;_++){var d=e.paths[_],v=u,L=0;for(g=0;g<d.length-1;g++)c=d[g][0],f=d[g][1],m=d[g+1][0],y=d[g+1][1],x=m-c,p=y-f,P=Math.sqrt(x*x+p*p),L+P>v?(L=this._generatePositionsOnLine(e.spatialReference,t,v,b,L,c,f,m,y,i,a,s,n,h,o,l),v=b):L+=P}},_generateLinePositionsPlaceAtEnd:function(e,t,i,a,s,n,r,h,o,l){var _,g,c,f,m,y,x,p,P,u=a*this._scale,b=this._LINE_STEP_CONST*Math.min(this._map.width,this._map.height)*this._scale;for(_=0;_<e.paths.length;_++){var d=e.paths[_],v=u,L=0;for(g=d.length-2;g>=0;g--)c=d[g+1][0],f=d[g+1][1],m=d[g][0],y=d[g][1],x=m-c,p=y-f,P=Math.sqrt(x*x+p*p),L+P>v?(L=this._generatePositionsOnLine(e.spatialReference,t,v,b,L,c,f,m,y,i,a,s,n,h,o,l),v=b):L+=P}},_generateLinePositionsPlaceAtCenter:function(e,t,i,a,s,n,r,h,o,l,_){var g,c,f,m,y,x,p,P,u;for(g=0;g<e.paths.length;g++){var b=e.paths[g];if(!(b.length<2)){var d=0;for(c=0;c<b.length-1;c++)m=b[c][0],y=b[c][1],x=b[c+1][0],p=b[c+1][1],P=x-m,u=p-y,d+=Math.sqrt(P*P+u*u);var v=0;for(c=0;c<b.length-1;c++){m=b[c][0],y=b[c][1],x=b[c+1][0],p=b[c+1][1],P=x-m,u=p-y;var L=Math.sqrt(P*P+u*u);if(v+L>d/2)break;v+=L}c==b.length-1&&c--,m=b[c][0],y=b[c][1],x=b[c+1][0],p=b[c+1][1],P=x-m,u=p-y;var M=d/2-v,O=Math.atan2(u,P),S=m+M*Math.cos(O),R=y+M*Math.sin(O),N=this._angleAndShifts(m,y,x,p,r,o,l);_.push({x:S+N.shiftX,y:R+N.shiftY,angle:N.angle});var E=S,w=R;for(v=0,f=c;f<b.length-1;f++)f==c?(m=E,y=w):(m=b[f][0],y=b[f][1]),x=b[f+1][0],p=b[f+1][1],P=x-m,u=p-y,L=Math.sqrt(P*P+u*u),v+L>i?v=this._generatePositionsOnLine(e.spatialReference,t,i,i,v,m,y,x,p,a,s,n,r,o,l,_):v+=L;for(v=0,f=c;f>=0;f--)f==c?(m=E,y=w):(m=b[f+1][0],y=b[f+1][1]),x=b[f][0],p=b[f][1],P=x-m,u=p-y,L=Math.sqrt(P*P+u*u),v+L>i?v=this._generatePositionsOnLine(e.spatialReference,t,i,i,v,m,y,x,p,a,s,n,r,o,l,_):v+=L}}},_generatePositionsOnLine:function(e,t,i,a,s,r,h,o,l,_,g,c,f,m,y,x){for(var p=o-r,P=l-h,u=Math.atan2(P,p),b=r,d=h,v=b,L=d,M=i;;){var O=M-s;if(b+=O*Math.cos(u),d+=O*Math.sin(u),!this._belongs(b,d,r,h,o,l)){var S=o-v,R=l-L;return Math.sqrt(S*S+R*R)}var N=this._angleAndShifts(r,h,o,l,f,m,y),E=b+N.shiftX,w=d+N.shiftY;t?this._labelLayer._isWithinScreenArea(new n(E,w,E,w,e))&&x.push({x:E,y:w,angle:N.angle}):x.push({x:E,y:w,angle:N.angle}),v=b,L=d,s=0,M=a}},_postSorting:function(e,t,i){if(e&&t.length>0){for(var a=.5*(e.xmin+e.xmax),s=.5*(e.ymin+e.ymax),n=0,r=t[0].x,h=t[0].y,o=Math.sqrt((r-a)*(r-a)+(h-s)*(h-s)),l=t[0].angle,_=0;_<t.length;_++){var g=t[_].x,c=t[_].y,f=Math.sqrt((g-a)*(g-a)+(c-s)*(c-s));o>f&&(n=_,r=g,h=c,o=f,l=t[_].angle)}i.push({x:r,y:h,angle:l})}},_belongs:function(e,t,i,a,s,n){if(s==i&&n==a)return!1;if(s>i){if(e>s||i>e)return!1}else if(s>e||e>i)return!1;if(n>a){if(t>n||a>t)return!1}else if(n>t||t>a)return!1;return!0},_angleAndShifts:function(e,t,i,a,s,n,r){for(var h=i-e,o=a-t,l=Math.atan2(o,h);l>Math.PI/2;)l-=Math.PI;for(;l<-(Math.PI/2);)l+=Math.PI;var _=Math.sin(l),g=Math.cos(l),c=0,f=0;"Above"==n&&(c=s*_*this._scale,f=s*g*this._scale),"Below"==n&&(c=-s*_*this._scale,f=-s*g*this._scale);var m=[];return m.angle=r?-l:0,m.shiftX=-c,m.shiftY=f,m},_generatePolygonPositionsForManyLabels:function(e,t,i,a,s,r,h){var o,l,_=this._calcRingExtent(e);if(.75*(_.xmax-_.xmin)>this._map.width*this._scale||.75*(_.ymax-_.ymin)>this._map.height*this._scale){var g=this._findCentroidForRing(e);o=this._map.width*this._scale<_.xmax-_.xmin?this._POLYGON_X_STEP_CONST*this._map.width*this._scale:this._POLYGON_X_STEP_CONST*(_.xmax-_.xmin),l=this._map.height*this._scale<_.ymax-_.ymin?this._POLYGON_Y_STEP_CONST*this._map.height*this._scale:this._POLYGON_Y_STEP_CONST*(_.ymax-_.ymin);var c,f,m,y=g[0]-Math.round((g[0]-_.xmin)/o)*o,x=g[1]-Math.round((g[1]-_.ymin)/l)*l;for(c=!0,m=x;m<_.ymax;m+=l)if(c=!c,!(m<this._ymin||m>this._ymax)){var p=c?0:o/2;for(f=y+p;f<_.xmax;f+=o)this._labelLayer._isWithinScreenArea(new n(f,m,f,m,t))&&this._isPointWithinRing(i,e,f,m)&&h.push({x:f,y:m})}}else{g=this._findCentroidForRing(e);for(var P=0;10>P;P++){var u=(P%2?-1:1)*Math.floor(P/2),b=u*r*this._scale,d=g[0],v=g[1]+b;if(this._labelLayer._isWithinScreenArea(new n(d,v,d,v,t))&&this._isPointWithinRing(i,e,d,v))return void h.push({x:d,y:v})}}},_calcRingExtent:function(e){var t,i;for(i=new n,t=0;t<e.length-1;t++){var a=e[t][0],s=e[t][1];(void 0===i.xmin||a<i.xmin)&&(i.xmin=a),(void 0===i.ymin||s<i.ymin)&&(i.ymin=s),(void 0===i.xmax||a>i.xmax)&&(i.xmax=a),(void 0===i.ymax||s>i.ymax)&&(i.ymax=s)}return i},_isPointWithinPolygon:function(e,t,i,a){var s;for(s=0;s<t.rings.length;s++){var n=t.rings[s];if(this._isPointWithinRing(e,n,i,a))return!0}return!1},_isPointWithinRing:function(e,t,i,a){var s,n,r,h,o,l=[],_=t.length;for(s=0;_-1>s;s++)if(n=t[s][0],r=t[s][1],h=t[s+1][0],o=t[s+1][1],n!=h||r!=o){if(r==o){if(a!=r)continue;l.push(n)}if(n==h)o>r&&a>=r&&o>a&&l.push(n),r>o&&r>=a&&a>o&&l.push(n);else{var g=(h-n)/(o-r)*(a-r)+n;h>n&&g>=n&&h>g&&l.push(g),n>h&&n>=g&&g>h&&l.push(g)}}for(l.sort(function(e,t){return e-t}),s=0;s<l.length-1;s++)if(n=l[s],h=l[s+1],i>=n&&h>i)return s%2?!1:!0;return!1},_findCentroidForRing:function(e){for(var t=e.length,i=[0,0],a=0,s=e[0][0],n=e[0][1],r=1;t-1>r;r++){var h=e[r][0],o=e[r][1],l=e[r+1][0],_=e[r+1][1],g=(h-s)*(_-n)-(l-s)*(o-n);i[0]+=g*(s+h+l),i[1]+=g*(n+o+_),a+=g}return i[0]/=3*a,i[1]/=3*a,i},_findCentroidForFeature:function(e){for(var t=0,i=[0,0],a=0,s=0;s<e.rings.length;s++){var n=e.rings[s],r=n.length;a+=r;for(var h=n[0][0],o=n[0][1],l=1;r-1>l;l++){var _=n[l][0],g=n[l][1],c=n[l+1][0],f=n[l+1][1],m=(_-h)*(f-o)-(c-h)*(g-o);i[0]+=m*(h+_+c),i[1]+=m*(o+g+f),t+=m}}return i[0]/=3*t,i[1]/=3*t,i},_findPlace:function(e,t,i,a,s,r,o){if(isNaN(i)||isNaN(a))return!1;for(var l=0;l<this._placedLabels.length;l++){var _=this._placedLabels[l].angle,g=this._placedLabels[l].x,c=this._placedLabels[l].y,f=this._placedLabels[l].width*this._scale,m=this._placedLabels[l].height*this._scale,y=g-i,x=c-a;if(0===s&&0===_){if(this._findPlace2(-r*this._scale,-o*this._scale,r*this._scale,o*this._scale,y-f,x-m,y+f,x+m))return!1}else{var p=new n(-r*this._scale,-o*this._scale,r*this._scale,o*this._scale,null),P=0,u=1;0!==s&&(P=Math.sin(s),u=Math.cos(s));var b=y*u-x*P,d=y*P+x*u,v=_-s,L=Math.sin(v),M=Math.cos(v),O=-f*M- -m*L,S=-f*L+-m*M,R=+f*M- -m*L,N=+f*L+-m*M,E=b+O,w=d-S,C=b+R,A=d-N,T=b-O,W=d+S,k=b-R,I=d+N,Y=new h;if(Y.addRing([[E,w],[C,A],[T,W],[k,I],[E,w]]),p.intersects(Y))return!1}}for(;s>Math.PI/2;)s-=Math.PI;for(;s<-(Math.PI/2);)s+=Math.PI;var H={};return H.layer=e,H.text=t,H.angle=s,H.x=i,H.y=a,H.width=r,H.height=o,this._placedLabels.push(H),!0},_findPlace2:function(e,t,i,a,s,n,r,h){return(e>=s&&r>=e||i>=s&&r>=i||s>=e&&i>=r)&&(t>=n&&h>=t||a>=n&&h>=a||n>=t&&a>=h)?!0:!1}});return o});