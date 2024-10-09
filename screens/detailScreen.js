import React, { useState } from 'react';
import { View, Text, Image, Button } from 'react-native';

const DetailScreen = ({ route }) => {
  const { product } = route.params; // Nhận sản phẩm từ params
  const [quantity, setQuantity] = useState(1); // Khởi tạo số lượng sản phẩm

  const increaseQuantity = () => setQuantity(quantity + 1); // Tăng số lượng
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1); // Giảm số lượng nhưng không nhỏ hơn 1
  };

  return (
    <View style={{ flex: 1, padding: 10, alignItems: 'center' }}>
      <Image source={{ uri: product.image }} style={{ width: 200, height: 200, marginBottom: 10 }} />
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{product.name}</Text>
      <Text style={{ marginVertical: 10 }}>{product.description}</Text>
      <Text style={{ fontSize: 18 }}>${(product.price * quantity).toFixed(2)}</Text> {/* Hiển thị giá theo số lượng */}

      {/* Quantity Control */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
        <Button title="-" onPress={decreaseQuantity} />
        <Text style={{ marginHorizontal: 10 }}>{quantity}</Text>
        <Button title="+" onPress={increaseQuantity} />
      </View>

      <Button
        title="Addd to cart"
        onPress={() => console.log('Added to cart', product, 'Quantity:', quantity)} // Thêm sản phẩm vào giỏ hàng
      />
    </View>
  );
};

export default DetailScreen;
