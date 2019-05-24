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
  Button, Flex, WhiteSpace, WingBlank, Picker, ListView, List, Provider, InputItem, TextareaItem, Modal, Checkbox
} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import HeaderComp from './../../util/headerComp'
import JobBigType from './../../util/jobBigType'
import {observer} from 'mobx-react';
import UserStore from './../../mobx/userStore';
import ImagePicker from 'react-native-image-crop-picker';
import allCompanyPeopleData from './../../util/companyPeopleNumData';
import allWorkTimeData from './../../util/workTime';


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;
const CheckboxItem = Checkbox.CheckboxItem;

@observer
class editCompanyIntro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyStar: '',
      isBelisted: 0,
      presentBeListed: '',
      holidaySystem: '',
      companyLogo:'',
      companyProductName: '',
      companyProductLogo: '',
      companyProductAccount: '',
      companyImage: [],
      companyProduct: [],
      companyWebsite:'',
      companyEmail: '',
      companyAddress:'',
      beListedArray: ['已上市', '未上市'],
      holidaySystemArray: ['单休', '双休', '单双轮休'],
      companyWelfareArray: ['五险一金', '全勤奖', '带薪年假', '企业团建', '工作午餐', '交通补贴', '住房补贴', '项目提成'],
      chooseCompamyWelfare: [],
      companyPeopleNum: '100~200人',
      companyIndustry: '软件服务业',
      
      pickerWorkTimeLabel: ['8:30', '18:00'],
      pickerWorkTimeValue: [85000, 85007],
      
      pickerCompanyPeopleNumLabel: [20, 60],
      pickerCompanyPeopleNumValue: [101020000, 101020004],
    };
    this.onChange = value => {
      this.setState({
        companyStar: value
      })
    };
    this.onChangeCompanyAccount = value => {
      UserStore.changeCompanyAccount(value);
      this.setState({
        companyAccount: value
      })
    };
    this.onChangeCompanyProductAccount = value => {
      this.setState({
        companyProductAccount: value
      })
    };
    this.changePickerData = (type) => {
      let typeList;
      let pickerTypeValue;
      if (type === 'workTime') {
        typeList = allWorkTimeData.data.workTimeList;
        pickerTypeValue = this.state.pickerWorkTimeValue;
        console.log(pickerTypeValue);
      }
      typeList.map((items) => {
        if (items.value === pickerTypeValue[0]) {
          if (items.children) {
            items.children.map((item) => {
              if (item.value === pickerTypeValue[1]) {
                if (type === 'workTime') {
                  let workTimeArr = [items.label, item.label];
                  this.setState({
                    pickerWorkTimeLabel: workTimeArr,
                  })
                }
              }
            })
          }
        }
      })
    };
    this.fixjobIntentionStatus = (value) => {
      console.log('abcd');
      this.setState({
        isBelisted: value,
        presentBeListed: this.state.beListedArray[value]
      });
    };
    this.fixHolidaySystem = (value) => {
      this.setState({
        holidaySystem: this.state.holidaySystemArray[value]
      }, () => {
        console.log('dcbadcbadcba');
        console.log(this.state.holidaySystem);
      });
    };
    
    this.showModalOperation = () => {
      Modal.operation([
        {
          text: '已上市', onPress: () => {
          this.fixjobIntentionStatus(0)
        }
        },
        {
          text: '未上市', onPress: () => {
          this.fixjobIntentionStatus(1)
        }
        }
      ]);
    };
    
    this.showModalHolidaySystem = () => {
      Modal.operation([
        {
          text: '单休', onPress: () => {
          this.fixHolidaySystem(0)
        }
        },
        {
          text: '双休', onPress: () => {
          this.fixHolidaySystem(1)
        }
        },
        {
          text: '单双轮休', onPress: () => {
          this.fixHolidaySystem(2)
        }
        }
      ]);
    }
    
  }
  pickSingleWithCamera(type) {
    console.log('pickSingleWithCamera start');
    console.log(type);
   
    console.log('22222');
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: false,
      mediaType: 'photo',
    }).then(image => {
      console.log('received image', image);
      if(type === 'companyImage') {
        let presentCompanyImage = Array.from(UserStore.companyImage);
        let img = {uri: image.path, width: image.width, height: image.height, mime: image.mime};
        if(presentCompanyImage.length == 5) {
          ToastAndroid.show('最多只可上传五张图片', ToastAndroid.SHORT);
        }
        if(!this.isExistChooseImage(presentCompanyImage, img)){
          console.log('push----');
          presentCompanyImage.push(img);
          UserStore.changeCompanyImage(presentCompanyImage);
        }
      }else {
        this.setState({
          [type]: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
        }, () => {
          console.log(this.state[type]);
        });
      }
    }).catch(e => {
      console.log('报错');
      console.log(e)
    });
  }
  isExistChooseImage(presentCompanyImage, image) {
    let flag = 0;
    console.log('presentCompanyImage---len' + presentCompanyImage.length);
    console.log(presentCompanyImage);
    console.log(image);
    for(let i = 0, len = presentCompanyImage.length ;i < len; i++) {
      console.log(presentCompanyImage[i].uri);
      console.log(image.uri);
      if(presentCompanyImage[i].uri === image.uri) {
        flag = 1;
        break;
      }
    }
    console.log('flag========' + flag);
    return flag;
  }
  
  chooseType(type) {
    this.props.navigation.navigate(type, {routeName: "editCompanyIntro", isBoss: true});
  };
  
  saveCompanyIntro() {
    let url = axiosUtil.axiosUrl;
    console.log('点击保存公司详情按钮');
    let {isBelisted, holidaySystem, companyProductName, companyProductLogo, companyProductAccount, companyProduct, companyWebsite, companyAddress, companyPeopleNum, pickerWorkTimeValue, pickerCompanyPeopleNumValue, companyEmail} = this.state;
    let companyImage = UserStore.companyImage;
    console.log(companyImage);
    if(!this.state.companyLogo){
      console.log('请选择公司logo');
      ToastAndroid.show('请选择公司logo', ToastAndroid.SHORT);
      return;
    }
     let formData = new FormData();
    let imageFile0, imageFile1 , imageFile2, imageFile3, imageFile4, companyLogo;
    companyLogo = {uri: this.state.companyLogo.uri, type: 'multipart/form-data', name: 'image.png'};
    for(let i = 0 , len = companyImage.length; i < len; i++) {
      console.log('imageFile'+i);
      let tempFile = 'imageFile'+i;
      let tempFileName = 'imageFile'+i;
      tempFile = {uri: companyImage[i].uri, type: 'multipart/form-data', name: 'image.png'};
      formData.append(tempFileName, tempFile);
    }
    formData.append('companyLogo', companyLogo);
    let promiseCompanyImage = function () {
      axios.post(url + 'recruiter/saveCompanyImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + UserStore.userToken
        }
      }).then((res) => {
        UserStore.changeCompanyLogo(companyLogo);
        console.log('上传公司产品信息接口所传res===');
      }).catch((err) => {
        console.log('上传公司产品信息接口所传报错===');
        console.log(err);
      })
    };

    
    
    let companyDetailObj = {
      isBelisted,
      companyPeopleNum,
      companyAddress,
      companyIndustry: UserStore.chooseIndustryData,
      pickerWorkTimeValue,
      companyAccount: UserStore.companyAccount,
      companyWebsite,
      companyEmail,
      companyWelfare: UserStore.companyWelfare,
      companyHolidaySystem: holidaySystem
    };
    console.log(companyDetailObj);
    let promiseCompanyDetailInfo = function() {
      axios.post(url + 'recruiter/saveCompanyDetailInfo', companyDetailObj, {
        headers: {
          'Authorization': 'Bearer ' + UserStore.userToken
        }
      }).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          UserStore.changeHolidaySystem(companyDetailObj.companyHolidaySystem);
          UserStore.changeCompanyWebsite(companyDetailObj.companyWebsite);
          UserStore.changeCompanyEmail(companyDetailObj.companyEmail);
  
          
          this.props.navigation.navigate(this.navigation.state.params.routeName);
        }
      }).catch((err) => {
        console.log(err);
      })
    };
    Promise.all([promiseCompanyImage(), promiseCompanyDetailInfo()]).then((res) =>{
      console.log('成功');
      ToastAndroid.show('保存公司详细信息成功', ToastAndroid.SHORT);
      this.props.navigation.navigate('recruitManage');
    }).catch((err) => {
      console.log('promise_all 报错');
    });
    // this.props.navigation.navigate(this.navigation.state.params.routeName);
  };
  
  earnCompanyIntroFromTianyancha() {
    let tycApi = axiosUtil.tianyanchaApi;
    let tycToken = axiosUtil.tianyanchaToken;
    let companyName = UserStore.companyName;
    axios.get(tycApi + 'name=' + companyName, {
      headers: {
        'Authorization': tycToken
      }
    }).then((res) => {
      console.log('天眼查所获得的数据res');
      console.log(res);
      let companyBasic = res.data.result;
      this.setState({
        companyAddress: companyBasic.regLocation
      })
    }).catch((err) => {
      console.log('天眼查所获得的数据err');
      console.log(err);
    })
  }
  
  
  intoCompanyLeaderIntroOrProductIntro(type) {
    console.log('点击进入高管介绍或公司产品界面');
    this.props.navigation.navigate(type, {routeName: 'editCompanyIntro'})
  }
  
  componentWillMount() {
    // this.earnCompanyIntroFromTianyancha(); todo
    console.log('editcompany');
    console.log(UserStore.companyWorkTime);
    let holidaySystem = UserStore.holidaySystem;
    console.log(holidaySystem);
    if(holidaySystem === '单休'){
      this.fixHolidaySystem(0)
    }else if(holidaySystem === '双休'){
      this.fixHolidaySystem(1)
    }else if(holidaySystem === '单双轮休'){
      this.fixHolidaySystem(2)
    }
    this.setState({
      isBelisted: UserStore.isBelisted,
      pickerWorkTimeValue: UserStore.companyWorkTime,
      presentBeListed: this.state.beListedArray[UserStore.isBelisted],
      // holidaySystem: this.state.holidaySystemArray[UserStore.holidaySystem],
      companyPeopleNum: UserStore.companyPeopleNum,
      companyAccount: UserStore.companyAccount,
      companyWebsite: UserStore.companyWebsite,
      companyEmail: UserStore.companyEmail,
      chooseCompamyWelfare: UserStore.companyWelfare,
      companyLogo: UserStore.companyLogo,
    }, () => {
      this.changePickerData('workTime');
    })
  }
  
  render() {
    const {navigation} = this.props;
    return (
        <Provider>
          <ScrollView>
  
          <View>
            <HeaderComp navigation={navigation} title="编辑公司介绍" routeName='recruitManage'/>
            <View style={styles.editCompanyIntro_box}>
              <Flex justify="between" onPress={this.pickSingleWithCamera.bind(this, 'companyLogo')}>
                <Text>公司logo</Text>
                {this.state.companyLogo.uri ?  <Image style={styles.editCompanyIntro_box_titImg} source={{uri: this.state.companyLogo.uri}}/> : <Image style={styles.editCompanyIntro_box_titImg} source={require('./../image/userPhoto.jpg')}/>}
               
              </Flex>
              
              {/*选择是否上市*/}
              <View style={styles.editCompanyIntro_box_belisted_status}>
                <Flex justify="between" onPress={this.showModalOperation}>
                  <Text style={styles.editCompanyIntro_box_belisted_status_text}>是否上市</Text>
                  <View>
                    <Flex>
                      <Text>{this.state.presentBeListed}</Text>
                      <IconOutline name="right"/>
                    </Flex>
                  </View>
                </Flex>
              </View>
              
              <View style={styles.editCompanyIntro_box_belisted_status}>
                <Flex justify="between" onPress={this.showModalHolidaySystem}>
                  <Text style={styles.editCompanyIntro_box_belisted_status_text}>放假制度</Text>
                  <View>
                    <Flex>
                      {/*<Text>123456</Text>*/}
                      <Text>{this.state.holidaySystem}</Text>
                      <IconOutline name="right"/>
                    </Flex>
                  </View>
                </Flex>
              </View>
              <InputItem
                  defaultValue={this.state.companyPeopleNum}
              >
                公司大概人数
              </InputItem>
              
              
              <Flex justify="between" align="center" style={styles.editCompanyIntro_box_main_item}
                    onPress={this.chooseType.bind(this, 'industryType')}>
                <View>
                  <Text style={{fontSize: 14,}}>公司所在行业</Text>
                  {UserStore.chooseIndustryData.length > 0 ?
                      <Flex>
                        {UserStore.chooseIndustryData.map((item, index) => {
                          return (
                              <Text key={index} style={styles.editCompanyIntro_box_main_item_value}>{item}</Text>
                          )
                        })}
                      </Flex>
                      
                      : <Text style={styles.editCompanyIntro_box_main_item_value}>不限</Text>
                  }
                </View>
                <IconOutline name="right" style={styles.right_icon}/>
              
              </Flex>
              
              
              <List>
                <Picker
                    title="选择公司上下班时间"
                    data={allWorkTimeData.data.workTimeList}
                    cols={2}
                    value={this.state.pickerWorkTimeValue}
                    onChange={v => {
                      this.setState({pickerWorkTimeValue: v}, () => {
                        this.changePickerData('workTime');
                      })
                    }}
                    onOk={v => this.setState({pickerWorkTimeValue: v})}
                >
                  <Flex justify="between" align="center"
                        style={styles.editCompanyIntro_box_companyperoplenum_main_item}>
                    <View>
                      <Text style={styles.editCompanyIntro_box_companyperoplenum_main_item_key}>公司上下班时间</Text>
                      
                      
                      <Text
                          style={styles.editCompanyIntro_box_companyperoplenum_main_item_value}>{this.state.pickerWorkTimeLabel[0]}
                        ~ {this.state.pickerWorkTimeLabel[1]}</Text>
                    </View>
                    <IconOutline name="right" style={styles.right_icon}/>
                  </Flex>
                </Picker>
              </List>
  
              <View style={{marginTop: 10}}>
                <Text style={styles.editCompanyIntro_box_belisted_status_text}>公司介绍</Text>
                <TextareaItem rows={6} placeholder="公司介绍" count={200} defaultValue={UserStore.companyAccount} onChange={this.onChangeCompanyAccount} style={{    paddingHorizontal: 15,}} />
              </View>
              
              
              <View>
                <Text style={styles.editCompanyIntro_box_belisted_status_text}>上传公司照片</Text>
                <ScrollView horizontal={true} style={{marginTop: 10,}}>
                {UserStore.companyImage.map((item, index) =>{
                  return (
                  <Flex style={styles.companyDetail_main_company_pic_item} key={index}>
                    <Image key={index} style={styles.editCompanyIntro_box_companyImage_item} source={{uri: item.uri}}/>
                  </Flex>
                  )
                })}
                </ScrollView>

                <TouchableOpacity onPress={this.pickSingleWithCamera.bind(this, 'companyImage')}>
                      <Flex justify="center" align="center" style={styles.editCompanyIntro_box_companyImage_items}><Text>上传本人公司特色照片（限五张）</Text></Flex>
                </TouchableOpacity>
              </View>
  
              {/*<View>*/}
                {/*<Text style={styles.editCompanyIntro_box_belisted_status_text}>产品介绍</Text>*/}
                {/*<Flex direction="column" align="start">*/}
                  {/*<InputItem*/}
                      {/*defaultValue=""*/}
                      {/*placeholder="请输入产品名字"*/}
                      {/*onChange={value => {*/}
                        {/*this.setState({*/}
                          {/*companyProductName: value*/}
                        {/*});*/}
                      {/*}}*/}
                  {/*>产品名字</InputItem>*/}
                  {/*<Flex justify="between" direction="column" onPress={this.pickSingleWithCamera.bind(this, 'companyProductLogo')}>*/}
                  {/*<Text>产品logo</Text>*/}
                  {/*<Image style={styles.editCompanyIntro_box_titImg} source={require('./../image/userPhoto.jpg')}/>*/}
                  {/*</Flex>*/}
                  {/*<Text>产品介绍</Text>*/}
                  {/*<TextareaItem rows={6} placeholder="产品介绍" count={200} defaultValue={UserStore.companyAccount} onChange={this.onChangeCompanyProductAccount} style={{    paddingHorizontal: 15,}} />*/}
                {/*</Flex>*/}
              {/*</View>*/}
  
              <View>
                {/*<Text style={styles.editCompanyIntro_box_belisted_status_text}>公司官网</Text>*/}
                <InputItem
                    defaultValue={UserStore.companyWebsite}
                    placeholder="请输入公司官网"
                    onChange={value => {
                      this.setState({
                        companyWebsite: value
                      });
                    }}
                >公司官网</InputItem>
              </View>
  
              <View>
                {/*<Text style={styles.editCompanyIntro_box_belisted_status_text}>公司官网</Text>*/}
                <InputItem
                    defaultValue={UserStore.companyEmail}
                    placeholder="请输入公司投递简历邮箱"
                    onChange={value => {
                      this.setState({
                        companyEmail: value
                      });
                    }}
                >投递简历邮箱</InputItem>
              </View>
              
              <Flex justify="between" align="center" onPress={this.intoCompanyLeaderIntroOrProductIntro.bind(this, 'companyLeaderIntro')} style={{height: 40,}}>
                <Text>高管介绍</Text>
                <IconOutline name="right"/>
              </Flex>
  
              <Flex justify="between" align="center" onPress={this.intoCompanyLeaderIntroOrProductIntro.bind(this, 'companyProductIntro')} style={{height: 40,}}>
                <Text>产品介绍</Text>
                <IconOutline name="right"/>
              </Flex>
              
              <List style={{ marginTop: 12 }}>
                <Text style={{ marginTop: 12 }}>公司福利</Text>
                {this.state.companyWelfareArray.map((item, index) => {
                  return (
                      <View key={index}>
                      {UserStore.companyWelfare.indexOf(item) >= 0 ?  <CheckboxItem
                          checked='true'
                          onChange={v => {
                            UserStore.changeCompanyWelfare(item, v.target.checked);
                          }}
                      >
                        {item}
                      </CheckboxItem> :  <CheckboxItem
                          onChange={v => {
                            UserStore.changeCompanyWelfare(item, v.target.checked);
                          }}
                      >
                        {item}
                      </CheckboxItem>}
                      </View>
                  )
                })}
        
              </List>
            
            
            </View>
            
            <Flex justify="center" align="center" onPress={this.saveCompanyIntro.bind(this)} style={styles.editCompanyIntro_box_button}>
              <Text style={styles.editCompanyIntro_box_button_text}>保存</Text>
            </Flex>
          </View>
          </ScrollView>
        </Provider>
    )
  }
}


