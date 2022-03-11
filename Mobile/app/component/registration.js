import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, ImageBackground } from 'react-native';
import styles from './styles'
import validator from 'validator';
import Toast from 'react-native-root-toast';
import API_URL from '../config';
//import Toast from 'react-native-root-toast';
import Axios from 'axios';
export class registration extends Component {

    state = {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        passwordConf: "",
        showToast: false,
        visible: false,
        toastMsg: "",
    }

    handleForm = () => {

        if (this.state.email !== "" && this.state.firstName !== "" && this.state.lastName !== "" && this.state.password !== ""
            && this.state.passwordConf !== ""
        ) {
            if (!validator.isEmail(this.state.email)) {
                let toast = Toast.show('Email format incorrect !', {
                    duration: Toast.durations.LONG,
                });

                setTimeout(function hideToast() {
                    Toast.hide(toast);
                }, 3000);
                return
            }

            if (this.state.password != this.state.passwordConf) {
                let toast = Toast.show('Password does not match Password confirmation', {
                    duration: Toast.durations.LONG,
                });

                setTimeout(function hideToast() {
                    Toast.hide(toast);
                }, 3000);
                return
            }

            if (validator.isEmail(this.state.email) && (this.state.password === this.state.passwordConf)) {
                Axios.post(`http://${API_URL}/user/sign-up`,
                    {
                        Email: this.state.email,
                        Name: `${this.state.firstName} ${this.state.firstName}`,
                        Password: this.state.password,
                    }).then(r => {
                        let toast = Toast.show(r.data, {
                            duration: Toast.durations.LONG,
                        });
                        setTimeout(function hideToast() {
                            Toast.hide(toast);
                        }, 3000);
                        if (r.data === "User added successfully") {

                            this.props.navigation.push('login')
                        }
                    }).catch(error => {
                        console.log(error);
                    });
            }


        }
        else {
            let toast = Toast.show('All field are required', {
                duration: Toast.durations.LONG,
            });
            setTimeout(function hideToast() {
                Toast.hide(toast);
            }, 3000);
            return
        }
    }
    //

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../assets/bg1.jpg')} style={styles.logincont}>
                    <View style={{backgroundColor:'rgba(0,0,0,0.55)'  , width:'100%' , height:'100%' , flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                    {<Image style={{  marginBottom: 60 }} source={require('../assets/parkingfinderblanc_sm.png')} />}
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder="First name..."
                            placeholderTextColor="white"
                            onChangeText={text => this.setState({ firstName: text })} />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder="Last name..."
                            placeholderTextColor="white"
                            onChangeText={text => this.setState({ lastName: text })} />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder="Email..."
                            placeholderTextColor="white"
                            onChangeText={text => this.setState({ email: text })} />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            secureTextEntry
                            style={styles.inputText}
                            placeholder="Password..."
                            placeholderTextColor="white"
                            onChangeText={text => this.setState({ password: text })} />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            secureTextEntry
                            style={styles.inputText}
                            placeholder="Confirm Password..."
                            placeholderTextColor="white"
                            onChangeText={text => this.setState({ passwordConf: text })} />
                    </View>
                    <TouchableOpacity style={styles.loginBtn} onPress={this.handleForm} >
                        <Text style={styles.loginText}>Signup</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signupBtn} onPress={() => this.props.navigation.navigate('login')}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                        </View>
                </ImageBackground>
            </View>
        )
    }
}


export default registration
