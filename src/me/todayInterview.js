/**
 * Created by admin-pc on 2019/4/22.
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
import UserStore from './../../mobx/userStore'
import JobHunterItemComp from './../component/JobHunterItemComp'
import CompanyItemComp from './../component/CompanyItemComp'





const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class todayInterview extends Component {
  _keyExtractor = (item, index) => item._id;
  _keyExtractor1 = (item, index) => item.company._id;
  
  constructor(props){
    super(props);
    this.state = {
      allJobHunterData: [],
      allcompanyData: [],
    }
  };
  intoJobHunterDetail(item) {
    console.log('intoJobHunterDetail');
    // let params = {params: this.props.navigation};
    /*jobHunterDetail*/
    this.props.navigation.navigate('jobHunterDetail', {item, routeName: 'peronCenter'});
    /*进入栈中名字为jobHunterDetail的screen*/
    // this.props.navigation.navigate('jobDetail', params);
  }
  intoCompanyDetail(item) {
    console.log(123);
    console.log(item);
    let params = {params: this.props.navigation};
    // let params = {params: this.props.navigation};
    UserStore.changeCompanyDetailItem(item.company);
    UserStore.changeBackRouteName('todayInterview');
    this.props.navigation.navigate('companyDetail', params);
  }
  earnInterviewData() {
    let allInerviewData = UserStore.allCommunicateData.interviewData;
  
    console.log('abcdefg');
    console.log(UserStore.allCommunicateData.interviewData);
    let url = axiosUtil.axiosUrl;
    let href;
    if(UserStore.isCompany == 1) {
      href = 'recruiter/earnInterviewData';
    }else if(UserStore.isCompany == 0) {
      href = 'jobhunter/earnInterviewData';
    }
    axios.post(url + href, {allInerviewData}, {
      headers: {
        'Authorization': 'Bearer ' + UserStore.userToken
      }
    }).then((res) => {
      console.log('~~~~~~~~~~~~~~~');
      console.log(res.data.data);
      if (res.data.code === 200) {
        if(UserStore.isCompany == 1) {
          this.setState({
            allJobHunterData: res.data.data
          })
        }else if(UserStore.isCompany == 0) {
          this.setState({
            allcompanyData: res.data.data
          })
        }
 
        // ToastAndroid.show('对方已收到提醒', ToastAndroid.SHORT);
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  componentWillMount() {
    console.log('沟通过的详细页');
    this.earnInterviewData();
  }
  render() {
    const {navigation} = this.props;
    return (
        <View>
          <HeaderComp navigation={navigation} title="面试日程" routeName="personCenter"/>
  
          <View style={{}}>
    
            {UserStore.isCompany == 0 ?  <FlatList
                data={this.state.allcompanyData}
                renderItem={({item, index}) => (
                    <TouchableOpacity onPress={this.intoCompanyDetail.bind(this, item)} key={index}>
                      <CompanyItemComp item={item.company} interviewData = {item.interviewDetail}/>
                    </TouchableOpacity>
                )}
                keyExtractor={this._keyExtractor1}
            />:  <FlatList
                data={this.state.allJobHunterData}
                renderItem={({item, index}) => (
                    <TouchableOpacity onPress={this.intoJobHunterDetail.bind(this, item)} key={index}>
                      <JobHunterItemComp item={item}/>
                    </TouchableOpacity>
                )}
                keyExtractor={this._keyExtractor}
            />}
           
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({

});

export default todayInterview;
