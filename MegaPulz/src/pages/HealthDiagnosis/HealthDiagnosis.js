import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const HealthDiagnosis = () => {
  return (
    <View>
      <Text style = {styles.item}>Measure Heart Rate</Text>
      <Text style = {styles.item}>Measure Step Count</Text>
      <Text style = {styles.item}>Active Hours :- 4 Hours 36 Min</Text>
      <Text style = {styles.item}>Measure Heart Rate</Text>
    </View>
  )
}

const styles = StyleSheet.create({

  item : {
    marginTop: 50,
    marginLeft :20,
    marginRight :20,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold"
  }


})

export default HealthDiagnosis
