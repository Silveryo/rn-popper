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

const { UIManager } = NativeModules;
const windowWidth = Dimensions.get("window").width;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const Animation = () => {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [counter, setCounter] = useState(0);
  const [color, setColor] = useState("red");
  const [shape, setShape] = useState("square");

  const [obsah, setObsah] = useState(0);

  const _onPress = () => {
    // Animate the update
    LayoutAnimation.spring();
    setWidth(width + Math.random() * (100 - 15));
    setHeight(height + Math.random() * (100 - 15));

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
    case 'circle':
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={_onPress}>
            <ShapeCircle width={width} height={height} color={color} />
          </TouchableOpacity>
          <View style={styles.bottom}>
            <Text style={styles.counter}>Total pops: {counter}</Text>
          </View>
        </View>
      );
    case 'square':
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={_onPress}>
            <ShapeSquare width={width} height={height} color={color} />
          </TouchableOpacity>
          <View style={styles.bottom}>
            <Text style={styles.counter}>Total pops: {counter}</Text>
          </View>
        </View>
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

//TODO: return a random styles shape
const getRandomShape = () => {
  const shapes = ['square', 'circle']
  return shapes[Math.floor(Math.random() * shapes.length)];
};

interface ShapeProps {
  width: number;
  height: number;
  color: string;
}

const ShapeCircle: React.FC<ShapeProps> = ({ width, height, color }) => {
  return (
    <View
      style={{
        borderRadius:
          Math.round(
            Dimensions.get("window").width + Dimensions.get("window").height
          ) / 2,
        width: width / 2,
        height: height / 2,
        backgroundColor: color,
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
};

const ShapeSquare: React.FC<ShapeProps> = ({ width, height, color }) => {
  return (
    <View
      style={[
        styles.box,
        { width: width, height: height, backgroundColor: color },
      ]}
    />
  );
};

//TODO: pytagoras nebo tak
const ShapeTriangle: React.FC<ShapeProps> = ({ width, height, color }) => {
  return null;
};

const styles = StyleSheet.create({
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
