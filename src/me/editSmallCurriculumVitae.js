/**
 * Created by admin-pc on 2019/5/1.
 */
import React, {Component} from 'react'
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, FlatList,
  Platform, BackHandler,
  ScrollView
} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {Button, Flex, WhiteSpace, WingBlank, Picker, ListView, List, Provider, Modal} from '@ant-design/react-native';
import {observer} from 'mobx-react';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import HeaderComp from './../../util/headerComp'
import UserStore from './../../mobx/userStore'
import {changeSubYear, changeStudyBackground} from './../../util/baseFunction'


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

@observer
class editSmallCurriculumVitae extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: '',
      workYear: '',
      titimg: '',
      studyBackground: '',
      jobIntentionStatus: 0,
      presentStatus: '',
      statusArray: ['离职-随时到岗', '在职-月内到岗', '在职-考虑机会', '在职-暂不考虑']
    };
    this.fixjobIntentionStatus = (value, isAccessServer = true) => {
      console.log('abcd');
      console.log(value);
      if (!isAccessServer) {
        console.log('有没有进入');
        this.updateJobWantedIntention(value);
      }
      this.setState({
        jobIntentionStatus: value,
        presentStatus: this.state.statusArray[value]
      });
    };
    this.earnJobHunterCurriculumviate = () => {
      //todo 获取当前用户的求职意向状态----》单独写一个接口获取,然后将获取到的value传到      this.fixjobIntentionStatus()方法中。
      let url = axiosUtil.axiosUrl;
      axios.post(url + 'jobhunter/earnJobHunterCurriculumviate', {}, {
        headers: {
          'Authorization': 'Bearer ' + UserStore.userToken
        }
      }).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          this.setState({
            age: changeSubYear(res.data.data.birthday),
            workYear: changeSubYear(res.data.data.joinWorkTime),
            titimg: res.data.data.image,
            studyBackground: changeStudyBackground(res.data.data.studyBackground)
          });
          this.fixjobIntentionStatus(res.data.data.presentJobWantedIntention, false);
          UserStore.changePersonAccount(res.data.data.personAccount);
          UserStore.changeWorkExperience(res.data.data.workExperience);
          UserStore.changeChooseJob(res.data.data.expectJobLabel, res.data.data.expectJobValue);
          UserStore.changeJobAddress('', res.data.data.expectCity, res.data.data.expectCityValue);
          UserStore.changeJobSalary(res.data.data.expectFloorMoney, res.data.data.expectUpMoney);
        }
      }).catch((err) => {
        console.log(err);
      });
    };
    this.showModalOperation = () => {
      Modal.operation([
        {
          text: '离职-随时到岗', onPress: () => {
          this.fixjobIntentionStatus(0, false)
        }
        },
        {
          text: '在职-月内到岗', onPress: () => {
          this.fixjobIntentionStatus(1, false)
        }
        },
        {
          text: '在职-考虑机会', onPress: () => {
          this.fixjobIntentionStatus(2, false)
        }
        },
        {text: '在职-暂不考虑', onPress: () => this.fixjobIntentionStatus(3, false)},
      ]);
    }
  };
  
  /*更新数据库求职意向*/
  updateJobWantedIntention(value) {
    let url = axiosUtil.axiosUrl;
    console.log('更新数据库求职意向' + value);
    axios.post(url + 'jobhunter/updateJobWantedIntention', {value}, {
      headers: {
        'Authorization': 'Bearer ' + UserStore.userToken
      }
    }).then((res) => {
      console.log(res);
      if (res.data.code === 200) {
        // ToastAndroid.show('登录成功', ToastAndroid.SHORT);
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  
  editBasicInfo() {
    console.log('编写个人基本信息');
    this.props.navigation.navigate('editBasicInfo');
  };
  
  editJobIntention() {
    console.log('进入编辑具体工作意向界面');
    this.props.navigation.navigate('editJobIntention', {routeName: 'editSmallCurriculumVitae'});
  };
  
  fixNewWorkExperienceItem(item, index) {
    console.log('增加工作经历');
    console.log(1);
    this.props.navigation.navigate('addWorkExperience', {
      routeName: 'editSmallCurriculumVitae', presentWorkExperience: item, persentIndex: index
    });
  };
  
  addNewWorkExperienceItem() {
    console.log(2);
    
    this.props.navigation.navigate('addWorkExperience', {routeName: 'editSmallCurriculumVitae'});
  }
  
  
  componentWillMount() {
    console.log('加载modal-operation');
    this.earnJobHunterCurriculumviate();
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  
  render() {
    const {navigation} = this.props;
    return (
        <Provider>
          <ScrollView>
          <View style={styles.editSmallCurriculumViate_box}>
            <HeaderComp navigation={navigation} title="我的简历" routeName="personCenter" rightText="预览"/>
            
            <Flex justify="between" style={styles.editSmallCurriculumViate_box_person_info}
                  onPress={this.editBasicInfo.bind(this)}>
              <View>
                <Text style={styles.editSmallCurriculumViate_box_person_name}>{UserStore.nickName}<IconOutline
                    name="edit" style={{fontSize: 16}}/></Text>
                <Text
                    style={styles.editSmallCurriculumViate_box_person_basic_account}>{this.state.workYear}年以内.{this.state.age}岁.{this.state.studyBackground}</Text>
              </View>
              {this.state.titimg ?
                  <Image style={styles.editSmallCurriculumViate_box_person_titimg} source={{uri: this.state.titimg}}/> :
                  <Image style={styles.editSmallCurriculumViate_box_person_titimg}
                         source={require('./../image/userPhoto.jpg')}/>}
            
            </Flex>
            
            <Flex style={styles.editSmallCurriculumViate_box_person_account} onPress={this.editBasicInfo.bind(this)}>
              <Text numberOfLines={3} style={{color: '#818182'}}>{UserStore.personAccount}</Text>
            </Flex>
            
            {/*求职状态start*/}
            <View style={styles.editSmallCurriculumViate_box_manage_job_intention_status}>
              <Flex justify="between" onPress={this.showModalOperation}>
                <Text style={styles.editSmallCurriculumViate_box_manage_job_intention_status_text}>求职状态</Text>
                <View>
                  <Flex>
                    <Text>{this.state.presentStatus}</Text>
                    <IconOutline name="right"/>
                  </Flex>
                </View>
              </Flex>
            </View>
            {/*求职状态end*/}
            
            
            {/*求职期望start*/}
            <View >
              <Text style={{fontSize: 16, color: 'black', paddingHorizontal: 12, marginVertical: 15}}>求职期望</Text>
              <Flex direction="column" justify="between" align="start"
                    style={styles.editSmallCurriculumViate_box_manage_job_intention_account}
                    onPress={this.editJobIntention.bind(this)}>
                <Text
                    style={styles.editSmallCurriculumViate_box_manage_job_intention_account_header}>[{UserStore.chooseCity}]{UserStore.chooseJobLabel}</Text>
                <Text>{UserStore.floorMoney}-{UserStore.upMoney}</Text>
              </Flex>
            </View>
            {/*求职期望end*/}
            
            {/*工作经历start*/}
            <View>
              <Text style={{fontSize: 16, color: 'black', paddingHorizontal: 12, marginVertical: 15}}>工作经历</Text>
              {UserStore.workExperience.map((item, index) => {
                return (
                    <Flex direction="column" key={index} style={styles.editSmallCurriculumViate_box_workexperienct_item}
                          onPress={this.fixNewWorkExperienceItem.bind(this, item, index)}>
                      <Flex justify="between" style={{width: deviceW * 0.9}}>
                        <Text style={{fontSize: 16, color: 'black'}}>{item.companyName}</Text>
                        <Text style={{
                          fontSize: 12, color: '#9b9b9c'
                        }}>{new Date(item.startTime).getFullYear()}.{new Date(item.startTime).getMonth()}~{new Date(item.endTime).getFullYear()}.{new Date(item.endTime).getMonth()}</Text>
                      </Flex>
                      <Text numberOfLines={3} style={{
                        marginTop: 5, marginHorizontal: 10, fontSize: 16, textAlign: 'left'
                      }}>{item.workContent}</Text>
                    </Flex>
                )
              })}
              
              
              <Flex justify="center" align="center" style={styles.editSmallCurriculumViate_box_add_item_button}
                    onPress={this.addNewWorkExperienceItem.bind(this)}>
                <Text style={styles.editSmallCurriculumViate_box_add_item_button_text}>添加工作经历</Text>
              </Flex>
            
            </View>
            {/*工作经历end*/}
          
          </View>
          </ScrollView>
        </Provider>
    )
  }
}

const styles = StyleSheet.create({
  editSmallCurriculumViate_box: {},
  editSmallCurriculumViate_box_person_info: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomColor: '#f6f6f8',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  editSmallCurriculumViate_box_person_name: {
    fontSize: 24,
    color: 'black',
    
  },
  editSmallCurriculumViate_box_person_basic_account: {
    marginTop: 10,
    fontSize: 14,
    color: '#818182'
  },
  editSmallCurriculumViate_box_person_titimg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  editSmallCurriculumViate_box_person_account: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomColor: '#f6f6f8',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  editSmallCurriculumViate_box_manage_job_intention_status: {
    padding: 12,
    borderColor: '#f6f6f8',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  editSmallCurriculumViate_box_manage_job_intention_status_text: {
    fontSize: 16,
    color: 'black'
  },
  
  editSmallCurriculumViate_box_manage_job_intention_account: {
    height: 70,
    borderBottomColor: '#f6f6f8',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  editSmallCurriculumViate_box_manage_job_intention_account_header: {
    color: 'black',
    fontSize: 14,
  },
  editSmallCurriculumViate_box_workexperienct_item: {
    marginBottom: 15,
  },
  editSmallCurriculumViate_box_add_item_button: {
    width: deviceW * 0.9,
    height: 40,
    marginTop: 10,
    marginBottom: 15,
    marginLeft: deviceW * 0.05,
    borderColor: '#9b9b9c',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
  },
  editSmallCurriculumViate_box_add_item_button_text: {
    fontSize: 18,
    color: 'black'
  }
  
});

export default editSmallCurriculumVitae;
