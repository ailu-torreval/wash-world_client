import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
} from "react-native";

import { useGetExtras } from "../queries/extras.hooks";
import { Extra } from "../entities/Extra";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEditWashType, useGetWashTypes } from "../queries/wash-types.hooks";
import { Venue } from "../entities/Venue";
import { WashType } from "../entities/WashType";
import WashCard from "../components/WashCard";
import { Button, Icon, Input } from "@rneui/themed";

const ServicesScreen: React.FC = () => {
  const { data: washTypes, isLoading, isError } = useGetWashTypes();
  const [modalVisible, setModalVisible] = useState(false);
  const editWashTypeMutation = useEditWashType();
  const [selectedWash, setSelectedWash] = useState<WashType>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    points_reward: 0,
    icon: "string;",
  });

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0CEF78" />;
  }

  const openModal = (washType: WashType) => {
    setSelectedWash(washType);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const saveChanges = () => {
    console.log("DFF",selectedWash)
    if (selectedWash) {
      editWashTypeMutation.mutate(selectedWash);
    }
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>View and edit services</Text>
      <FlatList
        data={washTypes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <WashCard washType={item} action={() => openModal(item)} />
        )}
      />
      <Modal visible={modalVisible}  onRequestClose={closeModal}    animationType="slide"      transparent={true} >
        <View style={styles.modalContent}>

        <Input
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputContainer}
          label="New Price"
          labelStyle={styles.labelStyle}
          labelProps={{}}
          leftIcon={<Icon name="payments" size={20} />}
          leftIconContainerStyle={styles.iconContainer}
          rightIconContainerStyle={styles.iconContainer}
          onChangeText={(value) =>
            setSelectedWash((prevState) => ({
              ...prevState,
              price: Number(value)
            }))
          }
          value={selectedWash?.price.toString()}
          keyboardType="numeric"
        />
        <View style={styles.btnGrid}>

        <Button style={styles.btn} type="outline" color="#FF0505" title="Cancel" onPress={closeModal} />
        <Button style={styles.btn} title="Save Changes" onPress={saveChanges} />
        </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ServicesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
    // alignItems: "center",
    padding: 15,
  },
  title: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 22,
    paddingVertical: 10,
    marginTop: 40,
    lineHeight: 30,
  },
  subtitle: {
    color: "#fff",
    fontSize: 18,
    paddingVertical: 15,
    textAlign: "right",
  },
  inputContainer: {},
  labelStyle: {
    fontWeight: "bold",
  },
  iconContainer: {
    marginRight: 10,
  },
  btnGrid: {
    display: "flex",
    flexDirection: "row",
  },
  modalContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50,
    backgroundColor: '#323232',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btn: {
    margin: 10, // adjust this value as needed
  },
});
