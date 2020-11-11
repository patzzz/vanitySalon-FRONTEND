import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class LogoutAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ["NU", "DA"],
    };
  }

  closeModal = () => {
    this.props.closeModal();
  };

  logout = async () => {
    console.log("LOGOUT ADMIN");
    this.props.logoutAdmin();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Vrei sa te deloghezi din aplicatie?</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <TouchableOpacity onPress={() => this.closeModal()}>
            <View style={styles.interval}>
              <Text style={styles.text}>{this.state.data[0]}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.logout()}>
            <View style={styles.interval}>
              <Text style={styles.text}>{this.state.data[1]}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fbfbfb",
    borderRadius: hp(2),
    width: wp(90),
    alignItems: "center",
    padding: hp(2),
  },
  interval: {
    marginTop: hp(2),
    justifyContent: "center",
    alignItems: "center",
    width: wp(25),
    height: hp(6),
    borderWidth: 1.5,
    borderColor: "#93278f",
    borderRadius: hp(2),
  },
  infoText: {
    color: "#93278f",
    fontSize: 17,
    fontWeight: "bold",
    padding: 5,
  },
  text: {
    color: "black",
    fontSize: 17,
    fontWeight: "bold",
    padding: 5,
  },
  textInput: {
    marginTop: 10,
    width: 270,
    height: 37,
    borderWidth: 1.5,
    borderColor: "#93278f",
  },
});
