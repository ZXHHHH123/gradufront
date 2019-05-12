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
import HeaderComp from "../../util/headerComp";
import AsyncStorage from '@react-native-community/async-storage';



const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class personSetting extends Component{
  constructor(props){
    super(props);
    this.state = {}
  };
  backView() {
    this.props.navigation.navigate('personCenter');
  };
  intoSettingDetail(types) {
    console.log('进入设置单个item详情界面，需要传参======' + types);
    this.props.navigation.navigate(types);
  };
 
  changeStatus() {
    console.log('点击切换身份item');
    this.props.navigation.navigate('changeStatus');
  };
   exitLogin = async() => {
    console.log('点击退出登录');
    await AsyncStorage.setItem('phone', '');
    await AsyncStorage.setItem('pwd', '');
    this.props.navigation.navigate('Login')
  };
  
  render(){
    const {navigation} = this.props;
    return (
        <View style={styles.personSetting_box}>
          <HeaderComp navigation={navigation}  routeName="personCenter" title="设置" />
          
          {/*修改个人的基本信息*/}
          <View style={styles.personSetting_box_lists}>
            <Flex style={styles.personSetting_box_item} justify="between" onPress={this.intoSettingDetail.bind(this, 'fixPhone')}>
              <Text style={styles.personSetting_box_item_left}>修改手机号</Text>
              <IconOutline name="right" color="#5dd5c8" style={{fontSize: 20}} />
            </Flex>
  
            <Flex style={styles.personSetting_box_item} justify="between" onPress={this.intoSettingDetail.bind(this, 'fixPwd')}>
              <Text style={styles.personSetting_box_item_left}>设置密码</Text>
              <IconOutline name="right" color="#5dd5c8" style={{fontSize: 16}}/>
            </Flex>
          </View>
  
          {/*平台基本信息*/}
          <View style={styles.personSetting_box_lists}>
            <Flex style={styles.personSetting_box_item} justify="between">
              <Text style={styles.personSetting_box_item_left}>关于我们</Text>
              <IconOutline name="right" color="#5dd5c8" style={{fontSize: 20}} onPress={this.intoSettingDetail.bind(this, 'aboutUS')}/>
            </Flex>
          </View>
          
          {/*切换身份*/}
          <View style={styles.personSetting_box_lists}>
            <Flex style={styles.personSetting_box_item} justify="between"  onPress={this.changeStatus.bind(this)}>
              <Text style={styles.personSetting_box_item_left}>切换身份</Text>
              <IconOutline name="right" color="#5dd5c8" style={{fontSize: 20}} onPress={this.intoSettingDetail.bind(this, 'changeStatus')}/>
            </Flex>
          </View>
  
  
          {/*切换身份*/}
          <View style={styles.personSetting_box_lists}>
            <Flex style={styles.personSetting_box_item} justify="between"  onPress={this.exitLogin.bind(this)}>
              <Text style={styles.personSetting_box_item_left}>退出应用</Text>
              <IconOutline name="right" color="#5dd5c8" style={{fontSize: 20}} />
            </Flex>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  personSetting_box: {
    height: deviceH,
    width: deviceW,
    backgroundColor: '#f6f6f8',
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  personSetting_box_lists: {
    marginTop: 15,
    backgroundColor: "white",
  },
  personSetting_box_item: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: '#f6f6f8',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  personSetting_box_item_left: {
    fontSize: 15,
  }
});

export default personSetting;