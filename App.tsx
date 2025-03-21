
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './src/store';
import MarketListScreen from './src/screens/MarketList/MarketListScreen';
import MarketDetailScreen from './src/screens/MarketDetail/MarketDetailScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MarketList">
          <Stack.Screen name="MarketList" component={MarketListScreen} />
          <Stack.Screen name="MarketDetail" component={MarketDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
