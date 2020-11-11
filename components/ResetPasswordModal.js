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

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ["RENUNTA", "MODIFICA"],
      mailAddress: "",
    };
  }

  closeModal = () => {
    this.props.closeModal();
  };

  resetPassword = () => {
    this.closeModal();
    this.props.changePassword(this.state.mailAddress);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>
          Pentru a reseta parola avem nevoie de adresa ta de e-mail. Noua ta
          parola v-a fi trimisa printr-un mail.
        </Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Introdu adresa de mail.."
            placeholderTextColor="black"
            style={styles.textInput}
            onChangeText={(mailAddress) => this.setState({ mailAddress })}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <TouchableOpacity onPress={() => this.closeModal()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{this.state.data[0]}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.resetPassword()}>
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
    backgroundColor: "white",
    borderRadius: 5,
    width: wp(90),
    alignItems: "center",
    justifyContent: "center",
    padding: hp(3),
  },
  infoText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
  },
  interval: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 130,
    height: 37,
    borderWidth: 1.5,
    borderColor: "#93278f",
  },
  text: {
    color: "black",
    fontSize: 17,
    fontWeight: "bold",
    padding: 5,
  },
  textInput: {
    flex: 1,
    marginTop: hp(1),
    paddingBottom: hp(1),
    fontSize: 16,
    borderBottomWidth: 1,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  action: {
    flexDirection: "row",
    borderBottomColor: "black",
    marginTop: hp(1),
    marginBottom: hp(1),
  },
  button: {
    marginTop: hp(1),
    width: wp(35),
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
});
