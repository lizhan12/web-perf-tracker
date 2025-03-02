import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB, } from 'web-vitals'
function round (value:number,t:number){
    return Math.round(value * 100) / 100
}



export function mapMetric(metric:any) {
 
    const isWebVital = ['FCP', 'TTFB', 'LCP', 'CLS', 'FID', "INP"].indexOf(metric.name) !== -1;
    return {
      [metric.name]: isWebVital ? round(metric.value, metric.name === 'CLS' ? 4 : 0) : metric.value,
      [`${metric.name}Rating`]: metric.rating
    }
  };

  // src/core/webvitals.ts
export const onVitals = (saveMetric:any) => {
  
    onLCP(saveMetric)
    onFID(saveMetric)
    onCLS(saveMetric)
    onTTFB(saveMetric)
    onINP(saveMetric)
    onFCP(saveMetric)
  }
  