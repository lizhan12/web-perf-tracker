#### Description

```
import  {BaseTrace} from 'web-perf-tracker'
or
window.baseTrace = window.webPerfTracker.BaseTrace.init({
    appId: 'appid', // Your application ID, used to identify the app
    url: 'https://xxxxxxx/track.gif', // The endpoint URL to send performance data (e.g., tracking image URL)
    openClick: true, // Enable tracking of click events
    openFech: true, // Enable tracking of fetch requests (e.g., API calls)
    openResource:true, // Enable traceing of script resource
    sendTimer:30 * 1000 // Log sending interval
    filterUrlList: ["xxx.com", "yyy.cn"] // You can filter out logs from domains that you don't want to collect(e.g yyy.cn)
});
```

#### Log Format

1.  Performance

```
{
    "id": "67bc10d9c3d67a60c66717bc", // Unique identifier for the log entry
    "type": "Perf", // Type of the log entry, in this case, performance data
    "level": "info", // Severity level of the log (e.g., 'info', 'warn', 'error')
    "createdAt": "2025/02/24 14:25:00", // Timestamp when the log was created
    "updatedAt": "2025/02/24 14:25:00", // Timestamp when the log was last updated
    "data": null, // Any additional data associated with the log entry (null if none)
    "perf": { // Performance-related data
        "id": "6f7c561f-ab62-4616-ae2b-86e767be8a1c", // Unique identifier for the performance data
        "TTFB": 152.2, // Time to First Byte (in milliseconds)
        "TTFBRating": "good", // Rating of the TTFB performance (e.g., 'good', 'bad', etc.)
        "FCP": 929.8, // First Contentful Paint (in milliseconds)
        "FCPRating": "good", // Rating of the FCP performance (e.g., 'good', 'bad', etc.)
        "LCP": 929.8, // Largest Contentful Paint (in milliseconds)
        "LCPRating": "good", // Rating of the LCP performance (e.g., 'good', 'bad', etc.)
        "CLS": 0, // Cumulative Layout Shift score
        "CLSRating": "good", // Rating of the CLS performance (e.g., 'good', 'bad', etc.)
        "FID": 0, // First Input Delay (in milliseconds)
        "FIDRating": null // Rating of the FID performance (null if not available)
    },
    "breadcrumbs": [], // Array of breadcrumb events related to the log (e.g., previous user actions)
    "traceId": "a43b83e1-555d-4ce5-ac18-e8d36cb2a071", // Unique trace identifier, used for correlating related logs
    "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.95 Safari/537.36", // User-Agent string containing information about the browser and operating system
    "bt": "pc", // Type of device, in this case, 'pc' for personal computer
    "fpId": "940081ff00452be5b5e8e8976a", // Fingerprint ID for uniquely identifying the user or session
    "appId": "appid", // Application ID for identifying the app generating the log
    "clientType": "browser", // Type of client generating the log, in this case, 'browser'
    "url": "http://www.xxxx.com", // URL of the page where the log was captured
    "pid": "499080161" // Product ID or identifier for the specific product related to the log
}
```

2.Code error

```
{
    "id": "67bc0fefc3d67a60c66717b7", // Unique identifier for the log entry
    "type": "Console", // Type of the log entry, in this case, console log
    "level": "debug", // Severity level of the log (e.g., 'debug', 'info', 'error')
    "createdAt": "2025/02/24 14:21:00", // Timestamp when the log was created
    "updatedAt": "2025/02/24 14:21:00", // Timestamp when the log was last updated
    "data": null, // Additional data associated with the log entry (null if none)
    "perf": null, // Performance-related data (null if not applicable)
    "breadcrumbs": [ // Array of breadcrumb events leading up to the error
        {
            "name": "SyntaxError", // Name of the error
            "level": "error", // Severity level of the breadcrumb (e.g., 'error', 'warning')
            "type": "Code Error", // Type of the error (e.g., 'Code Error', 'Network Error')
            "category": "exception", // Category of the error (e.g., 'exception', 'network')
            "message": "Uncaught SyntaxError: Unexpected token '?'", // Error message describing the issue
            "time": 1740378068167, // Timestamp when the error occurred
            "request": null, // Request data associated with the error (null if none)
            "response": null // Response data associated with the error (null if none)
        }
    ],
    "traceId": "6c9bcb89-ffda-4ee3-9101-b501f2da4d4d", // Unique trace identifier, used for correlating related logs
    "ua": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36", // User-Agent string containing information about the browser and operating system
    "bt": "pc", // Type of device generating the log, in this case, 'pc' for personal computer
    "fpId": "420910f81f452be5b5ffe09917", // Fingerprint ID for uniquely identifying the user or session
    "appId": "appid", // Application ID for identifying the app generating the log
    "clientType": "browser", // Type of client generating the log, in this case, 'browser'
    "url": "http://www.xxxx.com", // URL of the page where the log was captured
    "pid": "499080161" // Product ID or identifier for the specific product related to the log
}

```

