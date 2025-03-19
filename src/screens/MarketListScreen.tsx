
import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadMarketData } from '../features/market/marketSlice';
import { AppDispatch, RootState } from '../store';
import env from '../config/env';

const MarketListScreen = ({ navigation }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading } = useSelector((state: RootState) => state.market);

    useEffect(() => {
        dispatch(loadMarketData('4532'));
    }, [dispatch]);

    const handleCategoryPress = (categoryId: string, categoryName: string, categoriesIndex:number) => {
        navigation.navigate('MarketDetail', { categoryId, categoryName, categoriesIndex });
    };

    if (loading) return <Text>Loading...</Text>;

    return (
        <View style={styles.container}>
            <FlatList
                data={categories?.marketCategories}
                renderItem={({ item,index }) => {
                    const imageUri = `${env.IMAGE_BASE_URL}${item?.smallImageUrl}`;

                    return (
                        <TouchableOpacity onPress={() => handleCategoryPress(item.id, item.name['en-US'],index)}>
                            <View style={styles.categoryItem}>
                                <Image
                                    source={{ uri: imageUri }}
                                    resizeMode="cover"
                                    style={styles.categoryImage}
                                />
                                <Text style={styles.categoryText}>{item.name['en-US']}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        paddingVertical: 12,
        paddingHorizontal: 16,
        margin:12,
        borderRadius: 12,
        marginBottom: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    categoryImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    categoryText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        textTransform: 'capitalize',
    },
});

export default MarketListScreen;
