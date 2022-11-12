function setViewFieldFromParameter(n,t){n.value=t.getValueString();setViewFieldValidationStatus(n,t.isValid,t.validationMessage)}function setViewFieldValidationStatus(n,t,i){var u=$(n).parents(".form-group"),r;t?u.removeClass("has-error"):u.addClass("has-error");r=$(n).siblings(".help-block");r.length===0&&(r=$(n).parent().parent().find(".help-block"));r.text(i);i!=""?$(n).attr("title",i):$(n).removeAttr("title")}function BSHolder(n,t,i,r,u){this.stock=Math.max(n,0);this.strike=Math.max(t,0);this.interest=Math.max(i,0);this.vola=Math.max(r,0);this.term=Math.max(u,0);this.setStock=function(n){return typeof n=="undefined"?this.stock:(this.stock=Math.max(n,0),this)};this.setStrike=function(n){return typeof n=="undefined"?this.strike:(this.strike=Math.max(n,0),this)};this.setInterest=function(n){return typeof n=="undefined"?this.interest:(this.interest=Math.max(n,0),this)};this.setVola=function(n){return typeof n=="undefined"?this.vola:(this.vola=Math.max(n,0),this)};this.setTerm=function(n){return typeof n=="undefined"?this.term:(this.term=Math.max(n,0),this)}}function createBSHolderFromOptionParameters(n){var t=n;return new BSHolder(t.price,t.strike,t.riskFreeRate,t.volatility,t.yearsToExpiry)}function callPaggistFunction(n,t){var i=createBSHolderFromOptionParameters(t);return BS[n](i)}function callPremium(n){return callPaggistFunction("call",n)}function putPremium(n){return callPaggistFunction("put",n)}function callDelta(n){return callPaggistFunction("cdelta",n)}function putDelta(n){return callPaggistFunction("pdelta",n)}function gamma(n){return callPaggistFunction("gamma",n)}function vega(n){return callPaggistFunction("vega",n)}function callTheta(n){return callPaggistFunction("ctheta",n)}function putTheta(n){return callPaggistFunction("ptheta",n)}function callRho(n){return callPaggistFunction("crho",n)}function putRho(n){return callPaggistFunction("prho",n)}var math,mvc,stringsTable,view,textBoxWithClearButton,binaryOptions,charting,options;window.console||(console={log:function(){}}),function(){if("performance"in window==!1&&(window.performance={}),Date.now=Date.now||function(){return(new Date).getTime()},"now"in window.performance==!1){var n=Date.now();performance.timing&&performance.timing.navigationStart&&(n=performance.timing.navigationStart);window.performance.now=function(){return Date.now()-n}}}();math={};math.roundAndToString=function(n,t,i){var r=n.toFixed(t);return i&&(r=parseFloat(r).toString()),r};math.fromDaysToYears=function(n){return n/365};mvc=mvc||{};stringsTable={valueShouldBePositive:"Please enter a positive value.",valueShouldBeNumber:"Please enter a number."};mvc.Parameter=function(n,t,i,r,u){this.value=n;this.isValid=!0;this.validationMessage=undefined;this.mustBePositive=!0;this.allowEmptyValue=!1;this.autoCorrectErrors=!1;this.isPercentFormat=t===undefined?!1:t;this.wasChanged=!1;this.isNumber=i===undefined?!0:i;this.isBool=r===undefined?!1:r;this.isString=u===undefined?!1:u;this.lastValueString="";this.getValue=function(){return this.value};this.setValue=function(n){var t=n.toString();this.setValueString(t)};this.getValueString=function(){var t,i,r;return this.isNanOrUndefined()?t=this.lastValueString:this.isNumber?(i=this.isPercentFormat?this.value*100:this.value,r=math.roundAndToString(i,4,!0),t=r):t=this.isBool?n.toString():n,t};this.setValueString=function(n){if(this.lastValueString=n,this.isNumber)if(n==""&&this.allowEmptyValue)this.value=undefined;else{var t=parseFloat(n);isNaN(t)?this.setValidationInfo(!1,stringsTable.valueShouldBeNumber):t<0&&this.mustBePositive?this.setValidationInfo(!1,stringsTable.valueShouldBePositive):(this.value=this.isPercentFormat?t/100:t,this.setValidationInfo(!0))}else this.value=this.isBool?n.toString()==="true":n;this.wasChanged=!0};this.increase=function(n){this.value+=n};this.decreaseButNotBelowZero=function(n){var t=this.value-n;this.value=t<0?0:t};this.isInvalid=function(){return!this.isValid};this.isNanOrUndefined=function(){return isNaN(this.value)||this.value===undefined};this.isNanUndefinedOrInvalid=function(){return this.isNanOrUndefined()||this.isInvalid()};this.setValidationInfo=function(n,t){this.isValid=n;n?this.validationMessage="":this.autoCorrectErrors?(this.isValid=!0,this.wasChanged=!1):(this.value=undefined,this.validationMessage=t)};this.clearValue=function(){this.value=undefined}};view=view||{};view.createTextBox=function(n,t,i){var r=$("<input />",{type:"text",id:n,value:t});return i&&r.attr("class",i),r};view.createSelectControl=function(n,t,i,r){var u=$("<select />",{size:"1",id:n});return r&&u.attr("class",r),$.each(t,function(n,t){var f=t[0],e=t[1],r=$("<option />",{value:f});r.text(e);i!==undefined&&f.toString()==i.toString()&&r.attr("selected","true");u.append(r)}),u};view.setViewCheckBox=function(n,t){n.checked=t};view.setTextBoxEnabled=function(n,t){t?$(n).removeAttr("disabled"):$(n).attr("disabled","true")};textBoxWithClearButton=textBoxWithClearButton||{};textBoxWithClearButton.initialize=function(){textBoxWithClearButton.initializeClearValueButton(".textbox-with-clear-button")};textBoxWithClearButton.initializeClearValueButton=function(n){var t=$(n);(function(){t.after('<span class="input-group-btn"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-remove"><\/span><\/button><\/span>')})();t.parent().find("button").on("click",function(){var t=$(this).parents(".input-group"),n=t.find("input[type=text]");n.val("");n.trigger("change")})};$(textBoxWithClearButton.initialize);options={};options.BlackScholes=function(n,t,i,r,u,f){var e,o;return e=this.calculateD1(t,i,f,r,u),o=e-f*Math.sqrt(r),n=="c"?t*this.CND(e)-i*Math.exp(-u*r)*this.CND(o):i*Math.exp(-u*r)*this.CND(-o)-t*this.CND(-e)};options.CND=function(n){var i,r,u,f,e,t;return(i=.31938153,r=-.356563782,u=1.781477937,f=-1.821255978,e=1.330274429,n<0)?1-this.CND(-n):(t=1/(1+.2316419*n),1-Math.exp(-n*n/2)/Math.sqrt(2*Math.PI)*t*(i+t*(-.356563782+t*(1.781477937+t*(-1.821255978+t*1.330274429)))))};options.calculateD1=function(n,t,i,r,u){return(Math.log(n/t)+(u+i*i/2)*r)/(i*Math.sqrt(r))};options.calculateD2=function(n,t,i,r,u){var f=this.calculateD1(n,t,i,r,u);return f-i*Math.sqrt(r)};options.d1=function(n){return this.calculateD1(n.price,n.strike,n.yearsToExpiry,n.riskFreeRate,n.volatility)};options.d2=function(n){return this.calculateD2(n.price,n.strike,n.yearsToExpiry,n.riskFreeRate,n.volatility)};options.nd1=function(n){var t=this.d1(n);return this.CND(t)};options.nd2=function(n){var t=this.d2(n);return this.CND(t)};options.fd1=function(n){var t=this.d1(n);return NormalD.stdpdf(t)};options.fd2=function(n){var t=this.d2(n);return NormalD.stdpdf(t)};options.discountFactor=function(n,t){return Math.exp(-n*t)};options.callPremium=function(n){return options.callPutPremium(!0,n)};options.putPremium=function(n){return options.callPutPremium(!1,n)};options.callPutPremium=function(n,t){return this.BlackScholes(n?"c":"p",t.price,t.strike,t.yearsToExpiry,t.riskFreeRate,t.volatility)};options.impliedVolatility=function(n,t,i,r,u,f,e){e===undefined&&(e=.3);for(var s=1e-5,o=e,h=1,c=n?"c":"p";;){var l=this.BlackScholes(c,t,i,r,u,o),v=o-s,y=this.BlackScholes(c,t,i,r,u,v),a=(y-l)/s;if(Math.abs(a)<1e-5||h==100)break;o=o-(f-l)/a;h++}return o};binaryOptions={};binaryOptions.premium=function(n,t){var i=n,r=options.calculateD2(i.price,i.strike,i.volatility,i.yearsToExpiry,i.riskFreeRate);return options.CND(t?r:-r)*Math.exp(-i.riskFreeRate*i.yearsToExpiry)};binaryOptions.callDelta=function(n){var t=n,i=options.discountFactor(t.riskFreeRate,t.yearsToExpiry),r=options.fd2(t);return i*r/(t.volatility*t.price*Math.pow(t.yearsToExpiry,.5))};binaryOptions.putDelta=function(n){var t=this.callDelta(n);return-1*t};binaryOptions.callGamma=function(n){var t=n,i=options.discountFactor(t.riskFreeRate,t.yearsToExpiry),r=options.fd2(t),u=options.d1(t);return-1*i*u*r/(Math.pow(t.volatility,2)*Math.pow(t.price,2)*t.yearsToExpiry)};binaryOptions.putGamma=function(n){return-1*this.callGamma(n)};binaryOptions.callVega=function(n){var t=n,i=options.discountFactor(t.riskFreeRate,t.yearsToExpiry),r=options.fd2(t),u=options.d1(t),f=-i*r*u/t.volatility;return f/100};binaryOptions.putVega=function(n){var t=n;return-1*this.callVega(n)};binaryOptions.callTheta=function(n,t){t===undefined&&(t=0);var i=n,r=options.discountFactor(i.riskFreeRate,i.yearsToExpiry),u=options.nd2(i),f=options.fd2(i),e=options.d1(i),o=i.riskFreeRate*r*u+r*f*(e/(2*i.yearsToExpiry)-(i.riskFreeRate-t)/(i.volatility*Math.sqrt(i.yearsToExpiry)));return o/365};binaryOptions.putTheta=function(){};var NormalD={normalcdf:function(n){var t=1/(1+.2316419*Math.abs(n)),r=.3989423*Math.exp(-n*n/2),i=r*t*(.3193815+t*(-.3565638+t*(1.781478+t*(-1.821256+t*1.330274))));return n>0&&(i=1-i),i},compute:function(n,t,i){var r;return i<0?$C.e("normal","The standard deviation must be nonnegative."):i===0?r=n<t?0:1:(r=NormalD.normalcdf((n-t)/i),r=Math.round(1e5*r)/1e5),r},stdcompute:function(n){return NormalD.compute(n,0,1)},stdpdf:function(n){var t=Math.sqrt(2*Math.PI),i=Math.exp(-Math.pow(n,2)/2);return i/t}},BS={call:function(n){var t=(Math.log(n.stock/n.strike)+(n.interest+.5*Math.pow(n.vola,2))*n.term)/(n.vola*Math.sqrt(n.term)),r=t-n.vola*Math.sqrt(n.term),i=Math.round((n.stock*NormalD.stdcompute(t)-n.strike*Math.exp(-n.interest*n.term)*NormalD.stdcompute(r))*100)/100;return isNaN(i)?0:i},put:function(n){var t=(Math.log(n.stock/n.strike)+(n.interest+.5*Math.pow(n.vola,2))*n.term)/(n.vola*Math.sqrt(n.term)),r=t-n.vola*Math.sqrt(n.term),i=Math.round((n.strike*Math.pow(Math.E,-n.interest*n.term)*NormalD.stdcompute(-r)-n.stock*NormalD.stdcompute(-t))*100)/100;return isNaN(i)?0:i},cdelta:function(n){var i=(Math.log(n.stock/n.strike)+(n.interest+.5*Math.pow(n.vola,2))*n.term)/(n.vola*Math.sqrt(n.term)),t=Math.max(NormalD.stdcompute(i),0);return isNaN(t)?0:t},pdelta:function(n){var i=(Math.log(n.stock/n.strike)+(n.interest+.5*Math.pow(n.vola,2))*n.term)/(n.vola*Math.sqrt(n.term)),t=Math.min(NormalD.stdcompute(i)-1,0);return isNaN(t)?0:t},gamma:function(n){var i=(Math.log(n.stock/n.strike)+(n.interest+.5*Math.pow(n.vola,2))*n.term)/(n.vola*Math.sqrt(n.term)),r=NormalD.stdpdf(i),t=Math.max(r/(n.stock*n.vola*Math.sqrt(n.term)),0);return isNaN(t)?0:t},vega:function(n){var i=(Math.log(n.stock/n.strike)+(n.interest+.5*Math.pow(n.vola,2))*n.term)/(n.vola*Math.sqrt(n.term)),r=NormalD.stdpdf(i),t=Math.max(n.stock*r*Math.sqrt(n.term),0);return isNaN(t)?0:t},ctheta:function(n){var t=(Math.log(n.stock/n.strike)+(n.interest+.5*Math.pow(n.vola,2))*n.term)/(n.vola*Math.sqrt(n.term)),r=t-n.vola*Math.sqrt(n.term),u=NormalD.stdpdf(t),f=-(n.stock*u*n.vola)/(2*Math.sqrt(n.term)),e=n.interest*n.strike*Math.exp(-n.interest*n.term)*NormalD.normalcdf(r),i=Math.min(f-e,0);return isNaN(i)?0:i},ptheta:function(n){var t=(Math.log(n.stock/n.strike)+(n.interest+.5*Math.pow(n.vola,2))*n.term)/(n.vola*Math.sqrt(n.term)),r=t-n.vola*Math.sqrt(n.term),u=NormalD.stdpdf(t),f=-(n.stock*u*n.vola)/(2*Math.sqrt(n.term)),e=n.interest*n.strike*Math.exp(-n.interest*n.term)*NormalD.normalcdf(-r),i=Math.min(f+e,0);return isNaN(i)?0:i},crho:function(n){var i=(Math.log(n.stock/n.strike)+(n.interest+.5*Math.pow(n.vola,2))*n.term)/(n.vola*Math.sqrt(n.term)),r=NormalD.normalcdf(i-n.vola*Math.sqrt(n.term)),t=Math.max(n.term*n.strike*Math.exp(-n.interest*n.term)*r,0);return isNaN(t)?0:t},prho:function(n){var i=(Math.log(n.stock/n.strike)+(n.interest+.5*Math.pow(n.vola,2))*n.term)/(n.vola*Math.sqrt(n.term)),r=NormalD.normalcdf(-(i-n.vola*Math.sqrt(n.term))),t=Math.min(-n.term*n.strike*Math.exp(-n.interest*n.term)*r,0);return isNaN(t)?0:t},comega:function(n){var i=(Math.log(n.stock/n.strike)+(n.interest+.5*Math.pow(n.vola,2))*n.term)/(n.vola*Math.sqrt(n.term)),r=NormalD.normalcdf(i-n.vola*Math.sqrt(n.term)),t=r*(n.stock/BS.call(n));return isNaN(t)?0:t},pomega:function(n){var i=(Math.log(n.stock/n.strike)+(n.interest+.5*Math.pow(n.vola,2))*n.term)/(n.vola*Math.sqrt(n.term)),r=NormalD.normalcdf(i-n.vola*Math.sqrt(n.term)),t=(r-1)*(n.stock/BS.put(n));return isNaN(t)?0:t}},graph={};options=options||{};options.OptionParameters=function(n,t,i,r,u){this.price=n;this.strike=t;this.volatility=i;this.riskFreeRate=r;this.yearsToExpiry=u};options.OptionsCalculator=function(){this.price=new mvc.Parameter(100);this.strike=new mvc.Parameter(100);this.volatility=new mvc.Parameter(.3,!0);this.yearsToExpiry=new mvc.Parameter(1);this.riskFreeRate=new mvc.Parameter(.02,!0);this.callPremium=new mvc.Parameter;this.putPremium=new mvc.Parameter;this.callDelta=new mvc.Parameter;this.putDelta=new mvc.Parameter;this.callGamma=new mvc.Parameter;this.putGamma=new mvc.Parameter;this.callVega=new mvc.Parameter;this.putVega=new mvc.Parameter;this.callTheta=new mvc.Parameter;this.putTheta=new mvc.Parameter;this.callRho=new mvc.Parameter;this.putRho=new mvc.Parameter;this.isCallPremiumFixed=!1;this.isPutPremiumFixed=!1;this.isVolatilityFixed=function(){return!this.isCallPremiumFixed&&!this.isPutPremiumFixed};this.hasInvalidParameters=function(){var n=this.price.isValid&&this.strike.isValid&&this.volatility.isValid&&this.yearsToExpiry.isValid&&this.riskFreeRate.isValid;return!n};this.getPremiumAndGreeksParameters=function(){return[this.callPremium,this.putPremium,this.callDelta,this.putDelta,this.callGamma,this.putGamma,this.callVega,this.putVega,this.callTheta,this.putTheta,this.callRho,this.putRho]};this.clearResults=function(){$.each(this.getPremiumAndGreeksParameters(),function(){this.clearValue()})};this.calculate=function(){this.hasInvalidParameters()?this.clearResults():this.performCalculation()};this.calculatePremiumOrIv=function(){this.checkIfPremiumOrVolatilityWasChanged();this.isCallPremiumFixed?(this.performCalculationIv(),this.putPremium.value=this.calculatePremium(!1)):this.isPutPremiumFixed?(this.performCalculationIv(),this.callPremium.value=this.calculatePremium(!0)):(this.callPremium.value=this.calculatePremium(!0),this.putPremium.value=this.calculatePremium(!1))};this.performCalculationIv=function(){var n=this.isCallPremiumFixed,t=n?this.callPremium.value:this.putPremium.value;this.volatility.value=options.impliedVolatility(n,this.price.value,this.strike.value,this.yearsToExpiry.value,this.riskFreeRate.value,t)};this.checkIfPremiumOrVolatilityWasChanged=function(){this.callPremium.wasChanged?(this.isCallPremiumFixed=!0,this.isPutPremiumFixed=!1,this.clearPremiumVolatilityWasChanged()):this.putPremium.wasChanged?(this.isCallPremiumFixed=!1,this.isPutPremiumFixed=!0,this.clearPremiumVolatilityWasChanged()):this.volatility.wasChanged&&(this.isCallPremiumFixed=!1,this.isPutPremiumFixed=!1,this.clearPremiumVolatilityWasChanged())};this.clearPremiumVolatilityWasChanged=function(){this.callPremium.wasChanged=!1;this.putPremium.wasChanged=!1;this.volatility.wasChanged=!1};this.performCalculation=function(){this.calculatePremiumOrIv();var n=this.getOptionParameters();this.callDelta.value=callDelta(n);this.putDelta.value=putDelta(n);this.callGamma.value=this.putGamma.value=gamma(n);this.callVega.value=this.putVega.value=vega(n);this.callTheta.value=callTheta(n);this.putTheta.value=putTheta(n);this.callRho.value=callRho(n);this.putRho.value=putRho(n)};this.calculatePremium=function(n){return options.BlackScholes(n?"c":"p",this.price.value,this.strike.value,this.yearsToExpiry.value,this.riskFreeRate.value,this.volatility.value)};this.getOptionParameters=function(){return new options.OptionParameters(this.price.value,this.strike.value,this.volatility.value,this.riskFreeRate.value,this.yearsToExpiry.value)}};charting={};charting.createXPointsArray=function(n,t,i,r){for(var u=[],o=n,e,f;o<t;)u.push(o),o+=i;if(u.push(t),r.constructor===Array)for(e=0;e<r.length;e++)f=r[e],f>n&&f<t&&$.inArray(f,u)===-1&&u.push(f);return u.sort(function(n,t){return n-t}),u};options=options||{};options.InstrumentEnum={stock:"stock",call:"call",put:"put"};options.Position=function(){this.positionId=undefined;this.price=new mvc.Parameter(undefined);this.yearsToExpiry=new mvc.Parameter(undefined);this.riskFreeRate=new mvc.Parameter(undefined);this.isBuy=new mvc.Parameter(!0,undefined,!1,!0);this.quantity=new mvc.Parameter(1);this.instrument=new mvc.Parameter(options.InstrumentEnum.call,!1,!1,!1,!0);this.strike=new mvc.Parameter(100);this.daysToExpiry=new mvc.Parameter(365);this.premium=new mvc.Parameter(100);this.volatility=new mvc.Parameter(.3,!0);this.totalPremium=new mvc.Parameter;this.debitCredit=new mvc.Parameter;this.isPremiumFixed=!1;this.isStock=function(){return this.instrument.value===options.InstrumentEnum.stock};this.isOption=function(){return!this.isStock()};this.isCall=function(){return this.instrument.value===options.InstrumentEnum.call};this.readData=function(n){var t=n;this.strike.value=t.strike;this.volatility.value=t.volatility;this.daysToExpiry.value=t.daysToExpiry;this.isBuy.value=t.isBuy;this.quantity.value=t.quantity;this.instrument.value=t.instrument;this.premium.value=t.premium;this.isPremiumFixed=t.isPremiumFixed};this.getDataToSave=function(){return{isBuy:this.isBuy.value,quantity:this.quantity.value,instrument:this.instrument.value,strike:this.strike.value,daysToExpiry:this.daysToExpiry.value,volatility:this.volatility.value,premium:this.premium.value,isPremiumFixed:this.isPremiumFixed}};this.clearResults=function(){this.premium.clearValue();this.totalPremium.clearValue();this.debitCredit.clearValue()};this.calculateMv=function(n,t,i,r){var u,e=this.isStock(),f;if(e)u=n*this.quantity.value*this.buySellSign();else if(f=this.daysToExpiry.value-t,f<0)u=0;else{var o=math.fromDaysToYears(f),s=new options.OptionParameters(n,this.strike.value,i,r,o),h=this.isCall(),c=options.callPutPremium(h,s),l=this.quantity.value*c*this.buySellSign();u=l}return u};this.calculate=function(){this.hasInvalidParameters()?this.clearResults():this.performCalculation()};this.hasInvalidParameters=function(){var n=this.price.isValid&&this.strike.isValid&&this.volatility.isValid&&this.yearsToExpiry.isValid&&this.riskFreeRate.isValid;return!n};this.getOptionParameters=function(){return new options.OptionParameters(this.price.value,this.strike.value,this.volatility.value,this.riskFreeRate.value,this.yearsToExpiry.value)};this.calculatePremium=function(n){return options.BlackScholes(n?"c":"p",this.price.value,this.strike.value,this.yearsToExpiry.value,this.riskFreeRate.value,this.volatility.value)};this.calculatePremiumOrIv=function(){this.checkIfPremiumOrVolatilityWasChanged();this.isPremiumFixed?this.performCalculationIv():this.performCalculationPremium()};this.checkIfPremiumOrVolatilityWasChanged=function(){this.premium.wasChanged?(this.isPremiumFixed=!0,this.clearPremiumVolatilityWasChanged()):this.volatility.wasChanged&&(this.isPremiumFixed=!1,this.clearPremiumVolatilityWasChanged())};this.clearPremiumVolatilityWasChanged=function(){this.premium.wasChanged=!1;this.volatility.wasChanged=!1};this.premiumWasChanged=function(){return this.premium.wasChanged};this.performCalculation=function(){this.isOption()&&(this.yearsToExpiry.value=this.daysToExpiry.value/365,this.calculatePremiumOrIv());this.setCurrentStockPriceInStockPositionIfNeeded();this.totalPremium.value=this.getTotalPremiumWithSign();this.debitCredit.value=this.totalPremium.value*-1};this.setCurrentStockPriceInStockPositionIfNeeded=function(){this.instrument.wasChanged&&this.instrument.value==options.InstrumentEnum.stock&&(this.premium.value=this.price.value);this.instrument.wasChanged=!1};this.performCalculationPremium=function(){this.isOption()&&(this.premium.value=this.calculatePremium(this.isCall()))};this.performCalculationIv=function(){this.volatility.value=options.impliedVolatility(this.isCall(),this.price.value,this.strike.value,this.yearsToExpiry.value,this.riskFreeRate.value,this.premium.value)};this.getTotalPremium=function(){return this.premium.value*this.quantity.value};this.buySellSign=function(){return this.isBuy.value?1:-1};this.getTotalPremiumWithSign=function(){return this.getTotalPremium()*this.buySellSign()}};options=options||{};options.Portfolio=function(){this.positions=[];this.totalPosition=new options.Position;this.lastUsedPositionId=0;this.readData=function(n){var i,t,u,r;for(this.clearPositions(),i=n.positions,t=0;t<i.length;t++)u=i[t],r=new options.Position,r.readData(u),this.positions.push(r);this.fillUniquePositionIds()};this.getDataToSave=function(){for(var t=[],i,r,n=0;n<this.positions.length;n++)i=this.positions[n],r=i.getDataToSave(),t.push(r);return{positions:t}};this.fillUniquePositionIds=function(){var n,t;for(this.lastUsedPositionId=0,n=0;n<this.positions.length;n++)t=this.positions[n],t.positionId=this.createNewPositionId()};this.getPositionById=function(n){for(var r,i,t=0;t<this.positions.length;t++)if(i=this.positions[t],i.positionId===n){r=i;break}return r};this.createNewPositionId=function(){return"position_"+this.lastUsedPositionId++};this.addPosition=function(n){n.positionId=this.createNewPositionId();this.positions.push(n)};this.removePosition=function(n){for(var i,t=0;t<this.positions.length;t++)if(i=this.positions[t],i.positionId===n){this.positions.splice(t,1);break}};this.clearPositions=function(){this.positions=[]};this.calculate=function(){var n=this.getTotalPremium();this.totalPosition.totalPremium.value=n;this.totalPosition.debitCredit.value=n*-1};this.getTotalPremium=function(){var n=0;return $.each(this.positions,function(){var t=this,i;t.calculate();i=t.totalPremium.value;n+=i}),n};this.calculateMv=function(n,t,i,r){var u=0;return $.each(this.positions,function(){var f=this,e=f.calculateMv(n,t,i,r);u+=e}),u};this.getStrikes=function(){var n=[];return $.each(this.positions,function(){n.push(this.strike.value)}),n};this.getMinStrike=function(){return Math.min.apply(Math,this.getStrikes())};this.getMaxStrike=function(){return Math.max.apply(Math,this.getStrikes())};this.getDistanceBetweenMinMaxStrikes=function(){return this.getMaxStrike()-this.getMinStrike()};this.getMinDaysToExpiry=function(){var n=0,t=this.getPositionsDaysToExpiry();return t.length!==0&&(n=Math.min.apply(Math,t)),n};this.getMaxDaysToExpiry=function(){var n=0,t=this.getPositionsDaysToExpiry();return t.length!==0&&(n=Math.max.apply(Math,t)),n};this.getPositionsDaysToExpiry=function(){var n=[];return this.positions.forEach(function(t){if(t.isOption()){var i=t.daysToExpiry.value;n.push(i)}}),n}};options=options||{};options.MvPlEnum={MV:0,PL:1};options.StrategyBuilder=function(){this.price=new mvc.Parameter(100);this.riskFreeRate=new mvc.Parameter(.02,!0);this.portfolio=new options.Portfolio;this.DEFAULT_X_POINTS_NUMBER=35;this.chartVolatility=new mvc.Parameter(.3,!0);this.chartRiskFreeRate=new mvc.Parameter(.02,!0);this.chartDaysFromToday=new mvc.Parameter(0);this.xMin=new mvc.Parameter;this.xMin.allowEmptyValue=!0;this.xMin.autoCorrectErrors=!0;this.xMax=new mvc.Parameter;this.xMax.allowEmptyValue=!0;this.xMax.autoCorrectErrors=!0;this.autoXMin=!0;this.autoXMax=!0;this.readData=function(n){var t=n;this.price.value=t.price;this.riskFreeRate.value=t.riskFreeRate;this.chartVolatility.value=t.chartVolatility;this.chartRiskFreeRate.value=t.chartRiskFreeRate;this.chartDaysFromToday.value=t.chartDaysFromToday;t.autoXMin!==undefined&&(this.autoXMin=t.autoXMin);t.autoXMax!==undefined&&(this.autoXMax=t.autoXMax);t.xMin!==undefined&&(this.xMin.value=t.xMin);t.xMax!==undefined&&(this.xMax.value=t.xMax);this.portfolio.readData(t.portfolio)};this.getDataToSave=function(){var n=this.portfolio.getDataToSave();return{price:this.price.value,riskFreeRate:this.riskFreeRate.value,chartVolatility:this.chartVolatility.value,chartRiskFreeRate:this.chartRiskFreeRate.value,chartDaysFromToday:this.chartDaysFromToday.value,xMin:this.xMin.value,xMax:this.xMax.value,autoXMin:this.autoXMin,autoXMax:this.autoXMax,portfolio:n}};this.calculate=function(){this.setPriceAndRateInPositions();this.portfolio.calculate();this.setXAxisMinMax();this.checkChartDaysFromToday()};this.checkChartDaysFromToday=function(){var n=this.portfolio.getMaxDaysToExpiry();this.chartDaysFromToday.value>n&&(this.chartDaysFromToday.value=n-1e-7)};this.setPriceAndRateInPositions=function(){var n=this.price,t=this.riskFreeRate;$.each(this.portfolio.positions,function(){var i=this;i.price=n;i.riskFreeRate=t})};this.checkIfXMinXMaxWereChanged=function(){this.xMin.wasChanged&&(this.autoXMin=this.xMin.isNanUndefinedOrInvalid()?!0:!1,this.xMin.wasChanged=!1);this.xMax.wasChanged&&(this.autoXMax=this.xMax.isNanUndefinedOrInvalid()?!0:!1,this.xMax.wasChanged=!1)};this.setXAxisMinMax=function(){this.checkIfXMinXMaxWereChanged();(this.autoXMin||this.xMin.isNanUndefinedOrInvalid())&&(this.xMin.value=this.getDefaultXMin());(this.autoXMax||this.xMax.isNanUndefinedOrInvalid())&&(this.xMax.value=this.getDefaultXMax())};this.createMvOrPlXyPoints=function(n,t,i,r,u,f){var s=[],h,e,a;for(t===undefined&&(t=this.chartDaysFromToday.value),i===undefined&&(i=this.chartVolatility.value),r===undefined&&(r=this.chartRiskFreeRate.value),n===undefined&&(n=options.MvPlEnum.PL),u===undefined&&(u=this.createPricesXArrayWithStrikes()),f===undefined&&(f=4),h=this.portfolio.totalPosition.totalPremium.value,e=0;e<u.length;e++){var c=u[e],v=parseFloat(c.toFixed(f)),l=this.portfolio.calculateMv(c,t,i,r),o=l;n===options.MvPlEnum.PL&&(a=l-h,o=a);o=parseFloat(o.toFixed(f));s.push([v,o])}return s};this.createXyGraphArrayAtExpiry=function(){var n=this.portfolio.getMinDaysToExpiry(),t=n-1e-6;return this.createMvOrPlXyPoints(options.MvPlEnum.PL,t)};this.createPricesXArrayWithStrikes=function(){var n=this.getXStep(this.xMin.value,this.xMax.value),t=this.portfolio.getStrikes();return charting.createXPointsArray(this.xMin.value,this.xMax.value,n,t)};this.getDefaultXMin=function(){return this.portfolio.getMinStrike()-this.extraSpaceToAddOnXAxis()};this.getDefaultXMax=function(){return this.portfolio.getMaxStrike()+this.extraSpaceToAddOnXAxis()};this.extraSpaceToAddOnXAxis=function(){var n=.2,t=this.portfolio.getDistanceBetweenMinMaxStrikes();return t===0?this.portfolio.getMinStrike()*n:t*n};this.getXStep=function(n,t,i){i||(i=this.DEFAULT_X_POINTS_NUMBER);var r=(t-n)/i;return r}}