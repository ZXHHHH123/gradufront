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
import JobItemComp from './../component/JobItemComp'
import UserStore from './../../mobx/userStore'



const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class interestedJob extends Component {
  _keyExtractor = (item, index) => item._id;
  constructor(props){
    super(props);
    this.state = {
      allCollectJobData: [],
    }
  };
  intoJobDetail(item) {
    console.log('点击进入jobdetail按钮');
    let params = {params: this.props.navigation, routeName: 'personCenter'};
    UserStore.changeJobDetailItem(item);
    /*进入名字为jobdetail的栈*/
    this.props.navigation.navigate('jobDetail', params);
    /*进入栈中名字为jobdetail的screen*/
    // this.props.navigation.navigate('jobDetail', params);
  }
  
  earnCollectJob() {
    console.log('获取所有收藏的职位');
    let url = axiosUtil.axiosUrl;
    axios.post(url + 'jobhunter/earnCollectJob', {},{
      headers: {
        'Authorization': 'Bearer ' + UserStore.userToken
      }
    }).then((res) => {
      // console.log('')
      if(res.data.code === 200) {
        console.log(res.data.data.length);
        this.setState({
          allCollectJobData: res.data.data,
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
    this.earnCollectJob();
  }
  render() {
    const {navigation} = this.props;
    return (
        <View>
          <HeaderComp navigation={navigation} title="我感兴趣的职位" routeName="personCenter"/>
          <FlatList
              data={this.state.allCollectJobData}
              renderItem={({item}) => (
                  <TouchableOpacity onPress={this.intoJobDetail.bind(this, item)}>
                    <JobItemComp item={item}/>
                  </TouchableOpacity>
              )}
              keyExtractor={this._keyExtractor}
              // onEndReached={this._fetchMoreData.bind(this)}
              // onEndReachedThreshold={1}
              // ListHeaderComponent={this._renderHeader.bind(this)}
              // ListFooterComponent={this._renderFooter.bind(this)}
              // renderItem=JobItemComp
          />
        </View>
    )
  }
}

const styles = StyleSheet.create({

});

export default interestedJob;
