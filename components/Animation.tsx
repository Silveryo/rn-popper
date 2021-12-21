import React, { useState } from "react";
import {
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import { ShapeCircle, ShapeSquare } from "./ShapeProps";

const { UIManager } = NativeModules;
const windowWidth = Dimensions.get("window").width;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const Animation = () => {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [counter, setCounter] = useState(0);
  const [color, setColor] = useState(getRandomColor());
  const [shape, setShape] = useState(getRandomShape());

  const [area, setArea] = useState(getArea(width, height, shape));

  const _onPress = () => {
    // Animate the update
    LayoutAnimation.spring();
    setWidth(width + Math.floor(Math.random() * (100 - 15)));
    setHeight(height + Math.floor(Math.random() * (100 - 15)));
    setArea(getArea(width, height, shape));
    console.log(area);

    // Pop the element
    if (width >= windowWidth || height >= windowWidth) {
      setWidth(100);
      setHeight(100);
      setCounter(counter + 1);

      setColor(getRandomColor());
      setShape(getRandomShape());
    }
  };

  switch (shape) {
    case "circle":
      return (
        <>
          <View style={styles.container}>
            <TouchableOpacity onPress={_onPress}>
              <ShapeCircle width={width} height={height} color={color} />
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
            <Text style={styles.counter}>Total pops: {counter}</Text>
            <Text style={styles.counter}>
              Width: {width}pt Height: {height}pt Area: {area}pt
            </Text>
          </View>
        </>
      );
    case "square":
      return (
        <>
          <View style={styles.container}>
            <TouchableOpacity onPress={_onPress}>
              <ShapeSquare width={width} height={height} color={color} />
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
            <Text style={styles.counter}>Total pops: {counter}</Text>
            <Text style={styles.counter}>
              Width: {width}pt Height: {height}pt Area: {area}pt
            </Text>
          </View>
        </>
      );
  }
};

const getRandomColor = () => {
  return (
    "rgb(" +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    ")"
  );
};

const getRandomShape = () => {
  const shapes = ["square", "circle"];
  return shapes[Math.floor(Math.random() * shapes.length)];
};

const getArea = (width: number, height: number, shape: string): number => {
  switch (shape) {
    case "square":
      return Math.floor(width * height);
    case "circle":
      return Math.floor(Math.PI * width * height);
    default:
      return 0;
  }
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: "red",
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    marginBottom: 44,
  },
  /**
   * @deprecated button, buttonText: potentially used again
   */
  button: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  counter: {
    color: "#000000",
    fontWeight: "bold",
  },
});

export default Animation;
