/**
 * Created by admin-pc on 2019/4/29.
 */
import React, {Component} from 'react'
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, FlatList, ScrollView
} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {Button, Flex, WhiteSpace, WingBlank, Picker, ListView, List, Provider, Modal} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import {district} from 'antd-mobile-demo-data';
import UserStore from './../../mobx/userStore';
import {observer} from 'mobx-react';
import JobItemComp from './../component/JobItemComp'
import JobHunterItemComp from './../component/JobHunterItemComp'
const data = require('@bang88/china-city-data');
const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

@observer
class allJobHunter extends Component {
  static navigationOptions = {
    title: 'allJobHunter',
  };
  /*_keyExtractor用来设置列表的key值，不设置会有警告提示*/
  _keyExtractor = (item, index) => item._id;
  
  constructor(props) {
    super(props);
    this.JobItemComp = JobItemComp.bind(this);
    this.state = {
      data: [],
      value: [],
      publishJobArr: [],
    // { key: 'a', value: '0',  label: '新媒体运营'}, { key: 'b', value: '1', label: '财务会计'}, { key: 'c', value: '2', label: '文案策划'}, { key: 'd', value: '3', label: 'web前端'}
      publishJobValue: [0],
      
      reccomendData: [{value: 0, label: '推荐'}, {value: 1, label: '最新'}],
      reccomendValue: [0],
      cityData: [{value: 0, label: '长沙'}, {value: 1, label: '岳麓区'}, {value: 2, label: '雨花区'}, {
        value: 3, label: '芙蓉区'
      }, {value: 4, label: '开福区'}, {value: 5, label: '天心区'}],
      cityValue: [0],
    // {key: 'a', _id: '0'}, {key: 'b', _id: '1'}, {key: 'c', _id: '2'}, {key: 'd', _id: '3'}, {key: 'e', _id: '4'}, {key: 'f', _id: '5'}
      allJobHunterData: []
    };
    this.onChange1 = reccomendValue => {
      this.setState({reccomendValue});
    };
    this.onChange2 = cityValue => {
      this.setState({cityValue});
      console.log(cityValue);
    };
  };
  choosePublishJob() {
    console.log('选择职位');
  }
  /*点击主页右侧‘+’icon进入‘管理求职意向界面’*/
  manageJobIntention(){
    console.log('点击主页右侧‘+’icon进入‘管理求职意向界面’');
    this.props.navigation.navigate('manageJobIntention');
  }
  
  intoJobHunterDetail(item) {
    console.log('intoJobHunterDetail');
    // let params = {params: this.props.navigation};
    /*jobHunterDetail*/
    this.props.navigation.navigate('jobHunterDetail', {item});
    /*进入栈中名字为jobHunterDetail的screen*/
    // this.props.navigation.navigate('jobDetail', params);
  }
  earnPresentSingleJobTypeJobHunter(jobType) {
    let url = axiosUtil.axiosUrl;
    console.log('获取当前工作类型的所有值' + jobType);
   axios.post(url + 'recruiter/earnSingleJobTypeJobHunter', {jobType}, {
     headers: {
       'Authorization': 'Bearer ' + UserStore.userToken
     }
   }).then((res) => {
     console.log(res);
     if(res.data.code === 200) {
       this.setState({
         allJobHunterData: res.data.data
       })
     }
   }).catch((err) => {
     console.log(err);
   })
  }
  
  componentWillMount() {
    console.log('aaaa');
    console.log(UserStore.allPublishJobType[this.state.publishJobValue].value);
    let presentJobValue = UserStore.allPublishJobType[this.state.publishJobValue].key;
    this.earnPresentSingleJobTypeJobHunter(presentJobValue);
    this.setState({
      publishJobArr: UserStore.allPublishJobType
    })
  }
  
