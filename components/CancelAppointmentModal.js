import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

import Moment from "moment";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

export default class CancelAppointmentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  closeModal = () => {
    this.props.closeModal();
  };

  editStatus = () => {
    this.closeModal();
    this.props.cancelAppointment();
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 5,
          width: wp(70),
          alignItems: "center",
          padding: hp(3),
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 16,
            fontWeight: "bold",
            padding: 5,
          }}
        >
          Doresti sa anulezi programarea?
        </Text>
        <View style={{ flexDirection: "row", marginTop: hp(2) }}>
          <TouchableOpacity onPress={() => this.closeModal()}>
            <View
              style={{
                borderWidth: 2,
                height: hp(5),
                width: wp(20),
                alignItems: "center",
                justifyContent: "center",
                borderColor: "#93278f",
                marginRight: wp(3),
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  fontWeight: "bold",
                  padding: 5,
                }}
              >
                NU
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.editStatus()}>
            <View
              style={{
                borderWidth: 2,
                height: hp(5),
                width: wp(20),
                alignItems: "center",
                justifyContent: "center",
                borderColor: "#93278f",
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  fontWeight: "bold",
                  padding: 5,
                }}
              >
                DA
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#eee6fa",
    borderWidth: 1.5,
    borderColor: "#93278f",
    borderRadius: 5,
    // alignItems: "center",
    padding: 10,
    marginBottom: 8,
  },

  firstLine: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  OFF: {
    color: "#93278f",
    fontSize: 16,
    fontWeight: "bold",
  },
});
