import React,  {Component} from 'react'
import { StyleSheet,Text,View, FlatList } from 'react-native'
import { backgroundColor, textColor } from 'styled-system'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


export default class Examinations extends Component{
    constructor(props){
        super(props)
            this.state = {
                HeadTable: ['Date', 'Weight', 'Height', 'BP', 'Temp(F)'],
                DataTable: [
                  ['23/10/2020', '60KG', '200ft', '120', '90.5F'],
                  ['19/12/2020', '20KG', '200ft', '120', '98.6F'],
                  ['8/1/2021'  , '30KG', '100ft', '120', '95.0'],
                  ['28/1/2021' , '50KG', '200ft', '120', '98.6F'],
                ],
                isLoading : true,
                dataSource: []
            }  
                 
    }

    //fetch api data
    componentDidMount(){
        fetch('https://aetc9mrrhb.execute-api.us-east-1.amazonaws.com/TESTING/Patient/1')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("api call ==>", responseJson)  
            this.setState({
                isLoading: false,
                dataSource: responseJson
            })
        })
    }

   

    _renderItem = ({item,index}) => {
        return(           
            <View style={styles.item}>      
             <Text>{item.address + ","+ item.civilStatus + "," +item.nic }</Text>
            </View>
        )
    }


    render() {
      const state = this.state;
      return (
        <View style={styles.container}>
          <Table style ={{backgroundColor: '#B3E7EC' , borderRadius: 20, }}borderStyle={{borderWidth: 1, borderColor: '#B3E7EC'}}>
            <Row data={state.HeadTable} style={styles.HeadStyle} textStyle={styles.TableText}/>
            <Rows data={state.DataTable} textStyle={styles.TableTextBottom}/>
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
      color:'#4FC9D3',
      fontWeight: 'bold'
    },

    TableTextBottom:{
      margin: 10,
      backgroundColor: '#B3E7EC',
      color:'#4FC9D3'
    },
})

