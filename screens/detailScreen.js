import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const DetailScreen = ({ route }) => {
  const { donut } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const totalPrice = (donut.price * quantity).toFixed(2);

  const handleAddToCart = () => {
    setModalVisible(true);
    // Bạn có thể thêm logic để thêm donut vào giỏ hàng ở đây
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setQuantity(1); // Đặt lại số lượng về 1 khi đóng modal
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: donut.image }} style={styles.image} />

      <View style={styles.rowContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{donut.name}</Text>
          <Text style={styles.description}>{donut.description}</Text>
        </View>
        <Text style={styles.price}>${totalPrice}</Text>
      </View>

      <View style={styles.deliveryAndCounterContainer}>
        <View style={styles.deliveryContainer}>
          <Text style={styles.deliveryLabel}>Delivery in</Text>
          <View>
            <Text style={styles.deliveryTime}>30 min</Text>
          </View>
        </View>

        <View style={styles.counterContainer}>
          <TouchableOpacity style={styles.counterButton} onPress={decreaseQuantity}>
            <Text style={styles.counterText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterValue}>{quantity}</Text>
          <TouchableOpacity style={styles.counterButton} onPress={increaseQuantity}>
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.restaurantTitle}>Restaurant Info</Text>
      <Text style={styles.restaurantInfo}>
        Order a Large Pizza but the size is the equivalent of a medium/small from other places at the same price range.
      </Text>

      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
        <Text style={styles.addButtonText}>Add to cart</Text>
      </TouchableOpacity>

      {/* Modal thông báo */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Added to cart successfully!</Text>
            <Image
              source={require('../assets/iconcartsuccess.png')} // Đường dẫn đến hình ảnh dấu tích
              style={styles.checkmarkImage}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal} // Gọi hàm handleCloseModal
            >
              <Text style={styles.closeButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    borderRadius: 125,
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'left',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
  },
  deliveryAndCounterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  deliveryContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  deliveryLabel: {
    fontSize: 16,
    color: '#666',
  },
  deliveryTime: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#333',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    right: '-2.5%',
  },
  counterButton: {
    backgroundColor: '#ffcc00',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 5,
  },
  counterText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  counterValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  restaurantTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left',
  },
  restaurantInfo: {
    fontSize: 14,
    color: '#555',
    textAlign: 'left',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#ffcc00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkmarkImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#ffcc00',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DetailScreen;
