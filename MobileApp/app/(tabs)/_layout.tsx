import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { LikeProvider } from "@/contexts/LikeContext";

import HomeScreen from "./home"; 

const Tab = createBottomTabNavigator();

const TabLayout = () => {
  return (
    <LikeProvider>
      <Tab.Navigator>
        <Tab.Screen 
        name="Home" 
        component={HomeScreen} />
      </Tab.Navigator>
    </LikeProvider>
  );
};

export default TabLayout;   
