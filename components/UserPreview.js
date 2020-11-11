import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class UserPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigateToClient(this.props.item)}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.coloredText}>NUME</Text>
            <Text style={styles.text}>{this.props.item.firstName}</Text>

            <Text style={styles.coloredText}>TELEFON</Text>
            <Text style={styles.text}>{this.props.item.phoneNumber}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: hp(3),
    width: wp(90),
    height: hp(17),
    backgroundColor: "#f2f2f2",
    borderRadius: hp(5),
  },
  buttonContainer: {
    marginTop: hp(2),
    flexDirection: "row",
    justifyContent: "space-around",
  },
  containerExpanded: {
    marginTop: hp(3),
    width: wp(90),
    height: hp(36),
    backgroundColor: "#f2f2f2",
    borderRadius: hp(5),
  },
  content: {
    flex: 3,
    padding: hp(3),
  },
  status: {
    flex: 1,
    backgroundColor: "#FFCC00",
    borderBottomLeftRadius: hp(5),
    borderBottomRightRadius: hp(5),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  statusExpanded: {
    flex: 0.7,
    backgroundColor: "#FFCC00",
    borderBottomLeftRadius: hp(5),
    borderBottomRightRadius: hp(5),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  coloredText: {
    color: "#AE0EFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  text: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: hp(1),
    textTransform: "uppercase",
  },
  statusText: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  dateText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: hp(1),
  },
});
