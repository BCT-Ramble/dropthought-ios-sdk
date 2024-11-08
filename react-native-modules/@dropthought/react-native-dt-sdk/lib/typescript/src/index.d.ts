import { initializeWithAPIKey } from './initialize';
import type { Storage } from './lib/Storage';
export declare const BASE_URL = "https://api.dropthought.com/dtapp";
export declare function initialize(params: {
    apiKey: string;
    storage: Storage;
}): void;
export declare const feedbackUploader: {
    upload(): Promise<void>;
    clear(): Promise<void>;
};
export { initializeWithAPIKey };
export * from './kiosk-rn-sdk';
export * from './lib';
export * from './data';
//# sourceMappingURL=index.d.ts.map