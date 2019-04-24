/**
 * Created by admin-pc on 2019/4/25.
 */
import React, {Component} from 'react'
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, FlatList,
  ScrollView
} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {Button, Flex, WhiteSpace, WingBlank, Picker, ListView, List, Provider} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import HeaderComp from './../../util/headerComp'


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class publishJob extends Component {
  constructor(props){
    super(props);
    this.state = {
    
    }
  };
  render() {
    const {navigation} = this.props;
    console.log(this.props);
    let routeName = this.props.navigation.state.params.routeName;
    return (
        <View>
          <HeaderComp navigation={navigation} title="发布职位" routeName={routeName}/>
        </View>
    )
  }
}

const styles = StyleSheet.create({

});

export default publishJob;
