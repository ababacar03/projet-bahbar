import { Canvas, Path, Skia, SweepGradient } from "@shopify/react-native-skia"
import { useEffect, useMemo, useRef } from "react";
import { Animated } from "react-native";
import { Easing } from "react-native-reanimated";

export default function LoadingSpinner() {
  const canvasSize = 64;
  const strokeWidth = 8;
  const circleRadius = (canvasSize - strokeWidth) / 2;
  
  const circlePath = useMemo(() => {
    const skPath = Skia.Path.Make();
    skPath.addCircle(canvasSize / 2,  canvasSize / 2, circleRadius);
    return skPath;
  }, []);

  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.linear
      })
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0rad', `${-2 * Math.PI}rad`],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <Canvas style={{ width: canvasSize, height: canvasSize }}>
        <Path 
          path={circlePath} 
          color={"purple"} 
          style={"stroke"} 
          strokeWidth={strokeWidth} 
          start={0.1} 
          end={0.969} 
          strokeCap={"round"}
        >
          <SweepGradient
            c={{
              x: canvasSize / 2,
              y: canvasSize / 2,
            }}
            colors={[
              '#FFFFFF',
              '#FFFFFF',
              '#e9cfff',
              '#8E4EC6',
              '#48295C',
              '#48295C',
              '#48295C',
              '#48295C'
            ]}
          />
        </Path>
      </Canvas>
    </Animated.View>
  );
}