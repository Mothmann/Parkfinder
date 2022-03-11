import React, { Component } from 'react'
import { Text, View , TouchableOpacity  , ScrollView} from 'react-native'
import { Button , Container , Left , Icon  , Header , Body} from 'native-base'
import styles from './styles';
import { CreditCardInput } from "react-native-credit-card-input";
import CreditCard from 'react-native-credit-card';
import Axios from 'axios'
import API_URL from '../config';
import Context from '../context/context';
_onChange => form => console.log(form);
export class cards extends Component {

    static contextType = Context;
    state = {
        type:"visa",
        number: 4242442424242,
        name:"name",
        expiry:1021,
        cvc: 555,
        cards:[]
    }

     componentDidMount() {
        Axios.get(`http://${API_URL}/user/info/${this.context.id}`).then((r) => {
            this.setState({cards : r.data.cards})
        })
    }
    render() {
        return (
            <Container style={{backgroundColor:"#f2f2f2"}}>
                <Header style={styles.header}>
                     <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' style={{fontSize: 30, color: '#003f5c'}} />
                        </Button>
                    </Left>
                        <Body>
                            <Text style={{color:"#003f5c" ,fontSize: 20}}>Payment passes</Text>
                        </Body>               
                </Header>
                <Container style={{ flex: 1, alignItems: 'center', }}>
                    
                    <TouchableOpacity style={styles.loginBtn} onPress={() => this.props.navigation.navigate('addcard') } >
                        <Text style={styles.loginText}>Add card</Text>
                    </TouchableOpacity>
                    <View style={{ height: 200 }}>
                        {
                            this.state.cards.map(item => (
                                <CreditCard key={item._id}
                                    type={item.type}
                                    //imageFront={require('./images/card-front.png')}
                                    //imageBack={require('./images/card-back.png')}
                                    shiny={false}
                                    bar={false}
                                    focused="type"
                                    number={item.number}
                                    name={item.name}
                                    expiry={item.expiry}
                                    cvc={item.cvc} />
                            ))
                        }
                    
                    </View>
                     
                   
                    {this.state.add ?
                        <>
                    <TouchableOpacity style={styles.loginBtn}  >
                        <Text style={styles.loginText}>Add </Text>
                    </TouchableOpacity>
                   
                            <CreditCardInput onChange={this._onChange} style={{ marginBottom: 20 }} />
                            </>
                        :
                        <></>}
                 
                </Container>
            </Container>
        )
    }
}

export default cards
