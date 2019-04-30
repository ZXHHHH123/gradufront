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
      jobType: UserStore.bossPublishChooseJobLabel,
      pickerRequirements: [],
      pickerRequirementsValue: [],
      jobAddress: '',
      
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
  
  /*选择*/
  choosePickerJobRequirement(infoId) {
    console.log('choosePickerJobRequirement');
    console.log(infoId);
  };
  
  /*点击职位描述按钮进入职位描述*/
  jobAccount() {
    console.log('进入职位描述');
    this.props.navigation.navigate('jobAccount', {jobAccount: UserStore.jobAccount});
  };
  
  /*进入编写工作具体地址界面*/
  intoEditJobAddress() {
    console.log('进入编写工作具体地址');
    this.props.navigation.navigate('jobAddress', {jobAddress: UserStore.detailAddress});
  }
  
  /*撤销当前职位*/
  deletePresentJob() {
    let url = axiosUtil.axiosUrl;
    console.log('撤销当前职位');
    console.log(this.presentPublishJob._id);
    let publishJobId = this.presentPublishJob._id;
    axios.post(url + 'recruiter/deleteRecruitjob', {publishJobId}, {
      headers: {
        'Authorization': 'Bearer ' + UserStore.userToken
      }
    }).then((res) => {
      console.log(res);
      if (res.data.code === 200) {
        ToastAndroid.show('删除成功', ToastAndroid.SHORT);
        UserStore.changePublishJobNum(UserStore.publishJobNum + 1);
        UserStore.changeBossPublishChooseJob('', '');
        UserStore.changeJobAddress('', '长沙', '101250100');
        UserStore.changeJobAccount('');
        let presentAllPublishJobData = UserStore.allPublishJobData;
        console.log(presentAllPublishJobData);
        presentAllPublishJobData.forEach((item, index) => {
          if (item._id === publishJobId) {
            presentAllPublishJobData.splice(index, 1);
            UserStore.changeAllPublishJobData(presentAllPublishJobData);
            this.props.navigation.navigate(this.props.navigation.state.params.routeName);
          }
        });
      } else {
        ToastAndroid.show('删除失败', ToastAndroid.SHORT);
      }
    })
  }
  
  /*发布职位*/
  publishJob(isFixJob) {
    let url = axiosUtil.axiosUrl;
    console.log('点击发布职位按钮');
    let jobLabel = UserStore.bossPublishChooseJobLabel || this.presentPublishJob.jobLabel;
    let jobValue = UserStore.bossPublishChooseJobValue || this.presentPublishJob.jobValue;
    let jobAccount = UserStore.jobAccount || this.presentPublishJob.jobAccount;
    let {detailAddress, chooseCity, chooseCityValue} = UserStore;
    let jobAddress = detailAddress;
    let experienceRequire = this.state.pickerRequirementsValue[0];//经验要求
    let studyRequire = this.state.pickerRequirementsValue[1];//学历要求
    let floorMoney;
    let upMoney;
    if (studyRequire) {
      let salaryStage = this.state.pickerRequirementsValue[2].split('~');
      floorMoney = salaryStage[0];//工作所给工资上线
      upMoney = salaryStage[1];//工作所给工资下限
    }
    
    
    if (!(jobLabel && jobAccount && jobAddress && chooseCity && experienceRequire && studyRequire && upMoney && floorMoney)) {
      ToastAndroid.show('请详细填写岗位信息', ToastAndroid.SHORT);
      return;
    }
    
    let publishJob = {
      jobLabel,
      jobValue,
      jobAccount,
      jobAddress,
      chooseCity,
      chooseCityValue,
      experienceRequire,
      studyRequire,
      upMoney,
      floorMoney,
    };
    console.log(publishJob);
    if (isFixJob === 'fixJob') {
      publishJob._id = this.presentPublishJob._id;
      axios.post(url + 'recruiter/updateRecruitjob', publishJob, {
        headers: {
          'Authorization': 'Bearer ' + UserStore.userToken
        }
      }).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          ToastAndroid.show('更新成功', ToastAndroid.SHORT);
          UserStore.changePublishJobNum(UserStore.publishJobNum + 1);
          UserStore.changeBossPublishChooseJob('', '');
          UserStore.changeJobAddress('', '长沙', '101250100');
          UserStore.changeJobAccount('');
          let presentAllPublishJobData = UserStore.allPublishJobData;
          console.log(presentAllPublishJobData);
          presentAllPublishJobData.forEach((item, index) => {
            if (item._id === publishJob._id) {
              presentAllPublishJobData.splice(index, 1, publishJob);
              UserStore.changeAllPublishJobData(presentAllPublishJobData);
            }
          });
          this.props.navigation.navigate(this.props.navigation.state.params.routeName);
        }
      }).catch((err) => {
        console.log(err);
      });
    } else {
      
      axios.post(url + 'recruiter/recruitjob', publishJob, {
        headers: {
          'Authorization': 'Bearer ' + UserStore.userToken
        }
      }).then((res) => {
        console.log('publish/recruitjob========res');
        if (res.data.code === 200) {
          ToastAndroid.show('发布成功', ToastAndroid.SHORT);
          UserStore.changePublishJobNum(UserStore.publishJobNum + 1);
          UserStore.changeBossPublishChooseJob('', '');
          UserStore.changeJobAddress('', '长沙', '101250100');
          UserStore.changeJobAccount('');
          publishJob._id = res.data.data;
          let presentAllPublishJobData = UserStore.allPublishJobData;
          presentAllPublishJobData.push(publishJob);
          UserStore.changeAllPublishJobData(presentAllPublishJobData);
          this.props.navigation.navigate(this.props.navigation.state.params.routeName);
        } else {
          ToastAndroid.show('发布失败,请详细填写相关信息', ToastAndroid.SHORT);
        }
      }).catch(err => {
        console.log('publish/recruitjob===========err');
        console.log(err);
      })
    }
    
    // publish/recruitjob
  }
  
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
  
  
  componentWillMount() {
    console.log('publish---------mount');
    console.log(this.props.navigation.state.params);
    if (this.props.navigation.state.params.presentPublishJob) {
      UserStore.changeIsDeliverPublishParams(1);
      this.presentPublishJob = this.props.navigation.state.params.presentPublishJob;
      UserStore.changeBossPublishChooseJob(this.presentPublishJob.jobLabel);
      UserStore.changeJobAccount(this.presentPublishJob.jobAccount);
      UserStore.changeJobAddress(this.presentPublishJob.jobAddress, this.presentPublishJob.chooseCity, this.presentPublishJob.chooseCityValue);
      
      this.state.pickerRequirementsValue = [this.presentPublishJob.experienceRequire, this.presentPublishJob.studyRequire, this.presentPublishJob.floorMoney + '~' + this.presentPublishJob.upMoney]
    }
    
  }
  
  render() {
    const {navigation} = this.props;
    let routeName = this.props.navigation.state.params.routeName;
    return (
        <Provider>
          <View >
            {UserStore.isDeliverPublishParams ?
                <HeaderComp navigation={navigation} title="编辑当前职位" routeName={routeName}/> :
                <HeaderComp navigation={navigation} title="发布职位" routeName={routeName}/>}
            <View style={styles.publishJob_box}>
              <Text style={styles.publishJob_box_title}>发布职位</Text>
              <Text style={styles.publishJob_box_title_account}>职位名称，职位类型和工作程式发布后不可修改</Text>
              
              <Flex justify="between" align="center" style={styles.publishJob_box_chooseItem}
                    onPress={this.chooseType.bind(this, 'jobType')}>
                <Flex justify="between" align="start" direction="column" style={{paddingVertical: 5, height: 60}}>
                  <Text style={{fontSize: 14, color: 'black'}}>我要招聘</Text>
                  
                  {UserStore.bossPublishChooseJobLabel ?
                      <Text
                          style={styles.publishJob_box_chooseItem_text}>{UserStore.bossPublishChooseJobLabel}</Text> :
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
                              style={{
                                color: 'black', fontSize: 18
                              }}>{this.state.pickerRequirementsValue[index]}</Text> :
                              <Text style={{color: '#818182', fontSize: 18}}>请选择</Text>}
                        </Flex>
                      </Picker>
                  );
                })}
              </Flex>
              
              <Flex justify="between" align="center" style={styles.publishJob_box_chooseItem}
                    onPress={this.jobAccount.bind(this)}>
                <Flex justify="between" align="start" direction="column" style={{paddingVertical: 5, height: 60}}>
                  <Text style={{fontSize: 14, color: 'black'}}>职位描述</Text>
                  {UserStore.jobAccount ?
                      <Text numberOfLines={3}
                            style={styles.publishJob_box_chooseItem_text}>{UserStore.jobAccount}</Text> :
                      <Text style={styles.edit_job_intention_main_item_value}>请填写职位描述</Text>}
                
                </Flex>
                <IconOutline name="right" style={styles.right_icon}/>
              </Flex>
              
              {/*<Flex justify="between" align="center" style={styles.publishJob_box_chooseItem}>*/}
              {/*<Flex justify="between" align="start" direction="column" style={{paddingVertical: 5, height: 60}}>*/}
              {/*<Text style={{fontSize: 14, color: 'black'}}>工作地点</Text>*/}
              {/*<Text style={styles.publishJob_box_chooseItem_text}>湖南省长沙市岳麓区岳麓大道</Text>*/}
              {/*/!*{UserStore.bossPublishChooseJoLabelb ?*!/*/}
              {/*/!*<Text style={styles.publishJob_box_chooseItem_text}>{UserStore.bossPublishChooseJobLabel}</Text> :*!/*/}
              {/*/!*<Text style={styles.edit_job_intention_main_item_value}>请填写工作地点</Text>}*!/*/}
              {/*</Flex>*/}
              {/*<IconOutline name="right" style={styles.right_icon}/>*/}
              
              
              <View>
                
                <Flex justify="between" style={{marginTop: 10,}} onPress={this.intoEditJobAddress.bind(this)}>
                  {UserStore.isDeliverPublishParams ?
                      <Text style={{fontSize: 16, color: 'black'}}>工作地点: {this.presentPublishJob.jobAddress}</Text>
                      :
                      <Text style={{fontSize: 16, color: 'black'}}>工作地点: {UserStore.detailAddress}</Text>
                  }
                  <IconOutline name="right" style={styles.right_icon}/>
                </Flex>
              </View>
              {/*</Flex>*/}
              
              {UserStore.isDeliverPublishParams ?
                  <Flex justify="center" align="center" style={styles.publishJob_box_publish_button}
                        onPress={this.publishJob.bind(this, 'fixJob')}>
                    <Text style={styles.publishJob_box_publish_button_text}>确认修改</Text>
                  </Flex>
                  : <Flex justify="center" align="center" style={styles.publishJob_box_publish_button}
                          onPress={this.publishJob.bind(this)}>
                    <Text style={styles.publishJob_box_publish_button_text}>发布</Text>
                  </Flex> }
              
              {UserStore.isDeliverPublishParams ?
                  <Flex justify="center" align="center" style={styles.publishJob_box_publish_button}
                        onPress={this.deletePresentJob.bind(this)}>
                    <Text style={styles.publishJob_box_publish_button_text}>撤销该职位</Text>
                  </Flex> : null
              }
            </View>
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
    color: '#818182',
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
  },
  publishJob_box_publish_button: {
    marginTop: 35,
    height: 40,
    backgroundColor: '#5dd5c8',
    borderRadius: 5,
  },
  publishJob_box_publish_button_text: {
    fontSize: 18,
    color: 'white'
  }
  
});

export default publishJob;
