import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

import Modal from "react-native-modal";

export default class CancelAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ["Renunta", "Anuleaza"],
      editStatusModal: false,
      editClientFileModal: false,
      addBlacklistCountModal: false,
    };
  }

  closeModal = () => {
    this.props.closeModal();
  };

  cancelAppointment = () => {
    this.props.cancelAppointment();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Sigur vrei sa anulezi programarea?</Text>
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

          <TouchableOpacity onPress={() => this.cancelAppointment()}>
            <View style={styles.interval}>
              <Text style={styles.done}>{this.state.data[1]}</Text>
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
  infoText: {
    color: "#93278f",
    fontSize: 17,
    fontWeight: "bold",
    padding: 5,
  },
  interval: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 120,
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
  done: {
    color: "#93278f",
    fontSize: 17,
    fontWeight: "bold",
    padding: 5,
  },
});
