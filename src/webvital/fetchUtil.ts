import {
  BreadcrumbTypes,
  BreadcrumbsCategorys,
  TraceDataSeverity,
  TraceDataTypes,
  TraceTypeData,
} from "../typings/typeing";
import { BaseTrace, getTimestamp } from "./baseTrace";
const { fetch: originFetch } = window;

interface RequestInit {
  method: string;
  body?: any;
  headers?: any;
}

export type OnBeforeProps = {
  url: string;
  method: "POST" | "GET";
  options?: RequestInit;
  name?: string
};
export type OnFetchError = {
  elapsedTime: any;
  name?: string;
  options: any;
  url: any;
  method: any;
  status: string | number | undefined;
  message: string;
  statusText: string;
  stack: string;
  body: any;
};
export type InterceptFetchType = {
  onError: (error: OnFetchError) => void;
  onBefore: (props: OnBeforeProps) => void;
  onAfter: (result: any) => void;
};

const interceptFetch = ({ onError, onBefore, onAfter }: InterceptFetchType) => {
  (function () {
    // 保存原始的 XMLHttpRequest 构造函数
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;
    const originalErr = XMLHttpRequest.prototype.onerror
    const listener = XMLHttpRequest.prototype.addEventListener;
    // const headers = XMLHttpRequest.prototype.
    let startTime = 0;
    //@ts-ignore
    XMLHttpRequest.prototype.open = function (
      method: "POST" | "GET",
      url: string,
      async,
      user,
      password
    ) {
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
          } else {
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
          }           //   console.log(`Intercepted request to readyState:`, this.status);
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
  return async (...args: any) => {
    const [request, options] = args;

    const startTime = getTimestamp();
    const qt = typeof request == 'string' ? { url: request, method: (options?.method || "GET").toLocaleUpperCase(), } : request;


    let res;
    try {

      onBefore &&
        onBefore({
          url: request.url,
          method: request?.method,
          name: "fetch-before",
          options,
        });
      res = await originFetch(request, options)

      // console.log("onAfter------->", res, qt);
      // console.log("onAfter*********************", { url:res.url, method:qt.method, status:res.status, name: "fetch-after", elapsedTime: getTimestamp() - startTime });
      onAfter && onAfter({ url: res.url, method: qt.method, status: res.status, name: "fetch-after", elapsedTime: getTimestamp() - startTime });
    } catch (err) {
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
        status: res?.status,
        statusText: res?.statusText || "",
        method: qt?.method,
        body: options?.body,
        elapsedTime: getTimestamp() - startTime,
        options: undefined,
        message: "",
        stack: ""
      });
    }
    return res;
  };
};

export function initFetch(traceSdk: BaseTrace) {
  //@ts-ignore
  window.fetch =
    interceptFetch({
      onError: (error) => {
        const prix = error.url?.split("?")[0] || "";
        const url = prix?.split("//")[1]?.split('/')[0];


        if (!traceSdk.filterUrlList.includes(url)){
       
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
          traceSdk.sendImmediate(error.name || "",  TraceDataTypes.HTTP)
        }
          
     
      },
      onBefore: (props: OnBeforeProps) => {
        const prix = props.url?.split("?")[0] || "";
        const url = prix?.split("//")[1]?.split('/')[0];
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
      onAfter: (result: any) => {
        const prix = result.url?.split("?")[0] || "";
        const url = prix?.split("//")[1]?.split('/')[0];
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
