import React from "react";
import { StyleSheet, View, FlatList, Text, ListRenderItem } from "react-native";
import { useLocalSearchParams } from "expo-router";
import dummy from "../../../assets/dummy.json";

export default function QuotesScreen() {
  const params = useLocalSearchParams();
  console.log("Raw params:", params);

  const chapterId = params.chapterId as string;
  const subsectionIndex = params.subsectionIndex as string;

  console.log(
    `Processing chapterId: ${chapterId}, subsectionIndex: ${subsectionIndex}`
  );

  const chapter = dummy.book.chapters.find(
    (ch) => ch.chapter_number === Number(chapterId)
  );

  if (!chapter) {
    console.log(`Chapter not found for id: ${chapterId}`);
    return (
      <View style={styles.container}>
        <Text>Chapter not found</Text>
      </View>
    );
  }

  const subsection = chapter.subsections[Number(subsectionIndex)];

  if (!subsection) {
    console.log(`Subsection not found for index: ${subsectionIndex}`);
    return (
      <View style={styles.container}>
        <Text>Subsection not found</Text>
      </View>
    );
  }

  const renderItem: ListRenderItem<string> = ({ item }) => {
    return (
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>"{item}"</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subsectionTitle}>{subsection.subsection_title}</Text>
      <FlatList
        data={subsection.quotes}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

// ... styles remain the same

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  listContainer: {
    paddingBottom: 16,
  },
  subsectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
  },
  quoteContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quoteText: {
    fontSize: 18,
    color: "#333",
    fontStyle: "italic",
    lineHeight: 24,
  },
});
