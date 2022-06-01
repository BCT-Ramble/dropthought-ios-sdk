import { Storage } from './lib/Storage';
export declare function initializeWithAPIKey(param: {
    apiKey: string;
    baseURL?: string;
    storage: Storage;
}): Promise<void>;