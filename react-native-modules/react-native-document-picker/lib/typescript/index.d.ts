import { ModalPropsIOS } from 'react-native';
import type { PlatformTypes, SupportedPlatforms } from './fileTypes';
export type DocumentPickerResponse = {
    uri: string;
    name: string | null;
    copyError?: string;
    fileCopyUri: string | null;
    type: string | null;
    size: number | null;
};
export declare const types: Readonly<{
    readonly allFiles: "*/*";
    readonly audio: "audio/*";
    readonly csv: "text/csv";
    readonly doc: "application/msword";
    readonly docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    readonly images: "image/*";
    readonly pdf: "application/pdf";
    readonly plainText: "text/plain";
    readonly ppt: "application/vnd.ms-powerpoint";
    readonly pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    readonly video: "video/*";
    readonly xls: "application/vnd.ms-excel";
    readonly xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    readonly zip: "application/zip";
}> | Readonly<{
    readonly allFiles: "public.item";
    readonly audio: "public.audio";
    readonly csv: "public.comma-separated-values-text";
    readonly doc: "com.microsoft.word.doc";
    readonly docx: "org.openxmlformats.wordprocessingml.document";
    readonly images: "public.image";
    readonly pdf: "com.adobe.pdf";
    readonly plainText: "public.plain-text";
    readonly ppt: "com.microsoft.powerpoint.ppt";
    readonly pptx: "org.openxmlformats.presentationml.presentation";
    readonly video: "public.movie";
    readonly xls: "com.microsoft.excel.xls";
    readonly xlsx: "org.openxmlformats.spreadsheetml.sheet";
    readonly zip: "public.zip-archive";
}> | Readonly<{
    readonly allFiles: "*";
    readonly audio: ".3g2 .3gp .aac .adt .adts .aif .aifc .aiff .asf .au .m3u .m4a .m4b .mid .midi .mp2 .mp3 .mp4 .rmi .snd .wav .wax .wma";
    readonly csv: ".csv";
    readonly doc: ".doc";
    readonly docx: ".docx";
    readonly images: ".jpeg .jpg .png";
    readonly pdf: ".pdf";
    readonly plainText: ".txt";
    readonly ppt: ".ppt";
    readonly pptx: ".pptx";
    readonly video: ".mp4";
    readonly xls: ".xls";
    readonly xlsx: ".xlsx";
    readonly zip: ".zip .gz";
}>;
export type DirectoryPickerResponse = {
    uri: string;
};
export type TransitionStyle = 'coverVertical' | 'flipHorizontal' | 'crossDissolve' | 'partialCurl';
export type DocumentPickerOptions<OS extends SupportedPlatforms> = {
    type?: string | PlatformTypes[OS][keyof PlatformTypes[OS]] | Array<PlatformTypes[OS][keyof PlatformTypes[OS]] | string>;
    mode?: 'import' | 'open';
    copyTo?: 'cachesDirectory' | 'documentDirectory';
    allowMultiSelection?: boolean;
    transitionStyle?: TransitionStyle;
} & Pick<ModalPropsIOS, 'presentationStyle'>;
export declare function pickDirectory<OS extends SupportedPlatforms>(params?: Pick<DocumentPickerOptions<OS>, 'presentationStyle' | 'transitionStyle'>): Promise<DirectoryPickerResponse | null>;
export declare function pickSingle<OS extends SupportedPlatforms>(opts?: DocumentPickerOptions<OS>): Promise<DocumentPickerResponse>;
export declare function pick<OS extends SupportedPlatforms>(opts?: DocumentPickerOptions<OS>): Promise<DocumentPickerResponse[]>;
export declare function releaseSecureAccess(uris: Array<string>): Promise<void>;
export type NativeModuleErrorShape = Error & {
    code?: string;
};
export declare function isCancel(err: unknown): boolean;
export declare function isInProgress(err: unknown): boolean;
declare const _default: {
    isCancel: typeof isCancel;
    isInProgress: typeof isInProgress;
    releaseSecureAccess: typeof releaseSecureAccess;
    pickDirectory: typeof pickDirectory;
    pick: typeof pick;
    pickSingle: typeof pickSingle;
    types: Readonly<{
        readonly allFiles: "*/*";
        readonly audio: "audio/*";
        readonly csv: "text/csv";
        readonly doc: "application/msword";
        readonly docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        readonly images: "image/*";
        readonly pdf: "application/pdf";
        readonly plainText: "text/plain";
        readonly ppt: "application/vnd.ms-powerpoint";
        readonly pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation";
        readonly video: "video/*";
        readonly xls: "application/vnd.ms-excel";
        readonly xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        readonly zip: "application/zip";
    }> | Readonly<{
        readonly allFiles: "public.item";
        readonly audio: "public.audio";
        readonly csv: "public.comma-separated-values-text";
        readonly doc: "com.microsoft.word.doc";
        readonly docx: "org.openxmlformats.wordprocessingml.document";
        readonly images: "public.image";
        readonly pdf: "com.adobe.pdf";
        readonly plainText: "public.plain-text";
        readonly ppt: "com.microsoft.powerpoint.ppt";
        readonly pptx: "org.openxmlformats.presentationml.presentation";
        readonly video: "public.movie";
        readonly xls: "com.microsoft.excel.xls";
        readonly xlsx: "org.openxmlformats.spreadsheetml.sheet";
        readonly zip: "public.zip-archive";
    }> | Readonly<{
        readonly allFiles: "*";
        readonly audio: ".3g2 .3gp .aac .adt .adts .aif .aifc .aiff .asf .au .m3u .m4a .m4b .mid .midi .mp2 .mp3 .mp4 .rmi .snd .wav .wax .wma";
        readonly csv: ".csv";
        readonly doc: ".doc";
        readonly docx: ".docx";
        readonly images: ".jpeg .jpg .png";
        readonly pdf: ".pdf";
        readonly plainText: ".txt";
        readonly ppt: ".ppt";
        readonly pptx: ".pptx";
        readonly video: ".mp4";
        readonly xls: ".xls";
        readonly xlsx: ".xlsx";
        readonly zip: ".zip .gz";
    }>;
    perPlatformTypes: {
        android: Readonly<{
            readonly allFiles: "*/*";
            readonly audio: "audio/*";
            readonly csv: "text/csv";
            readonly doc: "application/msword";
            readonly docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            readonly images: "image/*";
            readonly pdf: "application/pdf";
            readonly plainText: "text/plain";
            readonly ppt: "application/vnd.ms-powerpoint";
            readonly pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation";
            readonly video: "video/*";
            readonly xls: "application/vnd.ms-excel";
            readonly xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            readonly zip: "application/zip";
        }>;
        ios: Readonly<{
            readonly allFiles: "public.item";
            readonly audio: "public.audio";
            readonly csv: "public.comma-separated-values-text";
            readonly doc: "com.microsoft.word.doc";
            readonly docx: "org.openxmlformats.wordprocessingml.document";
            readonly images: "public.image";
            readonly pdf: "com.adobe.pdf";
            readonly plainText: "public.plain-text";
            readonly ppt: "com.microsoft.powerpoint.ppt";
            readonly pptx: "org.openxmlformats.presentationml.presentation";
            readonly video: "public.movie";
            readonly xls: "com.microsoft.excel.xls";
            readonly xlsx: "org.openxmlformats.spreadsheetml.sheet";
            readonly zip: "public.zip-archive";
        }>;
        windows: Readonly<{
            readonly allFiles: "*";
            readonly audio: ".3g2 .3gp .aac .adt .adts .aif .aifc .aiff .asf .au .m3u .m4a .m4b .mid .midi .mp2 .mp3 .mp4 .rmi .snd .wav .wax .wma";
            readonly csv: ".csv";
            readonly doc: ".doc";
            readonly docx: ".docx";
            readonly images: ".jpeg .jpg .png";
            readonly pdf: ".pdf";
            readonly plainText: ".txt";
            readonly ppt: ".ppt";
            readonly pptx: ".pptx";
            readonly video: ".mp4";
            readonly xls: ".xls";
            readonly xlsx: ".xlsx";
            readonly zip: ".zip .gz";
        }>;
        macos: Readonly<{
            readonly allFiles: "*";
            readonly audio: ".3g2 .3gp .aac .adt .adts .aif .aifc .aiff .asf .au .m3u .m4a .m4b .mid .midi .mp2 .mp3 .mp4 .rmi .snd .wav .wax .wma";
            readonly csv: ".csv";
            readonly doc: ".doc";
            readonly docx: ".docx";
            readonly images: ".jpeg .jpg .png";
            readonly pdf: ".pdf";
            readonly plainText: ".txt";
            readonly ppt: ".ppt";
            readonly pptx: ".pptx";
            readonly video: ".mp4";
            readonly xls: ".xls";
            readonly xlsx: ".xlsx";
            readonly zip: ".zip .gz";
        }>;
        web: Readonly<{
            readonly allFiles: "*";
            readonly audio: ".3g2 .3gp .aac .adt .adts .aif .aifc .aiff .asf .au .m3u .m4a .m4b .mid .midi .mp2 .mp3 .mp4 .rmi .snd .wav .wax .wma";
            readonly csv: ".csv";
            readonly doc: ".doc";
            readonly docx: ".docx";
            readonly images: ".jpeg .jpg .png";
            readonly pdf: ".pdf";
            readonly plainText: ".txt";
            readonly ppt: ".ppt";
            readonly pptx: ".pptx";
            readonly video: ".mp4";
            readonly xls: ".xls";
            readonly xlsx: ".xlsx";
            readonly zip: ".zip .gz";
        }>;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map