/**
 * Created by admin-pc on 2019/4/29.
 */
import React, {Component} from 'react'
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, FlatList,
  ScrollView
} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {
  Button, Flex, WhiteSpace, WingBlank, Picker, ListView, List, Provider, InputItem, TextareaItem
} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import HeaderComp from './../../util/headerComp'
import JobBigType from './../../util/jobBigType'
import allCityData from './../../util/cityData';
import {observer} from 'mobx-react';
import UserStore from './../../mobx/userStore'


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

@observer
class jobAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseCity: allCityData.data.locationCity.label,
      chooseCityValue: allCityData.data.locationCity.value,
      pickerCityValue: [],
      jobAddress: ''
    };
    this.onChange = value =>{
      this.setState({
        jobaccount: value
      })
    }
  }
  saveJobAddress() {
    console.log('点击保存工作地址按钮');
    console.log(this.state.jobAddress);
    console.log(this.state.chooseCity);
    console.log(this.state.chooseCityValue);
    let {jobAddress, chooseCity, chooseCityValue}= this.state;
    console.log(jobAddress, chooseCity, chooseCityValue);
    if(!(jobAddress && chooseCity && chooseCityValue)) {
      ToastAndroid.show('请详细填写地址信息', ToastAndroid.SHORT);
    }
    UserStore.changeJobAddress(this.state.jobAddress, chooseCity, chooseCityValue);
    
    this.props.navigation.navigate('publishJob');
  }
  
  /*根据不同的type调用不同的数据（城市or薪资）根据所选的pickerTypeValue得到所对应的label（城市or薪资）*/
  changeCityOrSalaryData(type) {
    let typeList, pickerTypeValue;
    if (type === 'city') {
      typeList = allCityData.data.cityList;
      pickerTypeValue = this.state.pickerCityValue;
    }
    typeList.map((items) => {
      if (items.value === pickerTypeValue[0]) {
        if (items.children) {
          items.children.map((item) => {
            if (item.value === pickerTypeValue[1]) {
              if (type === 'city') {
                this.setState({
                  chooseCity: item.label,
                  chooseCityValue: item.value,
                })
              } else if (type === 'salary') {
                let salaryArr = [items.label, item.label];
                this.setState({
                  chooseSalary: salaryArr
                })
              }
            }
          })
        }
      }
    })
  }
  
  render() {
    const {navigation} = this.props;
    return (
        <Provider>
        <View>
          <HeaderComp navigation={navigation} title="填写工作详细地址" routeName='publishJob'/>
          <View style={styles.jobAddress_box}>
  
            <List>
              <Picker
                  title="选择地区"
                  data={allCityData.data.cityList}
                  cols={2}
                  value={this.state.pickerCityValue}
                  onChange={v => {
                    console.log(v);
                    this.setState({pickerCityValue: v}, () => {
                      this.changeCityOrSalaryData('city')
                    })
                  }}
                  onOk={v => this.setState({pickerCityValue: v})}
              >
                <Flex justify="between" align="center" style={styles.edit_job_intention_main_item}>
                  <View style={{marginHorizontal: 15}}>
                    <Text style={{fontSize: 16,}}>工作城市</Text>
                    <Text style={{fontSize: 14, color: 'black'}}>{this.state.chooseCity}</Text>
                  </View>
                  <IconOutline name="right" style={styles.right_icon}/>
      
                </Flex>
    
              </Picker>
            </List>
  
            <InputItem
                defaultValue={this.props.navigation.state.params.jobAddress}
                placeholder="请填写详细工作地址"
                onChange={value => {
                  this.setState({
                    jobAddress: value
                  });
                }}
            >工作地点</InputItem>
            
            
            
            <Flex justify="center" align="center" style={styles.jobAddress_box_button} onPress={this.saveJobAddress.bind(this)}>
              <Text style={styles.jobAddress_box_button_text}>确定</Text>
            </Flex>
          </View>
        </View>
        </Provider>
    )
  }
}

const styles = StyleSheet.create({
  jobAddress_box: {
  },
  jobAddress_box_title: {
    fontSize: 18,
    color: 'black',
    paddingHorizontal: 15,
  },
  
  //宽度设置了就需要调整marginLeft的值，不然不能居中
  jobAddress_box_button: {
    backgroundColor: '#5dd5c8',
    borderRadius: 5,
    width: deviceW* 0.8,
    height: 50,
    marginLeft: deviceW* 0.1,
    marginTop: 40,
  },
  jobAddress_box_button_text: {
    color: 'white',
    fontSize: 16,
  }
});

export default jobAddress;

