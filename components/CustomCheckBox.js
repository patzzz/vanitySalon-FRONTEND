import React, { useState, useEffect, useReducer } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const Notice = (props) => {
  const { isChecked, item, setComorbidity } = props;

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const handleOnPress = (bolean) => {
    setComorbidity(bolean);
    forceUpdate();
  };

  return (
    <View>
      {isChecked === true ? (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => handleOnPress(false)}
          >
            <Image
              source={require("../assets/img/checked.png")}
              style={{
                width: wp(5.5),
                height: wp(5.5),
                resizeMode: "contain",
                marginRight: 10,
              }}
            />
            <Text
              style={{ fontSize: 15, fontWeight: "bold", color: "#2D2D59" }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => handleOnPress(true)}
          >
            <Image
              source={require("../assets/img/unchecked.png")}
              style={{
                width: wp(5.5),
                height: wp(5.5),
                resizeMode: "contain",
                marginRight: 10,
              }}
            />
            <Text
              style={{ fontSize: 15, fontWeight: "bold", color: "#2D2D59" }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Notice;
