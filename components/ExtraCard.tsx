import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Extra } from "../entities/Extra";

interface ExtraCardProps {
  extra: Extra;
  action: any;
}

const ExtraCard: React.FC<ExtraCardProps> = ({ extra, action }) => {
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
    <TouchableOpacity onPress={action}>
      <View style={styles.extraCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.headerText}>{extra.name}</Text>
          {renderIcon(extra.icon)}
        </View>
        <View style={styles.cardContent}>

          <Text style={styles.footerText}>{extra.price} kr.</Text>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  extraCard: {
    backgroundColor: "#303030",
    marginVertical: 22,
    marginHorizontal: 18,
    borderBottomColor: "#06C167",
    borderBottomWidth: 4,
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: 130,
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
    marginLeft: 10,
    marginTop: 5,
  },
  contentText: {
    color: "#fff",
    // style for the contentText
  },
  cardFooter: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: "80%",
    height: 50, // adjust this to your needs
    overflow: "hidden",
  },

  footerText: {
    zIndex: 20,
    color: "#fff",
    fontSize: 25,
    fontStyle: "italic",
    fontWeight: "bold",
    position: "absolute",
    right: 20, // adjust this to position the text horizontally
    bottom: -65,
  },
  angle: {
    width: "200%",
    height: "300%",
    backgroundColor: "#06C167",
    transform: [{ rotate: "-30deg" }],
    marginLeft: "-40%",
  },
});

export default ExtraCard;
