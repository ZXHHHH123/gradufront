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
import CompanyItemComp from './../component/CompanyItemComp'


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class messageList extends Component {
  _keyExtractor = (item, index) => item.id;
  
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  intoCompanyDetail() {
    console.log(123);
    let params = {params: this.props.navigation};
    // let params = {params: this.props.navigation};
    this.props.navigation.navigate('companyDetail', params);
  }
  
  render() {
    return (
        <Provider>
          <View style={styles.messageList_box}>
            {/*header start*/}
            <Flex direction="row" justify="between" align="center" style={styles.header}>
              <Text></Text>
              <Text style={styles.header_text}>消息列表</Text>
              <Text></Text>
            </Flex>
            {/*header end*/}
          </View>
        </Provider>
    )
  }
}

const styles = StyleSheet.create({
  messageList_box: {
    backgroundColor: '#f6f6f8',
  },
  header: {
    backgroundColor: '#5dd5c8',
    height: 60,
    width: deviceW,
    paddingLeft: 20,
    paddingRight: 20,
  },
  header_text: {
    fontSize: 16,
    color: 'white',
  },
});
export default messageList