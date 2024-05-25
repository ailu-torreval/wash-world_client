import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchAllVenues } from "../store/venueSlice";
import { Venue } from "../entities/Interfaces";
import { Card, useTheme } from "@rneui/themed";
import { updateInvoiceDto } from "../store/invoiceSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import VenueCard from "../components/VenueCard";

type Props = NativeStackScreenProps<RootStackParamList, "chooseVenue">;

const ChooseVenueScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const venues = useSelector((state: RootState) => state.venues.venues);

  useEffect(() => {
    async function fetchVenues() {
      await dispatch(fetchAllVenues());
    }

    fetchVenues();
  }, []);

  useEffect(() => {
    console.log(venues);
  }, [venues]);

  function updateInvoice(venue: Venue) {
    console.log(venue.id);
    dispatch(updateInvoiceDto({ venue_id: venue }));
    navigation.navigate("chooseWashType");
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={venues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => updateInvoice(item)}>
          <VenueCard venue={item} />
           </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default ChooseVenueScreen;

// function VenueCard({ venue, action }: { venue: Venue;   action: () => void; }) {
//   const { theme } = useTheme();

//   return (
//     <TouchableOpacity onPress={action}>
//       <Card containerStyle={styles.card}>
//         <Card.Title
//           style={{
//             color: theme.colors.secondary,
//             fontSize: 20,
//             textAlign: "left",
//           }}
//         >
//           {venue.name}
//         </Card.Title>
//         <Card.Divider />
//         <Text style={styles.text}>
//           {venue.address}, {venue.zip}, {venue.city}
//         </Text>
//       </Card>
//     </TouchableOpacity>
//   );
// }

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
