/**
 * Created by admin-pc on 2019/3/29.
 */
/**
 * Created by admin-pc on 2019/3/29.
 */
import React, {Component} from 'react'
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, FlatList,
  ScrollView,
  ImageBackground
} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../../graduFront/config/system'
import {Button, Flex, WhiteSpace, WingBlank, Provider, Modal} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import ComplainItem from './../../util/complainItem.json'

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;


class CompanyDetail extends Component {
  _keyExtractor = (item, index) => item.id;
  
  constructor(props) {
    super(props);
    this.state = {
      isShowComplainModal: false,
      isShowLeaderModal: false,
      leaderInfo: {},
      allWelfareData: [{key: 'a', id: '0', label: '五险一金'}, {key: 'b', id: '1', label: '全勤奖'}, {
        key: 'c', id: '2', label: '带薪年假'
      }, {key: 'd', id: '3', label: '员工旅游'}, {
        key: 'e', id: '4', label: '包吃'
      }, {key: 'f', id: '5', label: '节日福利'}, {key: 'g', id: '6', label: '奖金丰厚'}],
      companyPic: [{key: 'a', id: '0', label: 'http://pic32.nipic.com/20130823/13339320_183302468194_2.jpg'}, {
        key: 'b', id: '1', label: 'http://pic32.nipic.com/20130823/13339320_183302468194_2.jpg'
      }, {key: 'c', id: '2', label: 'http://pic32.nipic.com/20130823/13339320_183302468194_2.jpg'}, {
        key: 'd', id: '3', label: 'http://pic32.nipic.com/20130823/13339320_183302468194_2.jpg'
      }, {
        key: 'e', id: '4', label: 'http://pic32.nipic.com/20130823/13339320_183302468194_2.jpg'
      }],
      leaderData: [{
        key: 'a', id: '0', name: '高管姓名', place: '总裁',
        introduction: '高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管',
        photo: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555579011186&di=c86dda37076fcdeaa90adf5fe97d6ed6&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20140703%2FImg401718321.jpg'
      }, {
        key: 'b', id: '1', name: '高管姓名', place: '总裁', introduction: '高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍',
        photo: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555579011186&di=c86dda37076fcdeaa90adf5fe97d6ed6&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20140703%2FImg401718321.jpg'
      }, {
        key: 'c', id: '2', name: '高管姓名', place: '总裁', introduction: '高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍',
        photo: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555579011186&di=c86dda37076fcdeaa90adf5fe97d6ed6&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20140703%2FImg401718321.jpg'
      }, {
        key: 'd', id: '3', name: '高管姓名', place: '总裁', introduction: '高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍',
        photo: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555579011186&di=c86dda37076fcdeaa90adf5fe97d6ed6&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20140703%2FImg401718321.jpg'
      }, {
        key: 'e', id: '4', name: '高管姓名', place: '总裁', introduction: '高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍',
        photo: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555579011186&di=c86dda37076fcdeaa90adf5fe97d6ed6&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20140703%2FImg401718321.jpg'
      }, {
        key: 'f', id: '5', name: '高管姓名', place: '总裁', introduction: '高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍',
        photo: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555579011186&di=c86dda37076fcdeaa90adf5fe97d6ed6&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20140703%2FImg401718321.jpg'
      }, {
        key: 'g', id: '6', name: '高管姓名', place: '总裁', introduction: '高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍高管介绍',
        photo: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555579011186&di=c86dda37076fcdeaa90adf5fe97d6ed6&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20140703%2FImg401718321.jpg'
      }],
    };
    this.ModalClose = () => {
      this.setState({
        isShowComplainModal: false,
        isShowLeaderModal: false,
      }, () => {
        console.log('打印isShowComplainModal' + this.state.isShowComplainModal)
      })
    };
  }
  
  backView() {
    console.log('点击返回按钮');
    this.props.navigation.navigate('companyMain');
  };
  
  complainComp() {
    console.log('点击投诉按钮');
    this.setState({
      isShowComplainModal: true
    }, () => {
      console.log('isShowComplainModal' + this.state.isShowComplainModal);
    })
  };
  
