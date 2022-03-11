import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import { Button, Container, Left, Icon, Header, Body } from 'native-base'
import styles from './styles';
import API_URL from '../config';
import Axios from 'axios';
import Context from '../context/context';
export class slot extends Component {

    state = {
        selectedslot: ""
    }
    static contextType = Context;

    handleform = () => {
        if (this.state.selectedslot !== "") {
            Axios.post(`http://${API_URL}/reservation/`, {
                User_id: this.context.id,
                Parking_id: this.props.route.params.parking._id,
                arrivalTime: this.props.route.params.date,
                parkingSlot: this.state.selectedslot,
                carNumber: this.props.route.params.carnumber,
            }).then((r) => {
                if (r.data.message === "Reservation added successfully") {
                    this.props.navigation.navigate('receipt', { reservation: r.data.reservation })
                }

            })
        }
    }

     componentDidMount() {
        this.arduino()
    }

    arduino = () => {
        var arduinoIP = "192.168.1.177";
       Axios.get(`http://${arduinoIP}`)
            .then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
        /*setInterval(() => {
            $.get("http://" + arduinoIP, function (data) {
                console.log(data);
            })
        }, 1000);*/

    }
    render() {
        return (
            <Container style={styles.container}>
                <View style={{ alignItems: 'center', flexDirection: 'row', marginVertical: 10 }}>
                    <Icon name="car-alt" type="FontAwesome5" style={{ color: "green", margin: 6 }} />
                    <Text>Selected</Text>
                    <Icon name="car-alt" type="FontAwesome5" style={{ color: "grey", margin: 6 }} />
                    <Text>Booked</Text>
                    <Icon name="car-alt" type="FontAwesome5" style={{ color: "#f2f2f2", margin: 6 }} />
                    <Text>Available</Text>
                    <Icon name="car-alt" type="FontAwesome5" style={{ color: "red", margin: 6 }} />
                    <Text>Occupied</Text>
                </View>
                <View>
                    <View style={styles.slotname}>
                        <Text style={styles.titlecenter}>A</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.setState({ selectedslot: "A1" })}>
                            <View style={[styles.slot, this.state.selectedslot === "A1" ? { backgroundColor: "green" } : {}]}>
                                <Text style={styles.textcenter}>A1</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ selectedslot: "A2" })}>
                            <View style={[styles.slot, this.state.selectedslot === "A2" ? { backgroundColor: "green" } : {}]}>
                                <Text style={styles.textcenter}>A2</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.setState({ selectedslot: "A3" })}>
                            <View style={[styles.slot, this.state.selectedslot === "A3" ? { backgroundColor: "green" } : {}]}>
                                <Text style={styles.textcenter}>A3</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ selectedslot: "A4" })}>
                            <View style={[styles.slot, this.state.selectedslot === "A4" ? { backgroundColor: "green" } : {}]}>
                                <Text style={styles.textcenter}>A4</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>


                <View>
                    <View style={styles.slotname}>
                        <Text style={styles.titlecenter}>B</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.setState({ selectedslot: "B1" })}>
                            <View style={[styles.slot, this.state.selectedslot === "B1" ? { backgroundColor: "green" } : {}]}>
                                <Text style={styles.textcenter}>A1</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ selectedslot: "B2" })}>
                            <View style={[styles.slot, this.state.selectedslot === "B2" ? { backgroundColor: "green" } : {}]}>
                                <Text style={styles.textcenter}>A2</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.setState({ selectedslot: "B3" })}>
                            <View style={[styles.slot, this.state.selectedslot === "B3" ? { backgroundColor: "green" } : {}]}>
                                <Text style={styles.textcenter}>A3</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ selectedslot: "B4" })}>
                            <View style={[styles.slot, this.state.selectedslot === "B4" ? { backgroundColor: "green" } : {}]}>
                                <Text style={styles.textcenter}>A4</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.loginBtn} onPress={this.handleform} >
                    <Text style={styles.loginText}>Book</Text>
                </TouchableOpacity>
            </Container>
        )
    }
}

export default slot
