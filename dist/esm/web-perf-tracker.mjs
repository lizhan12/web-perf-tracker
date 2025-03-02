var TraceTypes;
(function (TraceTypes) {
    // PVUV
    TraceTypes["PAGE_VIEW"] = "PageView";
    // Event
    TraceTypes["EVENT"] = "EVENT";
    // 性能
    TraceTypes["PERF"] = "Perf";
    // 资源
    TraceTypes["RESOURCE"] = "Resource";
    // 动作、行为类型
    TraceTypes["ACTION"] = "Action";
    // 请求类型
    TraceTypes["FETCH"] = "Fetch";
    // 代码错误
    TraceTypes["CODE_ERROR"] = "CodeError";
    // 日志
    TraceTypes["CONSOLE"] = "Console";
    // 其它
    TraceTypes["CUSTOMER"] = "Customer";
})(TraceTypes || (TraceTypes = {}));
var BrowserType;
(function (BrowserType) {
    // 手机端浏览器
    BrowserType["MOBILE"] = "mobile";
    // PC浏览器
    BrowserType["PC"] = "pc";
    // webview
    BrowserType["WEBVIEW"] = "webview";
    // 小程序
    BrowserType["MINI_PROGRAM"] = "miniProgram";
})(BrowserType || (BrowserType = {}));
var TraceLevelType;
(function (TraceLevelType) {
    // 告警级别
    TraceLevelType["error"] = "error";
    // 预警级别
    TraceLevelType["warn"] = "warn";
    // 普通日志
    TraceLevelType["info"] = "info";
    // 调试日志
    TraceLevelType["debug"] = "debug";
})(TraceLevelType || (TraceLevelType = {}));
var TraceClientTypes;
(function (TraceClientTypes) {
    // 安卓
    TraceClientTypes["ANDROID_H5"] = "android";
    // iOS
    TraceClientTypes["IOS_H5"] = "ios";
    // PC端
    TraceClientTypes["PC_H5"] = "pc";
    // 浏览器
    TraceClientTypes["BROWSER_H5"] = "browser";
})(TraceClientTypes || (TraceClientTypes = {}));
var TraceDataTypes;
(function (TraceDataTypes) {
    TraceDataTypes["UNKNOWN"] = "UNKNOWN";
    TraceDataTypes["JAVASCRIPT"] = "JAVASCRIPT";
    TraceDataTypes["LOG"] = "LOG";
    TraceDataTypes["HTTP"] = "HTTP";
    TraceDataTypes["VUE"] = "VUE";
    TraceDataTypes["REACT"] = "REACT";
    TraceDataTypes["RESOURCE"] = "RESOURCE";
    TraceDataTypes["PROMISE"] = "PROMISE";
    TraceDataTypes["ROUTE"] = "ROUTE";
    TraceDataTypes["PERF"] = "PERF";
})(TraceDataTypes || (TraceDataTypes = {}));
var TraceDataSeverity;
(function (TraceDataSeverity) {
    // 其他
    TraceDataSeverity["Else"] = "else";
    // 错误级别
    TraceDataSeverity["Error"] = "error";
    // 告警级别
    TraceDataSeverity["Warning"] = "warning";
    // 日志级别
    TraceDataSeverity["Info"] = "info";
    // 调试级别
    TraceDataSeverity["Debug"] = "debug";
    // 低危级别
    TraceDataSeverity["Low"] = "low";
    // 普通级别
    TraceDataSeverity["Normal"] = "normal";
    // 高危级别
    TraceDataSeverity["High"] = "high";
    // 极其严重
    TraceDataSeverity["Critical"] = "critical";
})(TraceDataSeverity || (TraceDataSeverity = {}));
var BreadcrumbsCategorys;
(function (BreadcrumbsCategorys) {
    BreadcrumbsCategorys["Http"] = "http";
    BreadcrumbsCategorys["User"] = "user";
    BreadcrumbsCategorys["Debug"] = "debug";
    BreadcrumbsCategorys["Exception"] = "exception";
    BreadcrumbsCategorys["Lifecycle"] = "lifecycle";
})(BreadcrumbsCategorys || (BreadcrumbsCategorys = {}));
var BreadcrumbTypes;
(function (BreadcrumbTypes) {
    BreadcrumbTypes["ROUTE"] = "Route";
    BreadcrumbTypes["CLICK"] = "UI.Click";
    BreadcrumbTypes["CONSOLE"] = "Console";
    BreadcrumbTypes["FETCH"] = "Fetch";
    BreadcrumbTypes["UNHANDLEDREJECTION"] = "Unhandledrejection";
    BreadcrumbTypes["RESOURCE"] = "Resource";
    BreadcrumbTypes["CODE_ERROR"] = "Code Error";
    BreadcrumbTypes["CUSTOMER"] = "Customer";
})(BreadcrumbTypes || (BreadcrumbTypes = {}));

function bin2hex(binaryString) {
    let hex = '';
    for (let i = 0; i < binaryString.length; i++) {
        hex += ('0' + binaryString.charCodeAt(i).toString(16)).slice(-2);
    }
    return hex;
}
/**
 *
 * @param content
 * @param options
 * @returns
 */
const getFingerprintId = (content, options) => {
    if (!content) {
        console.error("content is empty");
        return "";
    }
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext("2d");
    // 如果不存在，则返回空值，说明不支持Canvas指纹
    if (!ctx)
        return "";
    const txt = content || 'geekbang';
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.fillStyle = "#f60";
    // 先画一个60x20矩形内容
    ctx.fillRect(125, 1, 60, 20);
    ctx.fillStyle = "#069";
    // 把字填充到矩形内
    ctx.fillText(txt, 2, 15);
    const b64 = canvas.toDataURL().replace("data:image/png;base64,", "");
    const bin = atob(b64);
    const crc = bin2hex(bin.slice(-25, -12));
    return crc;
};

