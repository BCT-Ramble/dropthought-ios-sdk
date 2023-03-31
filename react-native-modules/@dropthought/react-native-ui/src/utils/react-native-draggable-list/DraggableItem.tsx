import React, { useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, LayoutChangeEvent } from 'react-native';

type DraggableItemProps = {
  children: React.ReactNode;
  index: number;
  onDrag: (y: number) => void;
  onDragEnd: (pan: Animated.ValueXY) => void;
  onLayout: (event: LayoutChangeEvent) => void;
  forceReset: boolean;
  movements: number;
};

function DraggableItem({
  children,
  index,
  onDrag,
  onDragEnd,
  onLayout,
  forceReset,
  movements,
}: DraggableItemProps) {
  const valRef = useRef({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);

  const longPressTimeout = useRef<NodeJS.Timeout>();

  const pan = useState(new Animated.ValueXY())[0];
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        return true;
      },
      onPanResponderGrant: (_e, _gesture) => {
        longPressTimeout.current = setTimeout(() => {
          setIsDragging(true);
          isDraggingRef.current = true;
          //@ts-ignore
          pan.setOffset({ x: pan.x._value, y: pan.y._value });
          pan.setValue({ x: 0, y: 0 });
        }, 200);
      },
      onPanResponderMove: (_, gesture) => {
        if (isDraggingRef.current) {
          pan.y.setValue(gesture.dy);
        }
      },
      onPanResponderRelease: (_e, _gesture) => {
        if (longPressTimeout.current) {
          clearTimeout(longPressTimeout.current);
        }
        if (isDraggingRef.current) {
          setIsDragging(false);
          isDraggingRef.current = false;
          onDragEnd && onDragEnd(pan);
        }
      },
      onPanResponderTerminate(_e, _gestureState) {
        if (longPressTimeout.current) {
          clearTimeout(longPressTimeout.current);
        }
      },
    })
  );

  useEffect(() => {
    pan.addListener((value) => {
      valRef.current = value;
      if (isDraggingRef.current) {
        onDrag && onDrag(value.y);
      }
    });
  }, [onDrag, pan]);

  const shouldMoveRef = useRef(movements);
  useEffect(() => {
    if (shouldMoveRef.current !== 0 && movements === 0) {
      shouldMoveRef.current = movements;
      Animated.spring(pan, {
        toValue: { x: 0, y: movements },
        useNativeDriver: true,
      }).start();
    } else if (shouldMoveRef.current === 0 && movements !== 0) {
      shouldMoveRef.current = movements;
      Animated.spring(pan, {
        toValue: { x: 0, y: movements },
        useNativeDriver: true,
      }).start();
    }
  }, [pan, movements, index]);

  useEffect(() => {
    if (forceReset) {
      pan.setValue({ x: 0, y: 0 });
    }
  }, [forceReset, pan]);

  const panStyle = {
    transform: pan.getTranslateTransform(),
    zIndex: 0,
  };

  const draggingStyle = {
    zIndex: isDragging ? 2 : 0,
    opacity: isDragging ? 0.3 : 1,
  };
  return (
    <Animated.View
      {...panResponder.current.panHandlers}
      style={[
        panStyle,
        draggingStyle,
        { transform: pan.getTranslateTransform() },
      ]}
      onLayout={onLayout}
    >
      {children}
    </Animated.View>
  );
}

export default React.memo(DraggableItem);
