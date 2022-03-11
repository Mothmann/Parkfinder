import React, { Component } from 'react'
import { Text, View , TouchableOpacity , TextInput} from 'react-native'
import { Button , Container , Left , Icon  , Header , Body  , Content} from 'native-base'
import styles from './styles';
import DatePicker from 'react-native-datepicker'
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
export class bookingform extends Component {

    state = {
        date: new Date(Date.now()),
        isDatePickerVisible: false,
        carnumber:""
    }
    setDate = (event ,date) => {
        this.setState({ date:date})
    }


   showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

   hideDatePicker = () => {
   this.setState({isDatePickerVisible: false});
  };

  handleConfirm = (date) => {
    this.setState({ date:date})
    this.hideDatePicker();
    };
    componentDidMount() {
        console.log(this.props.route.params.parking);
    }

    handleform = () => {
        if (this.state.carnumber !== "") {
            this.props.navigation.navigate('slot' , {parking:this.props.route.params.parking , date: this.state.date , carnumber: this.state.carnumber})
        }
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
                            <Text style={{color:"#003f5c" ,fontSize: 20}}>Book a Place</Text>
                        </Body>               
                </Header>
                <Container style={styles.container}>
                    <Text>{this.props.route.params.parking.Name}</Text>
                    <Text>{this.props.route.params.parking.address}</Text>
                    <Text style={{fontWeight:'bold' , marginTop:15 , fontSize:15}}>Estimated time of arrival</Text>
                    {/*<View  style={styles.parking}>
                        <View style={{flex : 1, flexDirection : 'column'}}>
                            <Text>x item.spots item.title</Text>
                        </View>
                        <View style={{flex : 1}}>
                                <Text>$7</Text>
                                <Text>itemrating</Text>
                        </View>
                    </View>*/}

                 
                    {/*<DateTimePicker
                        testID="dateTimePicker"
                        value={new Date(Date.now())}
                        mode="datetime"
                        is24Hour={true}
                        display="default"
                        onChange={this.setDate}
                    />*/}
                   
                    <TouchableOpacity onPress={this.showDatePicker}  style={{alignItems: 'flex-end',flexDirection:'row' , marginVertical:15}}>
                        <Icon name="calendar-day" type="FontAwesome5" style={{ color: "white" , marginRight:6}} />
                    <Text>{this.state.date.toString().substr(4, 17)}</Text>

                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={this.state.isDatePickerVisible}
                        mode="datetime"
                        onConfirm={this.handleConfirm}
                        onCancel={this.hideDatePicker}
                    />
                    <View style={styles.inputView} >
          <TextInput             
            style={styles.inputText}
            placeholder="Vehicle registration plate" 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ carnumber: text })} />
                    </View>
                    
        <TouchableOpacity style={styles.loginBtn} onPress={this.handleform } >
          <Text style={styles.loginText}>Select a spot</Text>
        </TouchableOpacity>
                </Container>
            </Container>
        )
    }
}

export default bookingform
