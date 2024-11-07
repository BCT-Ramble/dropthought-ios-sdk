import type { ColorValue } from 'react-native';
import type { Float, Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import type { ViewProps } from './utils';
import type { UnsafeMixed } from './codegenUtils';
import { NumberProp } from '../lib/extract/types';
type HitSlop = Readonly<{
    left?: Float;
    top?: Float;
    right?: Float;
    bottom?: Float;
}>;
interface NativeProps extends ViewProps {
    bbWidth?: UnsafeMixed<NumberProp>;
    bbHeight?: UnsafeMixed<NumberProp>;
    minX?: Float;
    minY?: Float;
    vbWidth?: Float;
    vbHeight?: Float;
    align?: string;
    meetOrSlice?: Int32;
    color?: ColorValue;
    pointerEvents?: string;
    hitSlop?: UnsafeMixed<HitSlop | null | number | undefined>;
}
declare const _default: import("react-native/Libraries/Utilities/codegenNativeComponent").NativeComponentType<NativeProps>;
export default _default;
//# sourceMappingURL=IOSSvgViewNativeComponent.d.ts.map