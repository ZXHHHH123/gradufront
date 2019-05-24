/**
 * Created by admin-pc on 2019/5/4.
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
import {observer} from 'mobx-react';
import HeaderComp from './../../util/headerComp'
import publishJob from "../publish/publishJob";
import PublishJobItemComp from './../component/PublishJobItemComp'
import UserStore from './../../mobx/userStore'


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

@observer
class recruitManage extends Component {
  _keyExtractor = (item, index) => item._id;
  
  constructor(props) {
    super(props);
    this.state = {
      nickName: '',
      gender: '',
      userEmail: '',
      companyName: '',
      companyCode: '',
      place: '',
      wxCode: '',
      companyStar: '',
      companyIntro: [],
    }
  };
  
  intoEditTypeView(type) {
    console.log('进入界面' + type);
    this.props.navigation.navigate(type, {routeName: 'recruitManage'})
  };
  
  earnCompanyIntroFromTianyancha() {
    let tycApi = axiosUtil.tianyanchaApi;
    let tycToken = axiosUtil.tianyanchaToken;
    let companyName = this.state.companyName;
    axios.get(tycApi + 'name=' + companyName, {
      headers: {
        'Authorization': tycToken
      }
    }).then((res) => {
      console.log('天眼查所获得的数据res');
      console.log(res);
      if (res.reason = 'ok') {
        return true;
      } else {
        return false;
      }
      
    }).catch((err) => {
      console.log('天眼查所获得的数据err');
      console.log(err);
    })
  }
  
  /*保存所填写的公司信息*/
  saveCompanyInfo() {
    let url = axiosUtil.axiosUrl;
    let tianyanurl = axiosUtil.tianyanchaApi;
    console.log('点击保存公司信息按钮');
    console.log(this.state.companyName);
    
    let {nickName, gender, userEmail, companyName, companyCode, place, wxCode} = this.state;
    console.log(nickName, gender, userEmail, companyName, companyCode, place, wxCode);
    let companyStar = UserStore.companyStar;
    if (!(nickName && gender && place && wxCode && companyName && companyCode && userEmail)) {
      ToastAndroid.show('请详细填写公司信息', ToastAndroid.SHORT);
      return false;
    }
    if (gender === '男') {
      gender = 0
    } else if (gender === '女') {
      gender = 1;
    }
    
    
    let tycApi = axiosUtil.tianyanchaApi;
    let tycToken = axiosUtil.tianyanchaToken;
    axios.get(tycApi + 'name=' + companyName, {
      headers: {
        'Authorization': tycToken
      }
    }).then((res) => {
      console.log('天眼查所获得的数据res');
      console.log(res);
      console.log(res.data.reason);
      console.log(res.data.reason === 'ok');
      
      
      if (res.data.reason === 'ok') {
        let companyAddress = res.data.result.regLocation;
        let obj = {
          nickName, gender, userEmail, companyName, companyCode, place, wxCode,companyStar, companyAddress
        };
        axios.post(url + 'recruiter/submitCompanyBasicInfo', obj, {
          headers: {
            'Authorization': 'Bearer ' + UserStore.userToken
          }
        }).then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            ToastAndroid.show('保存成功', ToastAndroid.SHORT);
            this.props.navigation.navigate('personCenter');
            UserStore.changeNickName(obj.nickName);
            UserStore.changeGender(obj.gender);
            UserStore.changeEmail(obj.userEmail);
            UserStore.changeCompanyName(obj.companyName);
            UserStore.changeCompanyCode(obj.companyCode);
            UserStore.changePlace(obj.place);
            UserStore.changeWxCode(obj.wxCode);
            UserStore.changeCompanyAddress(obj.companyAddress);
          }
          
        }).catch((err) => {
          console.log(err);
        })
        
        
      } else {
        ToastAndroid.show('无该公司', ToastAndroid.SHORT);
        return false;
      }
      
    }).catch((err) => {
      console.log('天眼查所获得的数据err');
      console.log(err);
    })
    
    
    // console.log(this.earnCompanyIntroFromTianyancha(companyName));
    
    // let obj = {
    //   nickName, gender, email, companyName, companyCode, place, wxCode
    // };
    // console.log(obj);
    
    // axios.post(url + 'recruiter/submitCompanyBasicInfo', obj, {
    //   headers: {
    //     'Authorization': 'Bearer ' + UserStore.userToken
    //   }
    // }).then((res) => {
    //   console.log(res);
    //   if(res.data.code === 200) {
    //    'UserStore.chamge........todo'
    // }
    
    // }).catch((err) => {
    //   console.log(err);
    // })
    
    
    //如果填了公司名称则应该先从天眼查获取公司信息看是否存在，如果不存在，则直接toast & return
  }
  
  earnCompanyData() {
    let url = axiosUtil.axiosUrl;
    axios.post(url + 'recruiter/allCompanyInfo', {}, {
      headers: {
        'Authorization': 'Bearer ' + UserStore.userToken
      }
    }).then((res) => {
      if(res.data.code === 200) {
        UserStore.changeIsBelisted(res.data.data.isBelisted);
        UserStore.changeHolidaySystem(res.data.data.companyHolidaySystem);
        UserStore.changeCompanyPeopleNum(res.data.data.companyPeopleNum);
        UserStore.changeCompanyStar(res.data.data.companyStar);
        UserStore.changeCompanyAccount(res.data.data.companyAccount);
        UserStore.changeCompanyImage(res.data.data.companyImage);
        UserStore.changeCompanyLogo({uri: res.data.data.companyLogo});
        UserStore.changeCompanyWebsite(res.data.data.companyWebsite);
        UserStore.changeCompanyWelfare(res.data.data.companyWelfare);
        UserStore.changeCompanyEmail(res.data.data.companyEmail);
        UserStore.changeCompanyWorkTime(res.data.data.companyWorkTimeValue);
        UserStore.changeChooseIndustryData(res.data.data.companyIndustry);
        UserStore.changeHolidaySystem(res.data.data.companyHolidaySystem);
      }
    }).catch(() => {
      console.log(err);
    })
  }
  
  componentWillMount() {
    this.earnCompanyData();
    this.setState({
      nickName: UserStore.nickName,
      gender: UserStore.gender,
      userEmail: UserStore.userEmail,
      companyName: UserStore.companyName,
      companyCode: UserStore.companyCode,
      place: UserStore.place,
      wxCode: UserStore.place
    })
  }
  
  render() {
    const {navigation} = this.props;
    return (
        <Provider>
          <View>
            <HeaderComp navigation={navigation} title="个人信息" routeName="personCenter"/>
            <View style={styles.recruitManage_box}>
              <View style={styles.recruitManage_box_items}>
                <Flex justify="between">
                  <Text style={styles.recruitManage_box_item_title}>头像</Text>
                  {UserStore.titImg ? <Image style={styles.recruitManage_box_titImg} source={{uri: UserStore.titImg}}/>
                      :
                      <Image style={styles.recruitManage_box_titImg} source={require('./../image/userPhoto.jpg')}/>
                    
                  }
                </Flex>
                
                <InputItem
                    defaultValue={UserStore.nickName}
                    placeholder="请填写自己姓名"
                    onChange={value => {
                      this.setState({
                        nickName: value
                      });
                    }}
                >
                  姓名
                </InputItem>
                <InputItem
                    defaultValue={UserStore.gender}
                    placeholder="请填写自己性别"
                    // value={this.state.gender}
                    onChange={value => {
                      this.setState({
                        gender: value
                      });
                    }}
                >
                  性别
                </InputItem>
                <InputItem
                    defaultValue={UserStore.wxCode}
                    // clear
                    placeholder="请填写自己微信号码"
                    // value={this.state.wxCode}
                    onChange={value => {
                      this.setState({
                        wxCode: value
                      });
                    }}
                >
                  微信号
                </InputItem>
                <InputItem
                    defaultValue={UserStore.userEmail}
                    placeholder="邮箱"
                    onChange={value => {
                      this.setState({
                        userEmail: value
                      });
                    }}
                >
                  接收简历邮箱
                </InputItem>
              </View>
              
              <View style={styles.recruitManage_box_items}>
                <InputItem
                    defaultValue={UserStore.companyName}
                    placeholder="请准确填写公司名字"
                    onChange={value => {
                      this.setState({
                        companyName: value
                      });
                    }}
                >
                  所在公司
                </InputItem>
                
                <InputItem
                    defaultValue={UserStore.companyCode}
                    placeholder="所在公司机构代码"
                    onChange={value => {
                      this.setState({
                        companyCode: value
                      });
                    }}
                >
                  公司代码
                </InputItem>
              </View>
              
              <View style={styles.recruitManage_box_items}>
                <InputItem
                    defaultValue={UserStore.place}
                    placeholder="我的职务"
                    onChange={value => {
                      this.setState({
                        place: value
                      });
                    }}
                >
                  我的职务
                </InputItem>
                
                <Flex justify="between" align="center" style={styles.recruitManage_box_intoView}
                      onPress={this.intoEditTypeView.bind(this, 'editCompanyStar')}>
                  <Text numberOfLines={1} style={styles.recruitManage_box_item_title}>公司亮点 <Text>{UserStore.companyStar}</Text></Text>
                  <IconOutline name="right"/>
                </Flex>
                
                <Flex justify="between" align="center" style={styles.recruitManage_box_intoView}
                      onPress={this.intoEditTypeView.bind(this, 'editCompanyIntro')}>
                  <Text style={styles.recruitManage_box_item_title}>公司介绍</Text>
                  <IconOutline name="right" />
                </Flex>
              </View>
              
              
              <Flex justify="center" align="center" style={styles.recruitManage_box_save_button}
                    onPress={this.saveCompanyInfo.bind(this)}>
                <Text style={styles.recruitManage_box_save_button_text}>保存所填信息</Text>
              </Flex>
            
            
            </View>
          </View>
        </Provider>
    )
  }
}

const styles = StyleSheet.create({
  recruitManage_box: {
    paddingHorizontal: 10,
    width: deviceW,
    height: deviceH,
    backgroundColor: '#f6f6f8',
  },
  recruitManage_box_titImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  recruitManage_box_items: {
    backgroundColor: 'white',
    marginBottom: 5,
  },
  recruitManage_box_item_title: {
    paddingLeft: 14,
    fontSize: 18,
    color: 'black',
  },
  recruitManage_box_intoView: {
    width: deviceW - 20,
    height: 40,
  },
  
  
  recruitManage_box_save_button: {
    height: 40,
    width: deviceW * 0.8,
    marginLeft: deviceW * 0.1 - 10,
    backgroundColor: '#5dd5c8',
    borderRadius: 5,
  },
  recruitManage_box_save_button_text: {
    color: 'white',
    fontSize: 18,
  },
});

export default recruitManage;
