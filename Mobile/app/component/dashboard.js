import React, { Component } from 'react'
import { Text, View , ScrollView , ImageBackground , TouchableOpacity } from 'react-native'
import {Container , Content , Thumbnail , Icon, Right , Body , Left , List , ListItem , Button} from "native-base"
import Footer from './footer'
import styles from './styles';
import Context from '../context/context';
import Axios from 'axios'
import API_URL from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
export class dashboard extends Component {

    state = {
        booking: [],
        user: {},
        amount: 0,
        hour: 0
    }

    static contextType = Context;

 
      async componentDidMount() {
       try {
           const token = await AsyncStorage.getItem('token')
           const id = await AsyncStorage.getItem('id')
        
    if(token !== null && id !== null) {
       
        this.context.setvalue(token, id , true)
        
        
    }
    } catch(e) {
        console.log(e);
          }
          
          Axios.get(`http://${API_URL}/user/info/${this.context.id}`).then((r) => {
            this.setState({user : r.data})
        })
        .catch((error) => {
              console.log(error);
        })
          
           Axios.get(`http://${API_URL}/reservation/user/${this.context.id}`).then((r) => {
            if (r.data) {
                this.setState({ booking: r.data })
                var h = 0
                var a = 0
                this.state.booking.forEach(element => {
                    if (element.Reservation_Price) {
                        a = a + element.Reservation_Price                   
                    }
                    if (element.finished && element.started) {
                         var diff = new Date(element.endTime).getTime() - new Date(element.startTime).getTime()
                        var min = Math.floor(diff / 1000 % 60)
                        h = h + (min / 60)
                    }
                });
                this.setState({ amount: a, hour:  Math.ceil(h) })
                
            }
         
        })
    }
    render() {
        return (
            <View style={[styles.cont , {backgroundColor:"#e4e4e4"}]}>
                <Content>
                    <View style={{  marginTop: 20, marginLeft: 20 , with:'100%'}} >
                     
                     
                        <View style={{flexDirection:'row' ,  marginVertical: 15 , width:"100%"}}>
                        <Thumbnail source={require('../assets/user.png')} style={{}} />

                        <Right style={{ alignSelf: 'flex-end' }}>
                            <TouchableOpacity vertical onPress={() => this.props.navigation.navigate('account')} style={styles.editBtn}>
                            <Icon name="user" type="FontAwesome5" style={{color:"#2e2d2d"}}  />
                            
                        </TouchableOpacity>
                            </Right></View>

                       <Text style={{color: "black", fontSize: 20, margin: 4}}>Welcome</Text>
                        <Text style={{color: "#F1b712", fontSize: 20, margin: 4}}>{this.state.user.Name }</Text>
                        
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{margin: 10 , backgroundColor:'transparent' }}>
                        <View style={[styles.scrollCard , {backgroundColor:"#F1b712"}]}>
                            <Icon name="check-circle" type="FontAwesome5" style={styles.scrollCardItem }/>
                            <Text style={styles.scrollCardItem }>Bookings done</Text>
                            <Text style={styles.scrollCardItem}>{ this.state.booking.length}</Text>
                        </View>
                        <View style={styles.scrollCard}>
                            <Icon name="history" type="FontAwesome5"  style={styles.scrollCardItem }/>
                            <Text style={styles.scrollCardItem }>Hours spent </Text>
                            <Text style={styles.scrollCardItem}>{this.state.hour + " h" }</Text>
                        </View>
                        <View style={styles.scrollCard}>
                            <Icon name="coins" type="FontAwesome5" style={styles.scrollCardItem } />
                            <Text style={styles.scrollCardItem }>Amount paid</Text>
                            <Text style={styles.scrollCardItem}>{this.state.amount + " DH" }</Text>
                        </View>
                        <View style={styles.scrollCard}>
                            <Icon name="wallet" type="FontAwesome5" style={styles.scrollCardItem } />
                            <Text style={styles.scrollCardItem }>Current balance </Text>
                            <Text style={styles.scrollCardItem }>{this.state.user.Account_balance + " DH"}</Text>
                        </View>
                    </ScrollView>

                    <View style={{
                        backgroundColor: "transparent", marginTop: 15,  marginHorizontal: 12, width: "95%", paddingBottom: 15, marginBottom:90
                    }}>
                        <List>
                            <ListItem style={{backgroundColor:"#262626" , marginLeft:0  , borderRadius:6 , borderColor:'transparent'}}>
                                <Text style={{color:"white" , fontSize:20 , marginLeft : 15}}>Last Bookings</Text>
                            </ListItem>
                            <ScrollView >
                                {
                                    this.state.booking.reverse().slice(0, 3).map((item, i) => (
                                       
                                       <ImageBackground source={require('../assets/egor-myznik-rCZQCbUAQvg-unsplash.jpg')} style={{width:'100%' , opacity:0.9 , marginVertical:5 , borderRadius:6}} key={i}>
                                        <View style={{backgroundColor:'rgba(0,0,0,0.7)'  }}>
                                                <ListItem style={{ marginLeft: 15, marginRight: 8 , borderColor:'transparent' , borderRadius:6}} >
                                            <Body>
                                                <Text style={{color:"white" , fontWeight:'bold' , fontSize:20}}>{item.Parking_id.Name}</Text>
                                                <Text style={{ color: "#F1b712", margin: 4 , fontWeight:'bold' , fontSize:20 }}>{ item.Reservation_Date.toString().substr(0, 10)}</Text>
                                                    </Body>
                                                   
                                                    <Right>
                                                        <Text style={{ color: "#F1b712", margin: 4, fontWeight: 'bold', fontSize: 17 }}>
                                                         {
                                                        item.Reservation_Price ? item.Reservation_Price + " DH" : ""
                                                    }
                                                        </Text></Right>
                                                </ListItem>
                                                </View>
                                        </ImageBackground>
                                    ))
                                }
                                
                            </ScrollView>
                        </List>
                    </View>
                </Content>
                  <Footer navigation={this.props.navigation }/>
            </View>
        )
    }
}

export default dashboard
