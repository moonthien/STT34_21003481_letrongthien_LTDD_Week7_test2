import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DonutScreen from './screens/DonutScreen';
import DetailScreen from './screens/DetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DonutScreen">
        <Stack.Screen 
          name="DonutScreen" 
          component={DonutScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="DetailScreen" 
          component={DetailScreen} 
          options={{ 
            headerTitle: '',
            headerBackTitleVisible: false, 
            headerStyle: {
              elevation: 0, 
              shadowOpacity: 0, 
              borderBottomWidth: 0, 
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
