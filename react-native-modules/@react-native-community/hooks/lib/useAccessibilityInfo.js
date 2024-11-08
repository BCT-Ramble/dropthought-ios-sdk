"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAccessibilityInfo = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
function useAccessibilityStateListener(eventName, initializerName) {
    var _a = (0, react_1.useState)(undefined), isEnabled = _a[0], setIsEnabled = _a[1];
    (0, react_1.useEffect)(function () {
        if (!react_native_1.AccessibilityInfo[initializerName]) {
            return;
        }
        react_native_1.AccessibilityInfo[initializerName]().then(setIsEnabled);
        var subscription = react_native_1.AccessibilityInfo.addEventListener(eventName, setIsEnabled);
        return function () {
            subscription.remove();
        };
    }, [eventName, initializerName]);
    return isEnabled;
}
function useAccessibilityInfo() {
    var boldTextEnabled = useAccessibilityStateListener('boldTextChanged', 'isBoldTextEnabled');
    var grayscaleEnabled = useAccessibilityStateListener('grayscaleChanged', 'isGrayscaleEnabled');
    var invertColorsEnabled = useAccessibilityStateListener('invertColorsChanged', 'isInvertColorsEnabled');
    var reduceMotionEnabled = useAccessibilityStateListener('reduceMotionChanged', 'isReduceMotionEnabled');
    var reduceTransparencyEnabled = useAccessibilityStateListener('reduceTransparencyChanged', 'isReduceTransparencyEnabled');
    var screenReaderEnabled = useAccessibilityStateListener('screenReaderChanged', 'isScreenReaderEnabled');
    return {
        screenReaderEnabled: screenReaderEnabled,
        grayscaleEnabled: grayscaleEnabled,
        invertColorsEnabled: invertColorsEnabled,
        reduceMotionEnabled: reduceMotionEnabled,
        reduceTransparencyEnabled: reduceTransparencyEnabled,
        boldTextEnabled: boldTextEnabled,
    };
}
exports.useAccessibilityInfo = useAccessibilityInfo;
//# sourceMappingURL=useAccessibilityInfo.js.map