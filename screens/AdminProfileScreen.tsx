import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight, ScrollView } from "react-native";
import { AuthContext } from "../store/AuthContext";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Icon, ListItem } from "@rneui/themed";
import * as SecureStore from "expo-secure-store";
import { format } from "date-fns";

const AdminProfileScreen: React.FC = () => {
  const { setIsLogged, setIsAdmin } = React.useContext(AuthContext);
  const client = useSelector((state: RootState) => state.client.client);
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    if (client) {

      console.log("from profile",client);

    }
  }, [client]);


  async function logout() {
    console.log("logout");
    await SecureStore.deleteItemAsync("token");
    setIsLogged(false);
    setIsAdmin(false);
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
          {client?.firstname}
        </Text>
      </View>

      <View>
        <ListItem onPress={logout} Component={TouchableHighlight}>
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

export default AdminProfileScreen;
