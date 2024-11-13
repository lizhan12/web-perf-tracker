import { TraceDataResource, TraceDataSeverity, TraceDataTypes } from "../typings/typeing";

export const isResourceTarget = (target: HTMLElement) =>
  target instanceof HTMLScriptElement ||
  target instanceof HTMLLinkElement ||
  target instanceof HTMLImageElement ||
  target instanceof HTMLVideoElement ||
  target instanceof HTMLAudioElement;

  function hashCode(arg0: string) {
  return 1 
}

function getTimestamp(): number {
  return Date.now();
}



function saveError(this: any, event: ErrorEvent) {
  const target = event.target || event.srcElement;

  const nodeName = (target as HTMLElement).nodeName;

  const url =
    (target as HTMLElement).getAttribute("src") ||
    (target as HTMLElement).getAttribute("href");

  const dataId = hashCode(`${nodeName}${event.message}${url}`);

  const traceDataResource: TraceDataResource = {
    dataId,
    name: "resource-load-error",
    level: TraceDataSeverity.Error,
    message: event.message,
    time: getTimestamp(),
    type: TraceDataTypes.RESOURCE,
  };
  this.resources.push(traceDataResource);
}




window.addEventListener("error", (event) => {
  let target = event.target || event.srcElement;
  let isResTarget = isResourceTarget(target as HTMLElement);
  if (isResTarget) {
    // 处理全链路关注的前端资源
    saveResourceError(event);
  }
});
function saveResourceError(event: ErrorEvent) {
  throw new Error("Function not implemented.");
}

