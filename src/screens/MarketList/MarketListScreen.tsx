import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadMarketData } from '../../reducer/market/marketSlice';
import { AppDispatch, RootState } from '../../store';
import DropDownPicker from 'react-native-dropdown-picker';
import { setLanguage } from '../../reducer/language/languageSlice';
import { CategoryItem } from './component';


type MarketListScreenProps = {
    navigation: any;
};

const MarketListScreen = ({ navigation }: MarketListScreenProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading } = useSelector((state: RootState) => state.market);
    const selectedLanguage = useSelector((state: RootState) => state.language);

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

    const handleCategoryPress = (categoryId: string, categoryName: string) => {
        navigation.navigate('MarketDetail', { categoryId, categoryName });
    };

    const handleLanguageChange = (language: string | null) => {
        if (language) dispatch(setLanguage(language));
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.loaderText}>Loading Categories...</Text>
                </View>
            ) : (
                <>
                    <View style={styles.dropdownContainer}>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={languages}
                            setOpen={setOpen}
                            setValue={setValue}
                            onChangeValue={(itemValue: string | null) => handleLanguageChange(itemValue)}
                            containerStyle={styles.dropdownContainerStyle}
                            style={styles.dropdown}
                            placeholder="Select Language"
                        />
                    </View>
                    <FlatList
                        data={categories?.marketCategories}
                        renderItem={({ item }) => (
                            <CategoryItem
                                item={item}
                                selectedLanguage={selectedLanguage?.language || 'en-US'}
                                onCategoryPress={handleCategoryPress}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    dropdownContainer: {
        alignItems: 'flex-end',
    },
    dropdownContainerStyle: {
        width: '40%',
    },
    dropdown: {
        backgroundColor: '#fafafa',
        borderColor: '#ddd',
        borderWidth: 1,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
});

export default MarketListScreen;
