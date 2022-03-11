import React, { Component } from 'react'
import { Text, View , ImageBackground , Image , TouchableOpacity} from 'react-native'
import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import styles from './styles';
export class footer extends Component {
 
    render() {
        return (          
            <View style={styles.mapfooter}>
                
                
                <ImageBackground source={require('../assets/footer.png')} style={{ width: "100%", height: "100%" }}>
                    <FooterTab style={styles.footerTab}>
                       
                        <Button vertical onPress={() => this.props.navigation.navigate('dashboard')}> 
                            <Icon name="apps" style={{color:"#2e2d2d"}}/>
                            <Text style={styles.footerText}>Dashbord</Text>
                        </Button>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('map')}>
                        <Image source={require('../assets/7_black.png')} 
                            style={{ height: 60, width: 60, marginTop: -20 }} />
                    </TouchableOpacity>
                        
                        <Button vertical onPress={() => this.props.navigation.navigate('booking')}>
                            <Icon active type="FontAwesome5" name="calendar-check" style={{color:"#2e2d2d"}}/>
                            <Text style={styles.footerText}>Booking</Text>
                        </Button>
                        
                    </FooterTab>
                        </ImageBackground>
                   
                 
                </View>           
        )
    }
}

export default footer
