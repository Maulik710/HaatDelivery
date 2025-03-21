import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import env from '../../../config/env';

type Product = {
  id: string;
  name: { [key: string]: string }
  productImages:any;
};

interface ProductItemProps {
  item: Product;
  language: string;
}

const ProductItem = ({ item, language }: ProductItemProps) => {
  const imageUri = `${env.IMAGE_BASE_URL}${item.productImages[0]?.serverImageUrl}`;
  return (
    <View style={styles.productItem}>
      <Image source={{ uri: imageUri }} resizeMode='contain' style={styles.productImage} />
      <Text style={styles.productName}>{item.name[language]}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  productItem: {
    height: 180,
    width: 108,
    backgroundColor: 'white',
    margin: 4,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  productImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  }
});

export default ProductItem;
