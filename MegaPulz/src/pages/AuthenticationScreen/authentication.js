import Auth from '@aws-amplify/auth';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, Image } from 'react-native';


export default function Authenticate({ navigation, updateAuthState }) {

    const [awsInfo, setAwsInfo] = useState([]);
    const [webAppUser, setWebAppUser] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getAwsUserInfo();
    }, []);

    const getAwsUserInfo = async () => {

        let info = await Auth.currentUserInfo();

        setAwsInfo(info);

        console.warn("AWS ID FROM COGNITO:", info.id);

        checkWebAppUser(info.id);

    }

    const checkWebAppUser = (awsId) => {
        if (webAppUser === 'undefined' || webAppUser.length == 0) {
            console.warn("loading is set to true")
            console.log("\n\n" + awsId + "\n\n");
            setLoading(true);
            axios
                .get('https://1gedxwzv7b.execute-api.us-east-1.amazonaws.com/TESTING/WebAppCustomer/awsId/' + awsId,
                    {
                        headers:
                        {
                            "Authorization": "Basic aGlzOmhpczEyMzQ1",
                            "X-tenantID": "D0001"
                        }
                    })
                .then(function (response) {
                    console.warn("then called");
                    setLoading(false);
                    setWebAppUser(response.data);
                    console.log(response.data)
                    if (!response.data || response.data.length == 0) {
                        console.log("\n\nWeb App User Not found --- Redirecting\n\n");
                        navigation.navigate("SearchProfile");

                    }
                    else {
                        console.warn("\n\nWeb app user found\n\n");
                        navigation.navigate("SelectProfile", { patientData: response.data });
                    }

                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function (e) {
                    console.warn("at finally")
                })
        }

    }


    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/Megapulz-Logo.png')}
                style={styles.image}
            />

            <ActivityIndicator animating={loading} size="large" color="#3ab2c0" />
        </View>
    );


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 50,
    },
    image: {
        width: 200,
        height: 100,
        marginBottom: 100,

        justifyContent: 'center',

    }

})