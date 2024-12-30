import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from "expo-router";

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ username: '', email: '', password: '' });

  const validateInputs = () => {
    let isValid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newError = { username: '', email: '', password: '' };

    if (!username.trim()) {
      newError.username = 'Username is required.';
      isValid = false;
    }
    if (!email || !emailPattern.test(email)) {
      newError.email = 'Please enter a valid email address.';
      isValid = false;
    }
    if (!password || password.length < 6) {
      newError.password = 'Password must be at least 6 characters.';
      isValid = false;
    }
    setError(newError);
    return isValid;
  };

  const handleSignUp = () => {
    if (validateInputs()) {
     router.push(`/home?username=${username}`);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setError((prev) => ({ ...prev, email: '' }));
        }}
      />
      {error.email ? <Text style={styles.errorText}>{error.email}</Text> : null}
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
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text
        style={styles.linkText}
       onPress={() => router.push("/signin")}
      >
        Already have an account? Sign In
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
    marginBottom: 30,
  },
  input: {
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#000',
    padding: 15,
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
