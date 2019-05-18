/**
 * Created by admin-pc on 2019/3/28.
 */
import React, {Component} from 'react'
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, ScrollView,
  FlatList
} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {Button, Flex, WhiteSpace, WingBlank, Picker, List, Provider, Modal} from '@ant-design/react-native';
import {observer} from 'mobx-react';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";


import JobDetailHeader from './../component/JobDetaiHeader'
import UserStore from './../../mobx/userStore'
import ComplainItem from './../../util/complainItem.json'
import SkillRequirement from './../../util/skillRequirement.json'

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

@observer
class jobDetail extends Component {
  _keyExtractor = (item, index) => item.id;
  
  constructor(props) {
    super(props);
    this.state = {
      aaa: '',
      presentItem: {},
    };
    this.ModalClose = () => {
      UserStore.changeIsShowcomplainModal(false);
    };
    
  };
  
  chooseComplainItem(id, idx) {
    console.log('idx===' + idx);
    UserStore.changeComplainItemId(id);
    this.props.navigation.navigate('complainDetail');
  };
  
  showValue() {
    console.log(UserStore.isShowcomplainModal);
  };
  _toChat() {
    let url = axiosUtil.axiosUrl;
    let jobId = UserStore.jobDetailItem._id;
    axios.post(url + 'jobhunter/sendCurriculumVitaeToRecruiter', {jobId}, {
      headers: {
        'Authorization': 'Bearer ' + UserStore.userToken
      }
    }).then((res) => {
      console.log(res);
      if (res.data.code === 200) {
        ToastAndroid.show('对方已收到提醒', ToastAndroid.SHORT);
      }else {
        ToastAndroid.show('对方未收到提醒', ToastAndroid.SHORT);
      }
    }).catch((err) => {
      console.log(err);
    })
    
  };
  
