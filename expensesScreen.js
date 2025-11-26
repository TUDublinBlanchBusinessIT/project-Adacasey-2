import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from "react-native";
import { addExpense, getExpenses } from "../firebase/expenses";

// For proof-of-concept, use a hardcoded userId
const userId = "demoUser123";

const categories = ["Food", "Transport", "Bills", "Social", "Other"];

export default function ExpensesScreen() {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("Food");
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadExpenses() {
    setLoading(true);
    const data = await getExpenses(userId);
    setExpenses(data);
    setLoading(false);
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  async function onAddExpense() {
    if (!amount) return;

    const expense = {
      amount: parseFloat(amount),
      category,
      note,
      date: new Date().toISOString().slice(0, 10),
    };

    await addExpense(userId, expense);
    setAmount("");
    setNote("");
    await loadExpenses();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Expense</Text>

      <TextInput
        placeholder="Amount (€)"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />

      <TextInput
        placeholder="Note (optional)"
        value={note}
        onChangeText={setNote}
        style={styles.input}
      />

      <View style={styles.catRow}>
        {categories.map((c) => (
          <Pressable
            key={c}
            onPress={() => setCategory(c)}
            style={[styles.catBtn, category === c && styles.catBtnActive]}
          >
            <Text style={category === c ? styles.catTextActive : styles.catText}>
              {c}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.addBtn} onPress={onAddExpense}>
        <Text style={styles.addBtnText}>Save Expense</Text>
      </Pressable>

      <Text style={styles.title}>Your Expenses</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemAmount}>€{item.amount.toFixed(2)}</Text>
              <View>
                <Text style={styles.itemCat}>{item.category}</Text>
                {!!item.note && <Text style={styles.itemNote}>{item.note}</Text>}
                <Text style={styles.itemDate}>{item.date}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#0B0B0F" },
  title: { color: "white", fontSize: 20, fontWeight: "700", marginVertical: 12 },
  input: {
    backgroundColor: "#1C1C22",
    color: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  catRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 12 },
  catBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#1C1C22",
  },
  catBtnActive: { backgroundColor: "#7C5CFF" },
  catText: { color: "#C8C8D0" },
  catTextActive: { color: "white", fontWeight: "700" },
  addBtn: {
    backgroundColor: "#22C55E",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  addBtnText: { color: "white", fontWeight: "800", fontSize: 16 },
  item: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#1C1C22",
    marginBottom: 8,
  },
  itemAmount: { color: "white", fontSize: 18, fontWeight: "800", width: 80 },
  itemCat: { color: "#7C5CFF", fontWeight: "700" },
  itemNote: { color: "white" },
  itemDate: { color: "#9CA3AF", fontSize: 12 },
});
