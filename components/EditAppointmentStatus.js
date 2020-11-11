import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

import Modal from "react-native-modal";

import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

export default class EditAppointmentStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ["Confirmata", "Efectuata", "Anulata", "Renunta"],
      editStatusModal: false,
      editClientFileModal: false,
      addBlacklistCountModal: false,
    };
  }

  closeModal = () => {
    this.props.closeModal();
  };

  confirmAppointment = () => {
    this.props.confirmAppointment();
  };

  accomplishedAppointment = () => {
    this.props.accomplishedAppointment();
  };

  cancelAppointment = () => {
    this.props.cancelAppointment();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.confirmAppointment()}>
          <View style={styles.interval}>
            <Text style={styles.confirmed}>{this.state.data[0]}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.accomplishedAppointment()}>
          <View style={styles.interval}>
            <Text style={styles.done}>{this.state.data[1]}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.cancelAppointment()}>
          <View style={styles.interval}>
            <Text style={styles.cancelled}>{this.state.data[2]}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.closeModal()}>
          <View style={styles.interval}>
            <Text style={styles.text}>{this.state.data[3]}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "white",
    borderRadius: 5,
    width: heightPercentageToDP(30),
    alignItems: "center",
    padding: 10,
  },
  interval: {
    marginTop: heightPercentageToDP(2),
    justifyContent: "center",
    alignItems: "center",
    width: widthPercentageToDP(45),
    height: heightPercentageToDP(7),
    borderWidth: 1.5,
    borderColor: "#93278f",
  },
  text: {
    color: "black",
    fontSize: 17,
    fontWeight: "bold",
    padding: heightPercentageToDP(1),
  },
  cancel: {
    marginTop: 30,
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelled: {
    color: "red",
    fontSize: 17,
    fontWeight: "bold",
    padding: 5,
  },
  done: {
    color: "#4618ed",
    fontSize: 17,
    fontWeight: "bold",
    padding: 5,
  },
  confirmed: {
    color: "green",
    fontSize: 17,
    fontWeight: "bold",
    padding: 5,
  },
});
