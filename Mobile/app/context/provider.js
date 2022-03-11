import React, { Component } from 'react';
import Context from './context';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
export default class Provider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            token: null,
            id: null,
            connected:null
        };
     
    }

    async componentDidMount() {
       try {
           const token = await AsyncStorage.getItem('token')
           const id = await AsyncStorage.getItem('id')
         
    if(token !== null && id !== null) {
        this.setState({ token: token, id: id , connected:true})
        
    }
    } catch(e) {
        console.log(e);
    } 
    }
    render() {
        return (
            <Context.Provider
                value={{
                    id: this.state.id,
                    token: this.state.token,
                    user: this.state.user,
                    connected:this.state.connected,
                    toggle: () => { this.setState({ show: !this.state.show }) },
                    setvalue: (t , id , c) => {
                        this.setState({ token: t , id:id  , connected:c})
                    }
                    }
                }
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}
