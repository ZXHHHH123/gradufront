/**
 * Created by admin-pc on 2019/5/3.
 */
import React, {Component} from 'react'
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, FlatList,
  ScrollView
} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {
  Button, Flex, WhiteSpace, WingBlank, Picker, ListView, List, Provider, Modal, InputItem
} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import HeaderComp from './../../util/headerComp'
import {changeSubYear, changeStudyBackground, changeYearAndMonth} from './../../util/baseFunction'
import UserStore from './../../mobx/userStore';


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class jobHunterDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interviewAddress: '',
      interviewTime: '',
      wxCode: '',
      remarks: '',
      isShowEditInterviewDetail: false
    };
    this.ModalClose = () => {
      this.setState({
        isShowEditInterviewDetail: false
      }, () => {
      })
    }
  };
  
  
  sendCurriculumVitaeToEmail() {
    console.log('希望求职者发送简历至邮箱');
    let url = axiosUtil.axiosUrl;
    let jobHunterId = this.props.navigation.state.params.item._id;
    axios.post(url + 'recruiter/sendCurriculumVitaeToEmail', {jobHunterId}, {
      headers: {
        'Authorization': 'Bearer ' + UserStore.userToken
      }
    }).then((res) => {
      console.log(res);
      if (res.data.code === 200) {
        ToastAndroid.show('对方已收到提醒', ToastAndroid.SHORT);
      }
    }).catch((err) => {
      console.log(err);
    })
    
  }
  
  showEditInterviewDetail() {
    this.setState({
      isShowEditInterviewDetail: true
    });
  }
  
  sendInterviewDetail() {
    let url = axiosUtil.axiosUrl;
    console.log('发送面试邀请');
    let jobHunterId = this.props.navigation.state.params.item._id;
    let {interviewAddress, interviewTime, wxCode, remarks,} = this.state;
    if (!(interviewAddress && interviewTime && wxCode && remarks)) {
      ToastAndroid.show('请完整填写面试信息', ToastAndroid.SHORT);
    } else {
      this.setState({
        isShowEditInterviewDetail: false
      });
      axios.post(url + 'recruiter/sendInterviewDetail', {jobHunterId, interviewAddress, interviewTime, wxCode, remarks}, {
        headers: {
          'Authorization': 'Bearer ' + UserStore.userToken
        }
      }).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          ToastAndroid.show('已发送面试邀请', ToastAndroid.SHORT);
        }
      }).catch((err) => {
        console.log(err);
      });
    }
    
    
    // Modal.prompt(
    //     '发送面试邀请',
    //     '面试信息',
    //     (interviewAddress, interviewTime) => {
    //       if(!(interviewAddress && interviewTime)) {
    //         ToastAndroid.show('请完整填写面试信息', ToastAndroid.SHORT);
    //       }
    //       axios.post(url + 'recruiter/sendInterviewDetail', {jobHunterId, interviewAddress, interviewTime},  {
    //         headers: {
    //           'Authorization': 'Bearer ' + UserStore.userToken
    //         }
    //       }).then((res) => {
    //         console.log(res);
    //         if(res.data.code === 200) {
    //           ToastAndroid.show('已发送面试邀请', ToastAndroid.SHORT);
    //         }
    //       }).catch((err) => {
    //         console.log(err);
    //       });
    //       console.log(`login: ${interviewAddress}, password: ${interviewTime}`)
    //     },
    //     'secure-text',
    //     null,
    //     ['Please interview address', 'Please interview time']
    // );
  }
  
  render() {
    const {navigation} = this.props;
    let personData = this.props.navigation.state.params.item;
    console.log('jobhunter界面');
    
    console.log(this.props);
    return (
        <Provider>
          
          <View style={styles.jobHunterDetail_box}>
            <ScrollView>
              {this.props.navigation.state.params.routeName ?
                  <HeaderComp navigation={navigation} title="求职者详情" routeName="hadChat"/> :
                  <HeaderComp navigation={navigation} title="求职者详情" routeName="BossMain"/>
              }
              
              <View style={styles.jobHunterDetail_box}>
                
                <Flex style={styles.jobHunterDetail_box_header}>
                  {personData.image ?
                      <Image style={styles.jobHunterDetail_box_titImg} source={{uri: personData.image}}/> :
                      <Image style={styles.jobHunterDetail_box_titImg} source={require('./../image/userPhoto.jpg')}/>}
                  
                  <Text style={styles.jobHunterDetail_box_nickName}>{personData.nickName}</Text>
                </Flex>
                
                {/*期望求职行业、期望工资、期望工作城市等等*/}
                <Flex justify="between" style={styles.jobHunterDetail_box_expectItem}>
                  <Flex direction="column" align="start">
                    <View>
                      <Text style={styles.tag_item}>期望工作城市:{personData.expectCity}</Text>
                      <Text style={styles.tag_item}>期望工作职位:{personData.expectJobLabel}</Text>
                    </View>
                    {personData.expectIndustry ?
                        <Flex><Text>期望工作行业</Text>{personData.expectIndustry.map((item, index) => {
                          return (
                              <Text key={index} style={styles.tag_item}>{item}</Text>
                          )
                        })}</Flex> : null}
                  
                  </Flex>
                  <Text
                      style={styles.jobHunterDetail_box_expectItem_salary}>{personData.expectFloorMoney}~{personData.expectUpMoney}</Text>
                </Flex>
                
                {/*个人优势阐述*/}
                {personData.personAccount ?
                    <Flex direction="column" align="start" style={styles.jobHunterDetail_box_personAccount}>
                      <Text style={styles.jobHunterDetail_box_title}>个人优势</Text>
                      <Text style={styles.jobHunterDetail_box_personAccount_text}>{personData.personAccount}</Text>
                    </Flex>
                    : null}
                
                
                {/*个人工作经历阐述*/}
                {personData.workExperience.length > 0 ? <View style={styles.jobHunterDetail_box_workExperience}>
                  <Text style={styles.jobHunterDetail_box_title}>工作经历</Text>
                  {personData.workExperience.map((item, index) => {
                    return (
                        <Flex direction="column" align="start" style={styles.jobHunterDetail_box_workExperience_item}
                              key={index}>
                          <Flex justify="between" style={{width: deviceW - 20}}>
                            <Text style={{fontSize: 15, color: 'black'}}>{item.companyName}</Text>
                            <Flex>
                              <Text style={{fontSize: 15, color: 'black'}}>{changeYearAndMonth(item.startTime)}~</Text>
                              <Text style={{fontSize: 15, color: 'black'}}>{changeYearAndMonth(item.endTime)}</Text>
                            </Flex>
                          </Flex>
                          <Text
                              style={styles.jobHunterDetail_box_workExperience_item_workContent}>{item.workContent}</Text>
                        </Flex>
                    )
                  })}
                
                
                </View>
                    : null}
              
              
              </View>
            </ScrollView>
            
            
            <Flex justify="center" align="center" style={styles.jobHunterDetail_box_title_chatButton1}
                  onPress={this.sendCurriculumVitaeToEmail.bind(this)}>
              <Text style={styles.jobHunterDetail_box_title_chatButton_text}>期望ta发简历至自己的邮箱</Text>
            </Flex>
            
            <Flex justify="center" align="center" style={styles.jobHunterDetail_box_title_chatButton2}
                  onPress={this.showEditInterviewDetail.bind(this)}>
              <Text style={styles.jobHunterDetail_box_title_chatButton_text}>发送面试地点和时间</Text>
            </Flex>
            
            
            <Modal
                style={styles.companyDetail_modal}
                popup
                visible={this.state.isShowEditInterviewDetail}
                animationType="slide-up"
                onClose={this.ModalClose}
                maskClosable>
              <View>
                <Flex direction="column" style={{paddingHorizontal: 15, height: deviceH * 0.8}}>
                  
                  <InputItem
                      defaultValue=""
                      clear
                      placeholder="请填写面试地点"
                      value={this.state.interviewAddress}
                      onChange={value => {
                        this.setState({
                          interviewAddress: value
                        });
                      }}
                  >
                    面试地址:
                  </InputItem>
                  <InputItem
                      defaultValue=""
                      clear
                      placeholder="请填写面试时间"
                      value={this.state.interviewTime}
                      onChange={value => {
                        this.setState({
                          interviewTime: value
                        });
                      }}
                  >
                    面试时间：
                  </InputItem>
                  <InputItem
                      defaultValue=""
                      clear
                      placeholder="请填写微信号码"
                      value={this.state.wxCode}
                      onChange={value => {
                        this.setState({
                          wxCode: value
                        });
                      }}
                  >
                    联系微信号：
                  </InputItem>
  
                  <InputItem
                      defaultValue=""
                      clear
                      placeholder="请填写备注"
                      value={this.state.remarks}
                      onChange={value => {
                        this.setState({
                          remarks: value
                        });
                      }}
                  >
                    备注：
                  </InputItem>
                  
                  <Button type="primary" onPress={this.sendInterviewDetail.bind(this)}>
                    确定
                  </Button>
                
                
                </Flex>
              </View>
            </Modal>
          </View>
        
        </Provider>
    )
  }
}

