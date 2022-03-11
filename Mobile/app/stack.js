import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Login from './component/login'
import Profil from './component/profil'
import Registration from './component/registration'
import Map from './component/map'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Booking from './component/booking';
import Account from './component/account'
import Dashboard from './component/dashboard';
import Slider from './component/slider';
import Cards from './component/cards';
import Balance from './component/balance'
import Bookingform from './component/booking-form'
import Addcard from './component/addcard'
import Slot from './component/slot'
import Context from './context/context';
import Receipt from './component/receipt';
import { Container, Header, Content, Spinner } from 'native-base';
import Intro from './component/intro'
const Stack = createStackNavigator();

const loading = props => {
    return (
        <Container style={{ justifyContent: 'center', alignItems: 'center', flex: 1  , width:"100%" , height:"100%" }}>
             <Content style={{alignSelf:'center'}}>
                <Spinner color='black' style={{alignSelf:'center'}}/>
            </Content>
        </Container>)
                            
                      }  
export class stack extends Component {


    static contextType = Context;
 async componentDidMount() {
    try {
        const token = await AsyncStorage.getItem('token')
        const id = await AsyncStorage.getItem('id')
        
    if(token !== null && id !== null) {  
        this.context.setvalue(token, id , true)
        }
        else this.context.setvalue(null, null , false)
    } catch(e) {
        console.log(e);
    } 
    }

    render() {
        
        return (
            <Stack.Navigator>
                { (this.context.connected === null) ?
                    
                    <Stack.Screen name="loading" options={{ headerShown: false }} component={loading }>
                  
                  </Stack.Screen>
                    :
                    this.context.connected ?
                        
                            <>
                <Stack.Screen  name="dashboard" options={{headerShown: false}}  component={Dashboard}  ></Stack.Screen>   
                <Stack.Screen  name="map" options={{headerShown: false}}  component={Map}></Stack.Screen>
                <Stack.Screen  name="booking" options={{ headerShown: false }} component={Booking}></Stack.Screen>
                <Stack.Screen  name="account" options={{headerShown: false}}  component={Account}></Stack.Screen>
                <Stack.Screen  name="profil" options={{headerShown: false}}  component={Profil}></Stack.Screen>
                <Stack.Screen  name="balance" options={{headerShown: false}}  component={Balance}></Stack.Screen>
                <Stack.Screen name="form" options={{headerShown: false}} component={Bookingform}></Stack.Screen>
                <Stack.Screen  name="cards" options={{headerShown: false}} component={Cards}></Stack.Screen>
                <Stack.Screen name="addcard" options={{ headerShown: false }} component={Addcard}></Stack.Screen>
                <Stack.Screen name="receipt" options={{ headerShown: false }} component={Receipt}></Stack.Screen>
                <Stack.Screen name="slot" component={Slot}></Stack.Screen>
                </>
               :
                   <>
                <Stack.Screen name="slider" options={{ headerShown: false }} component={Slider}></Stack.Screen>
                <Stack.Screen name="intro" options={{ headerShown: false }} component={Intro}></Stack.Screen>          
                <Stack.Screen  name="login" component={Login} options={{headerShown: false}} ></Stack.Screen>
                <Stack.Screen  name="signup" options={{headerShown: false}}  component={Registration}></Stack.Screen>
                        </>      
            }
            </Stack.Navigator>  
        )
    }
}

export default stack
