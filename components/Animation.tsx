import React, { useState } from "react";
import {
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
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
  const [shape, setShape] = useState("box");

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

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={_onPress}>
        <View
          style={[
            styles.box,
            { width: width, height: height, backgroundColor: color },
          ]}
        />
      </TouchableOpacity>
      <View style={styles.bottom}>
        <Text style={styles.counter}>Total pops: {counter}</Text>
      </View>
    </View>
  );
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
  return "box";
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
