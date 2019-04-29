/**
 * Created by admin-pc on 2019/4/22.
 */
import React, {Component} from 'react'
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, FlatList,
  ScrollView
} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {Button, Flex, WhiteSpace, WingBlank, Picker, ListView, List, Provider} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import CompanyItemComp from './../component/CompanyItemComp'
import UserStore from './../../mobx/userStore'


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class personCenter extends Component {
  _keyExtractor = (item, index) => item.id;
  
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  intoCompanyDetail() {
    console.log(123);
    let params = {params: this.props.navigation};
    // let params = {params: this.props.navigation};
    this.props.navigation.navigate('companyDetail', params);
  };
  
  intoPersonSetting() {
    console.log('进入个人中心设置界面');
    this.props.navigation.navigate('personSetting');
  };
  
  intoChatRecord(type) {
    console.log(type);
    let params = {params: this.props.navigation};
    // let params = {params: this.props.navigation};
    this.props.navigation.navigate(type, params);
  };
  
  manageJobIntention() {
    console.log('点击主页右侧‘+’icon进入‘管理求职意向界面’');
    this.props.navigation.navigate('manageJobIntention');
  }
  
  render() {
    return (
        <Provider>
          <View style={styles.personCenter_box}>
            {/*header start*/}
            <Flex direction="row" justify="between" align="center" style={styles.personCenter_box_header_icon}>
              <Text></Text>
              <Text></Text>
              <IconOutline name="setting" style={{fontSize: 20}} color="white"
                           onPress={this.intoPersonSetting.bind(this)}/>
            </Flex>
            {/*header end*/}
            
            <ScrollView>
              {/*姓名头像栏start*/}
              <View style={styles.personCenter_box_basic_info}>
                <Flex justify="between">
                  <View>
                    <Text style={styles.personCenter_box_user_name}>用户姓名</Text>
                    <Text style={styles.personCenter_box_user_more}>我的个人主页></Text>
                  </View>
                  <Image style={styles.personCenter_box_user_photo} source={require('./../image/userPhoto.jpg')}/>
                </Flex>
              </View>
              {/*姓名头像栏end*/}
              
              
              {/*面试经历start*/}
                {UserStore.isCompany ?
                    <Flex justify="between" style={styles.personCenter_box_chat_record}>
                    <Flex direction="column" justify="between" style={styles.personCenter_box_chat_record_item}>
                      <Text style={styles.personCenter_box_chat_record_num}>1092</Text>
                      <Text style={styles.personCenter_box_chat_record_type}>沟通过</Text>
                    </Flex>
                      <Flex direction="column" justify="between" style={styles.personCenter_box_chat_record_item}>
                        <Text style={styles.personCenter_box_chat_record_num}>0</Text>
                        <Text style={styles.personCenter_box_chat_record_type}>面试</Text>
                      </Flex>
                      <Flex direction="column" justify="between" style={styles.personCenter_box_chat_record_item}>
                      <Text style={styles.personCenter_box_chat_record_num}>0</Text>
                      <Text style={styles.personCenter_box_chat_record_type}>收藏牛人</Text>
                    </Flex>
                    </Flex> :
                    <Flex justify="between" style={styles.personCenter_box_chat_record}>
                      <Flex direction="column" justify="between" style={styles.personCenter_box_chat_record_item}
                                onPress={this.intoChatRecord.bind(this, 'hadChat')}>
                      <Text style={styles.personCenter_box_chat_record_num}>62</Text>
                      <Text style={styles.personCenter_box_chat_record_type}>沟通过</Text>
                    </Flex>
                      <Flex direction="column" justify="between" style={styles.personCenter_box_chat_record_item}
                            onPress={this.intoChatRecord.bind(this, 'todayInterview')}>
                        <Text style={styles.personCenter_box_chat_record_num}>62</Text>
                        <Text style={styles.personCenter_box_chat_record_type}>面试</Text>
                      </Flex>
                      <Flex direction="column" justify="between" style={styles.personCenter_box_chat_record_item}
                            onPress={this.intoChatRecord.bind(this, 'hadDeliver')}>
                        <Text style={styles.personCenter_box_chat_record_num}>13</Text>
                        <Text style={styles.personCenter_box_chat_record_type}>已投递</Text>
                      </Flex>
                      <Flex direction="column" justify="between" style={styles.personCenter_box_chat_record_item}
                            onPress={this.intoChatRecord.bind(this, 'interestedJob')}>
                        <Text style={styles.personCenter_box_chat_record_num}>2</Text>
                        <Text style={styles.personCenter_box_chat_record_type}>感兴趣</Text>
                      </Flex>
                    </Flex>
                }
              {/*面试经历end*/}
              
              {/*个人中心简历部分start*/}
              {UserStore.isCompany ? <View style={styles.personCenter_box_main_list}>
                <Flex justify="between" style={styles.personCenter_box_main_list_item}>
                  <Flex>
                    <IconOutline name="profile" style={{fontSize: 20}} color="gray"/>
                    <Text style={styles.personCenter_box_main_list_item_text}>职位管理</Text>
                  </Flex>
                  <Flex>
                    <Text>共发布6个职位</Text>
                    <IconOutline name="right" style={{fontSize: 20}} color="gray"/>
                  </Flex>
                </Flex>
  
                <Flex justify="between" style={styles.personCenter_box_main_list_item}>
                  <Flex>
                    <IconOutline name="upload" style={{fontSize: 20}} color="gray"/>
                    <Text style={styles.personCenter_box_main_list_item_text}>招聘管理</Text>
                  </Flex>
                  <Flex>
                    <Text>个人信息及招聘设置</Text>
                    <IconOutline name="right" style={{fontSize: 20}} color="gray"/>
                  </Flex>
                </Flex>

              </View>:
                  <View style={styles.personCenter_box_main_list}>
                    <Flex justify="between" style={styles.personCenter_box_main_list_item}>
                      <Flex>
                        <IconOutline name="profile" style={{fontSize: 20}} color="gray"/>
                        <Text style={styles.personCenter_box_main_list_item_text}>我的微简历</Text>
                      </Flex>
                      <IconOutline name="right" style={{fontSize: 20}} color="gray"/>
                    </Flex>
      
                    <Flex justify="between" style={styles.personCenter_box_main_list_item}>
                      <Flex>
                        <IconOutline name="upload" style={{fontSize: 20}} color="gray"/>
                        <Text style={styles.personCenter_box_main_list_item_text}>附件简历</Text>
                      </Flex>
                      <Flex>
                        <Text>已上传一份</Text>
                        <IconOutline name="right" style={{fontSize: 20}} color="gray"/>
                      </Flex>
                    </Flex>
      
                    <Flex justify="between" style={styles.personCenter_box_main_list_item}
                          onPress={this.manageJobIntention.bind(this)}>
                      <Flex>
                        <IconOutline name="robot" style={{fontSize: 20}} color="gray"/>
                        <Text style={styles.personCenter_box_main_list_item_text}>管理求职意向</Text>
                      </Flex>
                      <Flex>
                        <Text>在职-暂不考虑</Text>
                        <IconOutline name="right" style={{fontSize: 20}} color="gray"/>
                      </Flex>
                    </Flex>
      
                    <Flex justify="between" style={styles.personCenter_box_main_list_item}>
                      <Flex>
                        <IconOutline name="monitor" style={{fontSize: 20}} color="gray"/>
                        <Text style={styles.personCenter_box_main_list_item_text}>关注公司</Text>
                      </Flex>
                      <Flex>
                        <IconOutline name="right" style={{fontSize: 20}} color="gray"/>
                      </Flex>
                    </Flex>
    
                  </View>}
              
            </ScrollView>
          </View>
        </Provider>
    )
  }
}

