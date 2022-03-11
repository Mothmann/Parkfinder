import React, { Component, createRef } from 'react'
import { Text, View, Dimensions, TextInput, TouchableOpacity, Image } from 'react-native'
import { Container, Header, Item, Input, Icon, Button, Content, Left, Right, List, ListItem } from 'native-base';
import styles from './styles'
import Footer from './footer'
import ActionSheet from "react-native-actions-sheet";
import MapboxGL from "@react-native-mapbox-gl/maps";
import Context from '../context/context';
import Axios from 'axios'
import API_URL from '../config';
import MapboxClient from '@mapbox/mapbox-sdk';
import Directions from '@mapbox/mapbox-sdk/services/directions';
import { OpenMapDirections } from 'react-native-navigation-directions';
import * as Location from 'expo-location'

const actionSheetRef = createRef();
const location = createRef();
const mapref = createRef();
const { width, height } = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const mapboxClient = new MapboxClient({accessToken: "pk.eyJ1IjoibWVyeWVteWFoeWEiLCJhIjoiY2twejloOTk3MGZoeTJvcnIyZjZheGs3ayJ9.hmOl6dNWdCT44KcjPC2biA"});
const direction = Directions(mapboxClient)
MapboxGL.setAccessToken("pk.eyJ1IjoibWVyeWVteWFoeWEiLCJhIjoiY2twejloOTk3MGZoeTJvcnIyZjZheGs3ayJ9.hmOl6dNWdCT44KcjPC2biA");

const ImageMarker = ({ children }) =>
    Platform.select({
        ios: children,
        android: (
            <Text
                style={{
                    lineHeight: 88, // there is some weird gap, add 40+ pixels
                }}>
                {children}
            </Text>
        ),
    })
export class map extends Component {


    static contextType = Context;


    state = {
        markers: [{ latlng: { latitude: 33.57, longitude: -7.5803017 }, title: "Parking", description: "description" },
        { latlng: { latitude: 33.582086, longitude: -7.629475 }, title: "Parking", description: "description" },
        { latlng: { latitude: 33.571462, longitude: -7.630544 }, title: "Parking", description: "description" },],
        parking: [],
        select: {},
        value: "",
        search: false,
        directions: {},
        showdirection: false,
        location:[]
    }

    async componentDidMount() {

        Axios.get(`http://${API_URL}/parking/`).then((r) => {
            this.setState({ parking: r.data })
        })
        let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      
       let location = await Location.getCurrentPositionAsync({})
        this.setState({ location : [location.coords.longitude ,location.coords.latitude   ]})
        console.log(this.state.location);
    }


    handleinput = (text) => {
        this.setState({ value: text })
        if (text !== "") {
            this.setState({ search: true })
        }
        if (text === "") {
            this.setState({ search: false })
        }
    }

    callShowDirections = (destination) => {
  
    const endPoint = {
      longitude: this.state.select.GeoLocation[0],
      latitude: this.state.select.GeoLocation[1]
    }
		const transportPlan = 'd';

    OpenMapDirections(null,  endPoint, transportPlan).then(res => {
      console.log(res)
    });
  }

    async fetchDirections(destination) {
        
        
        const requestOptions = {
        profile: 'driving',
        geometries: 'geojson',
        waypoints: [
    {
      coordinates:  this.state.location,
      approach: 'unrestricted'
    },
    {
      coordinates: this.state.select.GeoLocation 
    }
  ],
        annotations: ["distance","duration"]
        };
         this.setState({ directions: {} })
    let res = null;
            direction.getDirections(requestOptions)
                .send()
                .then(response => {

                    this.setState({ directions: response.body.routes[0] })
                    this.setState({ showdirection: true })
                    actionSheetRef.current?.hide()
                })
                .catch(e => {
                    console.log(e);
                })

    }

    renderdirection = () => {
        if (this.state.showdirection )
            return (
                <MapboxGL.ShapeSource id='mapbox-directions-source' shape={this.state.directions.geometry}>
                     
                        <MapboxGL.LineLayer
                            id='mapbox-directions-line'
                            //belowLayerID={Places.UnselectedSymbolID}
                            style={{ lineColor: "black", lineWidth: 3.2, lineOpacity: 1.84 }}
                        />
                      
                </MapboxGL.ShapeSource>
            )
         return <Text></Text>
    
    }
    

