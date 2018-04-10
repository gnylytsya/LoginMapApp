import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
} from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';

export default class Form extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <FormLabel>Email</FormLabel>
                <FormInput
                    value = {this.state.email}
                    style={styles.textInput} Placeholder='example@gmail.com'
                    onChangeText={email => this.setState({ email })}
                    underlineColorAndroid='transparent'
                />
                <FormLabel>Password</FormLabel>
                <FormInput
                    value = {this.state.password}
                    secureTextEntry
                    style={styles.textInput}  Placeholder='*******'
                    onChangeText={password => this.setState({ password })}
                    underlineColorAndroid='transparent'
                />
                {this.renderButtonOrLoading()}
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#82827a',
    },

});