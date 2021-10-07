import React from "react";
import { useState } from "react";
import { View } from "react-native";

const Counter = () => {
    const [count, setCount] = useState(0)

    return (
        <View> 
            {count}
        </View>
    )
}


export default Counter