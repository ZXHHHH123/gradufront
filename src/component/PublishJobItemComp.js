/**
 * Created by admin-pc on 2019/4/30.
 */
import React, {Component} from 'react'
import {StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {Button, Flex, WhiteSpace, WingBlank, Picker, List, Provider} from '@ant-design/react-native';


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class PublishJobItemComp extends Component {
  constructor(props){
    super(props);
    this.state = {
      // item: {},
      jobName: '',
      moneySpace: '',
      companyName: '',
      companyAddress: '',
    }
  }
  render() {
    console.log(this.props.item);
    
    let item = this.props.item;
    return (
        <View style={styles.publishJobItem_box}>
          <View style={styles.publishJobItem_body}>
            <Flex justify="between" style={styles.jobItem_header}>
              <Text style={styles.publishJobItem_name}>{item.jobLabel}</Text>
              <Text style={styles.publishJobItem_money}>{item.floorMoney}-{item.upMoney}</Text>
            </Flex>
            <Flex justify="between" style={styles.publishJobItem_main}>
              <Text style={styles.tag_item}>{item.jobAddress}</Text>
              <Text style={styles.tag_item}>{item.studyRequire}</Text>
              <Text style={styles.tag_item}>{item.experienceRequire}</Text>
            </Flex>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  publishJobItem_box: {
    paddingTop: 10,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  publishJobItem_body: {
    width: deviceW,
    paddingLeft: 30,
    paddingRight: 30,
  },
  publishJobItem_name: {
    fontSize: 18,
    color: 'black',
  },
  publishJobItem_money: {
    fontSize: 14,
    color: '#5dd5c8'
  },
  publishJobItem_main: {
    width: deviceW*0.4,
    marginTop: 10,
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  tag_item: {
    padding: 2,
    backgroundColor: '#f8f9fb',
    borderRadius: 2,
  },
  
});
export default PublishJobItemComp;