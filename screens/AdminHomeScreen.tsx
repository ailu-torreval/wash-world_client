import { Card, FAB, useTheme } from "@rneui/themed";
import React from "react";
import { View, Text, StyleSheet } from "react-native";


const AdminHomeScreen: React.FC = () => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How does it work?</Text>
      <Card containerStyle={styles.card}>
        <Card.Title style={{ color: theme.colors.secondary, fontSize:20, textAlign:'left'}}>
          1.
        </Card.Title>
        <Card.Divider />
        <Text style={styles.text}>Click on Start Button</Text>
      </Card>
      <Card containerStyle={styles.card}>
        <Card.Title style={{ color: theme.colors.secondary, fontSize:20, textAlign:'left'}}>
          2.
        </Card.Title>
        <Card.Divider />
        <Text style={styles.text}>Choose Venue</Text>
      </Card>
      <Card containerStyle={styles.card}>
        <Card.Title style={{ color: theme.colors.secondary, fontSize:20, textAlign:'left'}}>
          3.
        </Card.Title>
        <Card.Divider />
        <Text style={styles.text}>Choose Wash & Extras</Text>
      </Card>
      <Card containerStyle={styles.card}>
        <Card.Title style={{ color: theme.colors.secondary, fontSize:20, textAlign:'left'}}>
          4.
        </Card.Title>
        <Card.Divider />
        <Text style={styles.text}>...Just sit & rest!</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
    card: {
      backgroundColor: "#303030",
    },
    title: { color: "#fff", fontWeight: "bold", fontSize: 30 },
  header: {
    backgroundColor: "#303030"
  }
});

export default AdminHomeScreen;
