/**
 * Created by admin-pc on 2019/4/8.
 */
import React, {Component} from 'react'
import {StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {Button, Flex, WhiteSpace, WingBlank, Picker, List, Provider} from '@ant-design/react-native';


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class JobItemComp extends Component {
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
    return (
        <View style={styles.jobItem_box}>
          <View style={styles.jobItem_body}>
            <Flex justify="between" style={styles.jobItem_header}>
              <Text style={styles.job_name}>前端开发工程师</Text>
                <Text style={styles.job_money}>2k-3k</Text>
            </Flex>
            <Flex>
              <Text style={styles.comp_name}>公式名字</Text>
              <Text style={styles.comp_isCooperate}>是否融资</Text>
            </Flex>
            <Flex justify="between" style={styles.jobItem_main}>
              <Text style={styles.tag_item}>公司地址</Text>
              <Text style={styles.tag_item}>应届生</Text>
              <Text style={styles.tag_item}>本科</Text>
            </Flex>
            <View style={styles.jobItem_footer}>
              <Flex>
                <Image style={styles.hr_img} source={require('./../image/logo.png')}/>
                <Text>招聘者名字.招聘者职位</Text>
              </Flex>
            </View>
          </View>
          
        </View>
    )
  }
}

const styles = StyleSheet.create({
  jobItem_box: {
    paddingTop: 10,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  jobItem_body: {
    width: deviceW,
    paddingLeft: 30,
    paddingRight: 30,
  },
  jobItem_header: {
  
  },
  job_name: {
    fontSize: 18,
    color: 'black',
  },
  job_money: {
    fontSize: 14,
    color: '#5dd5c8'
  },
  jobItem_main: {
    width: deviceW*0.4,
    marginTop: 10,
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  jobItem_footer: {
    marginTop: 10
  },
  comp_name: {
    color: 'black',
    fontSize: 14,
    marginRight: 5,
  },
  comp_isCooperate: {
    color: 'black',
    fontSize: 14,
  },
  tag_item: {
    padding: 2,
    backgroundColor: '#f8f9fb',
    borderRadius: 2,
  },
  hr_img: {
    height: 20,
    width: 20,
    marginRight: 10
  }
  
});
export default JobItemComp;