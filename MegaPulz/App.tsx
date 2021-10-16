/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import type { Node } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';


import Amplify from 'aws-amplify';
import config from './src/aws-exports';

import { withAuthenticator } from 'aws-amplify-react-native';
import { NativeScreenContainer } from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';


import VisitsLists from './src/pages/visitList/visitsList';
import SearchProfile from './src/pages/searchProfile/searchProfile';
import AddNewPatient from './src/pages/addNewPatient/addNewPatient';
import VisitDetails from './src/pages/VisitDetails/visitDetails';
import Examinations from './src/pages/Examinations/examinations'; 
import ViewAllergies from './src/pages/ViewAllergies/viewAllergies';
import Dashboard from './src/pages/dashboard/dashboard';
import HealthDiagnosis from './src/pages/HealthDiagnosis/HealthDiagnosis';
import HealthRecords from './src/pages/HealthRecords/HealthRecords';
import Authentiaction from './src/pages/AuthenticationScreen/authentication';
import SelectProfile from './src/pages/selectPatient/selectPatient';
import RequestAmbulance from './src/components/organisms/RequestAmbulance/index';
import LabReports from './src/pages/labreports/lab';
import RadiologyReports from './src/pages/radiology/radiology';
import SearchAppoinments from './src/components/organisms/Appointment/appointments';
import AppoinmentSummary from './src/components/organisms/Appointment/appointmentSummary'; 

Amplify.configure(config);

function App(){


  const profileStack =  createStackNavigator();
  const authStack = createStackNavigator();
  const emerstack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  
  
  
  
  const HomeStack= props => {
  
  
    return (
      
    
        <profileStack.Navigator  initialRouteName="Authentiaction" >
  
  
        <profileStack.Screen name = "Authentiaction" component ={Authentiaction}
        
        options={{
         
          headerStyle: {
            backgroundColor: '#09233e',
          },
          headerTintColor: '#3ab2c0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
  
        <profileStack.Screen name = "SelectProfile" component ={SelectProfile}
        
        options={{
         
          headerStyle: {
            backgroundColor: '#09233e',
          },
          headerTintColor: '#3ab2c0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        
        
        <profileStack.Screen name = "Dashboard" component ={Dashboard}
        
        options={{
         
          headerStyle: {
            backgroundColor: '#09233e',
          },
          headerTintColor: '#3ab2c0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <profileStack.Screen name = "SearchProfile" component ={SearchProfile} 
        
        options={{
         
          headerStyle: {
            backgroundColor: '#09233e',
          },
          headerTintColor: '#3ab2c0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <profileStack.Screen name = "VisitsLists" component ={VisitsLists} 
        
        options={{
         
          headerStyle: {
            backgroundColor: '#09233e',
          },
          headerTintColor: '#3ab2c0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <profileStack.Screen name = "ViewAllergies" component ={ViewAllergies} 
        
        options={{
         
          headerStyle: {
            backgroundColor: '#09233e',
          },
          headerTintColor: '#3ab2c0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <profileStack.Screen name = "AddNewPatient" component ={AddNewPatient} 
        
        options={{
         
          headerStyle: {
            backgroundColor: '#09233e',
          },
          headerTintColor: '#3ab2c0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <profileStack.Screen name = "VisitDetails" component ={VisitDetails} 
        
        options={{
         
          headerStyle: {
            backgroundColor: '#09233e',
          },
          headerTintColor: '#3ab2c0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <profileStack.Screen name = "Examinations" component ={Examinations}  
        
        options={{
         
          headerStyle: {
            backgroundColor: '#09233e',
          },
          headerTintColor: '#3ab2c0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <profileStack.Screen name = "HealthDiagnosis" component ={HealthDiagnosis} 
        
        options={{
         
          headerStyle: {
            backgroundColor: '#09233e',
          },
          headerTintColor: '#3ab2c0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <profileStack.Screen name = "HealthRecords" component ={HealthRecords} 
        
        
        options={{
         
          headerStyle: {
            backgroundColor: '#09233e',
          },
          headerTintColor: '#3ab2c0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <profileStack.Screen name = "RequestAmbulance" component ={RequestAmbulance} 
        
        options={{
         
          headerStyle: {
            backgroundColor: '#09233e',
          },
          headerTintColor: '#3ab2c0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <profileStack.Screen name = "LabReports" component ={LabReports} 
        
        
        options={{
         
          headerStyle: {
            backgroundColor: '#09233e',
          },
          headerTintColor: '#3ab2c0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <profileStack.Screen name = "RadiologyReports" component ={RadiologyReports} 
        
        options={{
         
          headerStyle: {
            backgroundColor: '#09233e',
          },
          headerTintColor: '#3ab2c0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <profileStack.Screen name = "SearchAppoinments" component ={SearchAppoinments} 
        
        options={{
         
          headerStyle: {
            backgroundColor: '#09233e',
          },
          headerTintColor: '#3ab2c0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <profileStack.Screen name = "AppoinmentSummary" component ={AppoinmentSummary} 
  
        options={{
        title: 'Profile',
        headerStyle: {
        backgroundColor: '#09233e',
        },
        headerTintColor: '#3ab2c0',
        headerTitleStyle: {
        fontWeight: 'bold',
        },
  }}
  />
        </profileStack.Navigator>
  
        
    );
  };
  
  
  const ProfileStack= props => {
  
  
    return (
      
    
        <authStack.Navigator  initialRouteName="Authentiaction" >
        
        <authStack.Screen name = "Authentiaction" component ={Authentiaction} 
  
        options={{
         
          headerStyle: {
            backgroundColor: '#09233e',
          },
          headerTintColor: '#3ab2c0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <authStack.Screen name = "SelectProfile" component ={SelectProfile} 
  
        options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor: '#09233e',
          },
          headerTintColor: '#3ab2c0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <authStack.Screen name = "SearchProfile" component ={SearchProfile} 
        
        options={{
         
          headerStyle: {
            backgroundColor: '#09233e',
          },
          headerTintColor: '#3ab2c0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        
        </authStack.Navigator>
  
        
    );
  };
  
  
  const EmerStack= props => {
  
  
    return (
      
    
        <emerstack.Navigator  initialRouteName="RequestAmbulance" >
        
        <emerstack.Screen name = "RequestAmbulance" component ={RequestAmbulance} 
  
        options={{
         
          headerStyle: {
            backgroundColor: '#09233e',
          },
          headerTintColor: '#3ab2c0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />    
        
        </emerstack.Navigator>
  
        
    );
  };
  
  

  
    return(
  
      <NavigationContainer>
  
        <Tab.Navigator 
      screenOptions = {({route}) => ({
        tabBarActiveTintColor : '#09233e',
        tabBarInactiveTintColor : '#3ab2c0',
        
       
  
  
      })}
      
    >
  
        
        
          
        <Tab.Screen name="HomeStack" component={HomeStack} 
                options={{
                  tabBarLabel: 'Dashboard',
                  tabBarIcon: ({ color, size }) => (
                    <View>  
                    <Icon name="clinic-medical" color={color} size={size} />
                    </View>                 
                  ),
                  headerShown : false,
                  }}
        
        />
       
       <Tab.Screen name="EmerStack" component={EmerStack} 
                options={{
                  tabBarLabel: 'Ambulance',
                  tabBarIcon: ({ color, size }) => (
                    <View>  
                    <Icon name="ambulance" color={color} size={size} />
                    </View>                 
                  ),
                  headerShown : false,
                  
                  
                  }}
        
        />
  
        </Tab.Navigator>
      </NavigationContainer>
  
  
    );
  
  }

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default withAuthenticator(App);