  chooseComplainItem() {
    console.log('点击举报按钮');
    this.ModalClose();
    ToastAndroid.show('举报成功-我们会尽快和公司方核实', ToastAndroid.SHORT);
  };
  
  leaderInformation(index) {
    console.log('所点击的高管index=======' + index);
    let leaderInfo = this.state.leaderData[index];
    this.setState({
      isShowLeaderModal: true,
      leaderInfo: leaderInfo
    }, () => {
      console.log('isShowLeaderModal' + this.state.isShowLeaderModal);
      console.log(leaderInfo);
    })
  };
  
  
  intoCompanyWeb() {
    console.log('跳转到公司网站')
  }
  
  render() {
    const {navigation} = this.props;
    return (
        <ImageBackground source={require('./../image/companyBack.png')} style={{width: '100%', height: '100%'}}>
          <Provider>
            <ScrollView>
              <View style={styles.companyDetail_box}>
                <View style={styles.companyDetail_header}>
                  <Flex justify="between" align="center">
                    <IconOutline name="left" color="white" style={{fontSize: 16}} onPress={this.backView.bind(this)}/>
                    <Flex style={styles.companyDetail_header_right}>
                      <Text style={styles.companyDetail_header_right_text}>+关注</Text>
                      <IconOutline name="ellipsis" color="white" style={{fontSize: 20}}
                                   onPress={this.complainComp.bind(this)}/>
                    </Flex>
                  </Flex>
                
                </View>
                
                {/*公司名字以及基本介绍start*/}
                <View style={styles.companyDetail_main_header}>
                  <Flex justify="between">
                    <View>
                      <Text style={styles.companyDetail_main_company_name}>公司名字</Text>
                      <Text style={styles.companyDetail_main_company_information}>是否上市.1000-9999人.旅游</Text>
                    </View>
                    <Image style={styles.companyDetail_main_header_company_logo}
                           source={require('./../image/company_logo.jpg')}/>
                  </Flex>
                </View>
                {/*公司名字以及基本介绍end*/}
                
                
                {/*公司上班制度介绍start*/}
                <View style={styles.companyDetail_main_work_system}>
                  <Flex wrap="wrap">
                    <Flex style={styles.companyDetail_main_work_system_item}>
                      <IconOutline name="clock-circle" color="white"
                                   style={styles.companyDetail_main_work_system_icon}/>
                      <Text style={styles.companyDetail_main_work_system_text}>上午09:30-下午05:30</Text>
                    </Flex>
                    <Flex>
                      <IconOutline name="shop" color="white" style={styles.companyDetail_main_work_system_icon}/>
                      <Text style={styles.companyDetail_main_work_system_text}>单休</Text>
                    </Flex>
                    <Flex>
                      <IconOutline name="schedule" color="white" style={styles.companyDetail_main_work_system_icon}/>
                      <Text style={styles.companyDetail_main_work_system_text}>偶尔加班</Text>
                    </Flex>
                  </Flex>
                </View>
                {/*公司上班制度介绍end*/}
                
                {/*公司福利介绍start*/}
                <View style={styles.companyDetail_main_work_welfare_items}>
                  <ScrollView horizontal={true}>
                    {this.state.allWelfareData.map((item, index) => {
                      return (
                          <Flex style={styles.companyDetail_main_work_welfare_item} key={item.key}>
                            <IconOutline name="gift" color="white" style={{fontSize: 24, marginRight: 10}}
                                         onPress={this.backView.bind(this)}/>
                            <Text style={{fontSize: 16, color: 'white'}}>{item.label}</Text>
                          </Flex>
                      )
                    })}
                  </ScrollView>
                
                
                </View>
                {/*公司福利介绍end*/}
                
                
                {/*公司介绍start*/}
                <View style={styles.companyDetail_main_company_introduction}>
                  <Text style={styles.companyDetail_main_company_title}>公司介绍</Text>
                  <Text style={styles.companyDetail_main_company_introduction_content}>公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍</Text>
                </View>
                {/*公司介绍end*/}
                
                
                {/*公司图片start*/}
                <View style={styles.companyDetail_main_company_pic_items}>
                  <Text style={styles.companyDetail_main_company_title}>公司照片</Text>
                  <ScrollView horizontal={true} style={{marginTop: 10,}}>
                    {this.state.companyPic.map((item, index) => {
                      return (
                          <Flex style={styles.companyDetail_main_company_pic_item} key={item.key}>
                            <Image style={styles.companyDetail_main_company_pic} source={{uri: item.label}}/>
                          </Flex>
                      )
                    })}
                  </ScrollView>
                </View>
                {/*公司图片end*/}
                
                {/*公司产品介绍start*/}
                <View style={styles.companyDetail_main_product}>
                  <Text style={styles.companyDetail_main_company_title}>产品介绍</Text>
                  <Flex style={styles.companyDetail_main_product_content}>
                    <Image style={styles.companyDetail_main_company_product_pic}
                           source={require('./../image/company_logo.jpg')}/>
                    <View>
                      <Text style={styles.companyDetail_main_company_product_name}>产品名字</Text>
                      <Text
                          style={styles.companyDetail_main_company_product_introduction}>产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍</Text>
                    </View>
                  </Flex>
                </View>
                
                {/*公司产品介绍end*/}
                
                {/*公司高管介绍start*/}
                <View style={styles.leaderInformation}>
                  <Text style={styles.companyDetail_main_company_title}>高管介绍</Text>
                  <ScrollView horizontal={true} style={styles.leaderInformationItems}>
                    {this.state.leaderData.map((item, index) => {
                      return (
                          <Flex key={item.key} onPress={this.leaderInformation.bind(this, index)}>
                            <Image style={styles.leaderInformation_leader_photo}
                                   source={{uri: item.photo}}/>
                            <View style={styles.leaderInformationItem_right}>
                              <Text style={{fontSize: 18, color: 'white', marginBottom: 5,}}>{item.name}</Text>
                              <Text style={{fontSize: 16, color: '#9B9B9C'}}>{item.place}</Text>
                              <Text numberOfLines={3}
                                    style={{fontSize: 16, color: '#9B9B9C'}}>{item.introduction}</Text>
                            </View>
                          </Flex>
                      )
                    })}
                  </ScrollView>
                
                </View>
                {/*公司高管介绍end*/}
                
                {/*公司官网start*/}
                <View style={{marginTop: 35,}}>
                  <Text style={styles.companyDetail_main_company_title}>公司官网</Text>
                  <Flex justify="between">
                    <Text style={{color: 'white',}}>http://www.baidu.com</Text>
                    <IconOutline name="right" color="white" style={styles.back_icon}
                                 onPress={this.intoCompanyWeb.bind(this)}/>
                  </Flex>
                </View>
                {/*公司官网end*/}
                
                {/*公司工商信息start*/}
                {/*公司工商信息end*/}
                
                
                {/*公司官网start*/}
                {/*公司官网end*/}
                
                
                <Modal
                    popup
                    visible={this.state.isShowComplainModal}
                    animationType="slide-up"
                    onClose={this.ModalClose}
                    maskClosable
                >
                  <View>
                    <FlatList
                        data={ComplainItem}
                        keyExtractor={this._keyExtractor}
                        renderItem={
                          ({item, index}) => (
                              <Text onPress={() => this.chooseComplainItem(item.id, index)}
                                    style={styles.companyDetail_modal_item}>{item.value}</Text>
                          )
                        }
                    />
                    <Text style={[styles.companyDetail_modal_item, styles.modal_item_cancel]} onPress={this.ModalClose}>取消</Text>
                  </View>
                </Modal>
                
                <Modal
                    style={styles.companyDetail_leader_modal}
                    popup
                    visible={this.state.isShowLeaderModal}
                    animationType="slide-up"
                    onClose={this.ModalClose}
                    maskClosable>
                  <View>
                    <Flex direction="column" style={{paddingHorizontal: 15}}>
                      
                      <Image style={styles.companyDetail_leader_photo}
                             source={{uri: this.state.leaderInfo.photo}}/>
                      <Text style={styles.companyDetail_leader_name}>{this.state.leaderInfo.name}</Text>
                      <Text style={styles.companyDetail_leader_place}>{this.state.leaderInfo.place}</Text>
                      <Text style={styles.companyDetail_leader_introduction}>{this.state.leaderInfo.introduction}</Text>
                    </Flex>
                  </View>
                </Modal>
                
                
                <Text>显示公司具体信息界面</Text>
              </View>
            </ScrollView>
          </Provider>
        </ImageBackground>
    
    )
  }
}

