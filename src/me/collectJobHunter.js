/**
 * Created by admin-pc on 2019/5/23.
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

class collectJobHunter extends Component {
  _keyExtractor = (item, index) => item._id;
  _keyExtractor1 = (item, index) => item.company._id;
  
  constructor(props){
    super(props);
    this.state = {
      collectJobHunterData: [],
    }
  };
  intoJobHunterDetail(item) {
    console.log('intoJobHunterDetail');
    // let params = {params: this.props.navigation};
    /*jobHunterDetail*/
    this.props.navigation.navigate('jobHunterDetail', {item, routeName: 'collectJobHunter'});
    /*进入栈中名字为jobHunterDetail的screen*/
    // this.props.navigation.navigate('jobDetail', params);
  }
  
  earnCollectJobHunter() {
    console.log('获取职位');
  
    let url = axiosUtil.axiosUrl;
    axios.post(url + 'recruiter/earnCollectJobHunter', {},{
      headers: {
        'Authorization': 'Bearer ' + UserStore.userToken
      }
    }).then((res) => {
      // console.log('')
      if(res.data.code === 200) {
        console.log(res.data.data.length);
        this.setState({
          collectJobHunterData: res.data.data,
        })
        // ToastAndroid.show('收藏成功', ToastAndroid.SHORT);
      }else {
        ToastAndroid.show('还没有收藏任何职位', ToastAndroid.SHORT);
      }
    }).catch((err) =>{
      console.log(err);
    });
    
    
  }
  componentWillMount() {
    console.log('沟通过的详细页');
    this.earnCollectJobHunter();
  }
  render() {
    const {navigation} = this.props;
    return (
        <View>
          <HeaderComp navigation={navigation} title="收藏的牛人" routeName="personCenter"/>
  
          <FlatList
              data={this.state.collectJobHunterData}
              renderItem={({item}) => (
                  <TouchableOpacity onPress={this.intoJobHunterDetail.bind(this, item)}>
                    <JobHunterItemComp item={item}/>
                  </TouchableOpacity>
              )}
              keyExtractor={this._keyExtractor}
          />
        </View>
    )
  }
}

const styles = StyleSheet.create({

});

export default collectJobHunter;
