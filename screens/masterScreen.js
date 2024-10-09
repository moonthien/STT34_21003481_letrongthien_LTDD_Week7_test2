import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, Image, TextInput } from 'react-native';

const MasterScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('Donut');
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Gọi API để lấy sản phẩm dựa trên selectedCategory
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const fetchProducts = (category) => {
    let apiUrl = '';
    if (category === 'Donut') {
      apiUrl = 'https://666073d45425580055b3f87d.mockapi.io/Project/api/donuts/cake'; // Thay <project-id> bằng ID thực của bạn
    } else if (category === 'Pink Donut') {
      apiUrl = 'https://<project-id>.mockapi.io/pinkdonuts'; // Thay bằng API thực nếu có
    } else if (category === 'Floating') {
      apiUrl = 'https://<project-id>.mockapi.io/floatingdonuts'; // Thay bằng API thực nếu có
    }

    // Fetch từ API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching data:', error));
  };

  const filterProducts = () => {
    if (searchQuery.trim() === '') return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text>Welcome, Jala!</Text>
      <Text>Choose your Best food</Text>
      <TextInput
        placeholder="Search food"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{ borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 10 }}
      />
      {/* Filter Buttons */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
        <Button title="Donut" onPress={() => setSelectedCategory('Donut')} />
        <Button title="Pink Donut" onPress={() => setSelectedCategory('Pink Donut')} />
        <Button title="Floating" onPress={() => setSelectedCategory('Floating')} />
      </View>

      {/* List of Products */}
      <FlatList
        data={filterProducts()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ padding: 10, borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
            onPress={() => navigation.navigate('DetailScreen', { product: item })}
          >
            <Image source={{ uri: item.image }} style={{ width: 50, height: 50, marginRight: 10 }} />
            <View>
              <Text>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>${item.price.toFixed(2)}</Text>
            </View>
            <Button title="+" onPress={() => console.log('Add to Cart')} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MasterScreen;
