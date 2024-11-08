function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { withoutXY } from '../lib/extract/extractProps';
import { idPattern } from '../lib/util';
import Shape from './Shape';
import RNSVGUse from '../fabric/UseNativeComponent';
export default class Use extends Shape {
  static displayName = 'Use';
  static defaultProps = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  };
  render() {
    const {
      props
    } = this;
    const {
      children,
      x,
      y,
      width,
      height,
      xlinkHref,
      href = xlinkHref
    } = props;
    const matched = href && href.match(idPattern);
    const match = matched && matched[1];
    if (!match) {
      console.warn('Invalid `href` prop for `Use` element, expected a href like "#id", but got: "' + href + '"');
    }
    const useProps = {
      href: match ?? undefined,
      x,
      y,
      width,
      height
    };
    return /*#__PURE__*/React.createElement(RNSVGUse, _extends({
      ref: ref => this.refMethod(ref)
    }, withoutXY(this, props), useProps), children);
  }
}
//# sourceMappingURL=Use.js.map