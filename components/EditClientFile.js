import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";

import Modal from "react-native-modal";

import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

import EditAppointmentStatus from "./EditAppointmentStatus";

export default class EditClientFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientFile: "",
    };
  }

  closeModal = () => {
    this.props.closeModal();
  };

  editClientFile = () => {
    this.props.closeModal();
    this.props.editClientFile(this.state.clientFile);
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Introdu date in fisa client.."
          placeholderTextColor="black"
          style={styles.textInput}
          multiline
          onChangeText={(clientFile) => this.setState({ clientFile })}
        />

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity onPress={() => this.closeModal()}>
            <View style={styles.interval}>
              <Text style={styles.text}>Renunta</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.editClientFile()}>
            <View style={styles.interval}>
              <Text style={styles.text}>Modifica</Text>
            </View>
          </TouchableOpacity>
        </View>

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
          <EditAppointmentStatus closeModal={this.toggleEditStatusModal} />
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
    width: heightPercentageToDP(50),
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
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    width: widthPercentageToDP(45),
    height: heightPercentageToDP(7),
    borderWidth: 1.5,
    borderColor: "#93278f",
  },
  textInput: {
    width: 240,
    height: 200,
    borderWidth: 1.5,
    borderColor: "#93278f",
  },
});
