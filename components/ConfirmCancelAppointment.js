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

export default class ConfirmCancelAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ["NU", "DA"],
    };
  }

  closeModal = () => {
    this.props.closeModal();
  };

  cancelAppointment = () => {
    this.closeModal();
    this.props.cancelAppointmentModal();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Doriti sa anulati programarea?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => this.closeModal()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{this.state.data[0]}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.cancelAppointment()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{this.state.data[1]}</Text>
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
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    width: wp(90),
    alignItems: "center",
    justifyContent: "center",
    padding: hp(3),
  },
  button: {
    marginTop: hp(1),
    width: wp(20),
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
  buttonContainer: {
    // flex: 1,
    marginTop: hp(3),
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  infoText: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
  },
  textInput: {
    marginTop: 10,
    width: 270,
    height: 37,
    borderWidth: 1.5,
    borderColor: "#93278f",
  },
});
