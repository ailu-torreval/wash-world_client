import { Card, FAB, useTheme } from "@rneui/themed";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Venue } from "../entities/Venue";
import { Invoice } from "../entities/Invoice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchAllVenuesByAdmin } from "../store/venueSlice";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";


const AdminHomeScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const adminToken = useSelector((state: RootState) => state.client.token);
  const venues = useSelector((state: RootState) => state.venues.venues);

  useEffect(() => {
    async function fetchAdminVenues() {
      if (adminToken !== null) {
        await dispatch(fetchAllVenuesByAdmin(adminToken));
      }
    }

    fetchAdminVenues();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Venues' Revenue</Text>

      <FlatList
        data={venues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <VenueCard venue={item} />}
      />
    </View>
  );
};

function VenueCard({ venue }: { venue: Venue }) {
  const { theme } = useTheme();

  function calculateRevenue(invoices: Invoice[]): number {
    if(invoices.length > 0) {
      return invoices.reduce((total, invoice) => total + invoice.total_amount, 0);

    } else return 0
  }

  return (
    <Card containerStyle={styles.card}>
      <Card.Title
        style={{
          color: theme.colors.secondary,
          fontSize: 20,
          textAlign: "left",
        }}
      >
        <MaterialIcon name="map-marker" size={20} color="#0CEF78" />
        {venue.name}
      </Card.Title>
      <Card.Divider />
      <View style={styles.cardContainer}>
        <Text style={styles.text}>Total revenue:</Text>
        <Text style={styles.totalAmount}>
          {venue.invoices !== undefined && calculateRevenue(venue.invoices)} kr.
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal:10
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
  },
  totalAmount: {
    color: "#0CEF78",
    fontWeight: "bold",
    fontSize: 20,
    fontStyle: "italic",
  },
  card: {
    backgroundColor: "#303030",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 60,
    marginBottom: 30,
  },
  header: {
    backgroundColor: "#303030",
  },
});

export default AdminHomeScreen;
