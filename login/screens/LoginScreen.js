import React from 'react';
import {View, Button, Text, StyleSheet, Image} from 'react-native';
import * as firebase from 'firebase';
import MainTabNavigator from '../navigation/MainTabNavigator';
import {StackNavigator} from 'react-navigation';
import { FormLabel, FormInput } from 'react-native-elements'

firebase.initializeApp({
        apiKey: "AIzaSyC13QXndehmZjVj0FedkAjORoL-9r9x8cw",
        authDomain: "loginapp-1329d.firebaseapp.com",
        databaseURL: "https://loginapp-1329d.firebaseio.com",
        projectId: "loginapp-1329d",
        storageBucket: "loginapp-1329d.appspot.com",
        messagingSenderId: "505286303344"
    }
);
const resizeMode = 'cover';

export default class login extends React.Component {
    constructor(props){
        super(props);
        this.state = {email:'', password:'', error:'', loading: false };
    }
    onLoginPress(){
        this.setState({error:'', loading:true});
        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({error:'',loading:false});
                this.props.navigation.navigate('Main');
            })
            .catch(() => {
                this.setState({ error:'Authentication failed', loading : false });
            })
    }

    onSignUpPress(){
        this.setState({ error:'', loading: true});
        const{ email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({error:'', loading: false});
                this.props.navigation.navigate('Main');
            })
            .catch(() =>{
                this.setState({error:'Authentication failed', loading: false });
            })
    }
    renderButtonOrLoading(){
        if(this.state.loading){
            return <Text> Loading </Text>
        }
        return (
            <View style={styles.button}>
            <Button
                style={styles.btn}
                onPress={this.onLoginPress.bind(this)}
                title='Login'/>
            <Text>-</Text>
            <Button
                style={styles.btn}
                onPress={this.onSignUpPress.bind(this)}
                title='Sign up'/>
        </View>
        )}
    render(){
        return(

            <View style={styles.containerForm}>
                <Image
                    style={{height: '100%', position: 'absolute'}}
                    source={require('../assets/images/mountain.jpg')}
                    resizeMode="cover"
                />
                <View style={styles.container}>
                <FormLabel>Email</FormLabel>
                <FormInput style={styles.formInput}
                    value = {this.state.email}
                    Placeholder='example@gmail.com' placeholderTextColor="#ff223a"
                    underlineColorAndroid='transparent'
                    onChangeText={email => this.setState({ email })}
                />
                <FormLabel>Password</FormLabel>
                <FormInput
                    style={styles.textInput}
                    value = {this.state.password}
                    underlineColorAndroid='transparent'
                    secureTextEntry
                    Placeholder='*******'
                    onChangeText={password => this.setState({ password })}
                />
                {this.renderButtonOrLoading()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        marginRight: 60,
        marginLeft: 60,
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 40,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    containerForm: {
        flex: 1,
    }
});


