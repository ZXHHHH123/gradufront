/**
 * Created by admin-pc on 2019/5/11.
 */
import React, {Component} from 'react'
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, FlatList,
  ScrollView,
  ImageBackground
} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../../graduFront/config/system'
import {Button, Flex, WhiteSpace, WingBlank, Provider, Modal} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import ComplainItem from './../../util/complainItem.json'
import JobItemComp from "../component/JobItemComp";
import CompanyItemComp from './../component/CompanyItemComp'
import UserStore from './../../mobx/userStore'
import HeaderComp from './../../util/headerComp'
import {changeWorkTime} from './../../util/baseFunction'



const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class allAttentionCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allAttentionCompany: [],
    }
  }
  
  earnAllAttentionCompany() {
    let url = axiosUtil.axiosUrl;
    axios.post(url + 'jobhunter/earnAllAttentionCompany', {}, {
      headers: {
        'Authorization': 'Bearer ' + UserStore.userToken
      }
    }).then((res) => {
      if(res.data.code === 200) {
        this.setState({
          allAttentionCompany: res.data.data,
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  
  intoCompanyDetail(item) {
    console.log(123);
    console.log(item);
    let params = {params: this.props.navigation};
    // let params = {params: this.props.navigation};
    UserStore.changeCompanyDetailItem(item);
    UserStore.changeBackRouteName('personCenter');
    this.props.navigation.navigate('companyDetail', params);
  }
  
  componentWillMount() {
    this.earnAllAttentionCompany();
  }
  render() {
    const {navigation} = this.props;
    return (
        <View>
          <HeaderComp navigation={navigation} title="已关注公司" routeName='personCenter'/>
          
          

          {this.state.allAttentionCompany.map((item, index) => {
            return (
            <TouchableOpacity onPress={this.intoCompanyDetail.bind(this, item)} key={index}>
              <CompanyItemComp item={item}/>
            </TouchableOpacity>
            )
          })}
        </View>
    )
  }
  
}


const styles = StyleSheet.create({

})

export default allAttentionCompany;