var e,n,t,r,i,o=-1,a=function(e){addEventListener("pageshow",(function(n){n.persisted&&(o=n.timeStamp,e(n));}),!0);},c=function(){var e=self.performance&&performance.getEntriesByType&&performance.getEntriesByType("navigation")[0];if(e&&e.responseStart>0&&e.responseStart<performance.now())return e},u=function(){var e=c();return e&&e.activationStart||0},f=function(e,n){var t=c(),r="navigate";o>=0?r="back-forward-cache":t&&(document.prerendering||u()>0?r="prerender":document.wasDiscarded?r="restore":t.type&&(r=t.type.replace(/_/g,"-")));return {name:e,value:void 0===n?-1:n,rating:"good",delta:0,entries:[],id:"v4-".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12),navigationType:r}},s=function(e,n,t){try{if(PerformanceObserver.supportedEntryTypes.includes(e)){var r=new PerformanceObserver((function(e){Promise.resolve().then((function(){n(e.getEntries());}));}));return r.observe(Object.assign({type:e,buffered:!0},t||{})),r}}catch(e){}},d=function(e,n,t,r){var i,o;return function(a){n.value>=0&&(a||r)&&((o=n.value-(i||0))||void 0===i)&&(i=n.value,n.delta=o,n.rating=function(e,n){return e>n[1]?"poor":e>n[0]?"needs-improvement":"good"}(n.value,t),e(n));}},l=function(e){requestAnimationFrame((function(){return requestAnimationFrame((function(){return e()}))}));},p=function(e){document.addEventListener("visibilitychange",(function(){"hidden"===document.visibilityState&&e();}));},v=function(e){var n=!1;return function(){n||(e(),n=!0);}},m=-1,h=function(){return "hidden"!==document.visibilityState||document.prerendering?1/0:0},g=function(e){"hidden"===document.visibilityState&&m>-1&&(m="visibilitychange"===e.type?e.timeStamp:0,T());},y=function(){addEventListener("visibilitychange",g,!0),addEventListener("prerenderingchange",g,!0);},T=function(){removeEventListener("visibilitychange",g,!0),removeEventListener("prerenderingchange",g,!0);},E=function(){return m<0&&(m=h(),y(),a((function(){setTimeout((function(){m=h(),y();}),0);}))),{get firstHiddenTime(){return m}}},C=function(e){document.prerendering?addEventListener("prerenderingchange",(function(){return e()}),!0):e();},b=[1800,3e3],S=function(e,n){n=n||{},C((function(){var t,r=E(),i=f("FCP"),o=s("paint",(function(e){e.forEach((function(e){"first-contentful-paint"===e.name&&(o.disconnect(),e.startTime<r.firstHiddenTime&&(i.value=Math.max(e.startTime-u(),0),i.entries.push(e),t(!0)));}));}));o&&(t=d(e,i,b,n.reportAllChanges),a((function(r){i=f("FCP"),t=d(e,i,b,n.reportAllChanges),l((function(){i.value=performance.now()-r.timeStamp,t(!0);}));})));}));},L=[.1,.25],w=function(e,n){n=n||{},S(v((function(){var t,r=f("CLS",0),i=0,o=[],c=function(e){e.forEach((function(e){if(!e.hadRecentInput){var n=o[0],t=o[o.length-1];i&&e.startTime-t.startTime<1e3&&e.startTime-n.startTime<5e3?(i+=e.value,o.push(e)):(i=e.value,o=[e]);}})),i>r.value&&(r.value=i,r.entries=o,t());},u=s("layout-shift",c);u&&(t=d(e,r,L,n.reportAllChanges),p((function(){c(u.takeRecords()),t(!0);})),a((function(){i=0,r=f("CLS",0),t=d(e,r,L,n.reportAllChanges),l((function(){return t()}));})),setTimeout(t,0));})));},A=0,I=1/0,P=0,M=function(e){e.forEach((function(e){e.interactionId&&(I=Math.min(I,e.interactionId),P=Math.max(P,e.interactionId),A=P?(P-I)/7+1:0);}));},k=function(){return e?A:performance.interactionCount||0},F=function(){"interactionCount"in performance||e||(e=s("event",M,{type:"event",buffered:!0,durationThreshold:0}));},D=[],x=new Map,R=0,B=function(){var e=Math.min(D.length-1,Math.floor((k()-R)/50));return D[e]},H=[],q=function(e){if(H.forEach((function(n){return n(e)})),e.interactionId||"first-input"===e.entryType){var n=D[D.length-1],t=x.get(e.interactionId);if(t||D.length<10||e.duration>n.latency){if(t)e.duration>t.latency?(t.entries=[e],t.latency=e.duration):e.duration===t.latency&&e.startTime===t.entries[0].startTime&&t.entries.push(e);else {var r={id:e.interactionId,latency:e.duration,entries:[e]};x.set(r.id,r),D.push(r);}D.sort((function(e,n){return n.latency-e.latency})),D.length>10&&D.splice(10).forEach((function(e){return x.delete(e.id)}));}}},O=function(e){var n=self.requestIdleCallback||self.setTimeout,t=-1;return e=v(e),"hidden"===document.visibilityState?e():(t=n(e),p(e)),t},N=[200,500],j=function(e,n){"PerformanceEventTiming"in self&&"interactionId"in PerformanceEventTiming.prototype&&(n=n||{},C((function(){var t;F();var r,i=f("INP"),o=function(e){O((function(){e.forEach(q);var n=B();n&&n.latency!==i.value&&(i.value=n.latency,i.entries=n.entries,r());}));},c=s("event",o,{durationThreshold:null!==(t=n.durationThreshold)&&void 0!==t?t:40});r=d(e,i,N,n.reportAllChanges),c&&(c.observe({type:"first-input",buffered:!0}),p((function(){o(c.takeRecords()),r(!0);})),a((function(){R=k(),D.length=0,x.clear(),i=f("INP"),r=d(e,i,N,n.reportAllChanges);})));})));},_=[2500,4e3],z={},G=function(e,n){n=n||{},C((function(){var t,r=E(),i=f("LCP"),o=function(e){n.reportAllChanges||(e=e.slice(-1)),e.forEach((function(e){e.startTime<r.firstHiddenTime&&(i.value=Math.max(e.startTime-u(),0),i.entries=[e],t());}));},c=s("largest-contentful-paint",o);if(c){t=d(e,i,_,n.reportAllChanges);var m=v((function(){z[i.id]||(o(c.takeRecords()),c.disconnect(),z[i.id]=!0,t(!0));}));["keydown","click"].forEach((function(e){addEventListener(e,(function(){return O(m)}),!0);})),p(m),a((function(r){i=f("LCP"),t=d(e,i,_,n.reportAllChanges),l((function(){i.value=performance.now()-r.timeStamp,z[i.id]=!0,t(!0);}));}));}}));},J=[800,1800],K=function e(n){document.prerendering?C((function(){return e(n)})):"complete"!==document.readyState?addEventListener("load",(function(){return e(n)}),!0):setTimeout(n,0);},Q=function(e,n){n=n||{};var t=f("TTFB"),r=d(e,t,J,n.reportAllChanges);K((function(){var i=c();i&&(t.value=Math.max(i.responseStart-u(),0),t.entries=[i],r(!0),a((function(){t=f("TTFB",0),(r=d(e,t,J,n.reportAllChanges))(!0);})));}));},U={passive:!0,capture:!0},V=new Date,W=function(e,i){n||(n=i,t=e,r=new Date,Z(removeEventListener),X());},X=function(){if(t>=0&&t<r-V){var e={entryType:"first-input",name:n.type,target:n.target,cancelable:n.cancelable,startTime:n.timeStamp,processingStart:n.timeStamp+t};i.forEach((function(n){n(e);})),i=[];}},Y=function(e){if(e.cancelable){var n=(e.timeStamp>1e12?new Date:performance.now())-e.timeStamp;"pointerdown"==e.type?function(e,n){var t=function(){W(e,n),i();},r=function(){i();},i=function(){removeEventListener("pointerup",t,U),removeEventListener("pointercancel",r,U);};addEventListener("pointerup",t,U),addEventListener("pointercancel",r,U);}(n,e):W(n,e);}},Z=function(e){["mousedown","keydown","touchstart","pointerdown"].forEach((function(n){return e(n,Y,U)}));},$=[100,300],ee=function(e,r){r=r||{},C((function(){var o,c=E(),u=f("FID"),l=function(e){e.startTime<c.firstHiddenTime&&(u.value=e.processingStart-e.startTime,u.entries.push(e),o(!0));},m=function(e){e.forEach(l);},h=s("first-input",m);o=d(e,u,$,r.reportAllChanges),h&&(p(v((function(){m(h.takeRecords()),h.disconnect();}))),a((function(){var a;u=f("FID"),o=d(e,u,$,r.reportAllChanges),i=[],t=-1,n=null,Z(addEventListener),a=l,i.push(a),X();})));}));};

