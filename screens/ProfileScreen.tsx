import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight, ScrollView } from "react-native";
import { AuthContext } from "../store/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Avatar, Icon, ListItem } from "@rneui/themed";
import * as SecureStore from "expo-secure-store";
import { format } from "date-fns";
import { clearVenues } from "../store/venueSlice";
import { logout } from "../store/clientSlice";

const ProfileScreen: React.FC = () => {
  const { setIsLogged } = React.useContext(AuthContext);
  const client = useSelector((state: RootState) => state.client.client);
  const [expanded, setExpanded] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    if (client) {

      console.log("from profile",client);

    }
  }, [client]);


  async function handleLogout() {
    console.log("logout");
    await dispatch(clearVenues());
    await dispatch(logout())
    setIsLogged(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <FontAwesome5
          name="user-circle"
          size={50}
          color="#0CEF78"
          style={styles.profileIcon}
        />
        <Text style={styles.title}>
          {client?.firstname} {client?.lastname}{" "}
        </Text>
      </View>

      <View>
      <ListItem>
          <Icon
            name="car-side"
            type="material-community"
            size={25}
            color="#0CEF78"
          />

          <ListItem.Content>
            <ListItem.Title>License Plate</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content right>
                  <ListItem.Title right style={{ color: "#0CEF78" }}>
                  {client && client.cars[0].license_plate}
                  </ListItem.Title>
                </ListItem.Content>
        </ListItem>
        {client && client.invoices.length > 0 &&
        <ListItem.Accordion
          content={
            <>
              <FontAwesome5 name="file-alt" size={25} color="#0CEF78" />
              <ListItem.Content style={styles.accordionClosed}>
                <ListItem.Title>Invoices</ListItem.Title>
                <ListItem.Subtitle>Tap to expand</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </>
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}
          Component={TouchableHighlight}
        >
          {/* {client && client.invoices.map((invoice, i) => ( */}
          <ScrollView>
          {client && 
            client.invoices.map((invoice, i) => (
              <ListItem key={i}>
                <ListItem.Content>
                  <ListItem.Title>{invoice.venue.name}</ListItem.Title>
                  <ListItem.Subtitle  style={{ color: "#0CEF78", fontWeight:'bold' }}>
                    {invoice?.total_amount} kr.
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content right>
                  <ListItem.Title right style={{ color: "#0CEF78" }}>
                    # {invoice.id}
                  </ListItem.Title>
                  <ListItem.Subtitle right style={{ color: "white" }}>
                  {format(new Date(invoice.date), 'dd/MM')}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
            </ScrollView>
        </ListItem.Accordion>
        }

        <ListItem onPress={handleLogout} Component={TouchableHighlight}>
          <Icon
            name="logout"
            type="material-community"
            size={25}
            color="#0CEF78"
          />

          <ListItem.Content>
            <ListItem.Title>Logout</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>
    </View>
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
    fontSize: 22,
    paddingVertical: 20,
    textTransform: "capitalize"
  },
  profileHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginLeft: 10,
  },
  profileIcon: {
    marginRight: 10,
  },
  subtitle: {},
  invoiceCard: {},
  accordionClosed: {
    marginLeft: 20,
    width: "100%",
  },
});

export default ProfileScreen;
