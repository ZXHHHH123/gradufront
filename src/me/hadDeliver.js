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
import JobItemComp from './../component/JobItemComp'





const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class hadDeliver extends Component {
  _keyExtractor = (item, index) => item._id;
  
  constructor(props) {
    super(props);
    this.state = {
      alljobData: [],
    }
  };
  
  
  intoJobDetail(item) {
    console.log('点击进入jobdetail按钮');
    UserStore.changeBackRouteName('hadDeliver');
    let params = {params: this.props.navigation};
    UserStore.changeJobDetailItem(item);
    /*进入名字为jobdetail的栈*/
    this.props.navigation.navigate('jobDetail', params);
    /*进入栈中名字为jobdetail的screen*/
    // this.props.navigation.navigate('jobDetail', params);
  }
  
  earnHadCurriculumVitaeData() {
    let url = axiosUtil.axiosUrl;
    let hadCurriculumVitaeData = UserStore.allCommunicateData.hadCurriculumVitaeData;
    axios.post(url + 'jobhunter/earnHadCurriculumVitaeData', {hadCurriculumVitaeData}, {
      headers: {
        'Authorization': 'Bearer ' + UserStore.userToken
      }
    }).then((res) => {
      console.log('~~~~~~~~~~~~~~~');
      console.log(res.data.data);
      if (res.data.code === 200) {
        this.setState({
          alljobData: res.data.data
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  intoJobHunterDetail(item) {
    console.log('intoJobHunterDetail');
    // let params = {params: this.props.navigation};
    /*jobHunterDetail*/
    this.props.navigation.navigate('jobHunterDetail', {item, routeName: 'peronCenter'});
    /*进入栈中名字为jobHunterDetail的screen*/
    // this.props.navigation.navigate('jobDetail', params);
  }
  
  componentWillMount() {
    this.earnHadCurriculumVitaeData();
  }
  
  render() {
    const {navigation} = this.props;
    return (
        <View>
          <HeaderComp navigation={navigation} title="已投递的职位" routeName="personCenter"/>
          <View style={{}}>
            <FlatList
                data={this.state.alljobData}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={this.intoJobDetail.bind(this, item)}>
                      <JobItemComp item={item}/>
                    </TouchableOpacity>
                )}
                keyExtractor={this._keyExtractor}
            />
          </View>
          </View>
    )
  }
}

const styles = StyleSheet.create({});

export default hadDeliver;