function round(value, t) {
    return Math.round(value * 100) / 100;
}
function mapMetric(metric) {
    const isWebVital = ['FCP', 'TTFB', 'LCP', 'CLS', 'FID', "INP"].indexOf(metric.name) !== -1;
    return {
        [metric.name]: isWebVital ? round(metric.value, metric.name === 'CLS' ? 4 : 0) : metric.value,
        [`${metric.name}Rating`]: metric.rating
    };
}
// src/core/webvitals.ts
const onVitals = (saveMetric) => {
    G(saveMetric);
    ee(saveMetric);
    w(saveMetric);
    Q(saveMetric);
    j(saveMetric);
    S(saveMetric);
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const { fetch: originFetch } = window;
const interceptFetch = ({ onError, onBefore, onAfter }) => {
    (function () {
        // 保存原始的 XMLHttpRequest 构造函数
        const originalOpen = XMLHttpRequest.prototype.open;
        const originalSend = XMLHttpRequest.prototype.send;
        // const headers = XMLHttpRequest.prototype.
        let startTime = 0;
        //@ts-ignore
        XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
            //@ts-ignore
            this._method = method;
            onBefore &&
                onBefore({
                    url,
                    name: "axios-before",
                    // options: {headers:},
                    method: method,
                });
            // this._url = url;  // 保存请求的 URL
            //@ts-ignore
            return originalOpen.apply(this, arguments);
        };
        XMLHttpRequest.prototype.send = function (body) {
            startTime = getTimestamp();
            // 拦截 onreadystatechange
            const originalOnreadystatechange = this.onreadystatechange;
            this.onreadystatechange = function () {
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status >= 200 && this.status < 300) {
                        onAfter &&
                            onAfter({
                                status: this.status,
                                url: this.responseURL,
                                name: "axios-after",
                                statusText: this.statusText,
                                elapsedTime: getTimestamp() - startTime,
                            });
                    }
                    else {
                        //@ts-ignore
                        // console.log(this.statusText, this.status, this.responseURL, this._method, body)
                        // console.log(this);
                        onError &&
                            onError({
                                message: this.statusText,
                                status: this.status,
                                url: this.responseURL,
                                name: "axios-err",
                                //@ts-ignore
                                method: this._method,
                                body: body,
                                elapsedTime: getTimestamp() - startTime,
                                options: undefined,
                                statusText: this.statusText,
                                stack: ""
                            });
                    } //   console.log(`Intercepted request to readyState:`, this.status);
                }
                if (originalOnreadystatechange) {
                    //@ts-ignore
                    originalOnreadystatechange.apply(this, arguments);
                }
            };
            //@ts-ignore
            return originalSend.apply(this, arguments);
        };
    })();
    //@ts-ignore
    return (...args) => __awaiter(void 0, void 0, void 0, function* () {
        const [request, options] = args;
        const startTime = getTimestamp();
        const qt = typeof request == 'string' ? { url: request, method: ((options === null || options === void 0 ? void 0 : options.method) || "GET").toLocaleUpperCase(), } : request;
        let res;
        try {
            onBefore &&
                onBefore({
                    url: request.url,
                    method: request === null || request === void 0 ? void 0 : request.method,
                    name: "fetch-before",
                    options,
                });
            res = yield originFetch(request, options);
            // console.log("onAfter------->", res, qt);
            // console.log("onAfter*********************", { url:res.url, method:qt.method, status:res.status, name: "fetch-after", elapsedTime: getTimestamp() - startTime });
            onAfter && onAfter({ url: res.url, method: qt.method, status: res.status, name: "fetch-after", elapsedTime: getTimestamp() - startTime });
        }
        catch (err) {
            // console.log(res)
            // console.log("err", err.message, err.response)
            // onError({
            //   url: qt.url,
            //   name: "fetch-err",
            //   status: res?.status,
            //   statusText: res?.statusText || "",
            //   method: qt?.method,
            //   body: options?.body,
            //   elapsedTime: getTimestamp() - startTime,
            //   options: undefined,
            //   message: res?.statusText || "",
            //   stack: ""
            // });
        }
        if (!(res && res.ok && res.status >= 200 && res.status < 300)) {
            onError({
                url: qt.url,
                name: "fetch-err",
                status: res === null || res === void 0 ? void 0 : res.status,
                statusText: (res === null || res === void 0 ? void 0 : res.statusText) || "",
                method: qt === null || qt === void 0 ? void 0 : qt.method,
                body: options === null || options === void 0 ? void 0 : options.body,
                elapsedTime: getTimestamp() - startTime,
                options: undefined,
                message: "",
                stack: ""
            });
        }
        return res;
    });
};
function initFetch(traceSdk) {
    //@ts-ignore
    window.fetch =
        interceptFetch({
            onError: (error) => {
                var _a, _b;
                const prix = ((_a = error.url) === null || _a === void 0 ? void 0 : _a.split("?")[0]) || "";
                const url = (_b = prix === null || prix === void 0 ? void 0 : prix.split("//")[1]) === null || _b === void 0 ? void 0 : _b.split('/')[0];
                if (!traceSdk.filterUrlList.includes(url)) {
                    traceSdk.saveBreadcrumb({
                        name: error.name || "",
                        level: TraceDataSeverity.Error,
                        type: BreadcrumbTypes.FETCH,
                        category: BreadcrumbsCategorys.Http,
                        message: error.status,
                        time: getTimestamp(),
                        // response: {
                        response: {
                            method: error.method,
                            url: error.url,
                            status: error.status,
                            statusText: error.statusText,
                            // options: error.options,
                            elapsedTime: error.elapsedTime,
                            // },
                        },
                    });
                    traceSdk.sendImmediate(error.name || "", TraceDataTypes.HTTP);
                }
            },
            onBefore: (props) => {
                var _a, _b;
                const prix = ((_a = props.url) === null || _a === void 0 ? void 0 : _a.split("?")[0]) || "";
                const url = (_b = prix === null || prix === void 0 ? void 0 : prix.split("//")[1]) === null || _b === void 0 ? void 0 : _b.split('/')[0];
                if (traceSdk.isOpenFetchBefore && !traceSdk.filterUrlList.includes(url))
                    traceSdk.saveBreadcrumb({
                        name: props.name || "",
                        level: TraceDataSeverity.Normal,
                        type: BreadcrumbTypes.FETCH,
                        category: BreadcrumbsCategorys.Http,
                        message: "",
                        time: getTimestamp(),
                        request: {
                            method: props.method,
                            url: props.url,
                            // options: props.options,
                        },
                    });
            },
            onAfter: (result) => {
                var _a, _b;
                const prix = ((_a = result.url) === null || _a === void 0 ? void 0 : _a.split("?")[0]) || "";
                const url = (_b = prix === null || prix === void 0 ? void 0 : prix.split("//")[1]) === null || _b === void 0 ? void 0 : _b.split('/')[0];
                if (traceSdk.isOpenFetchAfter && !traceSdk.filterUrlList.includes(url))
                    traceSdk.saveBreadcrumb({
                        name: result.name || "",
                        level: TraceDataSeverity.Normal,
                        type: BreadcrumbTypes.FETCH,
                        category: BreadcrumbsCategorys.Http,
                        message: "",
                        time: getTimestamp(),
                        response: {
                            method: result.method,
                            url: result.url,
                            status: result.status,
                            elapsedTime: result.elapsedTime,
                            statusText: result.statusText,
                        },
                    });
            },
        });
}

