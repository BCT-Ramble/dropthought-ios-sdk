var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.useWebViewLogic=exports.defaultRenderLoading=exports.defaultRenderError=exports.defaultOriginWhitelist=exports.createOnShouldStartLoadWithRequest=void 0;var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _toConsumableArray2=_interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));var _escapeStringRegexp=_interopRequireDefault(require("escape-string-regexp"));var _react=_interopRequireWildcard(require("react"));var _reactNative=require("react-native");var _WebView=_interopRequireDefault(require("./WebView.styles"));var _jsxRuntime=require("react/jsx-runtime");var _this=this,_jsxFileName="/home/circleci/code/src/WebViewShared.tsx";function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}return n.default=e,t&&t.set(e,n),n;}var defaultOriginWhitelist=exports.defaultOriginWhitelist=['http://*','https://*'];var extractOrigin=function extractOrigin(url){var result=/^[A-Za-z][A-Za-z0-9+\-.]+:(\/\/)?[^/]*/.exec(url);return result===null?'':result[0];};var originWhitelistToRegex=function originWhitelistToRegex(originWhitelist){return`^${(0,_escapeStringRegexp.default)(originWhitelist).replace(/\\\*/g,'.*')}`;};var passesWhitelist=function passesWhitelist(compiledWhitelist,url){var origin=extractOrigin(url);return compiledWhitelist.some(function(x){return new RegExp(x).test(origin);});};var compileWhitelist=function compileWhitelist(originWhitelist){return['about:blank'].concat((0,_toConsumableArray2.default)(originWhitelist||[])).map(originWhitelistToRegex);};var createOnShouldStartLoadWithRequest=exports.createOnShouldStartLoadWithRequest=function createOnShouldStartLoadWithRequest(loadRequest,originWhitelist,onShouldStartLoadWithRequest){return function(_ref){var nativeEvent=_ref.nativeEvent;var shouldStart=true;var url=nativeEvent.url,lockIdentifier=nativeEvent.lockIdentifier;if(!passesWhitelist(compileWhitelist(originWhitelist),url)){_reactNative.Linking.canOpenURL(url).then(function(supported){if(supported){return _reactNative.Linking.openURL(url);}console.warn(`Can't open url: ${url}`);return undefined;}).catch(function(e){console.warn('Error opening URL: ',e);});shouldStart=false;}else if(onShouldStartLoadWithRequest){shouldStart=onShouldStartLoadWithRequest(nativeEvent);}loadRequest(shouldStart,url,lockIdentifier);};};var defaultRenderLoading=exports.defaultRenderLoading=function defaultRenderLoading(){return(0,_jsxRuntime.jsx)(_reactNative.View,{style:_WebView.default.loadingOrErrorView,children:(0,_jsxRuntime.jsx)(_reactNative.ActivityIndicator,{})});};var defaultRenderError=exports.defaultRenderError=function defaultRenderError(errorDomain,errorCode,errorDesc){return(0,_jsxRuntime.jsxs)(_reactNative.View,{style:_WebView.default.loadingOrErrorView,children:[(0,_jsxRuntime.jsx)(_reactNative.Text,{style:_WebView.default.errorTextTitle,children:"Error loading page"}),(0,_jsxRuntime.jsx)(_reactNative.Text,{style:_WebView.default.errorText,children:`Domain: ${errorDomain}`}),(0,_jsxRuntime.jsx)(_reactNative.Text,{style:_WebView.default.errorText,children:`Error Code: ${errorCode}`}),(0,_jsxRuntime.jsx)(_reactNative.Text,{style:_WebView.default.errorText,children:`Description: ${errorDesc}`})]});};var useWebViewLogic=exports.useWebViewLogic=function useWebViewLogic(_ref2){var startInLoadingState=_ref2.startInLoadingState,onNavigationStateChange=_ref2.onNavigationStateChange,onLoadStart=_ref2.onLoadStart,onLoad=_ref2.onLoad,onLoadProgress=_ref2.onLoadProgress,onLoadEnd=_ref2.onLoadEnd,onError=_ref2.onError,onHttpErrorProp=_ref2.onHttpErrorProp,onMessageProp=_ref2.onMessageProp,onOpenWindowProp=_ref2.onOpenWindowProp,onRenderProcessGoneProp=_ref2.onRenderProcessGoneProp,onContentProcessDidTerminateProp=_ref2.onContentProcessDidTerminateProp,originWhitelist=_ref2.originWhitelist,onShouldStartLoadWithRequestProp=_ref2.onShouldStartLoadWithRequestProp,onShouldStartLoadWithRequestCallback=_ref2.onShouldStartLoadWithRequestCallback;var _useState=(0,_react.useState)(startInLoadingState?'LOADING':'IDLE'),_useState2=(0,_slicedToArray2.default)(_useState,2),viewState=_useState2[0],setViewState=_useState2[1];var _useState3=(0,_react.useState)(null),_useState4=(0,_slicedToArray2.default)(_useState3,2),lastErrorEvent=_useState4[0],setLastErrorEvent=_useState4[1];var startUrl=(0,_react.useRef)(null);var updateNavigationState=(0,_react.useCallback)(function(event){onNavigationStateChange==null?void 0:onNavigationStateChange(event.nativeEvent);},[onNavigationStateChange]);var onLoadingStart=(0,_react.useCallback)(function(event){startUrl.current=event.nativeEvent.url;onLoadStart==null?void 0:onLoadStart(event);updateNavigationState(event);},[onLoadStart,updateNavigationState]);var onLoadingError=(0,_react.useCallback)(function(event){event.persist();if(onError){onError(event);}else{console.warn('Encountered an error loading page',event.nativeEvent);}onLoadEnd==null?void 0:onLoadEnd(event);if(event.isDefaultPrevented()){return;}setViewState('ERROR');setLastErrorEvent(event.nativeEvent);},[onError,onLoadEnd]);var onHttpError=(0,_react.useCallback)(function(event){onHttpErrorProp==null?void 0:onHttpErrorProp(event);},[onHttpErrorProp]);var onRenderProcessGone=(0,_react.useCallback)(function(event){onRenderProcessGoneProp==null?void 0:onRenderProcessGoneProp(event);},[onRenderProcessGoneProp]);var onContentProcessDidTerminate=(0,_react.useCallback)(function(event){onContentProcessDidTerminateProp==null?void 0:onContentProcessDidTerminateProp(event);},[onContentProcessDidTerminateProp]);var onLoadingFinish=(0,_react.useCallback)(function(event){onLoad==null?void 0:onLoad(event);onLoadEnd==null?void 0:onLoadEnd(event);var url=event.nativeEvent.url;if(_reactNative.Platform.OS!=='android'||url===startUrl.current){setViewState('IDLE');}updateNavigationState(event);},[onLoad,onLoadEnd,updateNavigationState]);var onMessage=(0,_react.useCallback)(function(event){onMessageProp==null?void 0:onMessageProp(event);},[onMessageProp]);var onLoadingProgress=(0,_react.useCallback)(function(event){var progress=event.nativeEvent.progress;if(_reactNative.Platform.OS==='android'&&progress===1){setViewState(function(prevViewState){return prevViewState==='LOADING'?'IDLE':prevViewState;});}onLoadProgress==null?void 0:onLoadProgress(event);},[onLoadProgress]);var onShouldStartLoadWithRequest=(0,_react.useMemo)(function(){return createOnShouldStartLoadWithRequest(onShouldStartLoadWithRequestCallback,originWhitelist,onShouldStartLoadWithRequestProp);},[originWhitelist,onShouldStartLoadWithRequestProp,onShouldStartLoadWithRequestCallback]);var onOpenWindow=(0,_react.useCallback)(function(event){onOpenWindowProp==null?void 0:onOpenWindowProp(event);},[onOpenWindowProp]);return{onShouldStartLoadWithRequest:onShouldStartLoadWithRequest,onLoadingStart:onLoadingStart,onLoadingProgress:onLoadingProgress,onLoadingError:onLoadingError,onLoadingFinish:onLoadingFinish,onHttpError:onHttpError,onRenderProcessGone:onRenderProcessGone,onContentProcessDidTerminate:onContentProcessDidTerminate,onMessage:onMessage,onOpenWindow:onOpenWindow,viewState:viewState,setViewState:setViewState,lastErrorEvent:lastErrorEvent};};