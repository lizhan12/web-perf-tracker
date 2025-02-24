import {
  BreadcrumbTypes,
  BreadcrumbsCategorys,
  BrowserType,
  TraceClientTypes,
  TraceDataSeverity,
  TraceDataTypes,
  TraceLevelType,
  TraceTypes,
  type BaseTraceInterface,
  
  type TraceAction,
  type TraceBreadcrumbs,
  type TraceData,
  type TraceDataLog,
  type TraceDataResource,
  type TraceOptions,
  type TracePerf,
  type TraceTypeData,
} from "../typings/typeing";
import { getFingerprintId } from "./webUtil";
import { mapMetric, onVitals } from "./webvitals";
import { initFetch } from "./fetchUtil";
import DateAndTime from "./DateAndTime";
function detectPlatform() {
  var userAgent = navigator.userAgent;
  var platform: any = {};

  // 检测是否是移动设备
  platform.isMobile =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent.toLowerCase()
      
    );

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
  if (platform.isMobile) return BrowserType.MOBILE;
  else if (platform.isPC) return BrowserType.PC;
  else if (platform.isWebView) return BrowserType.WEBVIEW;
  else return BrowserType.MINI_PROGRAM;
}

export class BaseTrace implements BaseTraceInterface {
  // 性能日志数据
  public perfData: TracePerf = {
    id: uuid(),
  };
  public resources: TraceDataResource[] = [];
  public observer: PerformanceObserver | null = null;
  public breadcrumb: TraceBreadcrumbs = [];
  // 最大存储用户行为
  public maxBreadcrumb = 5;
  public queue: TraceData[] = [];
  public sendTimer = 1000 * 30;
  options: TraceOptions;
  userAgent: string = navigator.userAgent;
  browserType: BrowserType = detectPlatform();
  appId = "";
  fpId: string;
  filterUrlList: string[] = []

  pageId: string;
  isOpenFetchBefore: boolean | undefined;
  isOpenFetchAfter: boolean | undefined;

