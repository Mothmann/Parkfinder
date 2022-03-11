import React, { Component } from 'react'
import { Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title , Content } from 'native-base';
import { Font, AppLoading } from "expo";
import styles from './styles';
import Footer from "./footer"
import Axios from 'axios'
import API_URL from '../config';
import Context from '../context/context';
import Toast from 'react-native-root-toast';
export class profil extends Component {

    static contextType = Context;
    state = {
        user: {}
    }

    componentDidMount() {
        Axios.get(`http://${API_URL}/user/info/${this.context.id}`).then((r) => {
            this.setState({ user: r.data })
        })
    }


    sendVerification = () => {
        Axios.get(`http://${API_URL}/user/reconfirm/${this.context.id}`).then((r) => {
            if (r.data === "email sent") {
                let toast = Toast.show('Email confirmation sent', {
                    duration: Toast.durations.LONG,
                });

                setTimeout(function hideToast() {
                    Toast.hide(toast);
                }, 3000);
            }
        })
    }
    render() {
        return (
            <View style={[styles.cont , {backgroundColor:"#403f3f"}]}>
                <Header style={styles.header}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' style={{ fontSize: 30, color: '#403f3f' }} />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ color: "#403f3f", fontSize: 20 }}>Profil</Text>
                    </Body>
                </Header>
                <Content style={{ backgroundColor: "#e4e4e4" , marginBottom:10 }}>


                    <ImageBackground source={require('../assets/user.png')} style={styles.imageContainer}>
                        <View style={{ position: 'absolute', top: 0, left: 10, right: 0, bottom: 10, justifyContent: "flex-end", alignItems: "flex-start" }}>
                            <Text style={{ color: "#403f3f", fontSize: 20, backgroundColor: "white", borderRadius: 15 }}>{this.state.user.Name} </Text>
                        </View>
                    </ImageBackground>

                    <TouchableOpacity style={styles.editBtn} >
                        <Icon name="pen" type="FontAwesome5" style={{ color: "white" }} />
                    </TouchableOpacity>

                    <View style={styles.profilItem}>
                        <Text style={styles.title}>Email</Text>
                        <Text style={{ fontSize: 15, color: "#666", margin: 4 }}>{this.state.user.Email}</Text>
                    </View>
                    <View style={styles.profilItem}>
                        <Text style={styles.title}>Email verified</Text>

                        {
                            this.state.user.Email_verified ? <Icon name="check-circle" type="FontAwesome5" style={{ color: "green" }} />
                                : <Icon name="times-circle" type="FontAwesome5" style={{ color: "red" }} />
                        }


                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>


                        {
                            !this.state.user.Email_verified ?
                                <TouchableOpacity style={styles.loginBtn} onPress={this.sendVerification}>
                                    <Text style={styles.loginText}>Send email verification</Text>
                                </TouchableOpacity>
                                : <></>
                        }
                        <TouchableOpacity style={styles.signupBtn} >
                            <Text style={styles.loginText}>Change password</Text>
                        </TouchableOpacity>

                    </View>
                </Content>

            </View>
        )
    }
}

export default profil