  earnJobDetail(jobId) {
    console.log('获得工作基本信息');
    console.log(UserStore.jobDetailItem);
    let url = axiosUtil.axiosUrl;
    axios.post(url + 'jobhunter/earnJobDetail', {jobId}, {
      headers: {
        'Authorization': 'Bearer ' + UserStore.userToken
      }
    }).then((res) => {
      console.log(res);
      if(res.data.code === 200) {
        console.log(res);
        this.setState({
          presentItem: res.data.data,
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  
  componentWillMount() {
    if(this.props.navigation.state.params){
      if(this.props.navigation.state.params.routeName) {
        UserStore.changeBackRouteName(this.props.navigation.state.params.routeName);
      }
    }
    if(!(UserStore.jobDetailItem.jobLabel)) {
      this.earnJobDetail(UserStore.jobId);
    }else {
      this.setState({
        presentItem: UserStore.jobDetailItem
      })
    }
  }
  render() {
    const {navigation} = this.props;
    // let presentItem = UserStore.jobDetailItem;
    console.log('aaaaaaaaaaaaaaaa');
    // console.log(presentItem);
    
    return (
        <Provider>
          <ScrollView>
            <View style={styles.job_detail_box}>
              <JobDetailHeader navigation={navigation}/>
              
              {/*岗位详情主题头部*/}
              <View style={styles.job_detail_body_header}>
                <Flex style={styles.job_detail_body_header_top} justify="between" align="center">
                  <Text style={styles.job_detail_body_header_jobname}>{this.state.presentItem.jobLabel}</Text>
                  <Text style={styles.job_detail_body_header_jobmoney}>{this.state.presentItem.floorMoney}-{this.state.presentItem.upMoney}</Text>
                </Flex>
                <Flex justify="between" style={styles.job_detail_header_bottom}>
                  <Flex>
                    <IconOutline name="environment" style={styles.back_icon} onPress={this.showValue.bind(this)}/>
                    <Text style={styles.job_detail_header_text}>{this.state.presentItem.chooseCity}.{this.state.presentItem.jobAddress}</Text>
                  </Flex>
                  <Flex>
                    <IconOutline name="profile" style={styles.back_icon} onPress={this.showValue.bind(this)}/>
                    <Text style={styles.job_detail_header_text}>{this.state.presentItem.experienceRequire}</Text>
                  </Flex>
                  <Flex>
                    <IconOutline name="read" style={styles.back_icon} onPress={this.showValue.bind(this)}/>
                    <Text style={styles.job_detail_header_text}>{this.state.presentItem.studyRequire}</Text>
                  </Flex>
                </Flex>
              </View>
              {/*body-header end*/}
              
              {/*hr information*/}
              <View>
                <Flex direction="row" justify="between" align="center" style={styles.job_detail_hr_account}>
                  <View>
                    <Flex>
                      <Image style={styles.job_detail_hr_img} source={{uri: this.state.presentItem.publisherImg}}/>
                      <View style={styles}>
                      <Flex>
                        <Text>{this.state.presentItem.publisher}</Text>
                        <Text>状态（刚刚活跃）</Text>
                      </Flex>
                      <Flex>
                        <Text>{this.state.presentItem.companyName}.{this.state.presentItem.publisherPlace}</Text>
                      </Flex>
                      </View>
                    </Flex>
                  </View>
                  
                  <View>
                  <IconOutline name="right" style={styles.back_icon} onPress={this.showValue.bind(this)}/>
                  </View>
                </Flex>
              </View>
              
              
              <View style={styles.job_detail_body_main}>
                <Text style={styles.job_detail_body_title}>职位详情</Text>
                <Text style={styles.job_detail_body_main_task}>岗位职责：</Text>
                <View style={styles.job_detail_body_main_task_account}>
                  <Text style={styles.job_detail_body_main_task}>{this.state.presentItem.jobAccount}</Text>
                  {/*<Text style={styles.job_detail_body_main_task}>2.负责前端相关设计和开发</Text>*/}
                  {/*<Text style={styles.job_detail_body_main_task}>3.负责前端相关设计和开发</Text>*/}
                  {/*<Text style={styles.job_detail_body_main_task}>4.负责前端相关设计和开发</Text>*/}
                  {/*<Text style={styles.job_detail_body_main_task}>2.负责前端相关设计和开发</Text>*/}
                </View>
              </View>
              
              
              <View style={styles.job_detail_skill_requirement}>
                <Text style={styles.job_detail_body_title}>技能要求</Text>
                <View>
                  <Flex direction="row" justify="between" style={styles.job_detail_skill_tabs}>
                  {SkillRequirement.map((info) => {
                    return (
                        <Text key={info.id} style={styles.job_detail_skill_tab}>{info.value}</Text>
                    );
                  })}
                  </Flex>
                </View>
              </View>
              
              {/*公司介绍入口start*/}
              <View>
                <Flex justify="between" align="center" style={styles.job_detail_company_intro_gate}>
                  <View>
                    <Flex>
                    <Image style={styles.job_detail_hr_img} source={{uri: this.state.presentItem.companyLogo}}/>
                      <View>
                        <Text style={styles.job_detail_company_intro_text}>{this.state.presentItem.companyName}</Text>
                        <Text style={styles.job_detail_company_intro_text}>{this.state.presentItem.companyPeopleNum}.{this.state.presentItem.companyIndustry}</Text>
                      </View>
                    </Flex>
                  </View>
                  <IconOutline name="right" style={styles.back_icon} onPress={this.showValue.bind(this)}/>

                </Flex>
              </View>
              {/*公司介绍入口end*/}
  
              
              <Modal
                  popup
                  visible={UserStore.isShowcomplainModal}
                  animationType="slide-up"
                  onClose={this.ModalClose}
                  maskClosable
              >
                <View style={styles.modal_box }>
                  <FlatList
                      data={ComplainItem}
                      keyExtractor={this._keyExtractor}
                      renderItem={
                        ({item, index}) => (
                            <Text onPress={() => this.chooseComplainItem(item.id, index)}
                                  style={styles.modal_item}>{item.value}</Text>
                        )
                      }
                  />
                  <Text style={[styles.modal_item, styles.modal_item_cancel]} onPress={this.ModalClose}>取消</Text>
                </View>
              </Modal>
            </View>
          </ScrollView>
          <View>
            <Flex justify="center">
              <Button
                  type="primary"
                  onPress={this._toChat.bind(this)}
                  style={styles.job_detail_chat}
              >是否已向邮箱发送简历</Button>
            </Flex>
          </View>

        </Provider>
    )
  }
}

const styles = StyleSheet.create({
  job_detail_box: {
    padding: 20,
  },
  job_detail_body_header: {
    marginTop: 30,
    height: 100,
    borderBottomColor: '#f6f6f8',
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  job_detail_body_header_top: {},
  job_detail_body_header_jobname: {
    fontSize: 22,
    color: 'black'
  },
  job_detail_body_header_jobmoney: {
    fontSize: 14,
    color: '#5dd5c8'
  },
  job_detail_header_bottom: {
    marginTop: 8,
    width: deviceW * 0.6,
    color: 'red'
  },
  job_detail_header_text: {
    color: 'black',
    marginLeft: 5,
  },
  
  job_detail_hr_account: {
    height: 100,
    borderBottomColor: '#f6f6f8',
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  job_detail_hr_img: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
  
  
  job_detail_body_main: {
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
    paddingVertical: 10,
    borderBottomColor: '#f6f6f8',
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  job_detail_body_title: {
    fontSize: 16,
    color: 'black',
  },
  flatListStyle: {
    flex: 1,
    flexDirection: 'row',
    borderColor: 'red',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  job_detail_body_main_task: {
    fontSize: 14,
    color: 'gray',
    marginTop:10,
  },
  job_detail_body_main_task_account: {
    marginTop: 20,
  },
  
  
  job_detail_skill_requirement: {
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
    paddingVertical: 15,
    borderBottomColor: '#f6f6f8',
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  job_detail_skill_tabs: {
    // borderColor: '#f6f6f8',
    // borderWidth: 1,
    // borderStyle: 'solid',
    paddingTop: 5,
    width: deviceW* 0.6,
  },
  job_detail_skill_tab: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderColor: '#f6f6f8',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 2,
  },
  
  
  job_detail_company_intro_gate: {
    height: 80
  },
  job_detail_company_intro_text:{
    color: 'black'
  },
  
  job_detail_chat: {
    height: 40,
    width: deviceW* 0.9,
    marginTop: 10,
    backgroundColor: '#5dd5c8',
    borderRadius: 2,
    borderColor: '#5dd5c8',
    bottom: 10,
  },
  
  
  modal_box: {
    // paddingVertical: 20,
    // paddingHorizontal: 20,
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  modal_item: {
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    borderBottomColor: '#f6f6f8',
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  modal_item_cancel: {
    color: 'blue'
  }
});
export default jobDetail;