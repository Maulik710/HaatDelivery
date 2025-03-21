import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type MarketSubCategory = {
    id: string;
    name: { [key: string]: string }
    products: Product[];
};

type Product = {
    id: string;
    name: { [key: string]: string }
};

interface SubTabItemProps {
  item: MarketSubCategory;
  index: number;
  activeSubTab: number;
  language: string;
  onSubTabPress: (index: number) => void;
}

const SubTabItem= ({ item, index, activeSubTab, language, onSubTabPress }:SubTabItemProps) => (
  <TouchableOpacity
    style={[
      styles.subTabItem,
      { borderBottomColor: index === activeSubTab ? 'blue' : 'transparent' },
    ]}
    onPress={() => onSubTabPress(index)}
  >
    <Text>{item.name[language]}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    subTabItem: {
        height: 30,
        paddingHorizontal: 8,
        marginHorizontal: 4,
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SubTabItem;
