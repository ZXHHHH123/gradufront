/**
 * Created by admin-pc on 2019/4/12.
 */
import React, {Component} from 'react'
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, ScrollView,
  Platform, BackHandler
} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {Button, Flex, WhiteSpace, WingBlank, Picker, List, Provider, Modal} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";

import {district} from 'antd-mobile-demo-data';
import allCityData from './../../util/cityData';
import allSalaryData from './../../util/salaryData';
import {observer} from 'mobx-react';
import UserStore from './../../mobx/userStore'


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

@observer
class EditJobIntention extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseCity: allCityData.data.locationCity.label,
      chooseCityValue: allCityData.data.locationCity.value,
      chooseSalary: ['8k', '15k'],
      data: [],
      value: [],
      pickerCityValue: [101250000, 101250100],
      // pickerCityValue: [],
      pickerSalaryValue: [],
    };
  };
  
  backView() {
    console.log('返回');
    UserStore.changeConfirmLeaveEditJob(true);
    if (!(UserStore.isShowLeaveEditJobView)) {
      if(this.props.navigation.state.params.routeName) {
        console.log(111);
        console.log(this.props.navigation.state.params.routeName);
        this.props.navigation.navigate(this.props.navigation.state.params.routeName);
      }else {
        console.log(222);
        this.props.navigation.navigate('manageJobIntention');
      }
    }
  };
  
  chooseType(type) {
    console.log('进入选择工作岗位界面' + type);
    if (type === 'cityType' || type === 'salaryStage') {
      return;
    }
    this.props.navigation.navigate(type, {routeName: "editJobIntention"});
    
  };
  
  saveJobIntention() {
    let url = axiosUtil.axiosUrl;
    console.log('保存求职意向func');
    console.log(UserStore.chooseJobLabel + UserStore.chooseJobValue);
    console.log(this.state.pickerCityValue);
    console.log(this.state.chooseSalary);
    console.log(UserStore.chooseIndustryData);
    let expectObj = {
      expectJobLabel: UserStore.chooseJobLabel,
      expectJobValue: UserStore.chooseJobValue,
      expectCity: this.state.chooseCity,
      expectCityValue: this.state.chooseCityValue,
      expectFloorMoney:this.state.chooseSalary[0],
      expectUpMoney: this.state.chooseSalary[1],
      expectIndustry: UserStore.chooseIndustryData,
    };
    
    axios.post(url + 'jobhunter/saveExpectJobInfo', expectObj, {
      headers: {
        'Authorization': 'Bearer ' + UserStore.userToken
      }
    }).then((res) =>{
      if(res.data.code === 200) {
        ToastAndroid.show('保存成功', ToastAndroid.SHORT);
        UserStore.changeConfirmLeaveEditJob(false);
        this.props.navigation.navigate('manageJobIntention');
      }
    }).catch((err) => {
      console.log(err);
    })
    
  
  };
  
  /*根据不同的type调用不同的数据（城市or薪资）根据所选的pickerTypeValue得到所对应的label（城市or薪资）*/
  changeCityOrSalaryData(type) {
    let typeList, pickerTypeValue;
    if (type === 'city') {
      typeList = allCityData.data.cityList;
      pickerTypeValue = this.state.pickerCityValue;
    } else if (type === 'salary') {
      typeList = allSalaryData.data.salaryList;
      pickerTypeValue = this.state.pickerSalaryValue;
    }
    typeList.map((items) => {
      if (items.value === pickerTypeValue[0]) {
        if (items.children) {
          items.children.map((item) => {
            if (item.value === pickerTypeValue[1]) {
              if (type === 'city') {
                this.setState({
                  chooseCityValue: item.value,
                  chooseCity: item.label
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
  
  
  onBackAndroid = () => {
    UserStore.changeConfirmLeaveEditJob(true);
    if (UserStore.isShowLeaveEditJobView) {
      return true
    } else {
    
    }
  };
  
  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  };
  
  componentWillUnmount() {
    console.log('abcde');
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  
  render() {
    const footerButtons = [
      {text: '点错了', onPress: () => UserStore.changeConfirmLeaveEditJob(false)},
      {
        text: '放弃', onPress: () => {
        UserStore.changeConfirmLeaveEditJob(false);
  
        if(this.props.navigation.state.params.routeName) {
          this.props.navigation.navigate(this.props.navigation.state.params.routeName);
        }else {
          this.props.navigation.navigate('manageJobIntention');
        }
        // this.props.navigation.navigate('manageJobIntention');
      }
      },
    ];
    return (
        <Provider>
          <View style={styles.edit_job_intention_box}>
            {/*edit_job_intention_box_header------start*/}
            <View>
              <Flex justify="between" style={styles.edit_job_intention_header}>
                <IconOutline name="left" style={styles.back_icon} onPress={this.backView.bind(this)}/>
                <Text style={styles.edit_job_intention_header_text_title}>编辑求职意向</Text>
                <Text onPress={this.saveJobIntention.bind(this)}
                      style={styles.edit_job_intention_header_text_save}>保存</Text>
              </Flex>
            </View>
            {/*edit_job_intention_box_header------end*/}
            
            
            {/*edit_job_intention_box_body_choose------start*/}
            <View>
              <Flex justify="between" align="center" style={styles.edit_job_intention_main_item}
                    onPress={this.chooseType.bind(this, 'jobType')}>
                <View>
                  <Text style={styles.edit_job_intention_main_item_key}>期望职位</Text>
                  {UserStore.chooseJobLabel ?
                      <Text style={styles.edit_job_intention_main_item_value}>{UserStore.chooseJobLabel}</Text> :
                      <Text style={styles.edit_job_intention_main_item_value}>请选择期望职位</Text>}
                </View>
                <IconOutline name="right" style={styles.right_icon}/>
              
              </Flex>
              
              <Flex justify="between" align="center" style={styles.edit_job_intention_main_item}
                    onPress={this.chooseType.bind(this, 'industryType')}>
                <View>
                  <Text style={styles.edit_job_intention_main_item_key}>期望行业</Text>
                  {UserStore.chooseIndustryData.length > 0 ?
                      <Flex>
                      {UserStore.chooseIndustryData.map((item, index) =>{
                        return (
                            <Text style={styles.edit_job_intention_main_item_value}>{item}</Text>
                        )
                      })}
                      </Flex>
                     
                      : <Text style={styles.edit_job_intention_main_item_value}>不限</Text>
                  }
                </View>
                <IconOutline name="right" style={styles.right_icon}/>
              
              </Flex>
              
              
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
                  <Flex justify="between" align="center" style={styles.edit_job_intention_main_item}
                        onPress={this.chooseType.bind(this, 'cityType')}>
                    <View>
                      <Text style={styles.edit_job_intention_main_item_key}>工作城市</Text>
                      <Text style={styles.edit_job_intention_main_item_value}>{this.state.chooseCity}</Text>
                    </View>
                    <IconOutline name="right" style={styles.right_icon}/>
                  
                  </Flex>
                
                </Picker>
              </List>
              
              <List>
                <Picker
                    title="选择薪资阶段"
                    data={allSalaryData.data.salaryList}
                    cols={2}
                    value={this.state.pickerCityValue}
                    onChange={v => {
                      console.log(v);
                      this.setState({pickerSalaryValue: v}, () => {
                        this.changeCityOrSalaryData('salary')
                      })
                    }}
                    onOk={v => this.setState({pickerCityValue: v})}
                >
                  <Flex justify="between" align="center" style={styles.edit_job_intention_main_item}
                        onPress={this.chooseType.bind(this, 'salaryStage')}>
                    <View>
                      <Text style={styles.edit_job_intention_main_item_key}>薪资要求</Text>
                      
                      {/*根据是否是面议薪资进行不一样的显示----如果chooseSalary[0]===chooseSalary[1]即为面议*/}
                      {this.state.chooseSalary[0] !== this.state.chooseSalary[1] ?
                          <Text style={styles.edit_job_intention_main_item_value}>{this.state.chooseSalary[0]}
                            ~ {this.state.chooseSalary[1]}</Text> :
                          <Text
                              style={styles.edit_job_intention_main_item_value}>{this.state.chooseSalary[0]}</Text>
                      }
                    </View>
                    <IconOutline name="right" style={styles.right_icon}/>
                  </Flex>
                </Picker>
              </List>
            
            
            </View>
            {/*edit_job_intention_box_body_choose------end*/}
          </View>
          
          <Modal
              title="温馨提示"
              transparent
              onClose={() => UserStore.changeConfirmLeaveEditJob(false)}
              maskClosable
              visible={UserStore.isShowLeaveEditJobView}
              closable
              footer={footerButtons}
          >
            <View style={{paddingVertical: 20}}>
              <Text style={{textAlign: 'center'}}>内容尚未保存，确定放弃？</Text>
            </View>
            <Button type="primary" onPress={this.onClose}>
              close modal
            </Button>
          </Modal>
        </Provider>
    
    )
  }
}

const styles = StyleSheet.create({
  edit_job_intention_box: {
    paddingHorizontal: 15,
  },
  edit_job_intention_header: {
    paddingVertical: 15,
    borderBottomColor: '#f6f6f8',
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  edit_job_intention_header_text_title: {
    color: 'black',
    fontSize: 18,
  },
  edit_job_intention_header_text_save: {
    color: 'black',
    fontSize: 16,
  },
  
  
  edit_job_intention_main_item: {
    paddingVertical: 15,
    borderBottomColor: '#f6f6f8',
    borderBottomWidth: 2,
    height: 80,
    borderStyle: 'solid',
  },
  edit_job_intention_main_item_key: {
    fontSize: 14,
  },
  edit_job_intention_main_item_value: {
    fontSize: 18,
    color: 'black',
    marginTop: 10,
    marginRight:10,
  },
  right_icon: {
    color: '#9b9b9c'
  }
});

export default EditJobIntention