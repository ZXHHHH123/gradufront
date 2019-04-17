/**
 * Created by admin-pc on 2019/4/17.
 */
import React, {Component} from 'react'
import {StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {Button, Flex, WhiteSpace, WingBlank, Picker, List, Provider} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class CompanyItemComp extends Component {
  constructor(props){
    super(props);
    this.state = {
    
    }
  }
  render() {
    return (
        <View style={styles.companyItem_box}>
          <View style={styles.companyItem_main}>
            <View style={styles.companyItem_top}>
              <Flex>
                <Image style={styles.companyItem_company_img} source={require('./../image/logo.png')}/>
                <View>
                  <Text style={styles.company_name}>公司名字</Text>
                  <Text style={styles.company_address}>公司地址 岳麓区 中电软件园</Text>
                </View>
              </Flex>
            </View>
            
            <Flex style={styles.companyItem_main_bottom}>
              <Text style={styles.companyItem_tag}>不需要融资</Text>
              <Text style={styles.companyItem_tag}>不需要融资</Text>
              <Text style={styles.companyItem_tag}>不需要融资</Text>
            </Flex>
          </View>
          
            <Flex justify="between" align="center" style={styles.companyItem_bottom}>
                <Flex justify="between" align="center">
                <Text>热招：</Text>
                <Text style={styles.companyItem_jobtype}>前端开发工程师</Text>
                <Text>等252个职位</Text>
                </Flex>
              <IconOutline name="right" color="#818182"/>
            </Flex>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  companyItem_box: {
    paddingTop: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 15,
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  companyItem_main: {
    borderBottomColor: '#f6f6f8',
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  companyItem_top: {
    paddingVertical: 10,
  },
  
  companyItem_company_img: {
    height: 30,
    width: 30,
    marginRight: 10
  },
  company_name: {
    color: 'black',
    fontSize: 18,
  },
  company_address: {
    color: 'black',
    fontSize: 14,
  },
  companyItem_tag: {
    padding: 3,
    fontSize: 12,
    backgroundColor: '#f6f6f8',
    marginRight: 5,
  },
  companyItem_main_bottom: {
    paddingBottom: 10
  },
  
  companyItem_bottom: {
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
    height: 40,
  },
  companyItem_jobtype: {
    color: '#5dd5c8'
  }
});

export default CompanyItemComp;