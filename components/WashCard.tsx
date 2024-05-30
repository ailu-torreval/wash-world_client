import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { WashType } from "../entities/Interfaces";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { AuthContext } from "../store/AuthContext";

interface WashCardProps {
  washType: WashType;
  action: () => void;
}

const WashCard: React.FC<WashCardProps> = ({ washType, action }) => {
  const { isAdmin } = React.useContext(AuthContext);

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
      <View style={[isAdmin ? styles.adminCard : styles.washCard]}>
        <View style={styles.cardHeader}>
          <Text style={styles.headerText}>{washType.name}</Text>
          {renderIcon(washType.icon)}
        </View>
        <View style={[isAdmin ? styles.adminContent : styles.cardContent]}>

          {isAdmin ? <Text  style={styles.contentText}>Click to edit price</Text>  : (washType.description.split(",").map((desc, index) => (
            <Text key={index} style={styles.contentText}>
             - {desc}
            </Text>
          )))}
        </View>
          <View style={{zIndex: 1}}>

          <Text style={[styles.footerText, isAdmin ? styles.adminHeight : styles.footerHeight]}>{washType.price} kr.</Text>
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
  washCard: {
    backgroundColor: "#303030",
    marginVertical: 12,
    marginHorizontal: 18,
    borderBottomColor: "#06C167",
    borderBottomWidth: 4,
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: 130,
  },
  adminCard: {
    backgroundColor: "#303030",
    marginVertical: 17,
    marginHorizontal: 18,
    borderBottomColor: "#06C167",
    borderBottomWidth: 4,
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: 110,
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
  adminContent: {

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
    color: "#fff",
    fontSize: 25,
    fontStyle: "italic",
    fontWeight: "bold",
    position: "absolute",
    right: 20,
  },
  footerHeight: {
    bottom: -130, 
    top:-10// -22 
  },
  adminHeight: {
    bottom: -52,
    top:4 
  },
  angle: {
    width: "200%",
    height: "300%",
    backgroundColor: "#06C167",
    transform: [{ rotate: "-30deg" }],
    marginLeft: "-40%",
  },
});

export default WashCard;
