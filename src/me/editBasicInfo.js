/**
 * Created by admin-pc on 2019/5/1.
 */
import React, {Component} from 'react'
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, FlatList,
  ScrollView
} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {
  Button, Flex, WhiteSpace, WingBlank, Picker, ListView, List, Provider, InputItem, Modal, DatePicker
} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import {observer} from 'mobx-react';
import ImagePicker from 'react-native-image-crop-picker';
import HeaderComp from './../../util/headerComp'
import UserStore from './../../mobx/userStore'


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

@observer
class editBasicInfo extends Component {
  _keyExtractor = (item, index) => item.id;
  
  constructor(props) {
    super(props);
    this.state = {
      nickName: '',
      titImg: '',
      gender: '',
      isShowGender: false,
      isShowStudyBackground: false,
      joinWorkTime: '',
      birthTime: '',
      studyBackground: '',
      studyBackgroundData: [{
        id: '10',
        label: '博士生'
      }, {
        id: '11',
        label: '研究生'
      }, {
        id: '12',
        label: '本科'
      }, {
        id: '13',
        label: '专科'
      }, {
        id: '14',
        label: '高中'
      }, {
        id: '15',
        label: '其他'
      }],
      genderData: [
        {
          "id": "0",
          "value": "男"
        }, {
          "id": "1",
          "value": "女"
        }
      ]
    };
    this.ModalClose = () => {
      this.setState({
        isShowGender: false,
        isShowStudyBackground: false,
      });
    };
    this.onChange1 = value => {
      this.setState({joinWorkTime: value});
    };
    this.onChange2 = value => {
      this.setState({birthTime: value});
    };
  };
  
  intoPersonAccount() {
    console.log('编写个人优势描述');
    this.props.navigation.navigate('personAccount', {routeName: 'editBasicInfo'});
  };
  
  chooseGenderItem(id, idx) {
  console.log('选择性别');
  let chooseGender = this.state.genderData[idx];
  UserStore.changeGender(chooseGender.id);
  this.setState({
    gender: chooseGender.id
  });
  this.ModalClose();
};
  
  chooseStudyBackgroundItem(id, idx) {
    console.log('选择学历背景');
    let chooseStudyBackground = this.state.studyBackgroundData[idx].id;
    console.log(chooseStudyBackground);
    UserStore.changeStudyBackground(chooseStudyBackground);
    this.setState({
      studyBackground: chooseStudyBackground
    });
    this.ModalClose();
  };
  
  
  
  chooseGender() {
    console.log(1111111);
    this.setState({
      isShowGender: true,
    })
  };
  
