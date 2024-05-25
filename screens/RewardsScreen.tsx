import React from "react";
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

const RewardsScreen: React.FC = () => {
  const { data: extras, isLoading, isError } = useGetExtras();
  const client = useSelector((state: RootState) => state.client.client);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0CEF78" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Redeem your reward points for extra services!
      </Text>
      <Text style={styles.subtitle}>
        Your balance: {" "}
        <Text style={{color:'#0CEF78', fontWeight:'bold'}}>
         {client?.reward_points_balance}
        <MaterialIcon name="star" size={20} />
        </Text>
            
      </Text>

      <FlatList
        data={extras}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ExtraCard extra={item} />}
      />
    </SafeAreaView>
  );
};

export default RewardsScreen;

function ExtraCard({ extra }: { extra: Extra }) {
  const renderIcon = (icon: string) => {
    const [iconType, iconName] = icon.split(",");

    switch (iconType) {
      case "m":
        return <MaterialIcon name={iconName} size={33} color="#0CEF78" />;
      case "f":
        return <FontAwesome5 name={iconName} size={29} color="#0CEF78" />;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.extraCard]}>
      <View style={styles.cardHeader}>
        <Text style={styles.headerText}>{extra.name}</Text>
        {renderIcon(extra.icon)}
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.footerText}>{extra.points_price}<MaterialIcon name="star" size={25} /></Text>
      </View>
      <LinearGradient
        style={styles.cardFooter}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["transparent", "#0DCC70"]}
      >
        <View style={styles.angle}></View>
      </LinearGradient>
    </View>
  );
}

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
  extraCard: {
    backgroundColor: "#303030",
    marginVertical: 18,
    marginHorizontal: 18,
    borderBottomColor: "#06C167",
    borderBottomWidth: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    height: 110,
  },
  selectedCard: {
    borderColor: "#06C167",
    borderWidth: 2,
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
  cardContent: {
    marginTop: 5,
  },
  contentText: {
    color: "#fff",
  },
  cardFooter: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: "80%",
    height: 50,
    overflow: "hidden",
  },

  footerText: {
    zIndex: 20,
    color: "#fff",
    fontSize: 25,
    fontStyle: "italic",
    fontWeight: "bold",
    position: "absolute",
    right: 20,
    bottom: -55,
  },
  subtext: {
    zIndex: 20,
    color: "#0CEF78",
    fontSize: 15,
    fontStyle: "italic",
    position: "absolute",
    left: 0,
    bottom: -55,
  },
  angle: {
    width: "200%",
    height: "300%",
    backgroundColor: "#06C167",
    transform: [{ rotate: "-30deg" }],
    marginLeft: "-40%",
  },
});
