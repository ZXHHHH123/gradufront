/**
 * Created by admin-pc on 2019/4/30.
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
import {observer} from 'mobx-react';
import HeaderComp from './../../util/headerComp'
import publishJob from "../publish/publishJob";
import PublishJobItemComp from './../component/PublishJobItemComp'
import UserStore from './../../mobx/userStore'


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

@observer
class positionManage extends Component {
  _keyExtractor = (item, index) => item._id;
  constructor(props){
    super(props);
    this.state = {
      allPublishJob: [],
    }
  };
  /*点击进入发布的工作设置界面*/
  intoPublishJobSetting(item) {
    console.log('intoPublishJobSetting');
    let presentPublishJob = item;
    this.props.navigation.navigate('publishJob',{presentPublishJob, routeName: 'positionManage'});
  };
  publishJob() {
    console.log('发布新职位');
    this.props.navigation.navigate('publishJob', {routeName: 'positionManage'})
  }
  
  earnAllPublishJob() {
    console.log('获取所有职位');
    let url = axiosUtil.axiosUrl;
    axios.post(url + 'recruiter/allPublishJob', {}, {
      headers: {
        'Authorization': 'Bearer ' + UserStore.userToken
      }
    }).then((res) => {
      console.log('获取所有职位将接口返回消息');
      if(res.data.code === 200) {
        UserStore.changePublishJobNum(res.data.data.length);
        UserStore.changeAllPublishJobData(res.data.data);
        this.setState({
          allPublishJob: res.data.data
        })
      }
      
    }).catch((err) =>{
      console.log(err);
    })
    
  }
  componentWillMount() {
  
    console.log('aaaaaaaaa');
    console.log(UserStore.allPublishJobData);
    this.earnAllPublishJob();
   
  }
  render() {
    const {navigation} = this.props;
    return (
        <Provider>
        <View>
          <HeaderComp navigation={navigation} title="职位管理" routeName="personCenter"/>
          <View style={{marginBottom: 210}}>
          <FlatList
              data={Array.from(UserStore.allPublishJobData)}
              renderItem={({item}) => (
                  <TouchableOpacity onPress={this.intoPublishJobSetting.bind(this, item)}>
                    <PublishJobItemComp key={item._id} item={item}/>
                  </TouchableOpacity>
              )}
              keyExtractor={this._keyExtractor}
          />
            <Flex justify="center" align="center" style={styles.positionManage_box_button} onPress={this.publishJob.bind(this)}>
              <Text style={styles.positionManage_box_button_text}>发布新职位</Text>
            </Flex>
          </View>
         
        </View>
        </Provider>
    )
  }
}

const styles = StyleSheet.create({
  positionManage_box_button: {
    width: deviceW * 0.9,
    height: 40,
    marginLeft: deviceW * 0.05,
    backgroundColor: '#5dd5c8',
    borderRadius: 5,
  },
  positionManage_box_button_text: {
    fontSize: 16,
    color: 'white',
  }
});

export default positionManage;
