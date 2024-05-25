import React from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import VenueCard from "../components/VenueCard";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const StoresScreen: React.FC = () => {
  const venues = useSelector((state: RootState) => state.venues.venues);
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
