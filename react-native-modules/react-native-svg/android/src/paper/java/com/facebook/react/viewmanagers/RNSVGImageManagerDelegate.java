/**
* This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
*
* Do not edit this file as changes may cause incorrect behavior and will be lost
* once the code is regenerated.
*
* @generated by codegen project: GeneratePropsJavaDelegate.js
*/

package com.facebook.react.viewmanagers;

import android.view.View;
import androidx.annotation.Nullable;
import com.facebook.react.bridge.ColorPropConverter;
import com.facebook.react.bridge.DynamicFromObject;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.BaseViewManagerDelegate;
import com.facebook.react.uimanager.BaseViewManagerInterface;

public class RNSVGImageManagerDelegate<T extends View, U extends BaseViewManagerInterface<T> & RNSVGImageManagerInterface<T>> extends BaseViewManagerDelegate<T, U> {
  public RNSVGImageManagerDelegate(U viewManager) {
    super(viewManager);
  }
  @Override
  public void setProperty(T view, String propName, @Nullable Object value) {
    switch (propName) {
      case "name":
        mViewManager.setName(view, value == null ? null : (String) value);
        break;
      case "opacity":
        mViewManager.setOpacity(view, value == null ? 1f : ((Double) value).floatValue());
        break;
      case "matrix":
        mViewManager.setMatrix(view, (ReadableArray) value);
        break;
      case "mask":
        mViewManager.setMask(view, value == null ? null : (String) value);
        break;
      case "markerStart":
        mViewManager.setMarkerStart(view, value == null ? null : (String) value);
        break;
      case "markerMid":
        mViewManager.setMarkerMid(view, value == null ? null : (String) value);
        break;
      case "markerEnd":
        mViewManager.setMarkerEnd(view, value == null ? null : (String) value);
        break;
      case "clipPath":
        mViewManager.setClipPath(view, value == null ? null : (String) value);
        break;
      case "clipRule":
        mViewManager.setClipRule(view, value == null ? 0 : ((Double) value).intValue());
        break;
      case "responsible":
        mViewManager.setResponsible(view, value == null ? false : (boolean) value);
        break;
      case "display":
        mViewManager.setDisplay(view, value == null ? null : (String) value);
        break;
      case "pointerEvents":
        mViewManager.setPointerEvents(view, value == null ? null : (String) value);
        break;
      case "color":
        mViewManager.setColor(view, ColorPropConverter.getColor(value, view.getContext()));
        break;
      case "fill":
        mViewManager.setFill(view, new DynamicFromObject(value));
        break;
      case "fillOpacity":
        mViewManager.setFillOpacity(view, value == null ? 1f : ((Double) value).floatValue());
        break;
      case "fillRule":
        mViewManager.setFillRule(view, value == null ? 1 : ((Double) value).intValue());
        break;
      case "stroke":
        mViewManager.setStroke(view, new DynamicFromObject(value));
        break;
      case "strokeOpacity":
        mViewManager.setStrokeOpacity(view, value == null ? 1f : ((Double) value).floatValue());
        break;
      case "strokeWidth":
        mViewManager.setStrokeWidth(view, new DynamicFromObject(value));
        break;
      case "strokeLinecap":
        mViewManager.setStrokeLinecap(view, value == null ? 0 : ((Double) value).intValue());
        break;
      case "strokeLinejoin":
        mViewManager.setStrokeLinejoin(view, value == null ? 0 : ((Double) value).intValue());
        break;
      case "strokeDasharray":
        mViewManager.setStrokeDasharray(view, new DynamicFromObject(value));
        break;
      case "strokeDashoffset":
        mViewManager.setStrokeDashoffset(view, value == null ? 0f : ((Double) value).floatValue());
        break;
      case "strokeMiterlimit":
        mViewManager.setStrokeMiterlimit(view, value == null ? 0f : ((Double) value).floatValue());
        break;
      case "vectorEffect":
        mViewManager.setVectorEffect(view, value == null ? 0 : ((Double) value).intValue());
        break;
      case "propList":
        mViewManager.setPropList(view, (ReadableArray) value);
        break;
      case "filter":
        mViewManager.setFilter(view, value == null ? null : (String) value);
        break;
      case "x":
        mViewManager.setX(view, new DynamicFromObject(value));
        break;
      case "y":
        mViewManager.setY(view, new DynamicFromObject(value));
        break;
      case "width":
        mViewManager.setWidth(view, new DynamicFromObject(value));
        break;
      case "height":
        mViewManager.setHeight(view, new DynamicFromObject(value));
        break;
      case "src":
        mViewManager.setSrc(view, (ReadableMap) value);
        break;
      case "align":
        mViewManager.setAlign(view, value == null ? null : (String) value);
        break;
      case "meetOrSlice":
        mViewManager.setMeetOrSlice(view, value == null ? 0 : ((Double) value).intValue());
        break;
      default:
        super.setProperty(view, propName, value);
    }
  }
}