  chooseStudyBackground() {
    console.log(22222222);
    this.setState({
      isShowStudyBackground: true,
    })
  };
  
  
  pickSingleWithCamera(type) {
    console.log('pickSingleWithCamera start');
    console.log(type);
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: false,
      mediaType: 'photo',
    }).then(image => {
      console.log('received image', image);
      this.setState({
        [type]: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
      }, () => {
        console.log(this.state[type]);
      });
    }).catch(e => {
      console.log('报错');
      console.log(e)
    });
  }
  
  saveBasicInfo() {
    console.log('点击保存个人基本信息按钮');
    let url = axiosUtil.axiosUrl;
    let promiseTitImg = '';
    if (this.state.titImg) {
      let formData = new FormData();
      let titImgFile = {uri: this.state.titImg.uri, type: 'multipart/form-data', name: 'image.png'};   //这里的key(uri和type和name)不能改变,
      formData.append("titImgFile", titImgFile);
      promiseTitImg = function () {
        axios.post(url + 'user/submitTitImg', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + UserStore.userToken
          }
        }).then((res) => {
          console.log('上传boss信息接口所传res===');
        }).catch((err) => {
          console.log('上传boss信息接口所传报错===');
          console.log(err);
        })
      }
    };
    let {nickName, gender, studyBackground, joinWorkTime, birthTime} = this.state;
    console.log(studyBackground);
    let personAccount = UserStore.personAccount;
    if(gender === '男') {
      gender = 0
    }else if(gender === '女'){
      gender = 1
    }
    let userBasicInfo = {
      nickName, gender, studyBackground, joinWorkTime, birthTime, personAccount
    };
    console.log('aaaaaaaaa');
    console.log(userBasicInfo);
    console.log(nickName, gender, joinWorkTime, birthTime);
    let promiseSubmitBasicInfo = function () {
      axios.post(url + 'user/submitUserBasicInfo', userBasicInfo, {
            headers: {
              'Authorization': 'Bearer ' + UserStore.userToken
            }
          }
      ).then((res) => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    };
    if (promiseTitImg !== '') {
      this.props.navigation.navigate('editSmallCurriculumVitae', {routeName: 'editSmallCurriculumVitae'});
      Promise.all([promiseTitImg(), promiseSubmitBasicInfo()]).then((res) => {
        console.log('成功');
        ToastAndroid.show('更改个人信息成功', ToastAndroid.SHORT);
      }).catch((err) => {
        console.log('promise_all 报错');
      });
    } else {
      this.props.navigation.navigate('editSmallCurriculumVitae', {routeName: 'editSmallCurriculumVitae'});
      promiseSubmitBasicInfo();
    }
  }
  
  componentWillMount() {
    this.setState({
      gender: UserStore.gender,
      nickName: UserStore.nickName,
      studyBackground: UserStore.studyBackground,
      titImg: {uri: UserStore.titImg},
      joinWorkTime: new Date(UserStore.joinWorkTime),
      birthTime: new Date(UserStore.birthTime),
    })
  }
  
  render() {
    const {navigation} = this.props;
    return (
        <Provider>
          <View>
            <HeaderComp navigation={navigation} title="个人信息" routeName="editSmallCurriculumVitae"/>
            <View style={styles.editBasicInfo_box}>
              <Flex justify="between" style={styles.editBasicInfo_box_photo_item}
                    onPress={this.pickSingleWithCamera.bind(this, 'titImg')}>
                <Text style={styles.editBasicInfo_box_item_content}>头像</Text>
                {this.state.titImg ?
                    <Image style={styles.editBasicInfo_box_person_titimg} source={{uri: this.state.titImg.uri}}/> :
                    <Image style={styles.editBasicInfo_box_person_titimg} source={require('./../image/userPhoto.jpg')}/>
                }
              </Flex>
              
              <InputItem
                  defaultValue={this.state.nickName}
                  placeholder="请填写姓名"
                  onChange={value => {
                    this.setState({
                      nickName: value
                    });
                  }}
              >姓名</InputItem>
              
              
              <Flex direction="column" justify="around" align="start" style={styles.editBasicInfo_box_item}
                    onPress={this.chooseGender.bind(this)}>
                <Text style={styles.editBasicInfo_box_item_title}>性别</Text>
                <Flex justify="between" style={styles.editBasicInfo_box_item_main}>
                  {this.state.gender ? <Text
                      style={styles.editBasicInfo_box_item_content}>{UserStore.gender}</Text>
                      : <Text style={styles.editBasicInfo_box_item_content}>请选择性别</Text>
                  }
                  <IconOutline name="right" style={{fontSize: 16}}/>
                </Flex>
              </Flex>
              
              <Flex direction="column" justify="around" align="start" style={styles.editBasicInfo_box_item}
                    onPress={this.chooseStudyBackground.bind(this)}>
                <Text style={styles.editBasicInfo_box_item_title}>学历背景</Text>
                <Flex justify="between" style={styles.editBasicInfo_box_item_main}>
                  {this.state.studyBackground ? <Text
                      style={styles.editBasicInfo_box_item_content}>{UserStore.studyBackground}</Text>
                      : <Text style={styles.editBasicInfo_box_item_content}>请选择学术背景</Text>
                  }
                  <IconOutline name="right" style={{fontSize: 16}}/>
                </Flex>
              </Flex>
              
              <List>
                <DatePicker
                    value={this.state.joinWorkTime}
                    mode="datetime"
                    minDate={new Date(2000, 7)}
                    maxDate={new Date(2026, 11)}
                    onChange={this.onChange1}
                    format="YYYY-MM"
                >
                  <List.Item arrow="horizontal">参加工作时间</List.Item>
                </DatePicker>
              </List>
              
              <List>
                <DatePicker
                    value={this.state.birthTime}
                    mode="date"
                    minDate={new Date(1980, 7)}
                    maxDate={new Date(2026, 11)}
                    onChange={this.onChange2}
                    format="YYYY-MM"
                >
                  <List.Item arrow="horizontal">出生年月日</List.Item>
                </DatePicker>
              </List>
              
              
              <Flex direction="column" justify="around" align="start" style={styles.editBasicInfo_box_item}
                    onPress={this.intoPersonAccount.bind(this)}>
                <Text style={styles.editBasicInfo_box_item_title}>我的优势</Text>
                <Flex justify="between" style={styles.editBasicInfo_box_item_main}>
                  {UserStore.personAccount ? <Text style={styles.editBasicInfo_box_item_content}
                                                   numberOfLines={1}>{UserStore.personAccount}</Text> :
                      <Text style={styles.editBasicInfo_box_item_content} numberOfLines={1}>请详细阐述个人优势</Text>}
                  <IconOutline name="right" style={{fontSize: 16}}/>
                </Flex>
              </Flex>
              
              
              <Flex justify="center" align="center" style={styles.editBasicInfo_box_button}
                    onPress={this.saveBasicInfo.bind(this)}>
                <Text style={styles.editBasicInfo_box_button_text}>确定</Text>
              </Flex>
              
              <Modal
                  title="选择性别"
                  popup
                  visible={this.state.isShowGender}
                  animationType="slide-up"
                  onClose={this.ModalClose}
                  maskClosable
              >
                <View style={styles.modal_box }>
                  <FlatList
                      data={this.state.genderData}
                      keyExtractor={this._keyExtractor}
                      renderItem={
                        ({item, index}) => (
                            <Text onPress={() => this.chooseGenderItem(item.id, index)}
                                  style={{
                                    textAlign: 'center', fontSize: 18, color: 'black', marginTop: 15
                                  }}>{item.value}</Text>
                        )
                      }
                  />
                  <Text style={{textAlign: 'center', fontSize: 18, color: 'blue', marginTop: 15}}
                        onPress={this.ModalClose}>取消</Text>
                </View>
              </Modal>
              
              
              <Modal
                  title="选择学历背景"
                  popup
                  visible={this.state.isShowStudyBackground}
                  animationType="slide-up"
                  onClose={this.ModalClose}
                  maskClosable
              >
                <View style={styles.modal_box }>
                  <FlatList
                      data={this.state.studyBackgroundData}
                      keyExtractor={this._keyExtractor}
                      renderItem={
                        ({item, index}) => (
                            <Text onPress={() => this.chooseStudyBackgroundItem(item.id, index)}
                                  style={{
                                    textAlign: 'center', fontSize: 18, color: 'black', marginTop: 15
                                  }}>{item.label}</Text>
                        )
                      }
                  />
                  <Text style={{textAlign: 'center', fontSize: 18, color: 'blue', marginTop: 15}}
                        onPress={this.ModalClose}>取消</Text>
                </View>
              </Modal>
            </View>
          
          
          </View>
        </Provider>
    )
  }
}

const styles = StyleSheet.create({
  editBasicInfo_box: {
    // paddingHorizontal: 15,
  },
  editBasicInfo_box_photo_item: {
    borderBottomColor: '#f6f6f8',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: 15,
  },
  editBasicInfo_box_item: {
    height: 70,
    borderBottomColor: '#f6f6f8',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: 15,
  },
  editBasicInfo_box_item_title: {
    fontSize: 16,
  },
  editBasicInfo_box_item_main: {
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
    width: deviceW - 30
  },
  editBasicInfo_box_item_content: {
    fontSize: 20,
    color: 'black'
  },
  editBasicInfo_box_person_titimg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  editBasicInfo_box_button: {
    width: deviceW * 0.8,
    height: 40,
    marginTop: 20,
    marginLeft: deviceW * 0.1,
    backgroundColor: "#5dd5c8",
    borderRadius: 5,
  },
  editBasicInfo_box_button_text: {
    color: 'white',
    fontSize: 18,
  }
});

export default editBasicInfo;
