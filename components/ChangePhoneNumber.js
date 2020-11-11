import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default class ChangePhoneNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ["RENUNTA", "MODIFICA"],
      phoneNumber: "",
    };
  }

  closeModal = () => {
    this.props.closeModal();
  };

  changePhoneNumber = () => {
    this.props.changePhoneNumber(this.state.phoneNumber);
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Introdu noul numar de telefon.."
          placeholderTextColor="black"
          style={styles.textInput}
          multiline
          keyboardType="numeric"
          onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
        />
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
          <TouchableOpacity onPress={() => this.changePhoneNumber()}>
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
    backgroundColor: "white",
    borderRadius: 5,
    width: 300,
    alignItems: "center",
    padding: 10,
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
    marginTop: 10,
    width: 270,
    height: 37,
    borderWidth: 1.5,
    borderColor: "#93278f",
  },
});