3. fetch error

```
...
"breadcrumbs": [
    {
        "name": "axios-err", // Name of the breadcrumb event, indicating an error with axios
        "level": "error", // Severity level of the breadcrumb (e.g., 'error', 'warning', 'info')
        "type": "Fetch", // Type of the operation (e.g., 'Fetch' for network requests)
        "category": "http", // Category of the event (e.g., 'http' for HTTP requests)
        "message": "0", // Message describing the event (in this case, indicating some error code or status)
        "time": 1740377581970, // Timestamp when the event occurred (in milliseconds)
        "request": null, // Request data associated with the event (null if not available)
        "response": { // Response data for the event
            "status": 0, // HTTP status code (0 indicates a failed request)
            "statusText": "", // Status text associated with the response (empty here)
            "url": "", // URL of the request (empty here, indicating no response)
            "method": "GET", // HTTP method used for the request (e.g., 'GET')
            "elapsedTime": 1 // Time elapsed during the request (in milliseconds)
        }
    },
    {
        "name": "axios-err", // Same error event, indicating another issue with axios
        "level": "error", // Severity level (error)
        "type": "Fetch", // Type of operation (Fetch)
        "category": "http", // Category (http)
        "message": "0", // Message (error code 0)
        "time": 1740377581970, // Timestamp (same as the previous breadcrumb)
        "request": null, // No request data
        "response": { // Response data
            "status": 0, // HTTP status code (0 indicates failure)
            "statusText": "", // No status text
            "url": "", // No URL
            "method": "GET", // HTTP method (GET)
            "elapsedTime": 1 // Time elapsed (1ms)
        }
    },
    {
        "name": "axios-err", // Another axios error event
        "level": "error", // Error severity
        "type": "Fetch", // Fetch operation
        "category": "http", // HTTP category
        "message": "0", // Error message (0)
        "time": 1740377582050, // Timestamp when the error occurred
        "request": null, // No request data
        "response": { // Response data for this event
            "status": 0, // HTTP status code (0)
            "statusText": "", // No status text
            "url": "", // No URL
            "method": "GET", // HTTP method (GET)
            "elapsedTime": 81 // Time elapsed (81ms)
        }
    },
    {
        "name": "axios-before", // Event indicating the request is about to be made
        "level": "normal", // Normal severity (this is before the request is made)
        "type": "Fetch", // Type of operation (Fetch)
        "category": "http", // Category (http)
        "message": "", // No specific message
        "time": 1740377582095, // Timestamp of the event
        "request": { // Request data for this event
            "method": "GET", // HTTP method (GET)
            "url": "https://www.xxxx.cn/xxxx" // URL of the request
        },
        "response": null // No response data yet, as the request is about to be made
    },
    {
        "name": "axios-err", // Another axios error event
        "level": "error", // Error level
        "type": "Fetch", // Fetch operation
        "category": "http", // HTTP category
        "message": "0", // Error message (0)
        "time": 1740377582144, // Timestamp of the error
        "request": null, // No request data
        "response": { // Response data for this event
            "status": 0, // HTTP status code (0, indicating failure)
            "statusText": "", // No status text
            "url": "", // No URL
            "method": "GET", // HTTP method (GET)
            "elapsedTime": 49 // Time elapsed (49ms)
        }
    }
]
...

```

#### In Rollup, the default module format is commonjs. To change it to another format, such as es (ES Modules), umd, or iife, you can modify the rollup.config.js file.

```
import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default defineConfig({
	input: './src/webvital/baseTrace.ts',
	output: {
		name: 'Perf',
		file: './dist/webvital/baseTrace.js',
		format: 'umd',
		plugins: [terser()],
	},
	plugins: [
		resolve(),
		commonjs(),
		typescript({
			declaration: true,
			declarationDir: './dist/webvital',
			rootDir: 'src',
		}),
	],

});
```
