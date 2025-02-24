import { BrowserType, type BaseTraceInterface, type TraceAction, type TraceBreadcrumbs, type TraceData, type TraceDataLog, type TraceDataResource, type TraceOptions, type TracePerf, type TraceTypeData } from "../typings/typeing";
export declare class BaseTrace implements BaseTraceInterface {
    perfData: TracePerf;
    resources: TraceDataResource[];
    observer: PerformanceObserver | null;
    breadcrumb: TraceBreadcrumbs;
    maxBreadcrumb: number;
    queue: TraceData[];
    sendTimer: number;
    options: TraceOptions;
    userAgent: string;
    browserType: BrowserType;
    appId: string;
    fpId: string;
    filterUrlList: string[];
    pageId: string;
    isOpenFetchBefore: boolean | undefined;
    isOpenFetchAfter: boolean | undefined;
    onGlobalClick(): void;
    saveBreadcrumb(data: TraceAction): void;
    /**
     * 构造函数，初始化性能观察者
     * @param options 初始化选项
     */
    constructor(options?: TraceOptions);
    setTraceData(data: TraceTypeData | TracePerf): TraceData;
    send(data: TraceTypeData | TracePerf): void;
    /**
     *
     * @param log
     */
    log(log: TraceDataLog): void;
    /**
     * 初始化 BaseTrace 实例
     * @param options 初始化选项
     * @returns BaseTrace 实例
     */
    static init(options?: TraceOptions): BaseTrace;
    info(message: string, tag?: string): void;
    warn(message: string, tag?: string): void;
    error(message: string, tag?: string): void;
    /**
     * 监听全局错误事件
     */
    onGlobalError(): void;
    /**
     * 创建性能报告
     * @returns 处理性能指标的函数
     */
    createPerfReport(): (metric: any) => void;
    /**
     * 处理资源加载性能条目
     * @param entry 资源加载性能条目
     */
    handleObserverResource(entry: PerformanceResourceTiming): void;
    /**
     * 保存错误信息
     * @param event 错误事件
     */
    saveError(event: ErrorEvent): void;
}
export declare function getTimestamp(): number;
export declare const isResourceTarget: (target: HTMLElement) => target is HTMLScriptElement | HTMLLinkElement | HTMLImageElement | HTMLVideoElement | HTMLAudioElement;