var getFull = function getFull(date = new Date()) {
    let month = (date.getMonth() + 1) + '';
    let year = date.getFullYear() + '';
    let day = date.getDate() + '';
    let min = date.getMinutes() + '';
    let hour = date.getHours() + '';
    month = addFrontZero(month);
    day = addFrontZero(day);
    hour = addFrontZero(hour);
    min = addFrontZero(min);
    return { year, month, day, hour, min };
};
const addFrontZero = function (numStr) {
    return Number(numStr) > 9 ? numStr : "0" + numStr;
};
const dateType = function dateType(type, obj) {
    switch (type) {
        case "-":
            return formatCrossLine(obj);
        case "/":
            return slant(obj);
        case "zh":
            return ZH(obj);
        default:
            return formatToSpaceDate(obj);
    }
};
/**
 * 格式化 2020-12-12 12:12
 * @param obj YMDHM
 * @returns 2020-12-12 12:12
 */
const formatToSpaceDate = function formatToSpaceDate(obj) {
    return obj.year + "" + obj.month + "" + obj.day + "" + obj.hour + "" + obj.min + '00';
};
/**
 * 格式化 2020-12-12 12:12
 * @param obj YMDHM
 * @returns 2020-12-12 12:12
 */
const formatCrossLine = function formatCrossLine(obj) {
    return obj.year + "-" + obj.month + "-" + obj.day + " " + obj.hour + ":" + obj.min;
};
/**
 * 格式化 2020/12/12 12:12
 * @param obj  YMDHM
 * @returns 2020/12/12 12:12
 */