  render() {
    const {navigation} = this.props;
    return (
        <Provider>
          <View style={styles.alljobHunter_box}>
            {/*header start*/}
            <Flex direction="row" justify="between" align="center" style={styles.header}>
              <Flex style={styles.allJobHunter_box_header_jobs} onPress={this.choosePublishJob.bind(this)}>
                <List>
                  <Picker
                      title="选择自己所发布的岗位类型"
                      data={UserStore.allPublishJobType}
                      cols={1}
                      value={this.state.publishJobValue}
                      onChange={v => {
                       
                        this.setState({publishJobValue: v}, () => {
                          this.earnPresentSingleJobTypeJobHunter(UserStore.allPublishJobType[this.state.publishJobValue].key);
                        })
                      }}
                      onOk={v => this.setState({publishJobValue: v})}
                  >
                   <Flex justify="center"  style={styles.alljobHunter_box_header_picker}>
                    <Text style={styles.header_text}>
                      {UserStore.allPublishJobType[this.state.publishJobValue].label}
                    </Text>
                    <IconOutline name="right"  color="white"/>
                  </Flex>
                  </Picker>
                </List>
              </Flex>
  
              <View>
                <Flex>
                  <Text onPress={this.manageJobIntention.bind(this)} style={styles.header_text}>+</Text>
                  <Text style={[styles.header_segment_line, styles.header_text]}>|</Text>
                  <IconOutline name="search" style={[styles.header_text, styles.header_search_icon]} color="white"/>
                  {/*<Text style={styles.header_text}></Text>*/}
                </Flex>
              </View>
            </Flex>
            {/*header end*/}
            
            
            {/*picker start*/}
            <View>
              <List style={styles.alljobHunter_box_plcker_list}>
                {/*<Flex style={{paddingRight:20, width: deviceW}}>*/}
                <Flex justify="between">
                  <Flex.Item>
                    <Picker data={this.state.reccomendData}
                            cols={1}
                            extra="1"
                            value={this.state.reccomendValue}
                            onChange={this.onChange1}>
                      <Flex justify="center"  style={styles.header_picker}>
                        <Text>
                          {this.state.reccomendData[this.state.reccomendValue].label}
                        </Text>
                        <IconOutline name="down"  color="#818182"/>
                      </Flex>
                      
                      
                      {/*<List.Item  wrap onPress={this.onPress} key="recommend" align="middle"*/}
                      {/*style={styles.header_picker}>*/}
                      {/*推荐*/}
                      {/*</List.Item>*/}
                    </Picker>
                  </Flex.Item>
                  
                  <Flex.Item>
                    <Picker data={this.state.cityData}
                            cols={1}
                            value={this.state.cityValue}
                            onChange={this.onChange2}>
                      <Flex justify="center" style={styles.header_picker}>
                        <Text>
                          {this.state.cityData[this.state.cityValue].label}
                        </Text>
                        <IconOutline name="down"  color="#818182"/>
                      </Flex>
                    </Picker>
                  </Flex.Item>
                  <Flex.Item>
                    <Picker data={this.state.cityData}
                            cols={1}
                            value={this.state.cityValue}
                            onChange={this.onChange2}>
                      <Flex justify="center" style={styles.header_picker}>
                        <Text >
                          推荐
                        </Text>
                        <IconOutline name="down"  color="#818182"/>
                      </Flex>
                    </Picker>
                  </Flex.Item>
                </Flex>
              </List>
            
            </View>
            
            
            {/*picker end*/}
            
            
            {/*牛人推荐列表liststart*/}
            <View style={styles.job_list}>
              
              <FlatList
                  data={this.state.allJobHunterData}
                  renderItem={({item}) => (
                      <TouchableOpacity onPress={this.intoJobHunterDetail.bind(this, item)}>
                        <JobHunterItemComp item={item}/>
                      </TouchableOpacity>
                  )}
                  keyExtractor={this._keyExtractor}
              />
            </View>
            {/*牛人推荐列表listend*/}
            {/*<View>*/}
            {/*</View>*/}
          </View>
        </Provider>
    )
  }
}

const styles = StyleSheet.create({
  alljobHunter_box: {
    backgroundColor: '#f6f6f8',
    height: deviceH,
  },
  header: {
    backgroundColor: '#5dd5c8',
    height: 60,
    width: deviceW,
    paddingLeft: 20,
    paddingRight: 20,
    
  },
  allJobHunter_box_header_jobs: {
    width: deviceW* 0.3,
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  alljobHunter_box_header_picker: {
  backgroundColor: '#5dd5c8',
    width: deviceW*0.4
  },
  header_text: {
    fontSize: 16,
    color: 'white',
    marginRight: 15,
  },
  publishJob_item: {
    fontSize: 18,
    color: 'white',
    marginRight: 15,
  },
  header_search_icon: {
    marginTop: 3,
  },
  header_segment_line: {
    marginLeft: 10,
    marginRight: 10,
  },
  alljobHunter_box_plcker_list: {
    borderColor: '#f6f6f8',
    borderWidth: 1,
    borderStyle: 'solid'
  },
  header_picker: {
    borderRightColor: '#f6f6f8',
    borderRightWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingVertical: 10,
    // width: 140,
    // right: 20,
  },
  header_picker2: {
    // right: 85,
  },
  
  
  /*工作岗位列表*/
  job_list: {
    marginBottom: 210,
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  job_item: {
    height: 100,
  }
});
export default allJobHunter;