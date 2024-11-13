import { FingerprintOptions } from "../typings/typeing";

function bin2hex(binaryString:string) {
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
export const getFingerprintId = (content: string, options?: FingerprintOptions) => {

    if (!content) {
      console.error("content is empty");
      return "";
    }
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext("2d");
    // 如果不存在，则返回空值，说明不支持Canvas指纹
    if (!ctx) return "";
  
    const txt = content || 'geekbang';
    ctx.textBaseline = options && options.textBaseline ? options.textBaseline : "top";
    ctx.font = options && options.font ? options.font : "14px 'Arial'";
  
    ctx.fillStyle = options && options.reactStyle ? options.reactStyle : "#f60";
    // 先画一个60x20矩形内容
    ctx.fillRect(125, 1, 60, 20);
  
    ctx.fillStyle = options && options.contentStyle ? options.contentStyle : "#069";
    // 把字填充到矩形内
    ctx.fillText(txt, 2, 15);
  
    const b64 = canvas.toDataURL().replace("data:image/png;base64,","");
    const bin = atob(b64);
    const crc = bin2hex(bin.slice(-25,-12));
    return crc;
  }

