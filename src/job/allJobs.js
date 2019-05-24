/**
 * Created by admin-pc on 2019/3/28.
 */
import React, {Component} from 'react'
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, FlatList
} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {Button, Flex, WhiteSpace, WingBlank, Picker, ListView, List, Provider, Modal} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import {district} from 'antd-mobile-demo-data';
import JobItemComp from './../component/JobItemComp'
const data = require('@bang88/china-city-data');
const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;
import UserStore from './../../mobx/userStore'
import chooseCompanyData from './../../util/chooseCompanyData'
import chooseJobRequireData from './../../util/chooseJobRequireData'


class allJobs extends Component {
  static navigationOptions = {
    title: 'alljobs',
  };
  /*_keyExtractor用来设置列表的key值，不设置会有警告提示*/
  _keyExtractor = (item, index) => item._id;
  
  constructor(props) {
    super(props);
    this.JobItemComp = JobItemComp.bind(this);
    this.state = {
      data: [],
      value: [],
      refreshing: true,
      chooseCompanyLabel: [ '人员规模', '不限' ],
      chooseRequireLabel: [],
      reccomendData: [{value: 0, label: '推荐'}, {value: 1, label: '最新'}],
      requireValue: [0],
      cityData: [{value: 0, label: '长沙'}, {value: 1, label: '北京'}, {value: 2, label: '上海'}, {
        value: 3, label: '广州'
      }, {value: 4, label: '深圳'}, {value: 5, label: '杭州'}],
      cityValue: [0],
      alljobData: [],
      companyValue: [],
    };
    this.onChange1 = requireValue => {
      this.setState({requireValue}, () => {
        this.changeChooseComapny(this.state.requireValue, 'require');
      });
    };
    this.onChange2 = cityValue => {
      this.setState({cityValue}, () => {
        console.log('aaaaaaaaaa');
        console.log(this.state.cityValue);
        this.earnRecommendJob()
      });
    };
    
    this.onChange3 = companyValue => {
      this.setState({companyValue}, () => {
        this.changeChooseComapny(this.state.companyValue, 'company');
      });
      console.log(companyValue);
    };
    this.onPress = () => {
      console.log(this.state.reccomendData);
      // setTimeout(() => {
      //   console.log(district);
      //   this.setState({
      //     data: district,
      //   });
      // }, 500);
    };
  };
  
  /*点击主页右侧‘+’icon进入‘管理求职意向界面’*/
  manageJobIntention() {
    console.log('点击主页右侧‘+’icon进入‘管理求职意向界面’');
    this.props.navigation.navigate('manageJobIntention');
  }
  
  intoJobDetail(item) {
    console.log('点击进入jobdetail按钮');
    console.log(item);
    let params = {params: this.props.navigation};
    UserStore.changeJobDetailItem(item);
    /*进入名字为jobdetail的栈*/
    this.props.navigation.navigate('jobDetail', params);
    /*进入栈中名字为jobdetail的screen*/
    // this.props.navigation.navigate('jobDetail', params);
  }
  
  changeChooseComapny(v, type) {
    console.log('aaaaabbbbbbb');
    console.log(v);
    console.log(7890)
    console.log(type);
    let chooseData;
    if (type === 'require') {
      chooseData = chooseJobRequireData.data.requireTypeList
    } else if (type === 'company') {
      chooseData = chooseCompanyData.data.companyTypeList
    }
    if (v.length > 0) {
      let index = v[0].substring(0, 1);
      console.log(index);
      // this.state.pickerRequirements[index] = {v};
      let label1 = chooseData[index - 1].label;
      chooseData[index - 1].children.forEach((item, index1) => {
        console.log(item.value);
        let label2;
        if (item.value === v[1]) {
          label2 = item.label;
          let typeArr = [label1, label2];
          if (type === 'require') {
            console.log('~~~~~~~');
            console.log(typeArr);
            this.setState({
              chooseRequireLabel: typeArr
            }, () => {
              this.earnRecommendJob()
            })
          } else if (type === 'company') {
            console.log('!!!!!!!!');
            console.log(typeArr);
            this.setState({
              chooseCompanyLabel: typeArr
            }, () => {
              this.earnRecommendJob()
            })
          }
          
        }
        
      });
      console.log(this.state.pickerRequirements);
    }
  }
  
