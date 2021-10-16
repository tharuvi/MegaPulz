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

const profileStack =  createStackNavigator();

const App: () => Node = () => {


  return (
    <NavigationContainer>


      
      <profileStack.Navigator>
      <profileStack.Screen name = "Authentiaction" component ={Authentiaction} />
      <profileStack.Screen name = "SelectProfile" component ={SelectProfile} />
      <profileStack.Screen name = "Dashboard" component ={Dashboard} />
      <profileStack.Screen name = "SearchProfile" component ={SearchProfile} />
      <profileStack.Screen name = "VisitsLists" component ={VisitsLists} />
      <profileStack.Screen name = "ViewAllergies" component ={ViewAllergies} />
      <profileStack.Screen name = "AddNewPatient" component ={AddNewPatient} />
      <profileStack.Screen name = "VisitDetails" component ={VisitDetails} />
      <profileStack.Screen name = "Examinations" component ={Examinations}  />
      <profileStack.Screen name = "HealthDiagnosis" component ={HealthDiagnosis} />
      <profileStack.Screen name = "HealthRecords" component ={HealthRecords} />
      <profileStack.Screen name = "RequestAmbulance" component ={RequestAmbulance} />
      <profileStack.Screen name = "LabReports" component ={LabReports} />
      <profileStack.Screen name = "RadiologyReports" component ={RadiologyReports} />
      <profileStack.Screen name = "SearchAppoinments" component ={SearchAppoinments} />
      <profileStack.Screen name = "AppoinmentSummary" component ={AppoinmentSummary} />
      
      </profileStack.Navigator>

      

      

      
    </NavigationContainer>
    
  
  );
};

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
