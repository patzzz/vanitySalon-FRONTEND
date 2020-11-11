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

import EditAppointmentStatus from "./EditAppointmentStatus";
import EditClientFile from "./EditClientFile";

export default class EditAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        "Modifica status",
        "Modifica fisa client",
        "+1 blacklistCount",
        "Renunta",
      ],
      editStatusModal: false,
      editClientFileModal: false,
      addBlacklistCountModal: false,
    };
  }

  closeModal = () => {
    this.props.closeModal();
  };

  toggleEditStatusModal = () => {
    this.setState({ editStatusModal: !this.state.editStatusModal });
  };

  toggleEditClientFileModal = () => {
    this.setState({ editClientFileModal: !this.state.editClientFileModal });
  };

  confirmAppointment = () => {
    this.toggleEditStatusModal();
    this.props.confirmAppointment();
    this.props.closeModal();
  };

  accomplishedAppointment = () => {
    this.toggleEditStatusModal();
    this.props.accomplishedAppointment();
    this.props.closeModal();
  };

  cancelAppointment = () => {
    this.toggleEditStatusModal();
    this.props.cancelAppointment();
    this.props.closeModal();
  };

  editClientFile = (file) => {
    this.props.closeModal();
    this.props.editClientFile(file);
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.toggleEditStatusModal()}>
          <View style={styles.interval}>
            <Text style={styles.text}>{this.state.data[0]}</Text>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => this.toggleEditClientFileModal()}>
          <View style={styles.interval}>
            <Text style={styles.text}>{this.state.data[1]}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.interval}>
            <Text style={styles.text}>{this.state.data[2]}</Text>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={() => this.closeModal()}>
          <View style={styles.interval}>
            <Text style={styles.text}>{this.state.data[3]}</Text>
          </View>
        </TouchableOpacity>

        <Modal
          isVisible={this.state.editStatusModal}
          onBackdropPress={this.toggleEditStatusModal}
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
          <EditAppointmentStatus
            closeModal={this.toggleEditStatusModal}
            confirmAppointment={this.confirmAppointment}
            accomplishedAppointment={this.accomplishedAppointment}
            cancelAppointment={this.cancelAppointment}
          />
        </Modal>

        <Modal
          isVisible={this.state.editClientFileModal}
          onBackdropPress={this.toggleEditClientFileModal}
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
          <EditClientFile
            closeModal={this.toggleEditClientFileModal}
            editClientFile={this.editClientFile}
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
    width: heightPercentageToDP(30),
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
});