  earnRecommendJob() {
    console.log('获得推荐的工作信息');
    console.log(this.state.chooseCompanyLabel);
    let chooseType = {
      city: this.state.cityData[this.state.cityValue].label,
      company: this.state.chooseCompanyLabel,
      require: this.state.chooseRequireLabel,
    };
    console.log(chooseType);
    let url = axiosUtil.axiosUrl;
    axios.post(url + 'jobhunter/earnRecommendJob', chooseType, {
      headers: {
        'Authorization': 'Bearer ' + UserStore.userToken
      }
    }).then((res) => {
      console.log('abccccccccc');
      console.log(res.data.data);
      if (res.data.code === 200) {
        this.setState({
          alljobData: res.data.data,
          refreshing: false,
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  
  showSearchModal(type) {
    Modal.prompt(
        '搜索职位',
        '职位名称',
        jobvalue => this.searchType(jobvalue, type),
        'default',
        null,
        ['please input jobname']
    );
  }
  
  searchType(value, type) {
    console.log(type);
    console.log(`jobValue: ${value}`);
    let url = axiosUtil.axiosUrl;
    if(!value) {
      this.earnRecommendJob();
      return
    }
    axios.post(url + 'jobhunter/searchJoborCompany', {value, type} , {
      headers: {
        'Authorization': 'Bearer ' + UserStore.userToken
      }
    }).then((res) => {
      if(res.data.code === 200) {
        console.log(res);
        if(type === 'job') {
          this.setState({
            alljobData: res.data.data,
          })
        }
      }
    }).catch((err) => {
      console.log(err);
    })

    
    
  }
  
  
  componentWillMount() {
    this.earnRecommendJob();
  }
  
  render() {
    const {navigation} = this.props;
    return (
        <Provider>
          <View style={styles.alljob_box}>
            {/*header start*/}
            <Flex direction="row" justify="between" align="center" style={styles.header}>
              <Text style={styles.header_text}> {UserStore.expectJobLabel}</Text>
              <View>
                <Flex>
                  <Text onPress={this.manageJobIntention.bind(this)} style={styles.header_text}>+</Text>
                  <Text style={[styles.header_segment_line, styles.header_text]}>|</Text>
                  <IconOutline name="search" style={[styles.header_text, styles.header_search_icon]} color="white" onPress={this.showSearchModal.bind(this, 'job')}/>
                  {/*<Text style={styles.header_text}></Text>*/}
                </Flex>
              </View>
            </Flex>
            {/*header end*/}
            
            
            {/*picker start*/}
            <View>
              <List style={styles.alljob_box_plcker_list}>
                {/*<Flex style={{paddingRight:20, width: deviceW}}>*/}
                <Flex justify="between">
                 
                  
                  <Flex.Item>
                    <Picker data={this.state.cityData}
                            cols={1}
                            value={this.state.cityValue}
                            onChange={this.onChange2}>
                      <Flex justify="center" style={styles.header_picker}>
                        <Text>
                          {this.state.cityData[this.state.cityValue].label}
                        </Text>
                        <IconOutline name="down" color="#818182"/>
                      </Flex>
                    </Picker>
                  </Flex.Item>
                  <Flex.Item>
                    <Picker data={chooseCompanyData.data.companyTypeList}
                            cols={2}
                            value={this.state.companyValue}
                            onChange={this.onChange3}>
                      <Flex justify="center" style={styles.header_picker}>
                        <Text >
                          公司
                        </Text>
                        <IconOutline name="down" color="#818182"/>
                      </Flex>
                    </Picker>
                  </Flex.Item>
                  <Flex.Item>
                    <Picker data={chooseJobRequireData.data.requireTypeList}
                            cols={2}
                            extra="1"
                            value={this.state.requireValue}
                            onChange={this.onChange1}>
                      <Flex justify="center" style={styles.header_picker}>
                        <Text>
                          要求
                        </Text>
                        <IconOutline name="down" color="#818182"/>
                      </Flex>
      
      
                      {/*<List.Item  wrap onPress={this.onPress} key="recommend" align="middle"*/}
                      {/*style={styles.header_picker}>*/}
                      {/*推荐*/}
                      {/*</List.Item>*/}
                    </Picker>
                  </Flex.Item>
                </Flex>
              </List>
            
            </View>
            
            
            {/*picker end*/}
            
            
            {/*工作岗位列表liststart*/}
            <View style={styles.job_list}>
              
              <FlatList
                  data={this.state.alljobData}
              onRefresh={() => this.earnRecommendJob()}
                  refreshing={this.state.refreshing}
                  renderItem={({item}) => (
                      <TouchableOpacity onPress={this.intoJobDetail.bind(this, item)}>
                        <JobItemComp item={item}/>
                      </TouchableOpacity>
                  )}
                  keyExtractor={this._keyExtractor}
                  // onEndReached={this._fetchMoreData.bind(this)}
                  // onEndReachedThreshold={1}
                  // ListHeaderComponent={this._renderHeader.bind(this)}
                  // ListFooterComponent={this._renderFooter.bind(this)}
                  // renderItem=JobItemComp
              />
              
              {/*<TouchableHighlight onPress={this.intoJobDetail.bind(this)}>*/}
              {/*<JobItemComp style={styles.job_item}>*/}
              
              {/*</JobItemComp>*/}
              {/*</TouchableHighlight>*/}
            </View>
            {/*工作岗位列表listend*/}
            {/*<View>*/}
            {/*<Button onPress={this.intoJobDetail.bind(this)} color="#941584">进入详情界面测试</Button>*/}
            {/*</View>*/}
          </View>
        </Provider>
    )
  }
}

const styles = StyleSheet.create({
  alljob_box: {
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
  header_text: {
    fontSize: 16,
    color: 'white',
  },
  header_search_icon: {
    marginTop: 3,
  },
  header_segment_line: {
    marginLeft: 10,
    marginRight: 10,
  },
  alljob_box_plcker_list: {
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
export default allJobs;