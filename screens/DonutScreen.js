import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const DonutScreen = () => {
  const [donuts, setDonuts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('donut');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchDonuts(selectedCategory);
  }, [selectedCategory]);

  const fetchDonuts = async (category) => {
    try {
      if (category === 'donut') {
        const responseDonut = await axios.get('http://localhost:5000/donut');
        const responsePinkDonut = await axios.get('http://localhost:5000/pinkDonut');
        const responseFloating = await axios.get('http://localhost:5000/floating');

        const combinedDonuts = [
          ...responseDonut.data,
          ...responsePinkDonut.data,
          ...responseFloating.data,
        ];

        setDonuts(combinedDonuts);
      } else {
        const response = await axios.get(`http://localhost:5000/${category}`);
        setDonuts(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredDonuts = donuts.filter((donut) =>
    donut.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDonutPress = (item) => {
    setLoading(true); // Set loading to true

    setTimeout(() => {
      setLoading(false); // Stop loading
      navigation.navigate('DetailScreen', { donut: item }); // Navigate after delay
    }, 500); // 3 seconds delay
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome!</Text>
      <Text style={styles.chooseText}>Choose your Best Food</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search donuts..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, selectedCategory === 'donut' && styles.activeButton]}
          onPress={() => setSelectedCategory('donut')}
        >
          <Text style={[styles.buttonText, selectedCategory === 'donut' && styles.activeButtonText]}>Donut</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedCategory === 'pinkDonut' && styles.activeButton]}
          onPress={() => setSelectedCategory('pinkDonut')}
        >
          <Text style={[styles.buttonText, selectedCategory === 'pinkDonut' && styles.activeButtonText]}>Pink Donut</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedCategory === 'floating' && styles.activeButton]}
          onPress={() => setSelectedCategory('floating')}
        >
          <Text style={[styles.buttonText, selectedCategory === 'floating' && styles.activeButtonText]}>Floating</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ width: "100%", height: 500 }}>
        <FlatList
          data={filteredDonuts}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.donutItem}
              onPress={() => handleDonutPress(item)} // Use the new handleDonutPress function
            >
              <Image source={{ uri: item.image }} style={styles.donutImage} />
              <View style={styles.donutTextContainer}>
                <Text style={styles.donutName}>{item.name}</Text>
                <Text style={styles.donutDescription}>{item.description}</Text>
                <Text style={styles.donutPrice}>${item.price}</Text>

                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addIcon}>+</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  chooseText: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    width: 101,
    height: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#C4C4C4',
  },
  activeButton: {
    backgroundColor: '#F1B000',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  activeButtonText: {
    color: 'white',
  },
  donutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4DDDD',
    borderRadius: 20,
    padding: 25,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  donutImage: {
    width: 126,
    height: 126,
    borderRadius: 60,
    marginRight: 15,
  },
  donutTextContainer: {
    flex: 1,
    position: 'relative',
  },
  donutName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  donutDescription: {
    color: '#888',
    fontSize: 16,
  },
  donutPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: -10,
    right: 10,
    backgroundColor: '#F1B000',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    fontSize: 18,
    color: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DonutScreen;
