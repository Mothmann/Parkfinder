import React, { Component } from 'react'
import { Text, View , Picker , TouchableOpacity} from 'react-native'
import { Button , Container , Left , Icon  , Header , Body , Content } from 'native-base'
import styles from './styles';
import Axios from 'axios'
import API_URL from '../config';
import Context from '../context/context';
import Toast from 'react-native-root-toast';
export class balance extends Component {
static contextType = Context;
    state = {
        selected: 0,
        balance:0,
    };

     onValueChange = (value) => {
        this.setState({
            selected: value
    });
    }
    
    balance = () => {
        if (this.state.selected !== "") {
            
           /* Axios.post(`http://${API_URL}/pay/${this.state.selected}`,
                { m : this.state.selected }).then((r) => {
                    if (r.data === "Success") {
                    Axios.put(`http://${API_URL}/user/balance/${this.context.id}`,
                { m : this.state.selected }).then((r) => {
                this.setState({balance: r.data.Account_balance})
            })
                    }
                    if (r.data === "Cancelled") {
                       let toast = Toast.show('Payment cancelled', {
                        duration: Toast.durations.LONG,
                        });

                        setTimeout(function hideToast() {
                        Toast.hide(toast);
                        }, 3000);
                        return 
                    }
            })*/

                 Axios.put(`http://${API_URL}/user/balance/${this.context.id}`,
                { m : this.state.selected }).then((r) => {
                this.setState({balance: r.data.Account_balance})
            })
        }
    }

    componentDidMount() {
        Axios.get(`http://${API_URL}/user/info/${this.context.id}`).then((r) => {
            this.setState({balance : r.data.Account_balance})
        })
    }

    render() {
        return (
            <View style={[styles.cont]}>
                <Header style={styles.header}>
                     <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' style={{fontSize: 30, color: '#403f3f'}} />
                        </Button>
                    </Left>
                        <Body>
                            <Text style={{color:"#403f3f" ,fontSize: 20}}>Balance</Text>
                        </Body>               
                </Header>
                
                <View style={{ flex: 1,backgroundColor: '#e4e4e4',alignItems: 'center',justifyContent: 'center',}}>
                    <Text style={{fontSize: 30,color: "#F1b712"}}>Current balance</Text>
                    <View style={{ alignItems: 'flex-end',flexDirection:'row' , marginVertical:20 }}>
                        <Text style={{fontWeight: "bold",fontSize: 50,color: "#403f3f"  , marginBottom: -10 , marginHorizontal: 3}}>{this.state.balance} </Text>
                        <Text style={{fontSize: 20,color: "#403f3f" }}>DH</Text>
                    </View>
                     <Picker
                        selectedValue={this.state.selected}
                        style={{ height: 50, width: 150  , color:'#403f3f'}}
                        onValueChange={(itemValue, itemIndex) => this.onValueChange(itemValue)}
                    >
                       
                        <Picker.Item label="20 DH" value={20} />
                        <Picker.Item label="50 DH" value={50} />
                        <Picker.Item label="100 DH" value={100} />
                        <Picker.Item label="300 DH" value={300} />
                        <Picker.Item label="500 DH" value={500} />
                    </Picker>
                    <TouchableOpacity style={styles.loginBtn} onPress={this.balance} >
                        <Text style={styles.loginText}>Recharge</Text>
                    </TouchableOpacity>
                </View>    
            </View>
        )
    }
}

export default balance
