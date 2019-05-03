/**
 * Created by admin-pc on 2019/5/1.
 */
/**
 * Created by admin-pc on 2019/5/1.
 */
import React, {Component} from 'react'
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, FlatList,
  ScrollView
} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {
  Button, Flex, WhiteSpace, WingBlank, Picker, ListView, List, Provider, InputItem, Modal, DatePicker, TextareaItem
} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import HeaderComp from './../../util/headerComp'
import UserStore from './../../mobx/userStore'


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class personAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personAccount: ''
    };
    this.onChange = value =>{
      this.setState({
        personAccount: value
      })
    }
  }
  confirmPersonAccount() {
    console.log('点击确定我的优势按钮');
    console.log(this.state.personAccount);
    let personAccount = this.state.personAccount;
    UserStore.changePersonAccount(personAccount);
    this.props.navigation.navigate('editBasicInfo');
  }
  render() {
    const {navigation} = this.props;
    return (
        <Provider>
          <View>
            <HeaderComp navigation={navigation} title="我的优势" routeName={this.props.navigation.state.params.routeName}/>
            <View style={styles.personAccount_box}>
              <TextareaItem rows={6} placeholder="阐述我的优势" count={150} defaultValue={UserStore.personAccount} onChange={this.onChange} style={{    paddingHorizontal: 15,}} />
              
              <Flex justify="center" align="center" style={styles.personAccount_box_button} onPress={this.confirmPersonAccount.bind(this)}>
                <Text style={styles.personAccount_box_button_text}>确定</Text>
              </Flex>
            </View>
          </View>
        </Provider>
    )
  }
}

const styles = StyleSheet.create({
  personAccount_box: {
  },
  personAccount_box_button: {
    width: deviceW * 0.8,
    height: 40,
    marginTop: 20,
    marginLeft: deviceW * 0.1,
    backgroundColor: "#5dd5c8",
    borderRadius: 5,
  },
  personAccount_box_button_text: {
    color: 'white',
    fontSize: 18,
  }
});

export default personAccount;
