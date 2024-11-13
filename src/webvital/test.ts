import { BaseTraceInfo, BrowserType, TraceClientTypes, TraceLevelType, TraceTypes } from "../typings/typeing"

const exampleBaseData: BaseTraceInfo = {
    traceId: '0bdf6c8e-25c8-427d-847a-9950318a2e14',
    level: TraceLevelType.warn,
    type: TraceTypes.ACTION,
    ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    bt: BrowserType.MOBILE,
    fpId: 'c77a37f4',
    uid: 1002,
    // 例如：极客邦App的命名
    appId: 'geekbang-app',
    clientType: TraceClientTypes.IOS_H5,
    pid: '088c8a92-5a24-4144-9c37-310848c397e1',
    url: 'https://time.geekbang.org/',
    createdAt: '',
    updatedAt: '',
  }


  // trace data json
const data =  {
  "traceId": "0bdf6c8e-25c8-427d-847a-9950318a2e14",
  "level": "warn",
  "type": "Action",
  "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "bt": "mobile",
  "fpId": "c77a37f4",
  "uid": 1002,
  "appId": "geekbang-h5",
  "clientType": "browser",
  "pid": "088c8a92-5a24-4144-9c37-310848c397e1",
  "url": "https://time.geekbang.org/",
  "createdAt": "2024-03-13T15:35:30.292Z",
  "updatedAt": "2024-03-13T15:35:30.292Z",
  "data": {
    "dataId": 2384780,
    "name": "fetch-api",
    "level": "info",
    "message": "success",
    "time": 1710345961943,
    "type": "HTTP",
    "elapsedTime": 166.34,
    "method": "POST",
    "httpType": "fetch",
    "url": "https://time.geekbang.org/serv/v3/product/infos",
    "body": "{\"ids\":[100035801,100002401,100024001,100007001,100003901,100029601,100027801,100034101,100042501,100023701]}",
    "status": 0
  },
  "breadcrumbs": [
    {
      "name": "fetch-api",
      "level": "info",
      "time": "string",
      "type": "Fetch",
      "category": "hhtp"
    }
  ]
}
