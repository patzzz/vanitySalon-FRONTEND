import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";

import Modal from "react-native-modal";

import CancelAppointment from "../../components/CancelAppointment";

export default class UserAppointmentDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        appointmentDate: "2020-06-10",
        appointmentInterval: "13:00 - 13:30",
        appointmentService: "tuns_barbati (30min)",
        appointmentStatus: "Confirmata",
        appointmentMessage: "Mesaj de la client",
        user: {
          firstName: "Marian",
          lastName: "Ciobanu",
          phoneNumber: "0726553441",
          dateOfBirth: "11-03-1991",
        },
        blacklistCount: 2,
        clientFile:
          "file file file file file file file file file file file file file file file file file file file file file file file file file file file file file file file file ",
      },
      cancelAppointmentModal: false,
    };
  }

  toggleCancelAppointmentModal = () => {
    this.setState({
      cancelAppointmentModal: !this.state.cancelAppointmentModal,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <ImageBackground
            source={require("../../assets/header.png")}
            style={styles.imageBackground}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 30,
              }}
            >
              Detalii despre programare
            </Text>
          </ImageBackground>
        </View>
        <View style={styles.footer}>
          <View style={styles.appointmentDetails}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.firstLine}>Data: </Text>
              <Text style={styles.firstLine}>
                {this.state.data.appointmentDate}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.firstLine}>Ora: </Text>
              <Text style={styles.firstLine}>
                {this.state.data.appointmentInterval}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.firstLine}>Serviciu: </Text>
              <Text style={styles.firstLine}>
                {this.state.data.appointmentService}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.firstLine}>Status programare: </Text>
                {this.state.data.appointmentStatus === "Confirmata" ? (
                  <Text style={styles.confirmed}>
                    {this.state.data.appointmentStatus}
                  </Text>
                ) : (
                  <Text></Text>
                )}
                {this.state.data.appointmentStatus === "Anulata" ? (
                  <Text style={styles.cancelled}>
                    {this.state.data.appointmentStatus}
                  </Text>
                ) : (
                  <Text></Text>
                )}
                {this.state.data.appointmentStatus === "Astept confirmare" ? (
                  <Text style={styles.pending}>
                    {this.state.data.appointmentStatus}
                  </Text>
                ) : (
                  <Text></Text>
                )}
                {this.state.data.appointmentStatus === "Efectuata" ? (
                  <Text style={styles.done}>
                    {this.state.data.appointmentStatus}
                  </Text>
                ) : (
                  <Text></Text>
                )}
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text style={styles.secondLine}>Mesaj: </Text>
              <Text style={styles.secondLine}>
                {this.state.data.appointmentMessage}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={() => this.toggleCancelAppointmentModal()}>
          <View style={styles.button_container}>
            <Animated.View
              style={[
                styles.animation,
                {
                  width: "90%",
                  marginBottom: 20,
                },
              ]}
            >
              <Text style={styles.textLogin}>Anuleaza programarea</Text>
            </Animated.View>
          </View>
        </TouchableOpacity>
        <Modal
          isVisible={this.state.cancelAppointmentModal}
          onBackdropPress={this.toggleCancelAppointmentModal}
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
          <CancelAppointment closeModal={this.toggleCancelAppointmentModal} />
        </Modal>
      </View>
    );
  }
}

const width = Dimensions.get("screen").width;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  appointmentDetails: {
    flex: 1,
    // backgroundColor: "#eee6fa",
    borderRadius: 5,
    // alignItems: "center",
    padding: 10,
    marginBottom: 8,
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 2,
    padding: 15,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  clientFlile: {
    width: "80%",
    color: "black",
  },
  confirmed: {
    color: "green",
    fontSize: 15,
    fontWeight: "bold",
  },
  cancelled: {
    color: "red",
    fontSize: 15,
    fontWeight: "bold",
  },
  pending: {
    color: "#882b90",
    fontSize: 15,
    fontWeight: "bold",
  },
  done: {
    color: "#4618ed",
    fontSize: 15,
    fontWeight: "bold",
  },
  firstLine: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  action: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  textInput: {
    flex: 1,
    // marginTop: 5,
    paddingBottom: 5,
    color: "gray",
  },
  button_container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  secondLine: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  blacklistCount: {
    fontWeight: "bold",
    color: "red",
    fontSize: 15,
  },
  button_container: {
    alignItems: "center",
    justifyContent: "center",
  },
  textLogin: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  animation: {
    backgroundColor: "#ae03ff",
    paddingVertical: 10,
    marginTop: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  modalStyle: {
    alignItems: "center",
  },
});
