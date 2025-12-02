// src/screens/LearnScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../theme/theme";

const initialLessons = [
  {
    id: "budgeting-basics",
    title: "Budgeting Basics",
    time: "3 min",
    level: "Beginner",
    summary: "Learn how to give every euro a job and avoid overspending.",
  },
  {
    id: "needs-vs-wants",
    title: "Needs vs Wants",
    time: "2 min",
    level: "Beginner",
    summary: "A simple way to decide if you actually need to buy something.",
  },
  {
    id: "emergency-fund",
    title: "Emergency Funds",
    time: "4 min",
    level: "Intermediate",
    summary: "Why having a cushion saves you from money panic later.",
  },
  {
    id: "debt-basics",
    title: "Understanding Debt",
    time: "5 min",
    level: "Intermediate",
    summary:
      "What interest is, and how to avoid letting small debt become big debt.",
  },
];

export default function LearnScreen() {
  const [lessons, setLessons] = useState(
    initialLessons.map((l) => ({ ...l, completed: false }))
  );
  const [selectedId, setSelectedId] = useState(null);

  function toggleComplete(id) {
    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === id
          ? { ...lesson, completed: !lesson.completed }
          : lesson
      )
    );
  }

  function toggleExpand(id) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  const completedCount = lessons.filter((l) => l.completed).length;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Learn Money Smarts</Text>
            <Text style={styles.subtitle}>
              Short lessons made for students & first-time budgeters.
            </Text>
          </View>
          <View style={styles.progressChip}>
            <Text style={styles.progressLabel}>Completed</Text>
            <Text style={styles.progressValue}>
              {completedCount}/{lessons.length}
            </Text>
          </View>
        </View>

        {/* Tip row */}
        <View style={styles.tipRow}>
          <Ionicons
            name="bulb-outline"
            size={18}
            color={colors.primary}
            style={{ marginRight: spacing.sm }}
          />
          <Text style={styles.tipText}>
            Aim for one lesson a day to keep your money mindset sharp.
          </Text>
        </View>

        {/* Lessons list */}
        <FlatList
          data={lessons}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 32 }}
          renderItem={({ item }) => {
            const expanded = selectedId === item.id;
            return (
              <Pressable
                style={styles.card}
                onPress={() => toggleExpand(item.id)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconWrap}>
                    <Ionicons
                      name={
                        item.completed
                          ? "checkmark-circle"
                          : "play-circle-outline"
                      }
                      size={22}
                      color={item.completed ? colors.accent : colors.primary}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <View style={styles.metaRow}>
                      <Text style={styles.metaText}>{item.time}</Text>
                      <View style={styles.dot} />
                      <Text style={styles.metaText}>{item.level}</Text>
                    </View>
                  </View>
                  <Ionicons
                    name={expanded ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={colors.textMuted}
                  />
                </View>

                {expanded && (
                  <>
                    <Text style={styles.summary}>{item.summary}</Text>
                    <View style={styles.actionsRow}>
                      <Pressable
                        style={[
                          styles.completeBtn,
                          item.completed && styles.completeBtnDone,
                        ]}
                        onPress={() => toggleComplete(item.id)}
                      >
                        <Text
                          style={[
                            styles.completeBtnText,
                            item.completed && styles.completeBtnTextDone,
                          ]}
                        >
                          {item.completed ? "Mark as not done" : "Mark as done"}
                        </Text>
                      </Pressable>
                      <Pressable style={styles.secondaryBtn}>
                        <Text style={styles.secondaryBtnText}>
                          Open mini lesson
                        </Text>
                      </Pressable>
                    </View>
                  </>
                )}
              </Pressable>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
    gap: spacing.lg,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
  },
  progressChip: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    backgroundColor: colors.cardAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "flex-end",
  },
  progressLabel: {
    color: colors.textMuted,
    fontSize: 11,
  },
  progressValue: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 16,
  },
  tipRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    backgroundColor: "#020617",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  tipText: {
    color: colors.textMuted,
    fontSize: 12,
    flex: 1,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: colors.cardAlt,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  metaText: {
    color: colors.textMuted,
    fontSize: 11,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 999,
    backgroundColor: colors.textMuted,
    marginHorizontal: 6,
  },
  summary: {
    color: colors.textMuted,
    fontSize: 13,
    marginBottom: spacing.md,
  },
  actionsRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  completeBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    alignItems: "center",
  },
  completeBtnDone: {
    backgroundColor: "#15803D",
  },
  completeBtnText: {
    color: "#E5E7EB",
    fontWeight: "700",
    fontSize: 13,
  },
  completeBtnTextDone: {
    color: "#ECFDF5",
  },
  secondaryBtn: {
    flex: 1,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.sm,
    alignItems: "center",
    backgroundColor: colors.cardAlt,
  },
  secondaryBtnText: {
    color: coloros.text,
    fontSize: 13,
    fontWeight: "600",
  },
});
