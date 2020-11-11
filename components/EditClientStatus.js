import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

import Modal from "react-native-modal";

export default class EditClientStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ["BLACKLIST", "NO BLACKLIST", "RENUNTA"],
      editStatusModal: false,
    };
  }

  closeModal = () => {
    this.props.closeModal();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <View style={styles.interval}>
            <Text style={styles.blacklist}>{this.state.data[0]}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.interval}>
            <Text style={styles.noBlacklist}>{this.state.data[1]}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.closeModal()}>
          <View style={styles.interval}>
            <Text style={styles.text}>{this.state.data[2]}</Text>
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
    width: 200,
    alignItems: "center",
    padding: 10,
  },
  interval: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 162,
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
  blacklist: {
    color: "red",
    fontSize: 17,
    fontWeight: "bold",
    padding: 5,
  },
  noBlacklist: {
    color: "green",
    fontSize: 17,
    fontWeight: "bold",
    padding: 5,
  },
});
