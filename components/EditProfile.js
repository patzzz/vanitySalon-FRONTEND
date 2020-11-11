import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

import Modal from "react-native-modal";

import EditAppointmentStatus from "./EditAppointmentStatus";
import EditClientFile from "./EditClientFile";
import ChangePassword from "./ChangePassword";
import ChangePhoneNumber from "./ChangePhoneNumber";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ["Modifica parola", "Modifica numar telefon", "Renunta"],
      editPasswordModal: false,
      editPhoneNumberModal: false,
    };
  }

  closeModal = () => {
    this.props.closeModal();
  };

  toggleChangePasswordModal = () => {
    this.setState({ editPasswordModal: !this.state.editPasswordModal });
  };

  toggleChangePhoneNumberModal = () => {
    this.setState({ editPhoneNumberModal: !this.state.editPhoneNumberModal });
  };

  changePhoneNumber = (phoneNumber) => {
    this.props.changePhoneNumber(phoneNumber);
    this.toggleChangePhoneNumberModal();
    this.closeModal();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.toggleChangePasswordModal()}>
          <View style={styles.interval}>
            <Text style={styles.text}>{this.state.data[0]}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.toggleChangePhoneNumberModal()}>
          <View style={styles.interval}>
            <Text style={styles.text}>{this.state.data[1]}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.closeModal()}>
          <View style={styles.interval}>
            <Text style={styles.text}>{this.state.data[2]}</Text>
          </View>
        </TouchableOpacity>

        <Modal
          isVisible={this.state.editPasswordModal}
          onBackdropPress={this.toggleChangePasswordModal}
          backdropColor="black"
          backdropOpacity={0.3}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
          style={styles.modalPasswordStyle}
        >
          <ChangePassword closeModal={this.toggleChangePasswordModal} />
        </Modal>

        <Modal
          isVisible={this.state.editPhoneNumberModal}
          onBackdropPress={this.toggleChangePhoneNumberModal}
          backdropColor="black"
          backdropOpacity={0.3}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
          style={styles.modalStyle}
        >
          <ChangePhoneNumber
            closeModal={this.toggleChangePhoneNumberModal}
            changePhoneNumber={this.changePhoneNumber}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "white",
    borderRadius: 5,
    width: 200,
    alignItems: "center",
    padding: 10,
  },
  text: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    padding: 5,
  },
  cancel: {
    marginTop: 30,
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalPasswordStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  interval: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 182,
    height: 37,
    borderWidth: 1.5,
    borderColor: "#93278f",
  },
});
