import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import styles from './styles'
export class intro extends Component {
    render() {
        return (
            <View style={styles.container}>
        <ImageBackground source={require('../assets/bg1.jpg')} style={styles.logincont}>
          <View style={{backgroundColor:'rgba(0,0,0,0.55)'  , width:'100%' , height:'100%' , flex: 1, alignItems: 'center', justifyContent: 'center',}}>
          {<Image style={{  marginBottom: 60 }} source={require('../assets/parkingfinderblanc_sm.png')} />}
          
          
          <TouchableOpacity style={styles.loginBtn} onPress={() => this.props.navigation.navigate('login')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupBtn} onPress={() => this.props.navigation.navigate('signup')}>
            <Text style={styles.loginText}>Signup</Text>
          </TouchableOpacity>

        </View>
        </ImageBackground>
          
      </View>
        )
    }
}

export default intro
