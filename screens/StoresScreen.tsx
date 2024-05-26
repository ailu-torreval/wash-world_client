import React, { useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import VenueCard from "../components/VenueCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchAllVenues } from "../store/venueSlice";

const StoresScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const venues = useSelector((state: RootState) => state.venues.venues);


  useEffect(() => {
    console.log("EFF",venues)
    async function fetchVenues() {
      await dispatch(fetchAllVenues());

    }

    if(!venues || venues.length === 0) {
      fetchVenues();
    }
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Find a Store close to you</Text>
      {venues && (
        <FlatList
          data={venues}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <VenueCard venue={item} />}
        />
      )}
    </SafeAreaView>
  );
};

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
    fontSize: 28,
    paddingVertical: 20,
    marginTop: 40,
  },
});

export default StoresScreen;