const slant = function slant(obj) {
    return obj.year + "/" + obj.month + "/" + obj.day + " " + obj.hour + ":" + obj.min;
};
/**
 * 2020年12月12日 12时12分
 * 默认00分保留到小时
 * @param obj YMDHM
 * @returns 2020年12月12日 12时12分
 */
const ZH = function ZH(obj, hasMin = false) {
    let str = obj.year + "年" + obj.month + "月" + obj.day + "日" + obj.hour + "时";
    if (Number(obj.min) > 0)
        return str += obj.min + "分";
    else if (hasMin) {
        return str += obj.min + "分";
    }
    return str;
};
/**
 * 2019101811300000 格式转换成年、月、日、时、分
 * @param strDate 2019101811300000
 * @returns YMDHM  {
        year,
        month,
        day,
        hour,
        min
    }
 */
const strToYMdM = function strToYMdM(strDate) {
    let year = strDate.slice(0, 4), month = strDate.slice(4, 6), day = strDate.slice(6, 8), hour = strDate.slice(8, 10), min = strDate.slice(10, 12);
    return {
        year,
        month,
        day,
        hour,
        min
    };
};
/**
 * 将标准格式日期格式或者日期对象转换成 YMDHM
 */
const formatStr = function formatStr(date1) {
    if (typeof date1 == 'string')
        date1 = new Date(date1);
    return getFull(date1);
};
/**
 * 日期类，一些常用的日期函数的封装
 */
class DateUtil {
    static getInstance() {
        return this.instance;
    }
    constructor() { }
    /**
 *
 * @param d
 * @param type 日期连接符 zh  / -
     * @param isHour=true 分钟为0
 * @returns {*|string}
 */
    formatDate(date, type = '', isHour = false) {
        if (isHour) {
            date = new Date(date.valueOf());
            date.setMinutes(0);
        }
        return dateType(type, getFull(date));
    }
    /**
     * 不同日期类型格式转换
     * @param strDate el: 日期类型字符串 2020-12-01 12:23:23
     * @param type el: /
     * @returns 根据type返回类型  2020/12/01 12:23:23
     */
    formatToFormat(strDate, type = '') {
        let t = type.toLowerCase();
        if (typeof strDate !== "string")
            throw "replace must be string";
        strDate = strDate.replace(/分/ig, "");
        strDate = strDate.replace(/时/ig, ":");
        switch (t) {
            case "/":
                return strDate.replace(/[-,年,月,/]/ig, "/").replace(/日/ig, " ");
            case "-":
                return strDate.replace(/[-,年,月,/]/ig, "-").replace(/日/ig, " ");
            case "zh":
                strDate = strDate.replace(/[-,年,月,/," " , :]/ig, "").replace(/日/ig, "");
                return dateType(t, strToYMdM(strDate));
            default:
                return strDate.replace(/[-,年,月,/," " , :]/ig, "").replace(/日/ig, "");
        }
    }
    /**
 * 格式化无空格字符串日期， 例如2019101811300000
 * @param str 2019101811300000
 * @type 连接符
 * @returns string
 */
    formatNoSpaceDate(strDate, type = '/') {
        return dateType(type, strToYMdM(strDate));
    }
    /**
* 判断是否为同一时
* @param date1 Date | DateString
* @param date2 Date | DateString
* @returns Boolean
*/
    isSameMin(date1, date2) {
        const date1Obj = formatStr(date1);
        const date2Obj = formatStr(date2);
        if (date1Obj.year == date2Obj.year && date1Obj.month == date2Obj.month && date1Obj.day == date2Obj.day && date1Obj.hour == date2Obj.hour && date1Obj.min == date2Obj.min) {
            return true;
        }
        return false;
    }
    /**
 * 判断是否为同一时
 * @param date1 Date | DateString
 * @param date2 Date | DateString
 * @returns Boolean
 */
    isSameHour(date1, date2) {
        const date1Obj = formatStr(date1);
        const date2Obj = formatStr(date2);
        if (date1Obj.year == date2Obj.year && date1Obj.month == date2Obj.month && date1Obj.day == date2Obj.day && date1Obj.hour == date2Obj.hour) {
            return true;
        }
        return false;
    }
    /**
 * 判断是否为同一日
 * @param date1 Date | DateString
 * @param date2 Date | DateString
 * @returns Boolean
 */
    isSameDate(date1, date2) {
        const date1Obj = formatStr(date1);
        const date2Obj = formatStr(date2);
        if (date1Obj.year == date2Obj.year && date1Obj.month == date2Obj.month && date1Obj.day == date2Obj.day) {
            return true;
        }
        return false;
    }
    /**
     * 判断是否为同一月
     * @param date1 Date | DateString
     * @param date2 Date | DateString
     * @returns Boolean
     */
    isSameMonth(date1, date2) {
        const date1Obj = formatStr(date1);
        const date2Obj = formatStr(date2);
        if (date1Obj.year == date2Obj.year && date1Obj.month == date2Obj.month) {
            return true;
        }
        return false;
    }
    /**
     * 判断是否为同一年
     * @param date1 Date | DateString
     * @param date2 Date | DateString
     * @returns Boolean
     */
    isSameYear(date1, date2) {
        const date1Obj = formatStr(date1);
        const date2Obj = formatStr(date2);
        if (date1Obj.year == date2Obj.year) {
            return true;
        }
        return false;
    }
    /**
     * 两个日期的差值分钟
     * @param date1 Date
     * @param date2 Date
     * @returns  number
     */
    diff(date1, date2, abs = true) {
        const mins = (date1.getTime() - date2.getTime()) / (60 * 1000);
        if (abs)
            return Math.floor(Math.abs(mins));
        return Math.floor(mins);
    }
    /**
     * 向下取最近5分钟日期 例如：0， 5， 10， 15.....
     * @param date Date对象
     * @param deep true 不更改传入的日期对象; flase 更改传入的日期
     * @returns Date
     */
    fiveFloorMinDate(date, step = 5, deep = false) {
        if (deep)
            date = new Date(date.valueOf());
        let min = date.getMinutes();
        min = Math.floor(min / step) * step;
        date.setMinutes(min);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    }
    /**
     * 向下取最近小时 例如：10：00， 11：00，
     * @param date Date对象
     * @param deep true 不更改传入的日期对象; flase 更改传入的日期
     * @returns Date
     */
    floorHourDate(date, deep = false) {
        if (deep)
            date = new Date(date.valueOf());
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    }
    /**
     *
     * @param date Date
     * @param type 格式化类型
     */
    worldFormat(date, type = '') {
        const d = new Date(date.valueOf());
        d.setHours(d.getHours() - 8);
        return this.formatDate(d, type);
    }
}
DateUtil.instance = new DateUtil();
// export {
// 	// formatDate,
// 	// formatToFormat,
// 	// formatNoSpaceDate,
// 	// isSameDate,
// 	// isSameMonth,
// 	// isSameYear
// }
/**
 *@ 1、格式化日期 formatDate(Date,type='-'):string
 *@ 2、不同格式日期转换 formatToFormat(DateStr,type='-'):string
 *@ 3、格式化无分隔符日期 formatNoSpaceDate(DateStr,type='-'):string
 *@ 4、判断两个日期是否为同一日 isSameDate(Date1,Date2):boolean
 *@ 5、判断两个日期是否为同一月 isSameMonth(Date1,Date2):boolean
 *@ 6、判断两个日期是否为同一年 isSameYear(Date1,Date2):boolean
 *@ 7、两个日期之间的差值--分钟级 diff(Date1,Date2, abs:boolean):number
 *@ 8、向下取最近5分钟日期 例如：0， 5， 10， 15..... fiveFloorMinDate(Date,deep):number
 *@ 9、向下取最近小时 例如：10：00， 11：00..... floorHourDate(Date,deep):number
 *
 */
