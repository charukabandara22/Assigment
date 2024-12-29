import { ThemedText } from "@/components/ThemedText";
import { Link, router } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { HelloWave } from "@/components/HelloWave";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.innerContainer}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Welcome!</ThemedText>
            <HelloWave />
          </ThemedView>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title" style={{ textAlign: "center", marginBottom: 20 }}>
              Discover Endless Possibilities with{"\n"}
              <ThemedText
                type="title"
                style={{
                  color: "#FF5733",
                  fontWeight: "bold",
                  transform: [{ rotate: "-10deg" }],
                }}
              >
                GRYSPYLAND
              </ThemedText>
            </ThemedText>
          </ThemedView>

          <Image
            source={require("../assets/images/logo.png")}
            style={styles.reactLogo}
          />
          <Text
            style={{
              fontFamily: "SpaceMono",
              fontSize: 25,
              margin: 5,
              color: "#808080",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            Stream, explore, and immerse yourself
          </Text>
          <Text
            style={{
              fontFamily: "SpaceMono",
              fontSize: 25,
              margin: 5,
              color: "#808080",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            in the best of entertainment
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/signin")}
          >
            <Text style={styles.inputbuttontext}>Let's Go</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 378,
    width: 390,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#010117",
    marginBottom: 40,
  },
  container: {
    flex: 1,
    backgroundColor: "#010117",
    fontFamily: "SpaceMono",
  },
  scrollContent: {
    marginTop: 100,
    padding: 16,
    fontFamily: "SpaceMono",
  },
  innerContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
    fontFamily: "SpaceMono",
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 16,
    fontFamily: "SpaceMono",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderColor: "#DE3163",
    borderRadius: 40,
    paddingHorizontal: 10,
    width: "90%",
    marginTop: 30,
    fontFamily: "SpaceMono",
  },
  buttonContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    fontFamily: "SpaceMono",
  },
  button: {
    backgroundColor: "#d48608",
    padding: 10,
    borderRadius: 40,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
    fontFamily: "SpaceMono",
    marginTop: 90,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "",
  },
  text: {
    fontSize: 16,
    color: "white",
    fontFamily: "SpaceMono",
  },
  inputbuttontext: {
    fontWeight: "300",
    color: "white",
    fontSize: 24,
    fontFamily: "SpaceMono",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  Logo: {
    height: 350,
    width: 350,
    margin: 20,
  },
});
