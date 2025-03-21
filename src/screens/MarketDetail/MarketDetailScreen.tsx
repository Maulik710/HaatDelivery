import { View, Text, FlatList, StyleSheet, ActivityIndicator, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategoryDetails } from '../../reducer/market/marketSlice';
import { AppDispatch, RootState } from '../../store';
import { ProductItem, SubTabItem, TabItem } from './component';

type MarketCategory = {
    id: string;
    name: { [key: string]: string }
};

type MarketSubCategory = {
    id: string;
    name: { [key: string]: string }
    products: Product[];
};

type Product = {
    id: string;
    name: { [key: string]: string }
    pproductImages:any;
};


interface MarketDetailScreenProps {
    route: {
        params: {
            categoryId: string;
        };
    };
}

const MarketDetailScreen = ({ route }: MarketDetailScreenProps) => {
    const { categoryId } = route.params;

    const [activeTab, setActiveTab] = useState<number>(0);
    const [activeSubTab, setActiveSubTab] = useState<number>(0);
    const [endAfterScroll, setEndAfterScroll] = useState<boolean>(false);
    const lastScrollY = useRef(0);

    const dispatch = useDispatch<AppDispatch>();
    const { categoryDetails, categories, loading } = useSelector((state: RootState) => state.market);
    const { language } = useSelector((state: RootState) => state.language);

    const flatListRef = useRef<FlatList<MarketCategory>>(null);
    const flatListSubTabRef = useRef<FlatList<MarketSubCategory>>(null);
    const flatListItemsRef = useRef<FlatList<MarketSubCategory>>(null);


    const onLoadData = useCallback(() => {
        const initialCategoryIndex = categories?.marketCategories.findIndex(
            (category: any) => category.id === categoryId
        );
        if (initialCategoryIndex !== -1) {
            setActiveTab(initialCategoryIndex);
            dispatch(loadCategoryDetails({ marketId: '4532', categoryId }));
            if (flatListRef.current) {
                flatListRef.current.scrollToIndex({ index: initialCategoryIndex, animated: true });
            }
        }
    }, [categoryId, categories, dispatch]);

    useEffect(() => {
        onLoadData();
    }, [onLoadData]);


    const onViewableItemsChangedList = ({ viewableItems }: any) => {
        const visibleItemIndex = viewableItems[0]?.index ?? 0;
        setActiveSubTab(visibleItemIndex);
        flatListSubTabRef.current?.scrollToIndex({ index: visibleItemIndex, animated: true });
    };

    const handleTabPress = (index: number) => {
        setActiveTab(index);
        dispatch(loadCategoryDetails({ marketId: '4532', categoryId: categories?.marketCategories[index].id }));
        flatListRef.current?.scrollToIndex({ index, animated: true });
    };

    const handleSubTabPress = (index: number) => {
        setActiveSubTab(index);
        if (flatListSubTabRef.current) {
            flatListSubTabRef.current.scrollToIndex({ index: index, animated: true });
        }
        if (flatListItemsRef.current) {
            flatListItemsRef.current.scrollToIndex({ index: index, animated: true });
        }
    };

    const handleEndReached = () => {
        if (activeTab < categories?.marketCategories.length - 1) {
            setActiveTab(activeTab + 1);
            dispatch(loadCategoryDetails({ marketId: '4532', categoryId: categories?.marketCategories[activeTab + 1].id }));
            flatListRef.current?.scrollToIndex({ index: activeTab + 1, animated: true });
        }
    };

    const handleTopReached = () => {
        if (activeTab > 0) {
            setActiveTab(activeTab - 1);
            dispatch(loadCategoryDetails({ marketId: '4532', categoryId: categories?.marketCategories[activeTab - 1].id }));
            flatListRef.current?.scrollToIndex({ index: activeTab - 1, animated: true });
        }
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        // const scrollDifference = currentOffset - lastScrollY.current;

        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        // Calculate the distance from the bottom of the list
        const distanceFromBottom = contentSize.height - (contentOffset.y + layoutMeasurement.height);
        // console.log("🚀 ~ handleScroll ~ distanceFromBottom:", distanceFromBottom)

        // trigger an automatic scroll by a fixed amount.
        if (distanceFromBottom <= -30 && !endAfterScroll) {
            // console.log("New Bottom call");
            setEndAfterScroll(true)
            handleEndReached()

        }

        // If the user scrolls upward
        if (distanceFromBottom > 50 && endAfterScroll) {
            setEndAfterScroll(false)
        }

        lastScrollY.current = currentOffset;
    };

    const handleContentSizeChange = () => {
        if (flatListRef.current) {
            const initialCategoryIndex = categories?.marketCategories.findIndex(
                (category: any) => category.id === categoryId
            );
            if (initialCategoryIndex !== -1) {
                // Delay the scroll until content is ready
                setTimeout(() => {
                    try {
                        flatListRef.current?.scrollToIndex({
                            index: initialCategoryIndex,
                            animated: true,
                        });
                    } catch (error) {
                        console.warn('Error scrolling to category:', error);
                    }
                }, 100);  // Adjust timeout if needed
            }
        }
    };

    const getItemLayout = (data: ArrayLike<MarketCategory> | null | undefined, index: number) => ({
        length: 90,
        offset: 90 * index,
        index,
    });

    return (
        <View style={styles.container}>
            {/* Render categories */}
            <View>
                <FlatList
                    ref={flatListRef}
                    data={categories?.marketCategories}
                    style={styles.tabList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <TabItem
                            item={item}
                            index={index}
                            activeTab={activeTab}
                            language={language}
                            onTabPress={handleTabPress}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    getItemLayout={getItemLayout}
                    onContentSizeChange={handleContentSizeChange}
                />
            </View>

            {/* Render loading spinner or "Loading..." text if data is loading */}
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Loading...</Text>
                </View>
            ) : (
                <>
                    {/* Render subcategories */}
                    <View>
                        <FlatList
                            ref={flatListSubTabRef}
                            data={categoryDetails?.marketSubcategories}
                            style={styles.subTabList}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) => (
                                <SubTabItem item={item} index={index} activeSubTab={activeSubTab} language={language} onSubTabPress={handleSubTabPress} />
                            )}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    {/* Render products */}
                    <FlatList
                        ref={flatListItemsRef}
                        data={categoryDetails?.marketSubcategories}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <View key={index} style={styles.itemContainer}>
                                <FlatList
                                    data={item.products}
                                    contentContainerStyle={styles.productList}
                                    keyExtractor={(itm, ind) => ind.toString()}
                                    renderItem={({ item: itm, index: ind }:any) => <ProductItem key={ind} item={itm} language={language} />}
                                    numColumns={3}
                                    scrollEnabled={false}
                                />
                            </View>
                        )}
                        onViewableItemsChanged={onViewableItemsChangedList}
                        viewabilityConfig={{
                            viewAreaCoveragePercentThreshold: 50,
                        }}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        onMomentumScrollBegin={() => {
                            if (lastScrollY.current <= 0) {
                                handleTopReached();
                            }
                        }}
                    />
                </>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
    tabList: {
        height: 45,
        marginTop: 12,
    },
    subTabList: {
        height: 45,
        marginTop: 12,
    },
    itemContainer: {
        margin: 4,
    },
    productList: {
        paddingBottom: 60,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MarketDetailScreen;
