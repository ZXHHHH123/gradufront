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
      beListedArray: ['已上市', '未上市'],
      holidaySystemArray: ['单休', '双休', '单双轮休'],
      companyWelfareArray: ['五险一金', '全勤奖', '带薪年假', '企业团建', '工作午餐', '交通补贴', '住房补贴', '项目提成'],
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
      console.log('dcba');
      this.setState({
        holidaySystem: this.state.holidaySystemArray[value]
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
      if(type = 'companyImage') {
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
      }
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
    console.log('点击保存公司详情按钮');
    console.log(this.state.companyStar);
    
    
    this.props.navigation.navigate(this.navigation.state.params.routeName);
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
      
    }).catch((err) => {
      console.log('天眼查所获得的数据err');
      console.log(err);
    })
  }
  
  
  intoCompanyLeaderIntro() {
    console.log('点击进入高管介绍界面');
    this.props.navigation.navigate('companyLeaderIntro', {routeName: 'editCompanyIntro'})
  }
  
  componentWillMount() {
    this.earnCompanyIntroFromTianyancha();
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
                <Image style={styles.editCompanyIntro_box_titImg} source={require('./../image/userPhoto.jpg')}/>
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
                      <Text>{this.state.holidaySystem}</Text>
                      <IconOutline name="right"/>
                    </Flex>
                  </View>
                </Flex>
              </View>
              <InputItem
                  defaultValue={this.state.companyPeopleNum}
                  editable={false}
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
                  <Flex style={styles.companyDetail_main_company_pic_item} key={item.key}>
                    <Image key={index} style={styles.editCompanyIntro_box_companyImage_item} source={{uri: item.uri}}/>
                  </Flex>
                  )
                })}
                </ScrollView>

                <TouchableOpacity onPress={this.pickSingleWithCamera.bind(this, 'companyImage')}>
                      <Flex justify="center" align="center" style={styles.editCompanyIntro_box_companyImage_items}><Text>上传本人公司特色照片（限五张）</Text></Flex>
                </TouchableOpacity>
              </View>
  
              <View>
                <Text style={styles.editCompanyIntro_box_belisted_status_text}>产品介绍</Text>
                <Flex>
                  <InputItem
                      defaultValue=""
                      placeholder="请输入产品名字"
                      onChange={value => {
                        this.setState({
                          companyProductName: value
                        });
                      }}
                  >产品名字</InputItem>
                  <Flex justify="between" direction="column" onPress={this.pickSingleWithCamera.bind(this, 'companyProductLogo')}>
                  <Text>产品logo</Text>
                  <Image style={styles.editCompanyIntro_box_titImg} source={require('./../image/userPhoto.jpg')}/>
                  </Flex>
                  <Text>产品介绍</Text>
                  <TextareaItem rows={6} placeholder="公司介绍" count={200} defaultValue={UserStore.companyAccount} onChange={this.onChangeCompanyProductAccount} style={{    paddingHorizontal: 15,}} />
                </Flex>
              </View>
  
              <View>
                <Text style={styles.editCompanyIntro_box_belisted_status_text}>公司官网</Text>
                <InputItem
                    defaultValue=""
                    placeholder="请输入公司官网"
                    onChange={value => {
                      this.setState({
                        companyWebsite: value
                      });
                    }}
                >产品名字</InputItem>
              </View>
              
              <Flex justify="between" align="center" onPress={this.intoCompanyLeaderIntro.bind(this)} style={{height: 40,}}>
                <Text>高管介绍</Text>
                <IconOutline name="right"/>
              </Flex>
              
              <List style={{ marginTop: 12 }}>
                <Text style={{ marginTop: 12 }}>公司福利</Text>
                {this.state.companyWelfareArray.map((item, index) => {
                  return (
                      <CheckboxItem
                          key={index}
                          onChange={v => {
                            console.log('aaaaaaaaa');
                            console.log(v)
                          }}
                      >
                        {item}
                      </CheckboxItem>
                  )
                })}
        
              </List>
            
            
            </View>
            
            <Flex justify="center" align="center" style={styles.editCompanyIntro_box_button}>
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

