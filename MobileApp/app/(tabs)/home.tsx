import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { HelloWave } from "@/components/HelloWave";
import { LikeProvider, useLikeContext } from "@/contexts/LikeContext";

const ITEMS_PER_PAGE = 6;

const HomeScreen = () => {
  const { likeCount, incrementLike } = useLikeContext();
  const router = useRouter();
  const username = router.query?.username;

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.example.com/products?q=${searchQuery}`
      );
      const data = await response.json();
      setHits(data.hits);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const totalPages = Math.ceil(hits.length / ITEMS_PER_PAGE);
  const paginatedData = hits.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <TouchableOpacity
          key={i}
          style={[styles.paginationButton, currentPage === i && styles.activeButton]}
          onPress={() => setCurrentPage(i)}
        >
          <Text style={[styles.paginationText, currentPage === i && styles.activeText]}>
            {i}
          </Text>
        </TouchableOpacity>
      );
    }
    return <View style={styles.paginationBar}>{pages}</View>;
  };

  const renderItem = ({ item }: { item: { id: number; imageUrl: string; status: string; title: string; description: string } }) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <TouchableOpacity
          style={[
            styles.statusButton,
            item.status === "Available" ? styles.available : styles.outOfStock,
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => {
            incrementLike();
            alert(`Clicked on ${item.title}`);
          }}
        >
          <Text style={styles.moreButtonText}>More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {username ? (
        <Text style={styles.welcomeText}>
          Welcome, {username} <HelloWave />
        </Text>
      ) : (
        <Text style={styles.welcomeText}>User Name Loading...</Text>
      )}

      <TextInput
        style={styles.searchBar}
        placeholder="Search items..."
        placeholderTextColor="#B0B0B0"
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          setCurrentPage(1); 
        }}
      />

      {loading ? (
        <Text style={styles.noItemsText}>Loading...</Text>
      ) : hits.length === 0 ? (
        <Text style={styles.noItemsText}>No items found</Text>
      ) : (
        <FlatList
          data={paginatedData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}

      {hits.length > 0 && renderPagination()}

      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>{likeCount}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#010117",
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  welcomeText: {
    color: "white",
    fontSize: 20,
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: "#262626",
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginBottom: 20,
    fontSize: 16,
  },
  noItemsText: {
    color: "#B0B0B0",
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#262626",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  statusButton: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  available: {
    backgroundColor: "#28a745",
  },
  outOfStock: {
    backgroundColor: "#dc3545",
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  cardContent: {
    padding: 10,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: "#B0B0B0",
    marginTop: 5,
    fontSize: 14,
  },
  moreButton: {
    marginTop: 10,
    backgroundColor: "#d48608",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  moreButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  paginationBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  paginationButton: {
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#444",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#d48608",
  },
  paginationText: {
    color: "#fff",
    fontSize: 14,
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  floatingButton: {
    position: "absolute",
    top: 30,
    right: 20,
    backgroundColor: "#0acc9f",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HomeScreen;
