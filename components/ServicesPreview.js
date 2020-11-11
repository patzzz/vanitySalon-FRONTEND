import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class ServicesPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.item.title == "LOG OUT") {
      return (
        <View style={styles.containerLogOut}>
          <TouchableOpacity
            onPress={() => this.props.navigateOn(this.props.item)}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.text}>{this.props.item.title}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => this.props.navigateOn(this.props.item)}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.text}>{this.props.item.title}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(2),
    width: wp(75),
    height: hp(7),
    backgroundColor: "#FFCC00",
    borderRadius: hp(50),
    justifyContent: "center",
    alignItems: "center",
  },
  containerLogOut: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(2),
    width: wp(75),
    height: hp(7),
    backgroundColor: "#f2f2f2",
    borderRadius: hp(50),
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    // letterSpacing: widthPercentageToDP(0.5),
    letterSpacing: 1.5,
  },
});
