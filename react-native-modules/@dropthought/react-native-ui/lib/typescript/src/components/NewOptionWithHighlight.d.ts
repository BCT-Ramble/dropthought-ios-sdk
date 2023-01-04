import * as React from 'react';
export declare type Props = {
    type?: 'radio' | 'checkbox';
    id: any;
    title: string | React.ReactNode;
    checked: boolean;
    themeColor: string;
    onPress: (id: any) => void;
};
declare function NewOptionWithHighlight({ type, id: value, title, checked, themeColor, onPress, }: Props): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof NewOptionWithHighlight>;
export default _default;