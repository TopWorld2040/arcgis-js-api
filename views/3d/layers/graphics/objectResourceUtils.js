// COPYRIGHT © 2017 Esri
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
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.

define(["require","exports","../../../../core/tsSupport/extendsHelper","dojo/_base/lang","dojo/Deferred","../../../../request","../../lib/glMatrix","../../webgl-engine/Stage","../../webgl-engine/lib/Util","../../webgl-engine/lib/Geometry","../../webgl-engine/lib/GeometryData","../../webgl-engine/materials/Material","../../webgl-engine/materials/internal/MaterialUtil","../../webgl-engine/lib/Texture","../../support/aaBoundingBox"],function(e,t,r,n,a,o,i,s,l,u,m,p,c,f,d){function v(e,t){if(t=t||{},t.streamDataSupplier){var r=t.streamDataSupplier.request(e,"json"),n=new a(function(){return t.streamDataSupplier.cancelRequest(r)});return r.then(function(e,r){var a=y(r,t);n.resolve(a)},function(){n.reject()}),n.promise}var i=o(e),s=new a(function(){return i.cancel()});return i.then(function(e){var r=y(e.data,t);s.resolve(r)},function(){s.reject()}),s.promise}function g(e){for(var t=e.stageResources[s.ModelContentType.GEOMETRY],r=e.geometryTransformations,n=d.create(d.NEGATIVE_INFINITY),a=[0,0,0],o=[0,0,0],i=0;i<t.length;i++)for(var l=t[i],u=l.getNumGroups(),m=0;u>m;++m){var p=l.getBoundingInfo(m);I.multiplyVec3(r[i],p.getBBMin(),a),I.multiplyVec3(r[i],p.getBBMax(),o);for(var c=0;3>c;++c){if(a[c]>o[c]){var f=a[c];a[c]=o[c],o[c]=f}n[c]=Math.min(n[c],a[c]),n[c+3]=Math.max(n[c+3],o[c])}}return n}function y(e,t){var r=[],a=[],o=[],i=[],l=[],d=[],v="meshsymbol_"+e.model.name,g=e.textureDefinitions,y={};for(var E in g){var S=g[E],C=S.images[0].data;A(C,"symbol resources must have embedded texture data (at the moment)");var D=S.encoding+";base64,"+C,O="/textureDefinitions/"+E,R=new f(D,v,{noUnpackFlip:!0});l.push(R),y[O]={engineTexObj:R,transparent:"rgba"===S.channels}}for(var j=e.model.geometries,G=e.materialDefinitions,U=0;U<j.length;U++){var q=j[U];q.params.components||x(q);var N=q.params.components,P=N.length,V=q.params.faces,k=q.params.vertexAttributes,F=q.params.topology||"Indexed",Y={};for(var _ in k){var z=k[_],H=z.values;if(A(z.values,"symbol resources with external geometry bin not yet supported"),t.bakeTransformations){if("position"===_){var K=q.transformation;H=H.slice(0),T(H,3,0,H.length,w,K)}if("normal"===_){var L=B.create();H=H.slice(0),M(L,q.transformation),T(H,3,0,H.length,h,L)}}Y[_]={data:H,size:z.valuesPerElement}}var X=void 0,J=void 0,Q=new Array(P);if("Indexed"===F){X=V.componentIndices,J={};for(var W in V)J[W]=V[W].byteOffset}else"PerAttributeArray"!==F?console.warn("I3S symbol loader: unsupported topology type "+F):1!==P&&console.warn("I3S symbol loader: if topology is not Indexed, only single component geometries are supported");o.push([]);for(var Z=0;Z<N.length;Z++){var $=N[Z],ee={type:"triangle",positionKey:"position",indices:{}};if(X){var te=P-1>Z?X[Z+1]-X[Z]:V.position.count-X[Z];for(var re in V)if("componentIndices"!==re){var ne=V[re];A(ne.values,"symbol resources with external geometry bin not yet supported"),ee.indices[re]=new Uint32Array(ne.values),J[re]+=4*te}}else{var ae=b(Y.position.data.length/Y.position.size);for(var oe in Y)ee.indices[oe]=ae}Q[Z]=ee;var ie=void 0;$.texture&&(ie=y[$.texture].engineTexObj.getId());var se=i[$.material]?i[$.material][$.texture]:null;if(!se){var le=$.material.substring($.material.lastIndexOf("/")+1),ue=G[le].params;1===ue.transparency&&(ue.transparency=0);var me={ambient:ue.diffuse,diffuse:ue.diffuse,specular:ue.specular,shininess:ue.shininess,opacity:1-ue.transparency,transparent:ue.transparency>0,textureId:ie,doubleSided:!0,cullFace:"none",flipV:!1,externalColorMixMode:c.externalColorMixModes[ue.externalColorMixMode||"tint"]};t.materialParamsMixin&&n.mixin(me,t.materialParamsMixin),se=new p(me,v),i[$.material]||(i[$.material]={}),i[$.material][$.texture]=se,a.push(se)}o[U].push(se)}var pe=new u(new m(Q,Y),v),ce=I.create(q.transformation);t.bakeTransformations&&I.identity(ce),r.push(pe),d.push(ce)}return{stageResources:(fe={},fe[s.ModelContentType.TEXTURE]=l,fe[s.ModelContentType.MATERIAL]=a,fe[s.ModelContentType.GEOMETRY]=r,fe),geometryTransformations:d,materialsByComponent:o,pivotOffset:e.model.pivotOffset};var fe}function x(e){var t=e.params;A(t.material),t.components=[{id:1,material:e.params.material,texture:e.params.texture,region:e.params.texture}],t.faces&&(t.faces.componentIndices=[t.faces.position.count])}function b(e){for(var t=new Uint32Array(e),r=0;e>r;r++)t[r]=r;return t}function h(e,t,r){var n=t[0],a=t[1],o=t[2];return e[0]=n*r[0]+a*r[3]+o*r[6],e[1]=n*r[1]+a*r[4]+o*r[7],e[2]=n*r[2]+a*r[5]+o*r[8],e}function M(e,t){var r=t[0],n=t[1],a=t[2],o=t[3],i=t[4],s=t[5],l=t[6],u=t[7],m=t[8],p=t[9],c=t[10],f=t[11],d=t[12],v=t[13],g=t[14],y=t[15],x=r*s-n*i,b=r*l-a*i,h=r*u-o*i,M=n*l-a*s,w=n*u-o*s,T=a*u-o*l,I=m*v-p*d,B=m*g-c*d,E=m*y-f*d,A=p*g-c*v,S=p*y-f*v,C=c*y-f*g,D=x*C-b*S+h*A+M*E-w*B+T*I;return D?(D=1/D,e[0]=(s*C-l*S+u*A)*D,e[1]=(l*E-i*C-u*B)*D,e[2]=(i*S-s*E+u*I)*D,e[3]=(a*S-n*C-o*A)*D,e[4]=(r*C-a*E+o*B)*D,e[5]=(n*E-r*S-o*I)*D,e[6]=(v*T-g*w+y*M)*D,e[7]=(g*h-d*T-y*b)*D,e[8]=(d*w-v*h+y*x)*D,e):null}function w(e,t,r){var n=t[0],a=t[1],o=t[2],i=r[3]*n+r[7]*a+r[11]*o+r[15]||1;return e[0]=(r[0]*n+r[4]*a+r[8]*o+r[12])/i,e[1]=(r[1]*n+r[5]*a+r[9]*o+r[13])/i,e[2]=(r[2]*n+r[6]*a+r[10]*o+r[14])/i,e}function T(e,t,r,n,a,o){var i;t||(t=3),r||(r=0),i=n?Math.min(n*t+r,e.length):e.length;for(var s=S,l=r;i>l;l+=t)s[0]=e[l],s[1]=e[l+1],s[2]=e[l+2],a(s,s,o),e[l]=s[0],e[l+1]=s[1],e[l+2]=s[2];return e}var I=i.mat4d,B=i.mat3d,E=i.vec3d,A=l.assert;t.fetch=v,t.computeBoundingBox=g,t.createStageResources=y;var S=E.create()});