    render() {

        return (


            <View style={styles.mapContainer}>

                <MapboxGL.MapView style={styles.map} showUserLocation={true} zoomLevel={11} >
                     
                    <MapboxGL.UserLocation ref={location} />
                    {
                        this.state.location.length > 0 ?

                        <MapboxGL.Camera ref={mapref}
                        zoomLevel={13}
                        centerCoordinate={this.state.location}
                    />
                    :
                            <MapboxGL.Camera ref={mapref}
                                zoomLevel={13}
                                centerCoordinate={[-7.6223695, 33.5800064]}

                    />
                  }
                  
                    
                   
                   
                    
                        
                    
                    {this.state.parking.length > 0 ?
                    
                    
                        this.state.parking.map(item => (
                        <MapboxGL.PointAnnotation coordinate={item.GeoLocation} title={item.Name} id={item._id} key={item._id}
                            onSelected={() => { actionSheetRef.current?.setModalVisible(); this.setState({ select: item }) }}
                        >
                            <ImageMarker>

                                <Image source={require("../assets/marker1.png")} style={{height:55 , width:50}} /></ImageMarker>
                        </MapboxGL.PointAnnotation>
                        ))
                    
                :
                        <MapboxGL.PointAnnotation coordinate={[33, 7]} title="title" id="id">
                            <ImageMarker>

                                <Image source={require("../assets/marker.png")} style={{height:55 , width:50}} /></ImageMarker>
                        </MapboxGL.PointAnnotation>
                    }


                    {/*<MapboxGL.MarkerView id={'hello'} coordinate={[-7.4803017, 33.64]} >
                        <Image source={require("../assets/favicon.png")} />
                    </MapboxGL.MarkerView>*/}

                    
                    {(() => {
                        
                        if (Object.keys(this.state.directions).length > 0 )
                        
                return (
                    <MapboxGL.ShapeSource id='mapbox-directions-source' shape={this.state.directions.geometry}>
                    <MapboxGL.LineLayer
                            id='mapbox-directions-line'
                            //belowLayerID={Places.UnselectedSymbolID}
                            style={{ lineColor: "black", lineWidth: 3.2, lineOpacity: 1.84 }}
                        />    
                    </MapboxGL.ShapeSource>)
                    
                        })()}
                </MapboxGL.MapView>


                <View style={styles.searchHeader}>
                    <Item style={{borderColor:"transparent"}}>
                        <Icon name="ios-search" style={{ color: "#003f5c" }} />
                        <Input placeholder="Search" onChangeText={(text) => this.handleinput(text)} />
                    </Item>
                </View>
                {
                    this.state.search ? <List style={{ backgroundColor: "white", width: "97%", alignSelf: "center", borderRadius: 10, marginTop: 7 }}>
                        {this.state.parking.filter(e => e.Name.toLowerCase().includes(this.state.value) || e.address.toLowerCase().includes(this.state.value)).map(item => (
                            <ListItem onPress={() => { mapref.current.flyTo(item.GeoLocation, 2500), this.setState({ value: "", search: false }) }} key={item._id}>
                                <Text>{item.Name + "\n" + item.address}</Text>

                            </ListItem>
                        ))
                        }
                    </List> : <Text></Text>

                }
                
                <TouchableOpacity onPress={() => { mapref.current.flyTo(location.current?.state.coordinates, 2500) }}
                    style={{ backgroundColor: "white", height: 39, width: 48, alignContent: 'center', padding: 6, borderRadius: 15, alignSelf: 'flex-end', marginTop: 4, right: 5, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="my-location" type="MaterialIcons" style={{ color: "#666666" }} />
                </TouchableOpacity>
                <Footer navigation={this.props.navigation} />

                <ActionSheet ref={actionSheetRef} gestureEnabled={true} bounceOnOpen={true} >
                    <View style={{ padding: 5 }}>
                        <View style={styles.park}>

                            <Text style={{ fontWeight: "bold", fontSize: 48, color: "#2d2d2d", marginTop: 7, marginBottom: 5 }}>{this.state.select.Name}</Text>
                            <View style={{ alignItems: 'flex-end', flexDirection: 'row', marginBottom: 10 }}>
                                <Icon name="map-marker-alt" type="FontAwesome5" style={styles.icon} />
                                <Text style={{ marginLeft: 10 }}>{this.state.select.address}</Text>
                            </View>


                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <Icon name="dollar-sign" type="FontAwesome5" style={{ margin: 5, color: "#666666", fontSize: 17 }} />
                                <Text style={styles.title}>{this.state.select.Parking_Price + " DH/H"} </Text>
                                <Icon name="car" type="FontAwesome5" style={{ margin: 5, color: "#666666", fontSize: 17, marginLeft: 20 }} />
                                <Text style={styles.title}>{this.state.select.Vehicle_Capacity - this.state.select.Total_Vehicles}</Text>
                            </View>


                            <View style={{ alignItems: 'center', flexDirection: 'row', marginVertical: 10 }}>
                                <Icon name="video" type="FontAwesome5" style={styles.icon1} />
                                <Icon name="user-shield" type="FontAwesome5" style={styles.icon1} />
                                <Icon name="wheelchair" type="FontAwesome5" style={styles.icon1} />
                            </View>

                            <View style={{ alignItems: 'flex-end', flexDirection: 'row', marginVertical: 10 }}>
                                <TouchableOpacity onPress={() => { this.callShowDirections() }} style={styles.Btn}>
                                    <Text style={ {color: "white" , fontWeight:'bold'}}>Open direction in map</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => this.fetchDirections()} style={styles.Btn}>
                                    <Text style={{color:'white' , fontWeight:'bold'}}>Show direction</Text></TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.loginBtn} onPress={() => this.props.navigation.navigate('form', { parking: this.state.select })}>
                                <Text style={styles.loginText}>Book Now</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ActionSheet>
            </View>

        )
    }
}


export default map
