type TracePerfRating = "good" | "needs improvement" | "poor";
export declare enum TraceTypes {
    PAGE_VIEW = "PageView",
    EVENT = "EVENT",
    PERF = "Perf",
    RESOURCE = "Resource",
    ACTION = "Action",
    FETCH = "Fetch",
    CODE_ERROR = "CodeError",
    CONSOLE = "Console",
    CUSTOMER = "Customer"
}
type BasePageTrace = {
    pid: string;
    title?: string;
    url: string;
};
export type BaseUserTrace = {
    fpId: string;
    uid?: string | number;
    userName?: string;
    email?: string;
};
export declare enum BrowserType {
    MOBILE = "mobile",
    PC = "pc",
    WEBVIEW = "webview",
    MINI_PROGRAM = "miniProgram"
}
export type BaseBrowserTrace = {
    ua: string;
    bt: BrowserType;
};
export type TracePerf = {
    id: string;
    LCP?: number;
    LCPRating?: TracePerfRating;
    FID?: number;
    FIDRating?: TracePerfRating;
    FCP?: number;
    FCPRating?: TracePerfRating;
    TTFB?: number;
    TTFBRating?: TracePerfRating;
    CLS?: number;
    CLSRating?: TracePerfRating;
    INP?: number;
    INPRating?: TracePerfRating;
};
export declare enum TraceLevelType {
    error = "error",
    warn = "warn",
    info = "info",
    debug = "debug"
}
export declare enum TraceClientTypes {
    ANDROID_H5 = "android",
    IOS_H5 = "ios",
    PC_H5 = "pc",
    BROWSER_H5 = "browser"
}
export type BaseAppTrace = {
    appId: string;
    appName?: string;
    clientType: TraceClientTypes;
    level: TraceLevelType;
};
type TraceBaseData = {
    dataId: number;
    name: string;
    level: TraceDataSeverity;
    message: string;
    time: number;
    type: TraceDataTypes;
};
type BaseTrace = {
    traceId: string;
    type: TraceTypes;
    createdAt: string;
    updatedAt: string;
};
export type BaseTraceInfo = BaseTrace & BaseBrowserTrace & BaseUserTrace & BaseAppTrace & BasePageTrace;
export declare enum TraceDataTypes {
    UNKNOWN = "UNKNOWN",
    JAVASCRIPT = "JAVASCRIPT",
    LOG = "LOG",
    HTTP = "HTTP",
    VUE = "VUE",
    REACT = "REACT",
    RESOURCE = "RESOURCE",
    PROMISE = "PROMISE",
    ROUTE = "ROUTE",
    PERF = "PERF"
}
export declare enum TraceDataSeverity {
    Else = "else",
    Error = "error",
    Warning = "warning",
    Info = "info",
    Debug = "debug",
    Low = "low",
    Normal = "normal",
    High = "high",
    Critical = "critical"
}
type TractDataCodeError = TraceBaseData & {
    stack: string[] | null;
};
type TraceDataFetch = TraceBaseData & {
    elapsedTime: number;
    method: "POST" | "GET";
    httpType: "fetch" | "xhr";
    url: string;
    body: string;
    status: number;
};
type TraceDataPromise = TraceBaseData;
export type TraceDataResource = TraceBaseData;
export type TraceDataLog = TraceBaseData & {
    tag: string;
};
type TraceDataPageView = TraceBaseData & {
    route: string;
};
type TraceBaseAction = {
    name: string;
    level: TraceDataSeverity;
    time: number;
    type: BreadcrumbTypes;
    category: BreadcrumbsCategorys;
};
export type TraceAction = TraceBaseAction & {
    message?: string | number | undefined;
    request?: any;
    response?: any;
    stack?: string | null;
};
export declare enum BreadcrumbsCategorys {
    Http = "http",
    User = "user",
    Debug = "debug",
    Exception = "exception",
    Lifecycle = "lifecycle"
}
export declare enum BreadcrumbTypes {
    ROUTE = "Route",
    CLICK = "UI.Click",
    CONSOLE = "Console",
    FETCH = "Fetch",
    UNHANDLEDREJECTION = "Unhandledrejection",
    RESOURCE = "Resource",
    CODE_ERROR = "Code Error",
    CUSTOMER = "Customer"
}
export type TraceTypeData = TraceDataFetch | TractDataCodeError | TraceDataPromise | TraceDataResource | TraceDataLog | TraceDataPageView;
export type TraceBreadcrumbs = TraceAction[];
export type TraceData = BaseTraceInfo & {
    data?: TraceTypeData;
    breadcrumbs?: TraceBreadcrumbs;
    perf?: TracePerf[];
};
export type FingerprintOptions = {
    font?: string;
    reactStyle?: string | CanvasGradient | CanvasPattern;
    contentStyle?: string | CanvasGradient | CanvasPattern;
    textBaseline?: CanvasTextBaseline;
};
export type TraceOptions = {
    url?: string;
    openClick?: boolean;
    openResource?: boolean;
    openFech?: boolean;
    isOpenFetchBefore?: boolean;
    isOpenFetchAfter?: boolean;
    appId?: string;
    sendTimer?: number;
    filterUrlList?: string[];
};
export interface BaseTraceInterface {
}
export {};
