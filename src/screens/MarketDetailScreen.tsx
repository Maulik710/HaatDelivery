import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategoryDetails } from '../features/market/marketSlice';
import { AppDispatch, RootState } from '../store';
import env from '../config/env';

const { height } = Dimensions.get('window');


const MarketDetailScreen = ({ route }: any) => {
    const { categoryId } = route.params;
    const dispatch = useDispatch<AppDispatch>();
    const { categoryDetails } = useSelector((state: RootState) => state.market); //loading
    const { categories } = useSelector((state: RootState) => state.market);
    // console.log("🚀 ~ MarketDetailScreen ~ categories:", categories)

    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
    const [selectedSubcategoryIndex, setSelectedSubcategoryIndex] = useState<number>(0);
    const subcategoriesFlatListRef = useRef<FlatList>(null);
    const productsFlatListRef = useRef<FlatList>(null);
    const scrollTopRef = useRef<boolean>(false)
    const scrollBottomRef = useRef<boolean>(false)

    useEffect(() => {
        const initialCategoryIndex = categories?.marketCategories.findIndex(
            (category: any) => category.id === categoryId
        );
        if (initialCategoryIndex !== -1) {
            setSelectedCategoryIndex(initialCategoryIndex);
            dispatch(loadCategoryDetails({ marketId: '4532', categoryId }));
        }
    }, [dispatch, categoryId, categories]);

    const onViewableItemsChanged = ({ viewableItems }: any) => {
        // Assuming you want to track the first visible item's index in the FlatList
        const visibleItemIndex = viewableItems[0]?.index ?? 0;  // Default to 0 if no visible item
        setSelectedSubcategoryIndex(visibleItemIndex);
    };


    const onScroll = (event: any) => {
        const contentOffsetY = event.nativeEvent.contentOffset.y;
        const contentHeight = event.nativeEvent.contentSize.height;
        const layoutHeight = event.nativeEvent.layoutMeasurement.height;

        if (contentOffsetY <= 0 && !scrollTopRef.current) {
            scrollTopRef.current = true
            console.log('Scrolled to top:')
            if (selectedCategoryIndex > 0) {
                // Scroll past the first subcategory, move to the previous category
                setSelectedCategoryIndex(selectedCategoryIndex - 1);
                dispatch(loadCategoryDetails({ marketId: '4532', categoryId: categories.marketCategories[selectedCategoryIndex - 1].id }));
            }
            setTimeout(() => {
                scrollTopRef.current = false
            }, 500)
        }

        if (contentOffsetY + layoutHeight >= contentHeight && !scrollBottomRef.current) {
            scrollBottomRef.current = true
            console.log('Scrolled to bottom:')
            if (selectedCategoryIndex < categories.marketCategories.length - 1 && selectedSubcategoryIndex === categoryDetails?.marketSubcategories?.length - 1) {
                // Scroll past last subcategory, move to next category
                setSelectedCategoryIndex(selectedCategoryIndex + 1);
                setSelectedSubcategoryIndex(0)
                dispatch(loadCategoryDetails({ marketId: '4532', categoryId: categories.marketCategories[selectedCategoryIndex + 1].id }));
            }
            setTimeout(() => {
                scrollBottomRef.current = false
            }, 500)
        }
    };

    const scrollToSelectedSubcategory = (id: number | null) => {
        if (id !== null && subcategoriesFlatListRef.current) {
            if (id >= 0) {
                subcategoriesFlatListRef.current.scrollToIndex({ index: id, animated: true });
            }
        }
    };

    useEffect(() => {
        if (categoryDetails?.marketSubcategories?.length > 0) {
            scrollToSelectedSubcategory(selectedSubcategoryIndex);
        }
    }, [selectedSubcategoryIndex, categoryDetails]);

    // if (loading) return <Text>Loading...</Text>;

    const scrollToProducts = (index: number) => {
        if (productsFlatListRef.current && categoryDetails?.marketSubcategories) {
            productsFlatListRef.current.scrollToIndex({ index, animated: true });
        }
    };

    const handleCategorySelect = (index: number, catId: string) => {
        setSelectedCategoryIndex(index);
        setSelectedSubcategoryIndex(0); // Reset subcategory index when category changes
        dispatch(loadCategoryDetails({ marketId: '4532', categoryId: catId })); // Load new category details
    };

    const handleSubcategorySelect = (index: number) => {
        setSelectedSubcategoryIndex(index); // Set the selected subcategory index
        scrollToProducts(index);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={categories?.marketCategories}
                style={{ height: 45, backgroundColor: 'white' }}
                contentContainerStyle={{ alignItems: 'center' }}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{ height: 30, paddingHorizontal: 8, marginHorizontal: 4, borderRadius: 18, backgroundColor: index === selectedCategoryIndex ? 'pink' : 'transparent', alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => handleCategorySelect(index, item.id)}
                    >
                        <Text>{item.name['en-US']}</Text>
                    </TouchableOpacity>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
            <FlatList
                ref={subcategoriesFlatListRef}
                data={categoryDetails?.marketSubcategories}
                style={{ height: 45 }}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{ height: 30, paddingHorizontal: 8, marginHorizontal: 4, borderBottomWidth: 1, borderBottomColor: index === selectedSubcategoryIndex ? 'blue' : 'transparent', alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => handleSubcategorySelect(index)}
                    >
                        <Text>{item.name['en-US']}</Text>
                    </TouchableOpacity>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
            {/* Item List */}
            <FlatList
                ref={productsFlatListRef}
                data={categoryDetails?.marketSubcategories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <View style={{ height: height - 142, justifyContent: 'center', alignItems: 'center', backgroundColor: item.bgColor }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                                <Text style={{ fontSize: 14, color: 'grey' }} >{item.name['en-US']}</Text>
                                <View style={{ height: 1, backgroundColor: 'grey', flex: 1 }} />
                            </View>
                            <ScrollView style={{ height: height - 140 }} showsVerticalScrollIndicator={false}  >
                                <FlatList
                                    data={item.products}
                                    keyExtractor={(itm) => itm.id}
                                    numColumns={3} // This creates a 3-item grid
                                    renderItem={({ item: itm }) => {
                                        const imageUri = `${env.IMAGE_BASE_URL}${itm?.productImages[0]?.smallImageUrl}`;
                                        return (
                                            <View style={{ height: 180, width: 110, backgroundColor: 'white', margin: 4, padding: 8, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
                                                <Image
                                                    source={{ uri: imageUri }}
                                                    resizeMode="cover"
                                                    style={styles.categoryImage}
                                                />
                                                <Text style={{ fontSize: 12, fontWeight: '500' }}>{itm.name['en-US']}</Text>
                                            </View>
                                        );
                                    }}
                                />
                            </ScrollView>
                        </View>
                    )
                }}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 50,  // Ensure item is at least 50% visible
                }}
                showsVerticalScrollIndicator={false}
                pagingEnabled={true}
                onScroll={onScroll}
                scrollEventThrottle={16}
            />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    categoryImage: {
        width: 50,
        height: 50,
    },
});

export default MarketDetailScreen;
