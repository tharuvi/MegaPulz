import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  Alert,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  View,
  ScrollView,
  Pressable,
  Button,
 
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import CheckBox from 'react-native-check-box';


export default function DocList({navigation}) {
  const [docList, setDocList] = useState([]);
  const [docId, setDocID] = useState('Any');
  const [sessionList, setSessionList] = useState([]);
  const [selectedValue, setSelectedValue] = useState('java');
  const [date, setDate] = useState(new Date());
  const [docsWithSessionList, setDocsWithSessionList] = useState([]);

  const [isAnydate, setIsAnydate] = useState(true);
  const [selectedDoctorId, setSelectedDoctorId] = useState();
  const [loading, setLoading] = useState(false);
  const [allDocswithSession, setAllDocsWithSession] = useState([]);
  const [allSessionswithDocDate, setAllSessionswithDocDate] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState('');
  const [clientPrimaryKey, setClientPrimaryKey] = useState('');
  
  useEffect(() => {
    getDocs();
  },[]); 

  useEffect(() => {
    if (docId == 'Any') {
      setSessionList([]); //empty the session list to prevent displaying redundant sessions
      getDocWithsession();
    }
  }, [docId,date,isAnydate]);

  // useEffect(() => {
  //   getDocWithsession();
  // },[date,isAnydate]); 

  useEffect(() => {
    if (docId != null && docId != 'Any' && isAnydate) {
      setSessionList([]);
      getSession();
    }
  }, [docId,date,isAnydate]);

  useEffect(() => {
    if (docId != null && docId != 'Any' && !isAnydate) {
      setSessionList([]);
      getSessionByDateAndDoctorID(docId,date);
    }
  }, [docId,date,isAnydate]);

  useEffect(() => {
    getClientPrimaryKey();
  });
  // useEffect(() => {
  //   getSessionsWithDate();
  // }, []);
 

 const getClientPrimaryKey = async () => {
  try {
      const value = await AsyncStorage.getItem('client_primary_key')
      if (value !== null) {
          setClientPrimaryKey(value);
          console.log("Client Primary Key ", value)
      }
  } catch (e) {
      console.log("Error reading Client Primary Key from Async Storage");
  }
}
  const getSession = (doctorId) => {
    setLoading(true);
    const doctorIdVar = doctorId? doctorId:docId;
    setSelectedDoctorId(doctorIdVar);

    axios
      .get(
        `https://aetc9mrrhb.execute-api.us-east-1.amazonaws.com/TESTING/DoctorSession/adminUser/${doctorIdVar}/date/Any`,
        {
          headers: {
            Authorization: 'Basic aGlzOmhpczEyMzQ1',
            'X-tenantID': 'D0001',
          },
        },
      )
      .then(function (response) {
        console.log(response);
        if (!response.data || response.data.length == 0) {
          
          (response.data);
          console.log('No session Availble');
          // Alert('No Session Availble');
          setSessionList([]);
        } else {
          console.log('getSession Available' + JSON.stringify(response.data));
          setSessionList(response.data);
         // alert(JSON.stringify(response.data));

        }
        setLoading(false);
      })
      .catch(function (error) {
        alert(error.message+"Getsession");
        setLoading(false);
      })
      .finally(function () {});
  };

  const getDocWithsession = () => {
//    alert(isAnydate); 
    setLoading(true);
    axios
      .post(
        `https://aetc9mrrhb.execute-api.us-east-1.amazonaws.com/TESTING/Schedule/sessionSearch`,

        {
          date: isAnydate? 'Any' : moment(date).format('DD-MM-YYYY'),
        },
        {
          headers: {
            Authorization: 'Basic aGlzOmhpczEyMzQ1',
            'X-tenantID': 'D0001',
          },
        },
      )
      .then(function (response) {
        console.log(response);
        if (!response.data || response.data.length == 0) {
          setSessionList(response.data);
          console.log('getDocWithsession not available');
          setDocsWithSessionList([]);
        } else {
          console.log('getDocWithsession Available' + JSON.stringify(response.data));

          setDocsWithSessionList(response.data);
          // response.data.forEach(doctor => { //loop the doctors
           
          //   getSessionByDocID(doctor);
          // });
         // setSessionList(response.data);
        }
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        alert(error.message+"getDocWithsession");
      })
      .finally(function () {});
  };

  const getSessionByDocID = (doctorId) => {
    console.log("DOCTOR:"+doctorId);
    axios
      .get(
        `https://aetc9mrrhb.execute-api.us-east-1.amazonaws.com/TESTING/DoctorSession/adminUser/${doctorId}/date/Any`,
        {
          headers: {
            Authorization: 'Basic aGlzOmhpczEyMzQ1',
            'X-tenantID': 'D0001',
          },
        },
      )
      .then(function (response) {

        console.log(response);
        if (!response.data || response.data.length == 0) {
          //setSessionList(response.data);
          console.log('No getSessionByDocID');
          Alert('No Session Availble');
        } else {
            let sessions = sessionList;
            sessions.push(response.data);
            // alert('Invoked');

          console.log('getSessionByDocID Available' + JSON.stringify(response.data));
          setSessionList(sessions);
        }
      })
      .catch(function (error) {
        alert(error.message+"");
        console.log('Catch failed');
      })
      .finally(function () {});
  };

  const getDocs = () => {
    axios
      .get(
        'https://ker4kwtfm0.execute-api.us-east-1.amazonaws.com/TESTING/AdminUser/role/1/hospital/D0001',
        {
          headers: {
            Authorization: 'Basic aGlzOmhpczEyMzQ1',
            'X-tenantID': 'D0001',
          },
        },
      )
      .then(function (response) {
        console.log(response);
        if (!response.data || response.data.length == 0) {
          console.log('No Doc Availble');
          Alert('No Doc Availble');
        } else {
          console.log('getDocs Doc Available' + JSON.stringify(response.data));
          setDocList(response.data);
          // navigation.navigate('AppoinmentSummary', { doctorDetails : response.data });
        }
      })
      .catch(function (error) {
        alert(error.message+"GetDoc");
      })
      .finally(function () {});
  };
//dates
  // const getSessionsWithDate = () => {
  //   axios
  //     .post(
  //       `https://aetc9mrrhb.execute-api.us-east-1.amazonaws.com/TESTING/Schedule/sessionSearch`,

  //       {
  //         date: moment(date).format('DD-MM-YYYY'),  //instead of any,passing the relevent date
  //       },
  //       {
  //         headers: {
  //           Authorization: 'Basic aGlzOmhpczEyMzQ1',
  //           'X-tenantID': 'D0001',
  //         },
  //       },
  //     )
  //     .then(function (response) {
  //       console.log(response);
  //       if (!response.data || response.data.length == 0) {
  //         setAllDocsWithSession(response.data);
  //         console.log('Dates are NOT available');
  //         Alert('No Session List Availble');
  //       } else {
  //         console.log('getSessionsWithDate DATES ARE Available' + JSON.stringify(response.data));
  //         response.data.forEach(doctor => { //loop the doctors
  //           getSessionByDocID(doctor);
  //         });
  //         setAllDocsWithSession(response.data);
  //       }
  //     })
  //     .catch(function (error) {
  //       alert(error.message);
  //     })
  //     .finally(function () {});
  // };

  const getSessionByDateAndDoctorID = (doctorId,appointmentDate) => {
   const formattedDate = moment(appointmentDate).format('DD-MM-YYYY');
    axios
      .get(
        `https://aetc9mrrhb.execute-api.us-east-1.amazonaws.com/TESTING/DoctorSession/adminUser/${doctorId}/date/${formattedDate}`,
        {
          headers: {
            Authorization: 'Basic aGlzOmhpczEyMzQ1',
            'X-tenantID': 'D0001',
          },
        },
      )
      .then(function (response) {

        console.log(response);
        if (!response.data || response.data.length == 0) {
          setSessionList(response.data);
          console.log('No getSessionByDateAndDoctorID');
         
        } else {
            let sessions = sessionList;
            sessions.push(response.data);

          console.log('getSessionByDateAndDoctorID Available' + JSON.stringify(response.data));
          setSessionList(sessions);
        }
      })
      .catch(function (error) {
        alert(error.message);
        console.log('Catch failed');
      })
      .finally(function () {});
  };
  

  return (
    <ScrollView>

      
      <View style={styles.container4}>
        <Text
          style={{
            marginTop: 20,
            fontSize: 22,
            marginBottom: 20,
            fontWeight: 'bold',
            backgroundColor: '#BEEEF3',
          }}>
          Select preferred Doctor
        </Text>
        <View
          style={{borderWidth: 1, borderColor: '#BEEEF3', borderRadius: 35}}>
          <Picker
            style={{borderColor: '#BEEEF3'}}
            selectedValue={docId}
            style={{
              height: 50,
              width: 250,
              color: 'black',
              placeholderTextColor: '#BEEEF3',
            }}
            onValueChange={(itemValue, itemIndex) => setDocID(itemValue)}>
            <Picker.Item label={'Any'} value={'Any'} />
            {docList.map(doctor => (
              <Picker.Item
                label={`${doctor.hrEmployee.firstName} ${doctor.hrEmployee.lastName}`}
                value={doctor.id}
              />
            ))}
          </Picker>
        </View>
      </View>
      {/* <View style={styles.container} behavior="padding"> */}
      <Text
        style={{
          marginTop: 20,
          fontSize: 22,
          marginBottom: 20,
          fontWeight: 'bold',
          backgroundColor: '#BEEEF3',
        }}>
        Select preferred date
      </Text>
      <View>
        <TouchableOpacity  style={styles.Anybutton}onPress = {()=>setIsAnydate(!isAnydate)}><Text style={{backgroundColor: isAnydate?'#66BECC': null}}>Click here to choose any date</Text></TouchableOpacity>
      </View>
      <DatePicker
        date={date}
        onDateChange={setDate}
        mode="date"
        androidVariant="nativeAndroid"
        fadeToColor="none"
      />
     
      
{/* <View> 
<CheckBox
    style={{flex: 1, padding: 10}}
    onClick={()=>{
     setIsAnydate(!isAnydate);
    }}
    isAnydate={isAnydate}
    leftText={"Any Date"}
/>
</View> */}
      {/* <View style={styles.container4}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 250 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        {sessionList.map((session)=> (

<Picker.Item label={moment(session.sessionStartTime).format('DD/MM/YYYY HH:MM')}  value={session.id} />
))}
      </Picker>

      </View> */}
 
{docId == 'Any' && (
  <>
<Text>
  
  Available Doctors </Text>
     
      {loading? (<Text>Loading</Text>): (
      <FlatList
       
        data={docList.filter((doctor)=>docsWithSessionList.includes(doctor.id))}
        renderItem={(doctor) => (
          <>
         
          <TouchableOpacity onPress = {()=> getSession(doctor.item.id)}>
         
          <Text
          style={{
            backgroundColor: '#BEEEF3',
            padding: 20,
            marginVertical: 8,
            marginHorizontal: 16,
            borderRadius: 25,
          }}>
           {`${doctor.item.hrEmployee.firstName} ${doctor.item.hrEmployee.lastName}`}
           {/* {JSON.stringify(doctor.item.hrEmployee.firstName)} */}
          </Text>
         
          </TouchableOpacity>
          {selectedDoctorId == doctor.item.id &&(
          <FlatList
       
       data={sessionList}
       renderItem={(session) => (
        <View>
        <Pressable

        onPress={() => {
           { navigation.navigate('AppoinmentSummary', { doctorDetails: doctor.item})}
           navigation.navigate('AppoinmentSummary', { sessionObj: session.item, doctorDetails:doctor.item});
        }}
        >
         <Text
         style={{
           backgroundColor: '#66BECC',
           padding: 20,
           marginVertical: 8,
           marginHorizontal: 16,
           borderRadius: 5,
           width: 300,
           fontWeight: 'bold',
           fontSize: 15,
         }}
         >
            {moment(session?.item.sessionStartTime).format('DD/MM/YYYY HH:MM')}{' '} 
            
           
         </Text>
         </Pressable>  
       
       </View>
       )}
       keyExtractor={item => item.id}
     />
     ) }
          </>
          
        )}
        keyExtractor={doctor => doctor.id}
      />)}
    </>)}

    {docId != 'Any' && (
  <>
      <Text
        style={{
          marginTop: 20,
          fontSize: 22,
          marginBottom: 20,
          fontWeight: 'bold',
          backgroundColor: '#BEEEF3',
        }}>
          
     
        Available Time Slots
      </Text>
      {loading? (<Text>Loading</Text>): (
      <FlatList
       
        data={sessionList}
        renderItem={(session) => (

          <View>
          <Pressable
  
          onPress={() => {
          navigation.navigate('AppoinmentSummary', { sessionObj: session,doctorDetails:docList.find((doctor)=>doctor.id == docId)});
          }}
          >
          <Text
          style={{
            backgroundColor: '#BEEEF3',
            padding: 20,
            marginVertical: 8,
            marginHorizontal: 16,
            borderRadius: 25,
          }}
          >
           {moment(session?.item.sessionStartTime).format('DD/MM/YYYY HH:MM')}{' '} 
          </Text>
          </Pressable>  
       
       </View>
        )}
        keyExtractor={item => item.id}
      />)}
      </>)}
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 50,
    marginBottom: 50,
  },

  lables: {
    fontSize: 20,
    marginBottom: 20,
  },
  Button: {
    marginTop: 100,
    width: 40,
    color: 'red',
  },
  item: {
    backgroundColor: '#BEEEF3',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 25,
  },
  Anybutton: {
    alignItems: "center",
    backgroundColor: "#CDEDEE",
    padding: 10,
    width: 250,
    borderRadius: 5,
    borderColor: '#0B0E22'
    
  },
  container: {
    flex: 1,

    flexDirection: 'column',

    justifyContent: 'flex-start',

    alignItems: 'center',

    marginTop: 20,
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
});
