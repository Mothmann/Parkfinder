import React, { Component } from 'react'
import { Text, View , TouchableOpacity } from 'react-native'
import { Button , Container , Left , Icon  , Header , Body} from 'native-base'
import styles from './styles';
import { CreditCardInput } from "react-native-credit-card-input";
import CreditCard from 'react-native-credit-card';


export class addcard extends Component {

    state = {
        add:false,
    }

    
    render() {
        return (
               <Container style={{backgroundColor:"#f2f2f2"}}>
                <Header style={styles.header}>
                     <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack() }>
                            <Icon name='arrow-back' style={{fontSize: 30, color: '#003f5c'}} />
                        </Button>
                    </Left>
                        <Body>
                            <Text style={{color:"#003f5c" ,fontSize: 20}}>Add card</Text>
                        </Body>               
                </Header>
                <Container style={{ flex: 1, alignItems: 'center' }}>
                    
                    {this.state.add ?
                        <>
                    <TouchableOpacity style={styles.loginBtn}  >
                        <Text style={styles.loginText}>Add </Text>
                    </TouchableOpacity>
                   
                            <CreditCardInput style={{ marginBottom: 20 }} />
                            </>
                        :
                        <></>}
                    <TouchableOpacity style={styles.loginBtn}  >
                        <Text style={styles.loginText}>Add </Text>
                    </TouchableOpacity>
                   
                    <CreditCardInput />
                </Container>
            </Container>
        )
    }
}

export default addcard

