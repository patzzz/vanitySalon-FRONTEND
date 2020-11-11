import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

import Moment from "moment";
import Modal from "react-native-modal";

import EditAppointmentStatus from "./EditAppointmentStatus";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import CancelAppointmentModal from "./CancelAppointmentModal";

export default class AppointmentPreviewToCancel extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }

  toggleModal = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  selectAppointment = (item) => {
    this.props.goToAppointmentDetails(item);
  };

  cancelAppointment = () => {
    this.props.cancelAppointment(this.props.item);
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.toggleModal()}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.firstLine}>
              Serviciul:{" "}
              {this.props.item.service === "tuns_barbat" ? (
                <Text style={styles.firstLine}>Tuns barbat</Text>
              ) : null}
              {this.props.item.service === "tuns_femeie" ? (
                <Text style={styles.firstLine}>Tuns femeie</Text>
              ) : null}
              {this.props.item.service === "tuns_copil" ? (
                <Text style={styles.firstLine}>Tuns copil</Text>
              ) : null}
              {this.props.item.service === "spalat_barbat" ? (
                <Text style={styles.firstLine}>Spalat barbat</Text>
              ) : null}
              {this.props.item.service === "spalat_femeie" ? (
                <Text style={styles.firstLine}>Spalat femeie</Text>
              ) : null}
              {this.props.item.service === "coafat" ? (
                <Text style={styles.firstLine}>Coafat</Text>
              ) : null}
              {this.props.item.service === "vopsit_radacina" ? (
                <Text style={styles.firstLine}>Vopsit radacini</Text>
              ) : null}
              {this.props.item.service === "vopsit_uniform" ? (
                <Text style={styles.firstLine}>Vopsit uniform</Text>
              ) : null}
              {this.props.item.service === "balayage" ? (
                <Text style={styles.firstLine}>Balayage</Text>
              ) : null}
              {this.props.item.service === "corectare_culoare" ? (
                <Text style={styles.firstLine}>Corectare culoare</Text>
              ) : null}
              {this.props.item.service === "schimbare_culoare" ? (
                <Text style={styles.firstLine}>Schimbare culoare</Text>
              ) : null}
            </Text>
            <View style={{ flexDirection: "row" }}>
              {this.props.item.status === "Confirmata" ? (
                <Text style={styles.confirmed}>{this.props.item.status}</Text>
              ) : (
                <Text></Text>
              )}
              {this.props.item.status === "Anulata" ? (
                <Text style={styles.cancelled}>{this.props.item.status}</Text>
              ) : (
                <Text></Text>
              )}
              {this.props.item.status === "Astept confirmare" ? (
                <Text style={styles.pending}>{this.props.item.status}</Text>
              ) : (
                <Text></Text>
              )}
              {this.props.item.status === "Efectuata" ? (
                <Text style={styles.done}>{this.props.item.status}</Text>
              ) : (
                <Text></Text>
              )}
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.firstLine}>
              Data:{" "}
              {Moment(this.props.item.appointmentDate).format("DD/MM/YYYY")}
            </Text>
            <Text style={styles.firstLine}>
              Ora: {this.props.item.appointmentInterval}
            </Text>
          </View>

          {this.props.item.clientMessage.length == 0 ? (
            <View></View>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.secondLine}>Mesaj: </Text>
              <View style={{ width: "85%" }}>
                <Text style={styles.text}>{this.props.item.clientMessage}</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
        <Modal
          isVisible={this.state.isVisible}
          onBackdropPress={this.toggleModal}
          backdropColor="black"
          backdropOpacity={0.3}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <CancelAppointmentModal
            closeModal={this.toggleModal}
            cancelAppointment={this.cancelAppointment}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#eee6fa",
    borderWidth: 1.5,
    borderColor: "#93278f",
    borderRadius: 5,
    // alignItems: "center",
    padding: widthPercentageToDP(2.5),
    marginBottom: heightPercentageToDP(1.5),
    width: widthPercentageToDP(90),
  },
  text: {
    color: "black",
    fontSize: 15,
    // fontWeight: "bold",
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
    fontSize: 15,
    fontWeight: "bold",
  },
  secondLine: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
});