var DateAndTime = DateUtil.getInstance();

function detectPlatform() {
    var userAgent = navigator.userAgent;
    var platform = {};
    // 检测是否是移动设备
    platform.isMobile =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    // 检测是否是PC端
    platform.isPC = !platform.isMobile;
    // 检测是否是WebView
    platform.isWebView = (function () {
        var isWebView = false;
        // iOS detection
        if (/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(userAgent)) {
            isWebView = true;
        }
        // Android detection
        else if (/Android.*(wv|\.0\.0\.0)/.test(userAgent)) {
            isWebView = true;
        }
        return isWebView;
    })();
    // 检测是否是小程序（以微信小程序为例）
    platform.isMiniProgram = true;
    if (platform.isMobile)
        return BrowserType.MOBILE;
    else if (platform.isPC)
        return BrowserType.PC;
    else if (platform.isWebView)
        return BrowserType.WEBVIEW;
    else
        return BrowserType.MINI_PROGRAM;
}
class BaseTrace {
    onGlobalClick() {
        const _t = this;
        window.addEventListener("click", (event) => {
            const target = event.target;
            const innerHTML = target.innerHTML;
            const bc = {
                name: "click",
                level: TraceDataSeverity.Normal,
                type: BreadcrumbTypes.CLICK,
                category: BreadcrumbsCategorys.User,
                message: innerHTML,
                time: getTimestamp(),
            };
            _t.saveBreadcrumb(bc);
        });
    }
    saveBreadcrumb(data) {
        this.breadcrumb.push(data);
        if (this.breadcrumb.length > this.maxBreadcrumb) {
            this.breadcrumb.shift();
        }
    }
    /**
     * 立即发送
     * @param name
     * @param type
     */
    sendImmediate(name, type) {
        const traceData = {
            dataId: hashCode(type + TraceDataSeverity.Error + name),
            level: TraceDataSeverity.Error,
            name,
            // level:
            message: "",
            time: getTimestamp(),
            type: type,
            stack: null,
        };
        const data = this.setTraceData(traceData);
        sendByImg(this.options.url, data);
    }
    /**
     * 构造函数，初始化性能观察者
     * @param options 初始化选项
     */
    constructor(options = {
        url: "",
        openClick: false,
        openFech: true,
        openResource: true,
        appId: "",
        sendTimer: 1000 * 30,
        filterUrlList: []
    }) {
        // 性能日志数据
        this.perfData = {
            id: uuid(),
        };
        this.resources = [];
        this.observer = null;
        this.breadcrumb = [];
        // 最大存储用户行为
        this.maxBreadcrumb = 5;
        this.queue = [];
        this.sendTimer = 1000 * 30;
        this.userAgent = navigator.userAgent;
        this.browserType = detectPlatform();
        this.appId = "";
        this.filterUrlList = [];
        this.options = options;
        this.isOpenFetchBefore = options.isOpenFetchBefore;
        this.isOpenFetchAfter = options.isOpenFetchAfter;
        this.appId = options.appId || "";
        this.fpId = getFingerprintId(this.appId);
        this.filterUrlList = options.filterUrlList || [];
        this.pageId = hashCode(document.URL) + "";
        this.sendTimer = options.sendTimer || 30 * 1000;
        if (this.options.openResource)
            this.observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === "resource") {
                        this.handleObserverResource(entry);
                    }
                });
            });
    }
    setTraceData(data) {
        let type = TraceTypes.CONSOLE;
        let level = TraceLevelType.debug;
        let _data = null;
        let perf = null;
        if (!!data.dataId) {
            type = getTypes(data.type);
            level = getTraceDataLevel(data.level);
            _data = data;
        }
        if (!!data.id) {
            type = TraceTypes.PERF;
            level = getPerfLevel(data);
            perf = data;
        }
        const traceData = {
            type,
            level,
            createdAt: DateAndTime.formatDate(new Date(), "/"),
            updatedAt: DateAndTime.formatDate(new Date(), "/"),
            data: _data,
            perf: perf,
            breadcrumbs: this.breadcrumb,
            traceId: uuid(),
            ua: this.userAgent,
            bt: this.browserType,
            fpId: this.fpId,
            appId: this.appId,
            clientType: TraceClientTypes.BROWSER_H5,
            url: document.URL,
            pid: hashCode(document.URL) + "",
        };
        return traceData;
    }
    send(data) {
        const traceData = this.setTraceData(data);
        // console.log(traceData)
        //   ;
        sendByImg(this.options.url, traceData);
    }
    /**
     *
     * @param log
     */
    log(log) {
        this.saveBreadcrumb({
            name: "customer-log",
            level: log.level,
            // dataId: log.dataId,
            type: dataTypes2BreadcrumbsType(log.type),
            category: dataCategory2BreadcrumbsCategory(log.type),
            message: log.message,
            time: getTimestamp(),
        });
        // this.send(log)
    }
    /**
     * 初始化 BaseTrace 实例
     * @param options 初始化选项
     * @returns BaseTrace 实例
     */
    static init(options) {
        var _a;
        const traceSdk = new BaseTrace(options);
        traceSdk.onGlobalError();
        // 监听页面性能
        onVitals(traceSdk.createPerfReport());
        // 监听资源加载
        if (traceSdk.options.openResource)
            (_a = traceSdk.observer) === null || _a === void 0 ? void 0 : _a.observe({
                entryTypes: ["resource"],
                buffered: true,
            });
        if (traceSdk.options.openClick)
            traceSdk.onGlobalClick();
        //@ts-ignore
        window.traceSdk = traceSdk;
        if (traceSdk.options.openFech) {
            initFetch(traceSdk);
        }
        setInterval(() => {
            const data = traceSdk.queue.shift();
            if (Object.keys(traceSdk.perfData).length > 8) {
                traceSdk.send(traceSdk.perfData);
                traceSdk.perfData = {};
            }
            // console.log(traceSdk.perfData);
            if (data) {
                traceSdk.send(data);
            }
        }, traceSdk.sendTimer);
        window === null || window === void 0 ? void 0 : window.addEventListener("beforeunload", () => {
            let data = traceSdk.queue.shift();
            let index = 0;
            while (data && index < 10) {
                traceSdk.send(data);
                data = traceSdk.queue.shift();
                index++;
            }
            // this.sendPerf();
        });
        return traceSdk;
    }
    info(message, tag) {
        this.log({
            name: "customer-log",
            type: TraceDataTypes.LOG,
            level: TraceDataSeverity.Info,
            message,
            time: getTimestamp(),
            dataId: hashCode(`${message}|${tag || ""}`),
            tag: tag || "",
        });
    }
    warn(message, tag) {
        this.log({
            name: "customer-log",
            type: TraceDataTypes.LOG,
            level: TraceDataSeverity.Warning,
            message,
            time: getTimestamp(),
            dataId: hashCode(`${message}|${tag || ""}`),
            tag: tag || "",
        });
    }
    error(message, tag) {
        this.log({
            name: "customer-error",
            type: TraceDataTypes.LOG,
            level: TraceDataSeverity.Error,
            message,
            time: getTimestamp(),
            dataId: hashCode(`${message}|${tag || ""}`),
            tag: tag || "",
        });
    }
    /**
     * 监听全局错误事件
     */
    onGlobalError() {
        window.addEventListener("error", (event) => {
            this.saveError(event);
        }, true);
    }
    /**
     * 创建性能报告
     * @returns 处理性能指标的函数
     */
    createPerfReport() {
        return (metric) => {
            this.perfData = Object.assign(Object.assign({}, this.perfData), mapMetric(metric));
        };
    }
    /**
     * 处理资源加载性能条目
     * @param entry 资源加载性能条目
     */
    handleObserverResource(entry) {
        // console.log(entry)
        let level = TraceDataSeverity.Info;
        if (entry.duration > 1000 && entry.duration < 1500) {
            level = TraceDataSeverity.Warning;
        }
        else if (entry.duration > 1500) {
            level = TraceDataSeverity.Error;
        }
        if (entry.duration > 1000) {
            const traceData = {
                url: entry.name,
                name: `${entry.entryType}-duration-${entry.initiatorType}`,
                type: TraceDataTypes.PERF,
                level,
                message: `duration:${Math.round(entry.duration)}`,
                time: getTimestamp(),
                dataId: hashCode(`${entry.entryType}-${entry.name}`),
            };
            this.resources.push(traceData);
        }
    }
    /**
     * 保存错误信息
     * @param event 错误事件
     */
    saveError(event) {
        var _a, _b, _c, _d;
        const target = event.target;
        const isResTarget = isResourceTarget(target);
        const nodeName = target.nodeName;
        // console.log(target)
        // console.log(target)
        if (!isResTarget) {
            // 非资源错误
            ({
                dataId: hashCode("script-error" + TraceDataSeverity.Error),
                name: "script-error",
                level: TraceDataSeverity.Error,
                message: event.message,
                time: getTimestamp(),
                type: TraceDataTypes.JAVASCRIPT,
                stack: (_b = (_a = event.error) === null || _a === void 0 ? void 0 : _a.stack) !== null && _b !== void 0 ? _b : null,
            });
            // this.resources.push(traceData);
            this.breadcrumb.push({
                name: event.error.name,
                type: BreadcrumbTypes.CODE_ERROR,
                category: BreadcrumbsCategorys.Exception,
                level: TraceDataSeverity.Error,
                message: event.message,
                stack: event.error.stack,
                time: getTimestamp(),
            });
            // this.setTraceData(traceData)
            //@ts-ignore
            // this.queue.push(traceData);
            this.sendImmediate(((_c = event.error) === null || _c === void 0 ? void 0 : _c.name) || "", TraceDataTypes.JAVASCRIPT);
        }
        else {
            // 资源加载错误
            const url = target.getAttribute("src") || target.getAttribute("href");
            if (url) {
                const traceData = {
                    dataId: hashCode(`${nodeName}${event.message}${url}`),
                    name: "resource-load-error",
                    level: TraceDataSeverity.Warning,
                    message: event.message,
                    time: getTimestamp(),
                    type: TraceDataTypes.RESOURCE,
                    stack: [url],
                };
                // this.resources.push(traceData);
                //@ts-ignore
                // this.queue.push(traceData);
                this.breadcrumb.push({
                    name: traceData.name,
                    type: BreadcrumbTypes.RESOURCE,
                    category: BreadcrumbsCategorys.Exception,
                    level: TraceDataSeverity.Warning,
                    message: event.message,
                    time: getTimestamp(),
                    request: { url },
                });
                this.sendImmediate(((_d = event.error) === null || _d === void 0 ? void 0 : _d.name) || '', TraceDataTypes.RESOURCE);
            }
        }
    }
}
function getTimestamp() {
    return Date.now();
}
/**
 * 生成字符串的哈希码
 * @param {string} str - 输入的字符串
 * @returns {number} - 返回生成的哈希码
 */
