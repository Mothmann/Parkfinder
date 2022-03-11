import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Card, CardItem, Badge } from 'native-base';
import Footer from './footer'
import styles from './styles';
import API_URL from '../config';
import Axios from 'axios';
import Context from '../context/context';
export class booking extends Component {

    static contextType = Context;
    state = {
        bookings: []
    }

    componentDidMount() {
        Axios.get(`http://${API_URL}/reservation/user/${this.context.id}`).then((r) => {
            if (r.data) {
                this.setState({ bookings: r.data })
            }

        })
    }
    render() {
        return (
            <View style={styles.cont}>
                <Header style={styles.header}>
                    <View style={{ textAlign: 'center' }}>
                        <Text style={styles.barTitle}>Booking</Text>
                    </View>
                </Header>
                <Content  style={{marginBottom: 60}}>
                    {
                        this.state.bookings.reverse().map(
                            item => (
                                <TouchableOpacity key={item._id} onPress={() => this.props.navigation.navigate('receipt', { reservation: item })} style={[styles.cards, styles.shadow]}>
                                    <View style={[styles.card ]} >
                                        <CardItem style={{backgroundColor:'white'}}>
                                            <Left><Badge style={[styles.badge, { backgroundColor: (item.finished && item.started) ? "green" : (item.finished && !item.started)? "red" : item.started ? "#F1b712" : "grey" }]}>
                                                <Text style={{ color: "white" }}>{(item.finished && item.started) ? "Parking completed" : (item.finished && !item.started)? "Canceled"  : item.started ? "Parking started" : "Reserved"}</Text></Badge></Left>
                                            <Right>
                                                <Text>{item.price}</Text>
                                            </Right>
                                        </CardItem>
                                        <CardItem  style={{backgroundColor:'white'}}>
                                            <View>
                                                <Text style={styles.title}>{item.Parking_id.Name}</Text>
                                                <View style={{ alignItems: 'flex-end', flexDirection: 'row' }}>
                                                    <Icon name="map-marker-alt" type="FontAwesome5" style={styles.icon} />
                                                    <Text>{item.Parking_id.address}</Text>
                                                </View>
                                            </View>
                                        </CardItem>
                                        <CardItem style={{backgroundColor:'white'}}>
                                            {item.started && item.finished ?
                                                <>
                                                    <Icon name="calendar-alt" type="FontAwesome5" style={styles.iconCalendar} />
                                                    <View>
                                                        <Text>{item.startTime.toString().substr(0, 10) + " " + item.startTime.toString().substr(11, 5)}</Text>
                                                       
                                                    </View>
                                                    <Icon name="arrow-right" type='FontAwesome5' style={styles.iconArrow} />
                                                        <View>
                                                             <Text>{item.endTime.toString().substr(0, 10) + " " + item.endTime.toString().substr(11, 5)}</Text>
                                                        </View>
                                                </>
                                                :

                                                item.started && !item.finished ?
                                                    <>
                                                        <Icon name="calendar-alt" type="FontAwesome5" style={styles.iconCalendar} />
                                                    <View>
                                                        <Text>{item.startTime.toString().substr(0, 10) + " " + item.startTime.toString().substr(11, 5)}</Text>
                                                       
                                                    </View>
                                                    </>
                                                    :
                                                    <View>
                                                        <Text style={{fontWeight:"bold"}}>Expected arrival time</Text>
                                                        <Text>{item.arrivalTime.toString().substr(0, 10) + " " + item.arrivalTime.toString().substr(11, 5)}</Text>
                                                    </View>

                                            }
                                        </CardItem>
                                    </View>
                                </TouchableOpacity>
                            )
                        )
                    }

                </Content>
                <Footer navigation={this.props.navigation} />
            </View>
        )
    }
}

export default booking
