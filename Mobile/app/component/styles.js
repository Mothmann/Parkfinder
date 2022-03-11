import { StyleSheet, Dimensions } from 'react-native'
import Constants from 'expo-constants';
const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  map: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  mapContainer: {
    width: '100%',
    height: '100%'
  },
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#e4e4e4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#2d2d2d",
    marginBottom: 50,
  },
  inputView: {
    width: "80%",
    backgroundColor: 'rgba(52,52,52,0.7)',
    borderRadius: 4,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
    fontWeight:"bold"
  },
  forgot: {
    color: "#d8d8d8",
    fontSize: 11,
    marginTop: 20,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#F1b712",
    borderRadius: 3,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 10,
    shadowColor: "#F1b712",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,

  },
  signupBtn: {
    width: "80%",
    backgroundColor: "#F1b712",
    borderRadius: 3,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#F1b712",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  loginText: {
    color: "white",
    fontWeight: 'bold',
  },
  tinyLogo: {
    width: 100,
    height: 100,
    marginBottom: 40
  },
  mapfooter: {
    backgroundColor: "transparent",
    bottom: 0,
    //top: height - 59,
    height: 63,
    width: "100%",
    position: "absolute"
  },
  footerTab: {
    backgroundColor: "transparent",

  },
  footerText: {
    color: "#2e2d2d"
  },
  searchHeader: {
    backgroundColor: "white",
    borderRadius: 20,
    borderColor:"transparent",
    marginRight: 5,
    marginLeft: 5,
    width: "98%",
    top: 8,
    paddingLeft: 15,
  },
  header: {
    backgroundColor: "white",
    top: 0,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { marginLeft: 5, marginRight: 0, color: "#666666" },
  icon1: { margin: 10, color: "#666666" },
  iconArrow: { marginLeft: 20, marginRight: 20, color: "#666666" },
  iconCalendar: { marginLeft: 5, marginRight: 7, color: "#666666" },

  barTitle: { color: "#403f3f", fontSize: 20, margin: 4 },
  title: { color: "#403f3f", fontSize: 17, margin: 4 },
  accountItem: { width: "96%", backgroundColor: "white", height: 55, padding: 10, marginLeft: 10, marginTop: 6 },
  userImage: { width: width, height: "100%" },
  imageContainer: { width: '100%', height: 250 },
  editBtn: {
    marginTop: -25,
    alignSelf: 'flex-end',
    backgroundColor: "#F1b712",
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    height: 53,
    width: 53,
    padding: 10,
    right: 6,
    shadowColor: "#F1b712",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  profilItem: {
    marginLeft: 25,
    marginTop: 5,
    marginBottom: 20
  },
  scrollCard: {
    backgroundColor: "white",
    margin: 5,
    borderRadius: 6,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 7,

    elevation: 11,
    
  },
  cont: {
    backgroundColor: "#e4e4e4",
    marginTop: 0,
    width: '100%',
    height: '100%'
  },
  scrollCardItem: {
    color: "#403f3f",
    marginVertical: 2
  },
  park: { marginVertical: 10, alignItems: 'center', justifyContent: 'center', },
  avoider: {
    flex: 1,
    padding: 36,
  },
  button: {
    margin: 36,
    marginTop: 0,
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  parking: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 24,
    marginHorizontal: 24,
    width: width - (24 * 2)
  },
  slot: { backgroundColor: "#f2f2f2", height: 55, width: 100, borderRadius: 12, alignContent: 'center', alignItems: 'center', margin: 5 }
  ,
  slotname: {
    backgroundColor: "#d9d9d9", height: 50, width: 60, borderRadius: 15, alignContent: 'center', alignItems: 'center', margin: 5, alignSelf: 'flex-start'
  },
  textcenter: { alignSelf: 'center', fontSize: 15, textAlignVertical: "center", flex: 1, },
  titlecenter: { alignSelf: 'center', fontSize: 20, textAlignVertical: "center", flex: 1, },
  logincont: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  Btn: {
    padding:5,
    backgroundColor: "#F1b712",
    borderRadius: 3,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin:5,
    shadowColor: "#F1b712",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,

  },
  shadow: {
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  }
  ,
  cards: {
    borderRadius: 7,
    width: '96%',
    alignSelf: 'center',
    backgroundColor:'transparent'
  },
  card: {
    width:'100%',
    borderRadius: 7,
    alignSelf: 'center',
       backgroundColor: 'transparent',
    marginVertical: 7
  },
  cancelbtn: {
        width: "80%",
    backgroundColor: "#F1b712",
    borderRadius: 3,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 30,
    shadowColor: "#F1b712",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  }
});

export default styles