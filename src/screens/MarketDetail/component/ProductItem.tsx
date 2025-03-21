import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Product = {
    id: string;
    name: { [key: string]: string }
};

interface ProductItemProps {
  item: Product;
  language: string;
}

const ProductItem = ({ item, language }:ProductItemProps) => (
  <View style={styles.productItem}>
    <Text>{item.name[language]}</Text>
  </View>
);

const styles = StyleSheet.create({
    productItem: {
        height: 180,
        width: 108,
        backgroundColor: 'red',
        margin: 4,
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ProductItem;
