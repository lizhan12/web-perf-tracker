type TracePerfRating = "good" | "needs improvement" | "poor";

export enum TraceTypes {
  // PVUV
  PAGE_VIEW = "PageView",
  // Event
  EVENT = "EVENT",
  // 性能
  PERF = "Perf",
  // 资源
  RESOURCE = "Resource",
  // 动作、行为类型
  ACTION = "Action",
  // 请求类型
  FETCH = "Fetch",
  // 代码错误
  CODE_ERROR = "CodeError",
  // 日志
  CONSOLE = "Console",
  // 其它
  CUSTOMER = "Customer",
}

// 页面相关字段基类
type BasePageTrace = {
  // 页面ID
  pid: string;
  // 页面标题
  title?: string;
  // 当前页面URL
  url: string;
};
// 用户相关字段基类
export type BaseUserTrace = {
  // 指纹ID，fingerprintId
  fpId: string;
  // 用户ID
  uid?: string | number;
  // 用户名称
  userName?: string;
  // 用户邮箱
  email?: string;
};
export enum BrowserType {
  // 手机端浏览器
  MOBILE = "mobile",
  // PC浏览器
  PC = "pc",
  // webview
  WEBVIEW = "webview",
  // 小程序
  MINI_PROGRAM = "miniProgram",
}

// 浏览器相关字段基类
export type BaseBrowserTrace = {
  // 当前浏览器的UserAgent
  ua: string;
  // 浏览器类型
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
export enum TraceLevelType {
  // 告警级别
  error = "error",
  // 预警级别
  warn = "warn",
  // 普通日志
  info = "info",
  // 调试日志
  debug = "debug",
}

export enum TraceClientTypes {
  // 安卓
  ANDROID_H5 = "android",
  // iOS
  IOS_H5 = "ios",
  // PC端
  PC_H5 = "pc",
  // 浏览器
  BROWSER_H5 = "browser",
}

// 业务相关字段基类
export type BaseAppTrace = {
  // 业务ID
  appId: string;
  // 业务名称
  appName?: string;
  // 客户端类型
  clientType: TraceClientTypes;
  // 日志级别
  level: TraceLevelType;
};

type TraceBaseData = {
  // id
  dataId: number;
  // 日志信息名称
  name: string;
  // 问题级别
  level: TraceDataSeverity;
  // 异常信息
  message: string;
  // 发生时间
  time: number;
  // 问题类型
  type: TraceDataTypes;
};
// 全链路日志基类
type BaseTrace = {
  // 唯一ID，用户侧生成
  traceId: string;
  // 日志类型
  type: TraceTypes;
  // 日志产生时间
  createdAt: string;
  // 日志最后更新时间
  updatedAt: string;
};
export type BaseTraceInfo = BaseTrace &
  BaseBrowserTrace &
  BaseUserTrace &
  BaseAppTrace &
  BasePageTrace;
export enum TraceDataTypes {
  UNKNOWN = "UNKNOWN",
  JAVASCRIPT = "JAVASCRIPT",
  LOG = "LOG",
  HTTP = "HTTP",
  VUE = "VUE",
  REACT = "REACT",
  RESOURCE = "RESOURCE",
  PROMISE = "PROMISE",
  ROUTE = "ROUTE",
  PERF = "PERF",
}
export enum TraceDataSeverity {
  // 其他
  Else = "else",
  // 错误级别
  Error = "error",
  // 告警级别
  Warning = "warning",
  // 日志级别
  Info = "info",
  // 调试级别
  Debug = "debug",
  // 低危级别
  Low = "low",
  // 普通级别
  Normal = "normal",
  // 高危级别
  High = "high",
  // 极其严重
  Critical = "critical",
}

// 代码异常错误信息
type TractDataCodeError = TraceBaseData & {
  stack: string[] | null;
};
// 请求类信息
type TraceDataFetch = TraceBaseData & {
  // 执行时间，用于统计耗时
  elapsedTime: number;
  // 请求方法
  method: "POST" | "GET";
  // 请求类型
  httpType: "fetch" | "xhr";
  // 请求地址
  url: string;
  // 请求参数
  body: string;
  // 响应状态
  status: number;
};
// Promise类型
type TraceDataPromise = TraceBaseData;

// 资源类型
export type TraceDataResource = TraceBaseData;

// 普通日志
export type TraceDataLog = TraceBaseData & {
  tag: string;
};

// PV/UV
type TraceDataPageView = TraceBaseData & {
  route: string;
};

// 基类行为日志类型
type TraceBaseAction = {
  // 动作名称
  name: string;
  // 动作参数
  level: TraceDataSeverity;
  // 动作时间
  time: number;
  // 日志类型
  type: BreadcrumbTypes;
  // 行为分类
  category: BreadcrumbsCategorys;
};

// 行为日志
export type TraceAction = TraceBaseAction & {
  // 行为动作相关的信息，可以是DOM，可以是错误信息，可以是自定义信息
  message?: string | number | undefined;
  // 请求参数
  request?: any;
  // 请求结果内容
  response?: any;
  // 错误堆栈信息
  stack?: string | null;
};

export enum BreadcrumbsCategorys {
  Http = "http",
  User = "user",
  Debug = "debug",
  Exception = "exception",
  Lifecycle = "lifecycle",
}

export enum BreadcrumbTypes {
  ROUTE = "Route",
  CLICK = "UI.Click",
  CONSOLE = "Console",
  FETCH = "Fetch",
  UNHANDLEDREJECTION = "Unhandledrejection",
  RESOURCE = "Resource",
  CODE_ERROR = "Code Error",
  CUSTOMER = "Customer",
}
// 一份错误信息的类型集合
export type TraceTypeData =
  | TraceDataFetch
  | TractDataCodeError
  | TraceDataPromise
  | TraceDataResource
  | TraceDataLog
  | TraceDataPageView;

// 操作行为日志
export type TraceBreadcrumbs = TraceAction[];

// 完整的全链路日志
export type TraceData = BaseTraceInfo & {
  // 记录错误信息
  data?: TraceTypeData;
  // 记录操作行为
  breadcrumbs?: TraceBreadcrumbs;
  // 记录性能信息
  perf?: TracePerf[];
};
export type FingerprintOptions = {
  font?: string;
  reactStyle?: string | CanvasGradient | CanvasPattern;
  contentStyle?: string | CanvasGradient | CanvasPattern;
  textBaseline?: CanvasTextBaseline;
};
export type TraceOptions = {
  url?: string,
  openClick?: boolean,
  openResource?: boolean,
  openFech?: boolean,
  isOpenFetchBefore?: boolean,
  isOpenFetchAfter?: boolean,
  appId?: string,
  sendTimer?:number
  filterUrlList?: string[] // 过滤错误资源不进行上报
};

export interface BaseTraceInterface { }
