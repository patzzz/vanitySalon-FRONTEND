import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  Animated,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { FlatList } from "react-native";

export default class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  selectService = (item) => {
    this.props.selectInterval(item);
  };

  renderRow = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => this.selectService(item)}>
        <View style={{ flexDirection: "row", marginTop: hp(2) }}>
          <Text style={styles.text}>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          height: hp(82),
        }}
      >
        <View style={styles.container}>
          {this.props.intervals.length == 0 ? (
            <Text style={styles.text}>INDISPONIBIL</Text>
          ) : (
            <FlatList
              data={this.props.intervals}
              renderItem={this.renderRow}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
    letterSpacing: 2,
  },
  button: {
    marginTop: hp(2),
    width: wp(75),
    height: hp(7),
    backgroundColor: "#FFCC00",
    borderRadius: hp(50),
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    letterSpacing: 2,
  },
  selection: {
    marginTop: hp(2),
  },
});
