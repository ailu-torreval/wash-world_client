import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { VenuesState, fetchAllVenues } from '../store/venueSlice';
import { Venue } from '../entities/Interfaces';
import { Card, useTheme } from '@rneui/themed';

const ChooseVenueScreen: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const venues = useSelector((state: RootState)=> state.venues.venues)

    
    useEffect(() => {
        async function fetchVenues() {
            await dispatch(fetchAllVenues());
            console.log(venues)
        }
        

        fetchVenues();
    }, []);

    useEffect(() => {

            console.log(venues)

    }, [venues]);

    return (
        <SafeAreaView style={styles.container}>
      <FlatList
        data={venues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <VenueCard venue={item} />}
      />      
       </SafeAreaView>
    );
};

export default ChooseVenueScreen;


function VenueCard({venue}: {venue: Venue})  {
    const { theme } = useTheme();
    console.log("DJKDKD", venue)
    return (
        <Card containerStyle={styles.card}>
        <Card.Title style={{ color: theme.colors.secondary, fontSize:20, textAlign:'left'}}>
          {venue.name}
        </Card.Title>
        <Card.Divider />
        <Text style={styles.text}>{venue.address}, {venue.zip}, {venue.city}</Text>
      </Card>
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    text: {
      color: "white",
      fontSize: 16,
      textTransform: 'capitalize'

    },
  
    card: {
      backgroundColor: "#303030",
    },
    title: { color: "#fff", fontWeight: "bold", fontSize: 30 },
  });

