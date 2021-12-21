import React from "react";
import { View, Dimensions } from "react-native";
import { styles } from "./Animation";

interface ShapeProps {
  width: number;
  height: number;
  color: string;
}

//TODO: nedělá to kruh, ale elipsu
export const ShapeCircle: React.FC<ShapeProps> = ({ width, height, color }) => {
  return (
    <View
      style={{
        borderRadius:
          Math.round(
            Dimensions.get("window").width + Dimensions.get("window").height
          ) / 2,
        width: width,
        height: height,
        backgroundColor: color,
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
};
export const ShapeSquare: React.FC<ShapeProps> = ({ width, height, color }) => {
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
