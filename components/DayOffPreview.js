import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import Moment from "moment";

import ModifyDayOff from "./ModifyDayOff";

import Modal from "react-native-modal";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class DayOffPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  selectInterval = (item) => {
    this.props.modifyDayOff(item);
  };

  editStatus = () => {
    this.props.modifyDayOff(this.props.item);
  };

  toggleExpanded = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  render() {
    if (this.state.isExpanded) {
      return (
        <TouchableOpacity onPress={() => this.toggleExpanded()}>
          <View style={styles.containerExpanded}>
            <View style={styles.content}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.coloredText}>ZIUA</Text>
                <Text style={styles.text}>
                  {Moment(this.props.item.appointmentDate).format("dddd")}
                </Text>
                <Text style={styles.coloredText}>DATA</Text>
                <Text style={styles.text}>
                  {Moment(this.props.item.appointmentDate).format("DD-MM-YYYY")}
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  width: wp(10),
                  marginLeft: wp(35),
                  marginTop: hp(1),
                }}
                onPress={() => this.editStatus()}
              >
                <Image
                  source={require("../assets/cancelButton.png")}
                  style={{ resizeMode: "contain" }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.statusExpanded}>
              <Text style={styles.coloredText}>
                STATUS:
                <Text style={styles.text}> LIBER</Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => this.toggleExpanded()}>
          <View style={styles.container}>
            <View style={styles.content}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.coloredText}>ZIUA</Text>
                <Text style={styles.text}>
                  {Moment(this.props.item.appointmentDate).format("dddd")}
                </Text>
                <Text style={styles.coloredText}>DATA</Text>
                <Text style={styles.text}>
                  {Moment(this.props.item.appointmentDate).format("DD-MM-YYYY")}
                </Text>
              </View>
            </View>
            <View style={styles.status}>
              <Text style={styles.coloredText}>
                STATUS:
                <Text style={styles.text}> LIBER</Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}
/* <Text style={styles.firstLine}>
{" "}

</Text>
<Text style={styles.firstLine}>

</Text>
</View> */

const styles = StyleSheet.create({
  container: {
    marginTop: hp(3),
    width: wp(90),
    height: hp(15),
    backgroundColor: "#f2f2f2",
    borderRadius: hp(5),
  },
  buttonContainer: {
    marginTop: hp(2),
    flexDirection: "row",
    justifyContent: "space-around",
  },
  containerExpanded: {
    marginTop: hp(3),
    width: wp(90),
    height: hp(20),
    backgroundColor: "#f2f2f2",
    borderRadius: hp(5),
  },
  content: {
    flex: 3,
    padding: hp(3),
    // flexDirection: "row",
  },
  status: {
    flex: 4,
    backgroundColor: "#FFCC00",
    borderBottomLeftRadius: hp(5),
    borderBottomRightRadius: hp(5),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  statusExpanded: {
    flex: 2,
    backgroundColor: "#FFCC00",
    borderBottomLeftRadius: hp(5),
    borderBottomRightRadius: hp(5),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  coloredText: {
    color: "#AE0EFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  text: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: hp(1),
    textTransform: "uppercase",
  },
  statusText: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  dateText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: hp(1),
  },
});
