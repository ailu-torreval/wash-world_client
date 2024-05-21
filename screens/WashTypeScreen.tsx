import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useGetWashTypes } from "../queries/wash-types.hooks";
import WashCard from "../components/WashCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { updateInvoiceDto } from "../store/invoiceSlice";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WashType } from "../entities/WashType";

type Props = NativeStackScreenProps<RootStackParamList, "chooseWashType">;



const WashTypeScreen:React.FC<Props> = ({ navigation }) => {
  const { data: washTypes, isLoading, isError } = useGetWashTypes();
  const dispatch = useDispatch<AppDispatch>();
  const currentInvoice = useSelector((state: RootState)=> state.invoice.invoiceDto);


  if (isLoading) {
    return <ActivityIndicator size="large" color="#0CEF78" />;
  
}

  if (isError) {
    return <Text>Error occurred while fetching wash types</Text>;
  }


  function updateInvoice(washType: WashType) {
    console.log("wash")
    dispatch(updateInvoiceDto({washType_id: washType}));
    console.log("WASH", currentInvoice)
    navigation.navigate('chooseExtras')

  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
          data={washTypes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <WashCard washType={item} action={()=> updateInvoice(item)} />}
        />
    </SafeAreaView>
  );
};

export default WashTypeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    textTransform: "capitalize",
  },

  card: {
    backgroundColor: "#303030",
    borderBottomColor: "#fff",
    borderBottomWidth: 5,
  },
  title: { color: "#fff", fontWeight: "bold", fontSize: 30 },
});
