import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Switch } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Venue } from "../entities/Venue";
import { WashType } from "../entities/WashType";
import { Extra } from "../entities/Extra";

const CheckoutScreen: React.FC = () => {
  const invoice = useSelector((state: RootState) => state.invoice.invoiceDto);
  const client = useSelector((state: RootState) => state.client.client);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discount, setDiscount] = useState<number>(0)
  const [remainingPoints, setRemainingPoints] = useState<number>(0)

  useEffect(() => {
    console.log(invoice);
    console.log(client);
    calculateDiscount()
  }, [invoice, client]);

  const toggleDiscount = () =>
    setDiscountApplied((previousState) => !previousState);


  function calculateDiscount(): number {
    console.log("line27 checkout")
    let savings = 0;
  
    if (Array.isArray(invoice.extras_ids) && client !== null) {
        const sortedExtras = invoice.extras_ids
        .filter((extra): extra is Extra => typeof extra !== 'number')
        .sort((a, b) => b.points_price - a.points_price);  
      let remainingPoints = client.reward_points_balance || 0;
  
      for (const extra of sortedExtras) {
        if (extra.points_price <= remainingPoints) {
          remainingPoints -= extra.points_price;
          savings += extra.price;
        } else {
          break;
        }
      }
    }
    setRemainingPoints(remainingPoints);
    setDiscount(savings)
  
    return savings;
  }

  return (
    <SafeAreaView style={styles.container}>
      {invoice !== null && invoice !== undefined && (
        <View>
          <Text>Summary</Text>
          <View style={styles.summaryGrid}>
  {(invoice.venue_id && typeof invoice.venue_id !== 'number') && (
    <View style={styles.row}>
      <Text style={styles.name}>Venue:</Text>
      <Text style={styles.price}>{invoice.venue_id.name}</Text>
    </View>
  )}
  {(invoice.washType_id && typeof invoice.washType_id !== 'number') && (
    <View style={styles.row}>
      <Text style={styles.name}>{invoice.washType_id.name}</Text>
      <Text style={styles.price}>{invoice.washType_id.price} kr.</Text>
    </View>
  )}
  {Array.isArray(invoice.extras_ids) && (
    <View>
      {invoice.extras_ids.map(
        (extra) => (extra && typeof extra !== 'number') && (
          <View key={extra.id} style={styles.row}>
            <Text style={styles.name}> + {extra.name} kr.</Text>
            <Text style={styles.price}> + {extra.price} kr.</Text>
          </View>
        )
      )}
    </View>
  )}
{(client !== null && discount > 0) && (
  <View>
    <Text style={styles.rewardTitle}>Reward points</Text>
    <Text style={styles.rewardSubtitle}>If you redeem X points you can save {discount} kr.</Text>

    <View style={styles.row}>
    <Text style={styles.name}>Redeem points</Text>

    <Switch
      trackColor={{ false: "#666666", true: "#11804B" }}
      thumbColor={discountApplied ? "#0CEF78" : "#939393"}
      ios_backgroundColor="#11804B"
      onValueChange={toggleDiscount}
      value={discountApplied}
    />
    </View>
  </View>
)}
</View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
    },
  title: { color: "#fff", fontWeight: "bold", fontSize: 30 },
  summaryGrid: {
    // flexDirection: "column",
    backgroundColor: "#303030",
    paddingHorizontal: 20,
    paddingVertical:20,
    width: 350
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  name: {

    textAlign: "right",
    color:"#fff"
  },
  price: {
    textAlign: "left",
    color: "#fff"
  },
  rewardTitle: {},
  rewardSubtitle: {}
});