function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash * 31 + char) | 0; // 使用位操作符以确保 32 位整数溢出
    }
    return Math.abs(hash);
}
const isResourceTarget = (target) => target instanceof HTMLScriptElement ||
    target instanceof HTMLLinkElement ||
    target instanceof HTMLImageElement ||
    target instanceof HTMLVideoElement ||
    target instanceof HTMLAudioElement;
function dataTypes2BreadcrumbsType(type) {
    if (TraceDataTypes.LOG == type)
        return BreadcrumbTypes.CLICK;
    if (TraceDataTypes.PERF == type)
        return BreadcrumbTypes.CODE_ERROR;
    if (TraceDataTypes.RESOURCE == type)
        return BreadcrumbTypes.RESOURCE;
    if (TraceDataTypes.JAVASCRIPT == type)
        return BreadcrumbTypes.CODE_ERROR;
    return BreadcrumbTypes.CLICK;
    // throw new Error("Function not implemented.");
}
function dataCategory2BreadcrumbsCategory(type) {
    return BreadcrumbsCategorys.Exception;
}
function getTraceDataLevel(level) {
    if (level == TraceDataSeverity.Error)
        return TraceLevelType.error;
    else if (level == TraceDataSeverity.Warning)
        return TraceLevelType.warn;
    else if (level == TraceDataSeverity.Info)
        return TraceLevelType.info;
    else if (level == TraceDataSeverity.Debug)
        return TraceLevelType.debug;
    return TraceLevelType.info;
}
function getPerfLevel(arg0) {
    if ((arg0.FCP || 0) > 2000)
        return TraceLevelType.error;
    else if ((arg0.FCP || 0) > 1500)
        return TraceLevelType.warn;
    else if ((arg0.FCP || 0) > 1000)
        return TraceLevelType.info;
    return TraceLevelType.info;
}
function sendByImg(url, data) {
    const spliceStr = url.indexOf('?') === -1 ? '?' : '&';
    const imageUrl = `${url}${spliceStr}data=${encodeURIComponent(safeStringify(data))}`;
    let img = new Image();
    img.src = imageUrl;
    img.onload = function () {
        //@ts-ignore
        img = null;
    };
    img.onerror = function (err) {
        //@ts-ignore
        img = null;
    };
}
function uuid() {
    var d = new Date().getTime(); //获取当前时间戳
    if (typeof performance !== "undefined" &&
        typeof performance.now === "function") {
        d += performance.now(); //如果浏览器支持performance.now()，则获取更精确的时间戳
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
}
function getTypes(type) {
    if (type == TraceDataTypes.HTTP)
        return TraceTypes.FETCH;
    else if (type == TraceDataTypes.JAVASCRIPT)
        return TraceTypes.CODE_ERROR;
    else if (type == TraceDataTypes.RESOURCE) {
        return TraceTypes.RESOURCE;
    }
    else if (type == TraceDataTypes.PERF) {
        return TraceTypes.PERF;
    }
    return TraceTypes.ACTION;
}
function safeStringify(obj) {
    // return JSON.stringify(obj);
    const set = new Set();
    const str = JSON.stringify(obj, function (_key, value) {
        if (set.has(value)) {
            return null;
        }
        typeof value === 'object' && set.add(value);
        return value;
    });
    set.clear();
    return str;
}

export { BaseTrace, getTimestamp, isResourceTarget };