const styles = StyleSheet.create({
  personCenter_box: {
    width: deviceW,
    height: deviceH,
    backgroundColor: '#f6f6f8',
  },
  personCenter_box_header_icon: {
    backgroundColor: '#5dd5c8',
    height: 60,
    width: deviceW,
    paddingLeft: 20,
    paddingRight: 20,
  },
  
  personCenter_box_basic_info: {
    height: 140,
    backgroundColor: '#5dd5c8',
    paddingTop: 40,
    paddingHorizontal: 20,
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  personCenter_box_user_name: {
    fontSize: 30,
    color: 'white',
  },
  personCenter_box_user_more: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
  personCenter_box_user_photo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  
  
  personCenter_box_chat_record: {
    paddingHorizontal: 25,
    backgroundColor: 'white',
  },
  personCenter_box_chat_record_item: {
    height: 60,
    paddingVertical: 7
  },
  personCenter_box_chat_record_num: {
    fontSize: 16,
    color: 'black',
  },
  personCenter_box_chat_record_type: {
    fontSize: 14,
    color: '#89898a',
  },
  
  personCenter_box_main_list: {
    marginTop: 15,
  },
  personCenter_box_main_list_item: {
    paddingVertical: 15,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    borderBottomColor: '#f6f6f8',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    
  },
  personCenter_box_main_list_item_text: {
    color: 'black',
    fontSize: 16,
    marginLeft: 15,
  }
});
export default personCenter