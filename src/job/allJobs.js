/**
 * Created by admin-pc on 2019/3/28.
 */
import React, {Component} from 'react'
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, FlatList
} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {Button, Flex, WhiteSpace, WingBlank, Picker, ListView, List, Provider} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import {district} from 'antd-mobile-demo-data';
import JobItemComp from './../component/JobItemComp'
const data = require('@bang88/china-city-data');
const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;


class allJobs extends Component {
  static navigationOptions = {
    title: 'alljobs',
  };
  /*_keyExtractor用来设置列表的key值，不设置会有警告提示*/
  _keyExtractor = (item, index) => item.id;
  
  constructor(props) {
    super(props);
    this.JobItemComp = JobItemComp.bind(this);
    this.state = {
      data: [],
      value: [],
      
      reccomendData: [{value: 0, label: '推荐'}, {value: 1, label: '最新'}],
      reccomendValue: [0],
      cityData: [{value: 0, label: '长沙'}, {value: 1, label: '岳麓区'}, {value: 2, label: '雨花区'}, {
        value: 3, label: '芙蓉区'
      }, {value: 4, label: '开福区'}, {value: 5, label: '天心区'}],
      cityValue: [0],
      alljobData: [{key: 'a', id: '0'}, {key: 'b', id: '1'}, {key: 'c', id: '2'}, {key: 'd', id: '3'}, {key: 'e', id: '4'}, {key: 'f', id: '5'}]
    };
    this.onChange1 = reccomendValue => {
      this.setState({reccomendValue});
    };
    this.onChange2 = cityValue => {
      this.setState({cityValue});
      console.log(cityValue);
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
  manageJobIntention(){
    console.log('点击主页右侧‘+’icon进入‘管理求职意向界面’');
    this.props.navigation.navigate('manageJobIntention');
  }
  
  intoJobDetail() {
    console.log('点击进入jobdetail按钮');
    let params = {params: this.props.navigation};
    /*进入名字为jobdetail的栈*/
    this.props.navigation.navigate('jobDetail', params);
    /*进入栈中名字为jobdetail的screen*/
    this.props.navigation.navigate('jobDetail', params);
  }
  
 
  
  render() {
    const {navigation} = this.props;
    return (
        <Provider>
          <View style={styles.alljob_box}>
            {/*header start*/}
            <Flex direction="row" justify="between" align="center" style={styles.header}>
              <Text style={styles.header_text}> web前端</Text>
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
              <List style={styles.alljob_box_plcker_list}>
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
                        <IconOutline name="right"  color="black"/>
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
                        <IconOutline name="right"  color="black"/>
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
                        <IconOutline name="right"  color="black"/>
                      </Flex>
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
                  renderItem={({item}) => (
                      <TouchableOpacity onPress={this.intoJobDetail.bind(this)}>
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