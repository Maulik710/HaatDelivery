import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import env from '../../../config/env';


const { width } = Dimensions.get('window');

type CategoryItemProps = {
    item: {
        id: string;
        name: { [key: string]: string };
        smallImageUrl: string;
    };
    selectedLanguage: string;
    onCategoryPress: (categoryId: string, categoryName: string) => void;
};

const CategoryItem = ({ item, selectedLanguage, onCategoryPress }: CategoryItemProps) => {
    const imageUri = `${env.IMAGE_BASE_URL}${item.smallImageUrl}`;

    return (
        <TouchableOpacity onPress={() => onCategoryPress(item.id, item.name[selectedLanguage])}>
            <View style={styles.categoryItem}>
                <Image source={{ uri: imageUri }} resizeMode="cover" style={styles.categoryImage} />
                <View style={styles.overlay}>
                    <Text style={styles.categoryText}>{item.name[selectedLanguage]}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    categoryItem: {
        flex: 1,
        height: 140,
        width: width / 2 - 20,
        margin: 10,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    categoryImage: {
        width: '100%',
        height: '100%',
    },
    categoryText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        textTransform: 'capitalize',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Transparent white box
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
});

export default CategoryItem;
