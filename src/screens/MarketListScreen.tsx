
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadMarketData } from '../reducer/market/marketSlice';
import { AppDispatch, RootState } from '../store';
import env from '../config/env';
import DropDownPicker from 'react-native-dropdown-picker';
import { setLanguage } from '../reducer/language/languageSlice';

const { width } = Dimensions.get('window');

const MarketListScreen = ({ navigation }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading } = useSelector((state: RootState) => state.market);
    const selectedLanguage = useSelector((state: RootState) => state.language);
    // console.log("🚀 ~ MarketListScreen ~ selectedLanguage:", selectedLanguage)

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(selectedLanguage?.language);

    const languages = [
        { label: 'English', value: 'en-US' },
        { label: 'Arabic', value: 'ar' },
        { label: 'Hebrew', value: 'he' },
        { label: 'French', value: 'fr' },
    ];

    useEffect(() => {
        dispatch(loadMarketData('4532'));
    }, [dispatch]);

    const handleCategoryPress = (categoryId: string, categoryName: string, categoriesIndex: number) => {
        navigation.navigate('MarketDetail', { categoryId, categoryName, categoriesIndex });
    };

    if (loading) return <Text>Loading...</Text>;

    const handleLanguageChange = (language: string) => {
        dispatch(setLanguage(language));
    };

    return (
        <View style={styles.container}>
            <View style={{alignItems:'flex-end'}}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={languages}
                    setOpen={setOpen}
                    setValue={setValue}
                    onChangeValue={(itemValue: any) => handleLanguageChange(itemValue)}
                    containerStyle={styles.dropdownContainer}
                    style={styles.dropdown}
                    // dropDownStyle={styles.dropdownList}
                    placeholder="Select Language"
                />
            </View>
            <FlatList
                data={categories?.marketCategories}
                renderItem={({ item, index }) => {
                    const imageUri = `${env.IMAGE_BASE_URL}${item?.smallImageUrl}`;

                    return (
                        <TouchableOpacity onPress={() => handleCategoryPress(item.id, item.name[selectedLanguage?.language], index)}>
                            <View style={styles.categoryItem}>
                                <Image
                                    source={{ uri: imageUri }}
                                    resizeMode="cover"
                                    style={styles.categoryImage}
                                />
                                <View style={styles.overlay}>
                                    <Text style={styles.categoryText}>{item.name[selectedLanguage?.language]}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                numColumns={2}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
        width: 168,
        height: 120,
        // borderRadius: 25,
        // marginRight: 16,
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
    title: {
        fontSize: 14,
        marginBottom: 4,
    },
    dropdownContainer: {
        width: '40%',
    },
    dropdown: {
        backgroundColor: '#fafafa',
        borderColor: '#ddd',
        borderWidth: 1,
    },
    dropdownList: {
        backgroundColor: '#fafafa',
    },
});

export default MarketListScreen;