  public onGlobalClick() {
    const _t = this;
    window.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const innerHTML = target.innerHTML;
      const bc: TraceAction = {
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

  public saveBreadcrumb(data: TraceAction) {
    this.breadcrumb.push(data);
    if (this.breadcrumb.length > this.maxBreadcrumb) {
      this.breadcrumb.shift();
    }
  }
  /**
   * 构造函数，初始化性能观察者
   * @param options 初始化选项
   */
  public constructor(
    options: TraceOptions = {
      url: "",
      openClick: false,
      openFech: true,

      openResource: true,
      appId: "",
      sendTimer: 1000 * 30,
      filterUrlList: []
    }
  ) {
    this.options = options;
    this.isOpenFetchBefore = options.isOpenFetchBefore
    this.isOpenFetchAfter = options.isOpenFetchAfter
    this.appId = options.appId || "";
    this.fpId = getFingerprintId(this.appId);
    this.filterUrlList = options.filterUrlList || []
    this.pageId = hashCode(document.URL) + "";
    this.sendTimer = options.sendTimer || 30 * 1000;
    if (this.options.openResource)
      this.observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === "resource") {
            this.handleObserverResource(entry as PerformanceResourceTiming);
          }
        });
      });

  }

  public setTraceData(data: TraceTypeData | TracePerf) {
    let type = TraceTypes.CONSOLE;
    let level = TraceLevelType.debug;
    let _data = null;
    let perf = null;
    if (!!(data as TraceTypeData).dataId) {
      type = getTypes((data as TraceTypeData).type);
      level = getTraceDataLevel((data as TraceTypeData).level);
      _data = data as TraceTypeData;
    }
    if (!!(data as TracePerf).id) {
      type = TraceTypes.PERF;
      level = getPerfLevel(data as TracePerf);
      perf = data as TracePerf;
    }
    const traceData: TraceData = {
      type,
      level,
      createdAt: DateAndTime.formatDate(new Date(), "/"),
      updatedAt: DateAndTime.formatDate(new Date(), "/"),
      data: _data!,
      perf: perf as any,
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
  public send(data: TraceTypeData | TracePerf) {
    const traceData = this.setTraceData(data);
    // console.log(traceData)
    //   ;
    sendByImg(this.options.url, traceData);
  }
  /**
   *
   * @param log
   */
  public log(log: TraceDataLog) {
    this.saveBreadcrumb({
      name: "customer-log",
      level: log.level,
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
  public static init(options?: TraceOptions): BaseTrace {

    const traceSdk = new BaseTrace(options);
    traceSdk.onGlobalError();
    // 监听页面性能
    onVitals(traceSdk.createPerfReport());
    // 监听资源加载
    if (traceSdk.options.openResource)
      traceSdk.observer?.observe({
        entryTypes: ["resource"],
        buffered: true,
      });
    if (traceSdk.options.openClick) traceSdk.onGlobalClick();
    //@ts-ignore
    window.traceSdk = traceSdk;
    if (traceSdk.options.openFech) {
      initFetch(traceSdk);
    }

    setInterval(() => {
      const data = traceSdk.queue.shift();
      if (Object.keys(traceSdk.perfData).length > 8) {
        traceSdk.send(traceSdk.perfData);
        traceSdk.perfData = {} as any;

      }
      // console.log(traceSdk.perfData);
      if (data) {
        traceSdk.send(data as any);
      }
    }, traceSdk.sendTimer);

    window?.addEventListener("beforeunload", () => {
      let data = traceSdk.queue.shift();
      let index = 0;
      while (data && index < 10) {
        traceSdk.send(data as any);
        data = traceSdk.queue.shift();
        index++;
      }

      // this.sendPerf();
    })
    return traceSdk;
  }
  public info(message: string, tag?: string) {
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
  public warn(message: string, tag?: string) {
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

  public error(message: string, tag?: string) {
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
  public onGlobalError() {
    window.addEventListener(
      "error",
      (event) => {
        this.saveError(event);
      },
      true
    );
  }

  /**
   * 创建性能报告
   * @returns 处理性能指标的函数
   */
  createPerfReport() {
    return (metric: any) => {
      this.perfData = { ...this.perfData, ...mapMetric(metric) };
    };
  }

  /**
   * 处理资源加载性能条目
   * @param entry 资源加载性能条目
   */
  public handleObserverResource(entry: PerformanceResourceTiming) {
    // console.log(entry)
    let level = TraceDataSeverity.Info;
    if (entry.duration > 1000 && entry.duration < 1500) {
      level = TraceDataSeverity.Warning;
    } else if (entry.duration > 1500) {
      level = TraceDataSeverity.Error;
    }

    if (entry.duration > 1000) {
      const traceData: TraceTypeData = {
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
  public saveError(event: ErrorEvent) {
    const target = event.target as HTMLElement;
    const isResTarget = isResourceTarget(target);
    const nodeName = target.nodeName;
    // console.log(target)
    // console.log(target)

    if (!isResTarget) {
      // 非资源错误
      const traceData: TraceTypeData = {
        dataId: 0,
        name: "script-error",
        level: TraceDataSeverity.Error,
        message: event.message,
        time: getTimestamp(),
        type: TraceDataTypes.JAVASCRIPT,
        stack: event.error?.stack ?? null,
      };
      this.resources.push(traceData);
      this.breadcrumb.push({
        name: event.error.name,
        type: BreadcrumbTypes.CODE_ERROR,
        category: BreadcrumbsCategorys.Exception,
        level: TraceDataSeverity.Error,
        message: event.message,
        stack: event.error.stack,
        time: getTimestamp(),
      });
      //@ts-ignore
      this.queue.push(traceData);
    } else {
      // 资源加载错误
      const url = target.getAttribute("src") || target.getAttribute("href");
      if (url) {
        const traceData: TraceTypeData = {
          dataId: hashCode(`${nodeName}${event.message}${url}`),
          name: "resource-load-error",
          level: TraceDataSeverity.Warning,
          message: event.message,
          time: getTimestamp(),
          type: TraceDataTypes.RESOURCE,
          stack: [url],
        };
        this.resources.push(traceData);
        //@ts-ignore
        this.queue.push(traceData);
        this.breadcrumb.push({
          name: traceData.name,
          type: BreadcrumbTypes.RESOURCE,
          category: BreadcrumbsCategorys.Exception,
          level: TraceDataSeverity.Warning,
          message: event.message,
          time: getTimestamp(),
          request: { url },
        });
      }

    }
  }
}

export function getTimestamp() {
  return Date.now();
}

/**
 * 生成字符串的哈希码
 * @param {string} str - 输入的字符串
 * @returns {number} - 返回生成的哈希码
 */
function hashCode(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash * 31 + char) | 0; // 使用位操作符以确保 32 位整数溢出
  }
  return Math.abs(hash);
}
export const isResourceTarget = (target: HTMLElement) =>
  target instanceof HTMLScriptElement ||
  target instanceof HTMLLinkElement ||
  target instanceof HTMLImageElement ||
  target instanceof HTMLVideoElement ||
  target instanceof HTMLAudioElement;
function dataTypes2BreadcrumbsType(type: TraceDataTypes): BreadcrumbTypes {
  if (TraceDataTypes.LOG == type) return BreadcrumbTypes.CLICK;
  if (TraceDataTypes.PERF == type) return BreadcrumbTypes.CODE_ERROR;
  if (TraceDataTypes.RESOURCE == type) return BreadcrumbTypes.RESOURCE;
  if (TraceDataTypes.JAVASCRIPT == type) return BreadcrumbTypes.CODE_ERROR;
  return BreadcrumbTypes.CLICK;
  // throw new Error("Function not implemented.");
}

function dataCategory2BreadcrumbsCategory(
  type: TraceDataTypes
): BreadcrumbsCategorys {
  return BreadcrumbsCategorys.Exception;
}
function getTraceDataLevel(level: TraceDataSeverity): TraceLevelType {
  if (level == TraceDataSeverity.Error) return TraceLevelType.error;
  else if (level == TraceDataSeverity.Warning) return TraceLevelType.warn;
  else if (level == TraceDataSeverity.Info) return TraceLevelType.info;
  else if (level == TraceDataSeverity.Debug) return TraceLevelType.debug;
  return TraceLevelType.info;
}

function getPerfLevel(arg0: TracePerf): TraceLevelType {
  if ((arg0.FCP || 0) > 2000) return TraceLevelType.error;
  else if ((arg0.FCP || 0) > 1500) return TraceLevelType.warn;
  else if ((arg0.FCP || 0) > 1000) return TraceLevelType.info;
  return TraceLevelType.info;
}

function sendByImg(url: any, data: TraceData) {

  const spliceStr = url.indexOf('?') === -1 ? '?' : '&'
  const imageUrl = `${url}${spliceStr}data=${encodeURIComponent(safeStringify(data))}`;
  let img = new Image()
  img.src = imageUrl
  img.onload = function () {
    //@ts-ignore
    img = null
  };
  img.onerror = function (err) {
    //@ts-ignore
    img = null
  };
}
function uuid(): string {
  var d = new Date().getTime(); //获取当前时间戳
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now(); //如果浏览器支持performance.now()，则获取更精确的时间戳
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function getTypes(type: TraceDataTypes): TraceTypes {
  if (type == TraceDataTypes.HTTP) return TraceTypes.FETCH;
  else if (type == TraceDataTypes.JAVASCRIPT) return TraceTypes.CODE_ERROR;
  else if (type == TraceDataTypes.RESOURCE) {
    return TraceTypes.RESOURCE;
  } else if (type == TraceDataTypes.PERF) {
    return TraceTypes.PERF;
  }

  return TraceTypes.ACTION;
}
function safeStringify(obj: object): string {
  // return JSON.stringify(obj);
  const set = new Set()
  const str = JSON.stringify(obj, function (_key, value) {
    if (set.has(value)) {
      return null
    }
    typeof value === 'object' && set.add(value)
    return value
  })
  set.clear()
  return str
}