const styles = StyleSheet.create({
  editCompanyIntro_box: {
    paddingHorizontal: 10,
  },
  editCompanyIntro_box_titImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  editCompanyIntro_box_title: {
    fontSize: 18,
    color: 'black',
    paddingHorizontal: 15,
  },
  
  editCompanyIntro_box_belisted_status: {
    padding: 12,
    borderColor: '#f6f6f8',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  editCompanyIntro_box_belisted_status_text: {
    fontSize: 16,
    color: 'black'
  },
  editCompanyIntro_box_main_item: {
    paddingVertical: 15,
    borderBottomColor: '#f6f6f8',
    borderBottomWidth: 2,
    height: 80,
    borderStyle: 'solid',
  },
  editCompanyIntro_box_main_item_value: {
    fontSize: 18,
    color: 'black',
    marginTop: 10,
    marginRight: 10,
  },
  
  editCompanyIntro_box_companyperoplenum_main_item: {
    paddingVertical: 15,
    borderBottomColor: '#f6f6f8',
    borderBottomWidth: 2,
    height: 80,
    borderStyle: 'solid',
  },
  editCompanyIntro_box_companyperoplenum_main_item_key: {
    fontSize: 14,
  },
  editCompanyIntro_box_companyperoplenum_main_item_value: {
    fontSize: 18,
    color: 'black',
    marginTop: 10,
    marginRight: 10,
  },
  right_icon: {
    color: '#9b9b9c'
  },
  
  
  editCompanyIntro_box_companyImage_item: {
    width: 240,
    height: 180,
    borderRadius: 10,
    marginRight: 10,
  },
  
  
  //宽度设置了就需要调整marginLeft的值，不然不能居中
  editCompanyIntro_box_button: {
    backgroundColor: '#5dd5c8',
    borderRadius: 5,
    width: deviceW * 0.8,
    height: 50,
    marginLeft: deviceW * 0.1,
    marginTop: 40,
    marginBottom: 15,
  },
  editCompanyIntro_box_button_text: {
    color: 'white',
    fontSize: 16,
  }
});

export default editCompanyIntro;

