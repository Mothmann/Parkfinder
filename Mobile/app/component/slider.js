import React, { Component } from 'react'
import { Text, View , StyleSheet , Image , Ion} from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider';
//import {Redirect} from 'react-router-native'
export class slider extends Component {

  

    state = {
      showRealApp: false,
      slides : [
  {
    key: 1,
    title: 'Welcome to',
    text: 'The new solution for Parking.\nA revolution in the world of transport.',
    image: require('../assets/parkingfinderblanc_sm.png'),
    style: styles.image,
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'CashLess & Ticketless',
    text: "Forget about the clutters of receipts\nEverything is handled on our app.",
    image: require('../assets/7.png'),
    style: styles.image2,
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Stress Free',
    text: 'Enjoy an amazing parking experience.\nBook now ! ',
    image: require('../assets/slider.png'),
    style: styles.image3,
    backgroundColor: '#22bcb5',
  }
],
    }
      _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={ item.style}/>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }
    _onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
       this.props.navigation.navigate('intro')
    }

    
 
    render() {
      //  if (!this.state.showRealApp)
            return <AppIntroSlider renderItem={this._renderItem} data={this.state.slides} onDone={this._onDone}
                //renderSkipButton={}
                activeDotStyle={{ backgroundColor: "#f5d21f" }} dotStyle={{ backgroundColor: "#fff" }}
            />;
      //  else return (<Redirect to="/login" />)
    }
}

const styles = StyleSheet.create({
    title: {
       color: "#F1b712", fontSize: 30, marginVertical:20 , fontWeight:'bold'
    },
    image: {
       
      marginVertical: 70
  },
     image2: {
       
       marginTop: 70,
       marginBottom: 40,
    },
    text: {
        color: "white", fontSize: 17, margin: 4 , alignSelf: 'center', textAlignVertical: "center" , fontWeight:'bold' , textAlign:'center'
  },
  image3: {
    marginTop: 40,
    height: 450,
    width:450
    },
    slide: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    },
})
export default slider
