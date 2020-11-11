import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  Animated,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Moment from "moment";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FlatList } from "react-native";

export default class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          serviceText: "Tuns barbati (30min)",
          serviceToSend: "tuns_barbat",
        },
        {
          serviceText: "Tuns femei (1.5h)",
          serviceToSend: "tuns_femeie",
        },
        {
          serviceText: "Tuns copil (30min)",
          serviceToSend: "tuns_copil",
        },
        {
          serviceText: "Spalat barbati (10min)",
          serviceToSend: "spalat_barbat",
        },
        {
          serviceText: "Spalat femei (20min)",
          serviceToSend: "spalat_femeie",
        },
        {
          serviceText: "Coafat (1.5h)",
          serviceToSend: "coafat",
        },
        {
          serviceText: "Vopsit radacini (2.5h)",
          serviceToSend: "vopsit_radacina",
        },
        {
          serviceText: "Vopsit uniform (3h)",
          serviceToSend: "vopsit_uniform",
        },
        {
          serviceText: "Balayage (4h)",
          serviceToSend: "balayage",
        },
        {
          serviceText: "Corectare de culoare (4h)",
          serviceToSend: "corectare_culoare",
        },
        {
          serviceText: "Schimbare de culoare (6h)",
          serviceToSend: "schimbare_culoare",
        },
      ],
    };
  }

  renderRow = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => this.props.selectService(item)}>
        <View style={{ flexDirection: "row", marginTop: hp(2) }}>
          <Text style={styles.text}>{item.serviceText}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          height: hp(82),
        }}
      >
        <View style={styles.container}>
          <FlatList
            data={this.state.data}
            renderItem={this.renderRow}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
    letterSpacing: 2,
  },
  button: {
    marginTop: hp(2),
    width: wp(75),
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
  selection: {
    marginTop: hp(2),
  },
});
