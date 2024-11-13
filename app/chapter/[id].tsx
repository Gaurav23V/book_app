import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ListRenderItem,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import dummy from "../../assets/dummy.json";
import HeaderWithBack from "@/components/HeaderWithBack";

type Subsection = {
  subsection_title: string;
  quotes: string[];
};

export default function ChapterDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const chapterId = Array.isArray(id) ? id[0] : id;

  const chapter = dummy.book.chapters.find(
    (ch) => ch.chapter_number === Number(id)
  );

  const renderItem: ListRenderItem<Subsection> = ({ item, index }) => {
    return (
      <Pressable
        onPress={() => {
          console.log(
            `Navigating with chapterId: ${chapterId}, index: ${index}`
          );
          router.push({
            pathname: "/quotes/[chapterId]/[subsectionIndex]",
            params: {
              chapterId: chapterId,
              subsectionIndex: index.toString(),
            },
          });
        }}
        style={({ pressed }) => [
          styles.subsectionButton,
          pressed && styles.buttonPressed,
        ]}
      >
        <View>
          <Text style={styles.subsectionTitle}>{item.subsection_title}</Text>
        </View>
      </Pressable>
    );
  };

  if (!chapter) {
    return (
      <View style={styles.container}>
        <Text>Chapter not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.chapterTitle}>
        Chapter {chapter.chapter_number}: {chapter.title}
      </Text>
      <FlatList
        data={chapter.subsections}
        keyExtractor={(item) => item.subsection_title}
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
  chapterTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
  },
  subsectionButton: {
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
  subsectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});
