import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type MarketCategory = {
    id: string;
    name: { [key: string]: string }
};

interface TabItemProps {
  item: MarketCategory;
  index: number;
  activeTab: number;
  language: string;
  onTabPress: (index: number) => void;
}

const TabItem = ({ item, index, activeTab, language, onTabPress }:TabItemProps) => (
  <TouchableOpacity
    style={[
      styles.tabItem,
      { backgroundColor: index === activeTab ? 'pink' : 'transparent' },
    ]}
    onPress={() => onTabPress(index)}
  >
    <Text>{item.name[language]}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    tabItem: {
        height: 30,
        paddingHorizontal: 8,
        marginHorizontal: 4,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default TabItem;
