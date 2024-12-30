import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from "expo-router";

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ username: '', password: '' });

  const validateInputs = () => {
    let isValid = true;
    const newError = { username: '', password: '' };
    if (!username) {
      newError.username = 'Please enter a valid username.';
      isValid = false;
    }
    if (!password || password.length < 6) {
      newError.password = 'Password must be at least 6 characters.';
      isValid = false;
    }
    setError(newError);
    return isValid;
  };

  const handleSignIn = () => {
    if (validateInputs()) {
      router.push(`/home?username=${username}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          setError((prev) => ({ ...prev, username: '' }));
        }}
      />
      {error.username ? <Text style={styles.errorText}>{error.username}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setError((prev) => ({ ...prev, password: '' }));
        }}
      />
      {error.password ? <Text style={styles.errorText}>{error.password}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <Text
        style={styles.linkText}
        onPress={() => router.push("/signup")}
      >
        Don't have an account? Sign Up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    backgroundColor: '#010117',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%', 
    maxWidth: 400, 
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#000',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
    color: '#fff',
  },
  button: {
    width: '100%', 
    maxWidth: 100, 
    backgroundColor: '#ff9900',
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  linkText: {
    textAlign: 'center',
    color: '#ff9900',
    marginTop: 15,
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 12,
    marginBottom: 10,
  },
});
