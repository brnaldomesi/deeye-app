import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions
} from 'react-native';
const { width, height } = Dimensions.get('window')
let _this = null;
export default  class Loading extends Component {
  constructor(props) {
    super(props);
    _this = this;
    this.state = {
      show:false
    };
  }
  static show = () => {
    _this.setState({show: true})
  };
  static hide = () => {
    _this.setState({show: false})
  };
  render() {
    if (this.state.show) {
      return (
        <View style={styles.LoadingPage}>
          <ActivityIndicator size={"large"} color={'#0000ff'}/>
          {/*<View style={{*/}
          {/*  width: 100,*/}
          {/*  height: 100,*/}
          {/*  backgroundColor: "rgba(0,0,0,0.6)",*/}
          {/*  opacity: 1,*/}
          {/*  justifyContent: "center",*/}
          {/*  alignItems: "center",*/}
          {/*  borderRadius:7*/}
          {/*}}>*/}
          {/*  <ActivityIndicator size="large" color="#FFF" />*/}
          {/*  <Text style={{ marginLeft: 10,color:"#FFF",marginTop:10 }}>Loading...</Text>*/}
          {/*</View>*/}
        </View>
      );
    } else {
      return <View />
    }
  }
}
const styles = StyleSheet.create({
  LoadingPage: {
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: "rgba(0,0,0,0)",
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
});