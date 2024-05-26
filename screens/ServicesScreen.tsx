import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  StyleSheet,
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

const ServicesScreen: React.FC = () => {
  const { data: washTypes, isLoading, isError } = useGetWashTypes();
  const [modalVisible, setModalVisible] = useState(false);
  const [editedWashType, setEditedWashType] = useState(null);
  const editWashTypeMutation = useEditWashType();

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0CEF78" />;
  }


  async function editWashType(washType: WashType) {
    console.log(washType)
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        View and edit services
      </Text>
      <FlatList
          data={washTypes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <WashCard washType={item} action={()=> editWashType(item)} />}
        />
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
});
