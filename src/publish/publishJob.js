/**
 * Created by admin-pc on 2019/4/25.
 */
import React, {Component} from 'react'
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, FlatList,
  ScrollView
} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {
  Button, Flex, WhiteSpace, WingBlank, Picker, ListView, List, Provider, InputItem
} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import HeaderComp from './../../util/headerComp'
import JobBigType from './../../util/jobBigType'
import {observer} from 'mobx-react';
import UserStore from './../../mobx/userStore'
import allSalaryData from './../../util/salaryData';


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

@observer
class publishJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testData: 'abcd',
      jobType: UserStore.bossPublishChooseJob,
      pickerRequirements: [],
      pickerRequirementsValue: [],
      JobRequirements: [{
        "id": "0",
        "label": "经验要求",
        //column 代表picker显示的行数
        "column": "1",
        "children": [{
          value: '01',
          label: '一年以内'
        }, {
          value: '02',
          label: '一年至二年'
        }, {
          value: '03',
          label: '二年至三年'
        }, {
          value: '04',
          label: '三年至四年'
        }, {
          value: '05',
          label: '四年至五年'
        }, {
          value: '06',
          label: '五年以上'
        }, {
          value: '07',
          label: '不限'
        }]
      }, {
        "id": "1",
        "label": "最低学历",
        //column 代表picker显示的行数
        "column": "1",
        "children": [{
          value: '10',
          label: '博士生'
        }, {
          value: '11',
          label: '研究生以上'
        }, {
          value: '12',
          label: '本科以上'
        }, {
          value: '13',
          label: '专科以上'
        }, {
          value: '14',
          label: '高中以上'
        }, {
          value: '15',
          label: '不限'
        }]
      }, {
        "id": "2",
        //column 代表picker显示的行数
        "column": "2",
        "label": "薪资范围",
        "children": allSalaryData.data.salaryList
      }
      ]
    }
  };
  
  /*进入选择职位界面*/
  chooseType(type) {
    this.props.navigation.navigate(type, {publishJob: true, routeName: "publishJob"});
  };
  
  choosePickerJobRequirement(infoId) {
    console.log('choosePickerJobRequirement');
    console.log(infoId);
  };
  
  changeChooseData(v, index) {
    console.log('changeChooseData');
    console.log(index);
    // this.state.pickerRequirements[index] = {v};
    this.state.JobRequirements[index].children.forEach((item, index1) => {
      if (item.value === v[0]) {
        let label1 = item.label;
        let label2;
        if (v[1]) {
          console.log(v[1]);
          console.log(item);
          item.children.forEach((item1, index1) => {
            if (item1.value === v[1]) {
              label2 = item1.label;
              this.state.pickerRequirementsValue[index] = `${label1} ~ ${label2}`;
            }
          })
        } else {
          this.state.pickerRequirementsValue[index] = item.label;
        }
      }
    });
    console.log(this.state.pickerRequirements);
  }
  
  render() {
    const {navigation} = this.props;
    let routeName = this.props.navigation.state.params.routeName;
    return (
        <Provider>
          <View style={styles.publishJob_box}>
            <HeaderComp navigation={navigation} title="发布职位" routeName={routeName}/>
            <Text style={styles.publishJob_box_title}>发布职位</Text>
            <Text style={styles.publishJob_box_title_account}>职位名称，职位类型和工作程式发布后不可修改</Text>
            
            <Flex justify="between" align="center" style={styles.publishJob_box_chooseItem}
                  onPress={this.chooseType.bind(this, 'jobType')}>
              <Flex justify="between" align="start" direction="column" style={{paddingVertical: 5, height: 60}}>
                <Text style={{fontSize: 14, color: 'black'}}>我要招聘</Text>
                {UserStore.bossPublishChooseJob ?
                    <Text style={styles.publishJob_box_chooseItem_text}>{UserStore.bossPublishChooseJob}</Text> :
                    <Text style={styles.edit_job_intention_main_item_value}>请选择期望职位</Text>}
              </Flex>
              <IconOutline name="right" style={styles.right_icon}/>
            </Flex>
            
            
            <Flex justify="around" align="center" style={styles.publishJob_box_job_requirements}>
              {this.state.JobRequirements.map((info, index) => {
                return (
                    <Picker
                        key={info.id}
                        data={this.state.JobRequirements[index].children}
                        cols={info.column}
                        // value={this.state.pickerRequirementsValue}
                        onChange={v => {
                          console.log('onChange======================');
                          console.log(index);
                          this.changeChooseData(v, index);
                          // this.setState({pickerOptionValue: v}, () => {
                          //   this.changeChooseJob(this.state.pickerOptionValue, index);
                          // })
                        }}
                        onOk={
                          v => this.setState({pickerCityValue: v})
                        }
                    >
                      <Flex direction="column" justify="around"
                            style={styles.publishJob_box_job_requirements_item}
                            onPress={this.choosePickerJobRequirement.bind(this, info.id)}
                      >
                        <Text style={{color: '#818182', fontSize: 14,}}>{info.label}</Text>
                        {this.state.pickerRequirementsValue[index] ? <Text
                            style={{color: 'black', fontSize: 18}}>{this.state.pickerRequirementsValue[index]}</Text> :
                            <Text style={{color: '#818182', fontSize: 18}}>请选择</Text>}
                      </Flex>
                    </Picker>
                );
              })}
            </Flex>
          </View>
        </Provider>
    )
  }
}

const styles = StyleSheet.create({
  publishJob_box: {
    paddingHorizontal: 15,
  },
  publishJob_box_title: {
    fontSize: 24,
    color: 'black',
  },
  publishJob_box_title_account: {
    fontSize: 14,
    color: '#89898a',
    marginTop: 5,
  },
  publishJob_box_chooseItem: {
    borderBottomColor: '#f6f6f8',
    borderBottomWidth: 2,
    height: 60,
    marginTop: 20,
  },
  publishJob_box_chooseItem_text: {
    fontSize: 20,
    color: 'black',
  },
  
  publishJob_box_job_requirements: {
    paddingVertical: 10,
    marginTop: 15,
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
    height: 80,
  },
  publishJob_box_job_requirements_item: {
    height: 80,
    width: (deviceW - 20) / 3,
    paddingVertical: 5,
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
    borderRightColor: '#f6f6f8',
    borderRightWidth: 1,
    borderStyle: 'solid'
  }
  
});

export default publishJob;
