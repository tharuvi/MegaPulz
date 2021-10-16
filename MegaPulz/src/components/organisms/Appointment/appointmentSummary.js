import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Linking,
  ScrollView,
  TextInput,
  Alert,
  Button,
} from 'react-native';

import moment from 'moment';
import {StackActions} from '@react-navigation/routers';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function appointmentSummary({route,navigation}) {


const [patientDetails, setPatientDetails] = useState(null);
const [hospitalDetails, setHospitalDetails] = useState(null);

const [servicePrice, setServicePrice] = useState('');
const [serviceName, setServiceName] = useState('');
const [serviceId, setServiceId] = useState('');
const [total, setTotal] = useState('');
const [timeSlot, setTimeSlot] = useState('');
const {sessionObj}  = route.params;
const {doctorDetails} = route.params;
const patientKey = route.params;
const [clientPrimaryKey, setClientPrimaryKey] = useState('');
//const [doctorDetails, setDocList] = useState([]);
const [doctorConsultFee, setDoctorConsultFee] = useState('');



useEffect(() => {
  getClientPrimaryKey();
});

useEffect(() => {
  getPatientDetails();
});

useEffect(() => {
  // console.log(clientPrimaryKey);
  // getPatientDetails();
  getHospital();
});

useEffect(() => {
  getDoctorConsultationFee();
}, [doctorDetails]);

useEffect(() => {
  getServicePrice();
}, [sessionObj]);

useEffect(() => {
  calculateTimeSlot();
}, [sessionObj]);

useEffect(() => {
  calculateTotal();
}, [servicePrice, doctorConsultFee]);


const getClientPrimaryKey = async () => {
  try {
      const value = await AsyncStorage.getItem('client_primary_key')
      if (value !== null) {
          setClientPrimaryKey(value);
         // console.log("Client Primary Key ", value)
      }
  } catch (e) {
      console.log("Error reading Client Primary Key from Async Storage");
  }
}

//alert('paramobj'+JSON.stringify(sessionObj));
 //alert('DOCTORSSSSSSS'+JSON.stringify(doctorDetails));

const getHospital = async => {
  return axios
    .get(
      `https://1gedxwzv7b.execute-api.us-east-1.amazonaws.com/TESTING/HrHospitalDetails/HIN/D0001`,

      {
        headers: {
          Authorization: 'Basic aGlzOmhpczEyMzQ1',
          'X-tenantID': "D0001",
        },
      },
    )
    .then(res => {
      setHospitalDetails(res.data);
      console.log(res.data);
    })
    .catch(error => console.log(error.message));
};




const getPatientDetails = async => {
  return axios
    .get(
      `https://aetc9mrrhb.execute-api.us-east-1.amazonaws.com/TESTING/Patient/` +
        clientPrimaryKey,
      {
        headers: {
          Authorization: 'Basic aGlzOmhpczEyMzQ1',
          'X-tenantID': 'D0001',
        },
      },
    )
    .then(res => {
      setPatientDetails(res.data);
     // console.log('PATIENT DETAILS', res.data);
    })
    .catch(error => console.log(error.message));
};

const getServicePrice = async key => {
  const res = await axios
    .get(
      'https://2xvis2c3fj.execute-api.us-east-1.amazonaws.com/TESTING/Service/' +
      sessionObj.clinicType.service,

      {
        headers: {
          Authorization: 'Basic aGlzOmhpczEyMzQ1',
          'X-tenantID': 'D0001',
        },
      },
    )
    .then(function(response) {
      console.log('SERVICE PRICE DATA', response.data);

      var sum = 0;
      for (var i = 0; i < response.data.serviceTypePrices.length; i++) {
        sum += response.data.serviceTypePrices[i].price;
        // consultFee = response.data.serviceTypePrices[i].serviceType.name == "Consultant Fee"
      }
      setServicePrice(sum);
      setServiceName(response.data.name);
      setServiceId(response.data.id);

      console.log(
        'Service Price  ',
        sum,
        '  Service Name  ',
        response.data.name,
        ' Service ID ',
        response.data.id,
      );
      setFetching(false)
    })
    .catch(function(error) {
      console.log(error.message);
    })
    .finally(function() {});
};

const getDoctorConsultationFee = async () => {
  const res = await axios
    .get(
      'https://2xvis2c3fj.execute-api.us-east-1.amazonaws.com/TESTING/Doctor/getByHrDocId/' +
        doctorDetails.id,

      {
        headers: {
          Authorization: 'Basic aGlzOmhpczEyMzQ1',
          'X-tenantID': 'D0001',
        },
      },
    )
    .then(function(response) {
      console.log('CHARGE MASTER DOCTOR', response.data);

      setDoctorConsultFee(response.data.consultantFee);
      console.log('CONSULTANT FEE', response.data.consultantFee);
    })
    .catch(function(error) {
      console.log(error.message);
    })
    .finally(function() {});
};

function calculateTimeSlot() {
  var end = moment(sessionObj.sessionEndTime);
  var start = moment(sessionObj.sessionStartTime);
  //Get Time duration in minutes
  console.log('End Date -- ' + end.format('d-m-y : h.m'));
  console.log('Start Date -- ' + start.format('d-m-y : h.m'));
  var duration = moment.duration(end.diff(start)).asMinutes();
  console.log('Duration ' + duration);

  //calculate time for one session
  var timeForSession = duration / sessionObj.maxQueueCount;
  console.log('Duration for one session ' + timeForSession);

  //get time of current session
  var time = start.add(
    timeForSession * sessionObj.appointmentCount,
    'minutes',
  );
  console.log('Time Calculated for session --- ' + time.format('hh:mm'));

  setTimeSlot(time.format('hh:mm A'));
}

const calculateTotal = () => {
  var total = servicePrice + doctorConsultFee;
  setTotal(total);
};
function invoiceNumberTemplate() {
  var month = '';
  var date = '';
  var hour = '';
  var min = '';
  var sec = '';
  var today = new Date();

  if ((today.getMonth() + 1).toString().length != 2)
    month = '0' + (today.getMonth() + 1);
  else month = (today.getMonth() + 1).toString();

  if (today.getDate().toString().length != 2) date = '0' + today.getDate();
  else date = today.getDate().toString();

  var curDate = today.getFullYear() + month + date;

  return curDate;
}


const sendFormData = async () => {
  setBtnLoading(true);
  const aptData = {
    appointment: {
      patient: patientDetails.id, //patient id or HIN?
      number: 0,
      primaryFollowUp: 'Primary',
      remarks: null,
      session: sessionObj.id, //doctor session id
      paymentStatus: false,
      docAdminUser: doctorDetails.id, // doctor id (mentioned in shedule)
      title: patientDetails.title, //patient patient title
      fullName: patientDetails.fullName, //patient name
      telephone: patientDetails.telephone, //patient phone number
      queueType: -1,
      loggeduser: 0,
      online: true,
    },
    bill: {
      vat: 0,
      totalAmount: total,
      invoiceNumber: invoiceNum,
      patientHIN: patientDetails.hin,
      patientAddress: null,
      doctorId: 1,
      bhtNo: 0,
      discount: 0,
      isTotDiscountTypeRs: true,
      phone: patientDetails.telephone,
      createdUser: 0,
      patientName: patientDetails.fullName,
      doctorName:
        'Dr. ' +
        doctorDetails.hrEmployee.firstName +
        ' ' +
        doctorDetails.hrEmployee.lastName,
      billAt: 'V',
      paymentType: 'Visa',
      paymentMethod: 'Card',
      paidStatus: false,
      recievedAmount: 0,
      active: false,
      status: 'P',
      advance: 0,
      subscribFor: null,
      poNumber: null,
      totDiscountAmount: 0,
      serviceBillPayments: [
        {
          paymentType: 'Visa',
          paymentMethod: 'Card',
          amount: total,
          createdUser: '',
        },
      ],
      serviceBillItems: [
        {
          discount: 0,
          isDiscountTypeRs: true,
          particulars: serviceName,
          rate: total,
          serviceCode: 'ASC',
          serviceId: serviceId,
          userId: '',
          tax: 0,
          amount: total,
          billRequestId: 0,
          qty: 1,
          openProcedureBillItems: [
            {
              discount: 0,
              isDiscountTypeRs: true,
              particulars: 'Consultant Fee',
              rate: doctorConsultFee, //change
              serviceCode: 'SC',
              serviceId: 1,
              amount: doctorConsultFee, //change
              userId: 0,
              tax: 0,
              departmentId: 0,
              qty: 1,
            },
            {
              discount: 0,
              isDiscountTypeRs: true,
              particulars: serviceName,
              rate: servicePrice,
              serviceCode: 'SC',
              serviceId: serviceId,
              amount: servicePrice,
              userId: 0,
              tax: 0,
              departmentId: 0,
              qty: 1,
            },
          ],
        },
      ],
    },
    URL: "vetpulz-test",
  };

  var formdata = new FormData();

  console.log('BILL APPOINTMENT OBJECT', JSON.stringify(aptData));
  formdata.append('BillAppointmentObject', JSON.stringify(aptData));

  // setAnimating(true);
  // setIsPayLoading(true);
  const res = await fetch(
    'https://' +
    'vetpulz-test'+
    '.digitalpulzhealth.com/Appointment/index.php/Appointment_controller/mobileAppointmenet/D0001',
    {
      method: 'POST',
      body: formdata,
    },
    
  )

  .then(function(response) {
      alert("Session added!!!");
  })
  .catch(function(error) {
    alert(JSON.stringify(error));
  })

  setBtnLoading(false);
  const json = await res.text();
  console.log(' BODY', JSON.stringify(aptData));
  console.log(' RESPONSE', json);

  Linking.openURL(json);

  // setAnimating(false);
  // setIsPayLoading(false);
  if (res.status == 400) {
    console.log('Error IS', json.error);
  } else if (res.status == 500) {
    console.log('internal server error');
  }

  navigation.navigate('AppOverview');
};

  return (

<ScrollView>
<Text style = {styles.lable}>Patient Details</Text>
    <View style = {styles.unedits}>
      <Text style = {styles.lable}>Name :</Text>
      <Text style = {styles.txtIn}>{patientDetails ? patientDetails.fullName : 'Fetching...'}</Text> 
    </View>

    <View style = {styles.unedits}>
      <Text style = {styles.lable}>Nic :</Text>
      <Text style = {styles.txtIn}>{patientDetails ? patientDetails.nic : 'Fetching...'}</Text> 
    </View>

    <View style = {styles.unedits}>
      <Text style = {styles.lable}>Tel :</Text>
      <Text style = {styles.txtIn}>{patientDetails ? patientDetails.telephone : 'Fetching...'}</Text> 
    </View>

    <Text style = {styles.lable}>Appointment Details</Text>
    <View style = {styles.unedits}>
      <Text style = {styles.lable}>Date :</Text>
      <Text style = {styles.txtIn}> {moment(sessionObj.sessionStartTime).format(
                  'DD-MM-YYYY (dddd)',
                )}</Text> 
    </View>

    <View style = {styles.unedits}>
      <Text style = {styles.lable}>Time :</Text>
      <Text style = {styles.txtIn}>{timeSlot ? timeSlot : 'Fetching...'}</Text> 
    </View>

    <View style = {styles.unedits}>
      <Text style = {styles.lable}>Hospital :</Text>
      <Text style = {styles.txtIn}>{hospitalDetails ? hospitalDetails.hospitalName : 'Fetching...'}</Text> 
    </View>

    <View style = {styles.unedits}>
      <Text style = {styles.lable}>Doctor :</Text>
      <Text style = {styles.txtIn}> 
       {
                doctorDetails.hrEmployee.firstName +
                ' ' +
                doctorDetails.hrEmployee.lastName} 
                </Text> 
    </View>

    <View style = {styles.unedits}>
      <Text style = {styles.lable}>Total :</Text>
      <Text style = {styles.txtIn}>{total ? total : 'Calculating...'}</Text> 
    </View>

    <Button
        title="Confirm Appointment"
        onPress={() => sendFormData()}
      />

    </ScrollView>
    
  )
  
};
const styles = StyleSheet.create({
  
  unedits : {
  flexDirection: 'row',
  alignItems:'center',
  justifyContent: 'space-between',
  marginBottom: 15,
},

lable : {
  color: '#061a31',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 20,
},

txtIn : {
      backgroundColor: '#CDF2F7',
      color: '#0c213e',
      fontSize: 15,
      fontWeight: 'bold',
      marginLeft : 10,
      marginRight: 50,
      height:40,
      width: 260,       
      borderWidth: 1, 
},

txtInEd : {
  backgroundColor: '#CDF2F7',
  color: '#0c213e',
  fontSize: 15,
  fontWeight: 'bold',
  marginLeft : 10,
  
  height:40,
  width: 260,       
  borderWidth: 1, 
  },




editables : {
  flexDirection: 'row',
  alignItems:'center',

},

editbtn: {
    width: 30,
    height: 30,
    alignItems:'flex-end',
    marginRight: 15,


},




})

