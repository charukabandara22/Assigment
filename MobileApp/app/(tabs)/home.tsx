import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { Card, Button, Title, Paragraph } from 'react-native-paper';

type HomePageProps = {
  route: {
    params: {
      username: string;
    };
  };
};

type Item = {
  API: string;
  Description: string;
  Link: string;
};

const HomePage: React.FC<HomePageProps> = ({ route }) => {
  const { username } = route.params;
  const [items, setItems] = useState<Item[]>([]);
  const [clickedItems, setClickedItems] = useState<number>(0);

  useEffect(() => {
    fetch('https://api.publicapis.org/entries')
      .then((response) => response.json())
      .then((data) => setItems(data.entries));
  }, []);

  const handleItemClick = () => {
    setClickedItems((prevCount) => prevCount + 1);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.Link }} />
      <Card.Content>
        <Title>{item.API}</Title>
        <Paragraph>{item.Description}</Paragraph>
        <Button onPress={handleItemClick}>Click Item</Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {username}!</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.API}
      />
      <Text style={styles.footer}>Clicks: {clickedItems}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { marginBottom: 16 },
  welcome: { fontSize: 20, marginBottom: 16 },
  footer: { textAlign: 'center', marginTop: 16 },
});

export default HomePage;
