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

class hadChat extends Component {
  _keyExtractor = (item, index) => item._id;
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
  
  earnCommuniteData() {
    let allCommunicateData;
    
    let url = axiosUtil.axiosUrl;
    let href;
    // console.log()
    if(UserStore.isCompany == 1) {
      href = 'recruiter/earnDetailCommunicateData';
          allCommunicateData = UserStore.allCommunicateData.allCommunicateData
    }else if(UserStore.isCompany == 0) {
      href = 'jobhunter/hasCurriculumVitaeData';
      allCommunicateData = UserStore.allCommunicateData.hasCurriculumVitaeData
    }
    axios.post(url + href, {allCommunicateData}, {
      headers: {
        'Authorization': 'Bearer ' + UserStore.userToken
      }
    }).then((res) => {
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
  
  intoCompanyDetail(item) {
    console.log(123);
    let params = {params: this.props.navigation};
    // let params = {params: this.props.navigation};
    UserStore.changeCompanyDetailItem(item);
    UserStore.changeBackRouteName('hadChat');
    this.props.navigation.navigate('companyDetail', params);
  }
  componentWillMount() {
    console.log('沟通过的详细页');
    this.earnCommuniteData();
  }
  render() {
    const {navigation} = this.props;
    return (
        <View>
          <HeaderComp navigation={navigation} title="沟通过的职位" routeName="personCenter"/>
  
          <View style={{}}>
    
            {UserStore.isCompany == 0 ?
                <FlatList
                    data={this.state.allcompanyData}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={this.intoCompanyDetail.bind(this, item)}>
                          <CompanyItemComp item={item}/>
                        </TouchableOpacity>
                    )}
                    keyExtractor={this._keyExtractor}
                />
                :
                <FlatList
                    data={this.state.allJobHunterData}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={this.intoJobHunterDetail.bind(this, item)}>
                          <JobHunterItemComp item={item}/>
                        </TouchableOpacity>
                    )}
                    keyExtractor={this._keyExtractor}
                />
            }
           
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({

});

export default hadChat;
