import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getExpenses } from "../firebase/expenses";

const userId = "demoUser123";
const weeklyBudget = 120;

export default function HomeScreen() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getExpenses(userId).then(setExpenses);
  }, []);

  const weeklyTotal = useMemo(() => {
    // simple weekly calc = last 7 days
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    return expenses
      .filter((e) => new Date(e.date) >= weekAgo)
      .reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  const remaining = weeklyBudget - weeklyTotal;
  const percent = Math.min(100, Math.round((weeklyTotal / weeklyBudget) * 100));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Wealth Wise</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Spent this week</Text>
        <Text style={styles.big}>€{weeklyTotal.toFixed(2)}</Text>
        <Text style={styles.label}>Budget remaining</Text>
        <Text style={[styles.big, remaining < 0 && styles.over]}>
          €{remaining.toFixed(2)}
        </Text>

        <View style={styles.progressOuter}>
          <View style={[styles.progressInner, { width: `${percent}%` }]} />
        </View>
        <Text style={styles.percent}>{percent}% of budget used</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B0B0F", padding: 16 },
  header: { color: "white", fontSize: 28, fontWeight: "900", marginBottom: 16 },
  card: { backgroundColor: "#1C1C22", padding: 16, borderRadius: 16 },
  label: { color: "#9CA3AF", fontSize: 14 },
  big: { color: "white", fontSize: 26, fontWeight: "800", marginBottom: 8 },
  over: { color: "#EF4444" },
  progressOuter: {
    height: 10,
    backgroundColor: "#2C2C35",
    borderRadius: 999,
    overflow: "hidden",
    marginTop: 8,
  },
  progressInner: { height: "100%", backgroundColor: "#7C5CFF" },
  percent: { color: "#C8C8D0", marginTop: 6, fontSize: 12 },
});
