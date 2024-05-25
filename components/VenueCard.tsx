import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Venue } from "../entities/Venue";
import { Card } from "@rneui/base";
import { useTheme } from "@rneui/themed";


interface VenueCardProps {
    venue: Venue;
  }

  const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
    const { theme } = useTheme();
  
    return (
        <Card containerStyle={styles.card}>
          <Card.Title
            style={{
              color: theme.colors.secondary,
              fontSize: 20,
              textAlign: "left",
            }}
          >
            {venue.name}
          </Card.Title>
          <Card.Divider />
          <Text style={styles.text}>
            {venue.address}, {venue.zip}, {venue.city}
          </Text>
        </Card>
    );
  }

  export default VenueCard;

  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    text: {
      color: "white",
      fontSize: 16,
      textTransform: "capitalize",
    },
  
    card: {
      backgroundColor: "#303030",
      borderColor: "#303030"
    },
    title: { color: "#fff", fontWeight: "bold", fontSize: 30 },
  });
  