
 // App.js

 import React, { Component } from 'react';
 import { StyleSheet, View } from 'react-native';
 import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
 
 
 export default class App extends Component {
   constructor(props) {
     super(props);
     this.state = {
       HeadTable: ['Date', 'Weight', 'Height', 'BP', 'Temp(F)'],
       DataTable: [
         ['11/3/2021', '28KG', '20ft', '40', '100F'],
         ['11/3/2021', '28KG', '20ft', '40', '100F'],
         ['11/3/2021', '28KG', '20ft', '40', '100F'],
         ['11/3/2021', '28KG', '20ft', '40', '100F'],
       ]
     }
   }
 
   render() {
     const state = this.state;
     return (
       <View style={styles.container}>
         <Table style ={{backgroundColor: '#B3E7EC' , borderRadius: 20, }}borderStyle={{borderWidth: 1, borderColor: '#B3E7EC'}}>
           <Row data={state.HeadTable} style={styles.HeadStyle} textStyle={styles.TableText}/>
           <Rows data={state.DataTable} textStyle={styles.TableText}/>
         </Table>
       </View>
     )
   }
 }
 
 const styles = StyleSheet.create({
   container: { 
    
     padding: 18,
     paddingTop: 35,
     backgroundColor: '#ffffff' 
   },
   HeadStyle: { 
     borderRadius: 20,
     height: 50,
     alignContent: "center",
     backgroundColor: '#B3E7EC'
   },
   TableText: { 
     margin: 10,
     backgroundColor: '#B3E7EC',
     color:'#4FC9D3'
   }
  
 });