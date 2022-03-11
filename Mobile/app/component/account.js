import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title , ListItem , Content ,CardItem } from 'native-base';
import Footer from './footer'
import styles from './styles';
import Context from '../context/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import API_URL from '../config';
export class account extends Component {
    static contextType = Context;

    async deleteitem () {
        try {
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('id')
            this.context.setvalue(null, null , false)
        }
        catch (e) {
            console.log(e);
        } 
   }
     logout = () => {
       Axios.get(`http://${API_URL}/user/logout`).then(r => {
                if (r.data === "logout") {
                     this.deleteitem()
                    this.context.setvalue(null, null , false)
                }
            })
      
    }
    render() {
        return (
             <Container style={{backgroundColor:"#e4e4e4"}}>
                <Header style={styles.header }>             
                    <View style={{textAlign: 'center'}}>
                        <Text style={styles.barTitle}>Account</Text>
                    </View>               
                </Header>
                <Content style={{marginTop:10}}>
                    <ListItem icon onPress={() => this.props.navigation.navigate('profil')} style={styles.accountItem}>
                        <Left>
                            <Button style={{ borderColor:"#403f3f" }} bordered>
                                <Icon active name="user-circle" type="FontAwesome5" style={{color:"#403f3f"}} />
                            </Button>
                        </Left>
                        <Body  style={{borderColor:"white"}}>
                            <Text style={styles.title}>Profil</Text>
                        </Body>           
                    </ListItem>

                    <ListItem icon style={styles.accountItem} onPress={() => this.props.navigation.navigate('cards') } navigation={this.props.navigation }>
                        <Left>
                            <Button style={{ borderColor:"#403f3f" }} bordered>
                                <Icon active name="credit-card" type="FontAwesome5"  style={{color:"#403f3f"}}/>
                            </Button>
                        </Left>
                        <Body style={{borderColor:"white"}}>
                            <Text style={styles.title}>Payment passes</Text>
                        </Body>           
                    </ListItem>

                    <ListItem icon style={styles.accountItem} onPress={() => this.props.navigation.navigate('balance')}>
                        <Left>
                            <Button style={{ borderColor:"#403f3f" }} bordered>
                                <Icon active name="coins" type="FontAwesome5"  style={{color:"#403f3f"}}/>
                            </Button>
                        </Left>
                        <Body style={{borderColor:"white"}}>
                            <Text style={styles.title}>Balance</Text>
                        </Body>           
                    </ListItem>

                    <ListItem icon onPress={this.logout} style={styles.accountItem}>
                        <Left>
                            <Button style={{ borderColor:"#403f3f" }} bordered>
                                <Icon active name="sign-out-alt" type="FontAwesome5" style={{color:"#403f3f"}} />
                            </Button>
                        </Left>
                        <Body style={{borderColor:"white"}}>
                            <Text style={styles.title}>Logout</Text>
                        </Body>           
                    </ListItem>
                </Content>
                <Footer navigation={this.props.navigation }/>
         </Container> 
        )
    }
}

export default account
