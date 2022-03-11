import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import styles from './styles'
import validator from 'validator';
import Toast from 'react-native-root-toast';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../context/context';
import API_URL from '../config';
class login extends React.Component {
  state = {
    email: "",
    password: ""
  }
  static contextType = Context;
  async saveItem(token, id) {
    try {
      await AsyncStorage.setItem('token', token)
      await AsyncStorage.setItem('id', id)

    }
    catch (e) {
      console.log(e);
    }
  }
  handleForm = () => {
    if (this.state.email !== "" && this.state.password !== "") {

      if (!validator.isEmail(this.state.email)) {
        let toast = Toast.show('Email format incorrect', {
          duration: Toast.durations.LONG,
        });

        setTimeout(function hideToast() {
          Toast.hide(toast);
        }, 3000);
        return
      }


      if (validator.isEmail(this.state.email)) {
        Axios.post(`http://${API_URL}/user/sign-in`,
          {
            Email: this.state.email,
            Password: this.state.password,
          }).then(r => {
            if (r.data.user.banned) {
              let toast = Toast.show('Your account is banned', {
                duration: Toast.durations.LONG,
              });

              setTimeout(function hideToast() {
                Toast.hide(toast);
              }, 3000);
              return
            }
            if (r.data.message === "Authentication successful") {
              this.saveItem(r.data.token, r.data.user.id)
              this.context.setvalue(r.data.token, r.data.user.id, true)
            }
            else {
              let toast = Toast.show(' wrong username or password', {
                duration: Toast.durations.LONG,
              });

              setTimeout(function hideToast() {
                Toast.hide(toast);
              }, 3000);


            }
          }).catch(error => {
            console.log(error);
            let toast = Toast.show('Something went wrong', {
              duration: Toast.durations.LONG,
            });

            setTimeout(function hideToast() {
              Toast.hide(toast);
            }, 3000);
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
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/bg1.jpg')} style={styles.logincont}>
          <View style={{backgroundColor:'rgba(0,0,0,0.55)'  , width:'100%' , height:'100%' , flex: 1, alignItems: 'center', justifyContent: 'center',}}>
          {<Image style={{  marginBottom: 60 }} source={require('../assets/parkingfinderblanc_sm.png')} />}
          <View style={styles.inputView} >
            <TextInput
              style={styles.inputText}
              placeholder="Email..."
              placeholderTextColor="white"
              onChangeText={text => this.setState({ email: text })}
              />
          </View>
          <View style={styles.inputView} >
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Password..."
              placeholderTextColor="white"
              onChangeText={text => this.setState({ password: text })} />
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={this.handleForm}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupBtn} onPress={() => this.props.navigation.navigate('signup')}>
            <Text style={styles.loginText}>Signup</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password ? <Text style={{color:"#F1b712"}}>Recover here</Text></Text>
          </TouchableOpacity>
        </View>
        </ImageBackground>
          
      </View>
    );
  }
}





export default login