const styles = StyleSheet.create({
  jobHunterDetail_box: {
    paddingHorizontal: 10,
    marginBottom: 50,
    height: deviceH - 30
  },
  jobHunterDetail_box_title: {
    fontSize: 18,
    color: 'black',
    marginTop: 15,
  },
  jobHunterDetail_box_header: {
    paddingVertical: 10,
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  jobHunterDetail_box_titImg: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  jobHunterDetail_box_nickName: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
  },
  
  jobHunterDetail_box_expectItem: {},
  
  jobHunterDetail_box_expectItem_salary: {
    color: '#5dd5c8',
  },
  
  
  jobHunterDetail_box_personAccount: {},
  jobHunterDetail_box_personAccount_text: {
    marginTop: 15,
    fontSize: 15,
    color: '#818182'
  },
  
  
  jobHunterDetail_box_workExperience_item: {
    marginVertical: 10,
    
  },
  jobHunterDetail_box_workExperience_item_workContent: {
    fontSize: 15,
    color: '#818182'
  },
  
  jobHunterDetail_box_title_chatButton1: {
    width: deviceW * 0.8,
    height: 40,
    marginLeft: deviceW * 0.1 - 10,
    backgroundColor: '#5dd5c8',
    bottom: 50,
    marginBottom: 15,
    borderRadius: 5,
    position: 'absolute',
  },
  jobHunterDetail_box_title_chatButton2: {
    width: deviceW * 0.8,
    height: 40,
    marginLeft: deviceW * 0.1 - 10,
    backgroundColor: '#5dd5c8',
    bottom: -10,
    
    marginBottom: 15,
    borderRadius: 5,
    position: 'absolute',
  },
  jobHunterDetail_box_title_chatButton_text: {
    fontSize: 18,
    color: 'white'
  },
  tag_item: {
    padding: 2,
    backgroundColor: '#f8f9fb',
    borderRadius: 2,
  },
});

export default jobHunterDetail;
