import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Extra } from "../entities/Extra";

interface ExtraCardProps {
  extra: Extra;
 action: () => void;
 selected: boolean;
}

const ExtraCard: React.FC<ExtraCardProps> = ({ extra, action, selected }) => {
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
    <Pressable onPress={action}>
      <View  style={[styles.extraCard, selected && styles.selectedCard]}>
        <View style={styles.cardHeader}>
          <Text style={styles.headerText}>{extra.name}</Text>
          {renderIcon(extra.icon)}
        </View>
        <View style={styles.cardContent}>

          <Text style={styles.subtext}>Redeem <MaterialIcon name="star" size={15} color="#0CEF78" />{extra.points_price} or..</Text>
        </View>
          <Text style={styles.footerText}>{extra.price} kr.</Text>
        <LinearGradient
          style={styles.cardFooter}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["transparent", "#0DCC70"]}
        >
          <View style={styles.angle}></View>
        </LinearGradient>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  extraCard: {
    backgroundColor: "#303030",
    marginVertical: 10,
    marginHorizontal: 18,
    borderBottomColor: "#06C167",
    borderBottomWidth: 4,
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: 130,
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
    bottom:7
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

export default ExtraCard;
