import { BaseTrace } from "./baseTrace";
interface RequestInit {
    method: string;
    body?: any;
    headers?: any;
}
export type OnBeforeProps = {
    url: string;
    method: "POST" | "GET";
    options?: RequestInit;
    name?: string;
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
export declare function initFetch(traceSdk: BaseTrace): void;
export {};
