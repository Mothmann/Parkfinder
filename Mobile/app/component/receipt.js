import React, { Component } from 'react'
import { Text, View ,ImageBackground , TouchableOpacity} from 'react-native'
import { Icon } from 'native-base'
import QRCode from 'react-native-qrcode-svg';
import styles from './styles'
export class receipt extends Component {

    componentDidMount() {

    }
    render() {
        return (
            <View style={styles.container}>
                <Icon name="times" type="FontAwesome5" onPress={() => this.props.navigation.navigate('booking')}
                    style={{ color: 'grey', alignSelf: 'flex-end', top: 10, right: 10, position: 'absolute', }} />
            <ImageBackground style={{width:"100%" , height: '100%'  , flex: 1, alignItems: 'center',justifyContent: 'center',alignSelf: 'center' , marginTop:30 }} source={require('../assets/receipt.png')}>
            
                
               <View style={{marginBottom:100}} >
                <QRCode
                        value={this.props.route.params.reservation._id}
                        style={{marginBottom: 20}}
                        />
                </View>
                <View >
                <Text style={styles.title}>Parking name</Text>
                <Text>{this.props.route.params.reservation.Parking_id.Name}</Text>
                <Text style={styles.title}>Parking address</Text>
                <Text>{this.props.route.params.reservation.Parking_id.address}</Text>
                <Text style={styles.title}>Parking Slot</Text>
                <Text>{this.props.route.params.reservation.parkingSlot}</Text>
                <Text style={styles.title}>Car number</Text>
                <Text>{this.props.route.params.reservation.carNumber}</Text>
                <Text style={styles.title}>Arrival Time</Text>
                <Text>{this.props.route.params.reservation.Reservation_Date.toString().substr(0, 16)}</Text>
           </View>
            
                </ImageBackground>

                        {
                        (this.props.route.params.reservation.finished === false && this.props.route.params.reservation.started === false ) ?  
            
                <TouchableOpacity style={styles.cancelbtn}>
                    <Text style={styles.loginText}>Cancel</Text>
                </TouchableOpacity>
                        

                     : <Text></Text>   }
            </View>
        )
    }
}

export default receipt