const styles = StyleSheet.create({
  companyDetail_box: {
    borderColor: 'gray',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: 10,
  },
  companyDetail_header: {
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
    marginTop: 15,
  },
  
  companyDetail_header_right: {},
  companyDetail_header_right_text: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    marginRight: 10,
    color: 'white',
  },
  
  
  companyDetail_main_header: {
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
    paddingHorizontal: 10,
    marginTop: 30
  },
  companyDetail_main_company_name: {
    fontSize: 24,
    color: 'white',
    marginBottom: 5,
  },
  companyDetail_main_company_information: {
    fontSize: 14,
    color: '#9B9B9C',
  },
  companyDetail_main_header_company_logo: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  
  companyDetail_main_work_system: {
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
    width: deviceW * 0.6,
    marginTop: 35,
    
  },
  companyDetail_main_work_system_item: {
    marginRight: 15,
    marginBottom: 15,
  },
  companyDetail_main_work_system_icon: {
    fontSize: 13,
    marginRight: 5,
  },
  companyDetail_main_work_system_text: {
    fontSize: 13,
    color: 'white',
  },
  companyDetail_main_work_welfare_items: {
    marginTop: 20,
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  companyDetail_main_work_welfare_item: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginRight: 5,
    borderRadius: 5,
    borderColor: '#f6f6f8',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  
  
  companyDetail_main_company_introduction: {
    marginTop: 35,
  },
  companyDetail_main_company_title: {
    fontSize: 24,
    color: 'white',
  },
  companyDetail_main_company_introduction_content: {
    marginTop: 12,
    letterSpacing: 0.6,
    fontSize: 12,
    color: 'white',
  },
  
  companyDetail_main_company_pic_items: {
    marginTop: 30,
    
  },
  companyDetail_main_company_pic_item: {},
  companyDetail_main_company_pic: {
    width: 240,
    height: 180,
    borderRadius: 10,
    marginRight: 10,
    
  },
  
  companyDetail_main_product: {
    marginTop: 35,
  },
  companyDetail_main_product_content: {
    marginTop: 20,
  },
  companyDetail_main_company_product_pic: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  companyDetail_main_company_product_name: {
    fontSize: 15,
    color: 'white',
    marginBottom: 6,
  },
  companyDetail_main_company_product_introduction: {
    fontSize: 14,
    color: '#9B9B9C',
    width: deviceW * 0.8,
  },
  
  leaderInformation: {
    marginTop: 35,
  },
  leaderInformationItems: {
    marginTop: 10,
  },
  leaderInformation_leader_photo: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  leaderInformationItem_right: {
    width: deviceW * 0.5,
    paddingHorizontal: 15,
  },
  
  
  companyDetail_modal_item: {
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    borderBottomColor: '#f6f6f8',
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  modal_item_cancel: {
    color: 'blue'
  },
  
  companyDetail_leader_modal: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  companyDetail_leader_photo: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginTop: 45,
  },
  companyDetail_leader_name: {
    color: 'black',
    fontSize: 18,
    marginTop: 20
  },
  companyDetail_leader_place: {
    color: '#818182',
    fontSize: 14,
    marginTop: 10,
  },
  companyDetail_leader_introduction: {
    color: '#818182',
    fontSize: 14,
    marginTop: 50,
    marginBottom: 40
  }
});


export default CompanyDetail