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

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/connect","dojo/_base/event","dojo/_base/kernel","dojo/dom-attr","dojo/string","dojo/dom-style","dojo/dom-class","dojo/has","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/form/CheckBox","dijit/form/RadioButton","dijit/form/TimeTextBox","dijit/form/Select","dijit/form/HorizontalSlider","dijit/form/HorizontalRule","dijit/form/HorizontalRuleLabels","../../kernel","dojo/i18n!../../nls/jsapi","dojo/text!./templates/TrafficTime.html"],function(e,i,t,s,a,l,n,r,d,f,o,c,h,T,u,m,_,b,v,g,j,C,x,L,y,k){var D=i([c,h,T,u,m],{declaredClass:"esri.dijit.analysis.TrafficTime",i18n:null,templateString:k,widgetsInTemplate:!0,_liveOffset:0,postMixInProperties:function(){this.i18n={},t.mixin(this.i18n,y.common),t.mixin(this.i18n,y.driveTimes)},postCreate:function(){this.inherited(arguments),this._handleUseTrafficCheckChange(this._useTrafficCheck.get("value"))},_handleUseTrafficCheckChange:function(e){this._typicalTrafficRadioBtn.set("disabled",!e),this._liveTrafficRadioBtn.set("disabled",!e),e?this._handleLifeTrafficRadioChange(this._liveTrafficRadioBtn.get("value")):(this._liveTimeSlider.set("disabled",!e),this._trafficTime.set("disabled",!e),this._trafficDay.set("disabled",!e)),e?(f.remove(this._liveTraficLabel,"esriAnalysisTextDisabled"),f.remove(this._typicalTraficLabel,"esriAnalysisTextDisabled"),f.remove(this._liveTimeRuleLabels,"esriAnalysisTextDisabled")):(f.add(this._liveTraficLabel,"esriAnalysisTextDisabled"),f.add(this._typicalTraficLabel,"esriAnalysisTextDisabled"),f.add(this._liveTimeRuleLabels,"esriAnalysisTextDisabled"))},_handleLifeTrafficRadioChange:function(e){this._liveTimeSlider.set("disabled",!e),this._trafficTime.set("disabled",e),this._trafficDay.set("disabled",e)},_setDisabledAttr:function(e){this._useTrafficCheck.set("disabled",e)},_setResetAttr:function(e){e&&this._useTrafficCheck.set("checked",!1)},_getCheckedAttr:function(){return this._useTrafficCheck.get("checked")},_setCheckedAttr:function(e){this._useTrafficCheck.set("checked",e)},_getTimeOfDayAttr:function(){var e,i;return this._liveTrafficRadioBtn.get("value")?e=(new Date).getTime()+60*this._liveOffset*1e3:(i=new Date(this._trafficDay.get("value")),e=i.getTime()-60*i.getTimezoneOffset()*1e3+this._trafficTime.get("value").getTime()-60*this._trafficTime.get("value").getTimezoneOffset()*1e3),e},_getTimeZoneForTimeOfDayAttr:function(){return this._liveTrafficRadioBtn.get("value")?"UTC":""},_handleLiveTimeSliderChange:function(e){var i,t,s,a;i=60*e,t=Math.floor(e),s=i-60*t,a=0===t&&0===s?this.i18n.liveTrafficLabel:0===t?r.substitute(this.i18n.liveTimeMinutesLabel,{minute:s}):1===t?0===s?this.i18n.liveSingularHourTimeLabel:r.substitute(this.i18n.liveSingularTimeLabel,{minute:s}):0===s?r.substitute(this.i18n.liveTimeHoursLabel,{hour:t,minute:s}):r.substitute(this.i18n.liveTimeLabel,{hour:t,minute:s}),this._liveOffset=i,n.set(this._liveTraficLabel,"innerHTML",a)}});return o("extend-esri")&&t.setObject("dijit.analysis.TrafficTime",D,L),D});