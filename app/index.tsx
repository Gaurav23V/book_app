import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ListRenderItem,
  Pressable,
} from "react-native";
import { Link, useRouter } from "expo-router";
import dummy from "../assets/dummy.json";

type ChapterItem = {
  chapter_number: number;
  title: string;
  subsections: {
    subsection_title: string;
    quotes: string[];
  }[];
};

export default function HomeScreen() {
  const router = useRouter();
  const chapters = dummy.book.chapters;

  const renderItem: ListRenderItem<ChapterItem> = ({ item }) => {
    return (
        <Pressable
        onPress={() => router.push(`/chapter/${item.chapter_number}`)}
          style={({ pressed }) => [
            styles.chapterButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <View>
            <Text style={styles.chapterNumber}>
              Chapter {item.chapter_number}
            </Text>
            <Text style={styles.chapterTitle}>{item.title}</Text>
          </View>
        </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.bookTitle}>{dummy.book.title}</Text>
      <FlatList
        data={chapters}
        keyExtractor={(item) => item.chapter_number.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  listContainer: {
    paddingBottom: 16,
  },
  bookTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
  },
  chapterButton: {
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
  buttonPressed: {
    backgroundColor: "#f0f0f0",
    transform: [{ scale: 0.98 }],
  },
  chapterNumber: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});
