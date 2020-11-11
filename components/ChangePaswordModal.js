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

export default class ChangePaswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ["RENUNTA", "MODIFICA"],
      mailAddress: "",
      password: "",
      confirmedPassword: "",
      isPasswordConfirmed: true,
    };
  }

  closeModal = () => {
    this.props.closeModal();
  };

  resetPassword = async () => {
    console.log("CEVA");
    this.setState({ isPasswordConfirmed: true });
    if (this.state.password === this.state.confirmedPassword) {
      console.log("CORECT");
      this.closeModal();
      this.props.changePassword(this.state.password);
    } else {
      this.setState({ isPasswordConfirmed: false });
      console.log("INCORECT");
    }
    console.log(">>>>", this.state.isPasswordConfirmed);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.action}>
          <TextInput
            secureTextEntry
            placeholder="Introdu noua parola.."
            placeholderTextColor="black"
            style={styles.textInput}
            onChangeText={(password) => this.setState({ password })}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            secureTextEntry
            placeholder="Confirma parola.."
            placeholderTextColor="black"
            style={styles.textInput}
            onChangeText={(confirmedPassword) =>
              this.setState({ confirmedPassword })
            }
          />
        </View>
        {this.state.isPasswordConfirmed === true ? (
          <Text></Text>
        ) : (
          <Text style={{ fontWeight: "bold", fontSize: 15, color: "red" }}>
            Parolele nu coincid
          </Text>
        )}

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
