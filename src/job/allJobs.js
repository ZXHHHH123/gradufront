/**
 * Created by admin-pc on 2019/3/28.
 */
import React, {Component} from 'react'
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight
} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {Button, Flex, WhiteSpace, WingBlank, Picker, List, Provider} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import {district} from 'antd-mobile-demo-data';
const data = require('@bang88/china-city-data');
const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class allJobs extends Component {
  static navigationOptions = {
    title: 'alljobs',
  };
  
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: [],
      
      reccomendData: [{value: 0, label: '推荐'}, {value: 1, label: '最新'}],
      reccomendValue: [0],
      cityData: [{value: 0, label: '长沙'}, {value: 1, label: '岳麓区'}, {value: 2, label: '雨花区'}, {
        value: 3, label: '芙蓉区'
      }, {value: 4, label: '开福区'}, {value: 5, label: '天心区'}],
      cityValue: [0],
    };
    this.onChange1 = reccomendValue => {
      this.setState({reccomendValue});
      console.log(reccomendValue);
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
  
  intoJobDetail() {
    console.log('点击进入jobdetail按钮');
    this.props.navigation.navigate('jobDetail');
  }
  
  render() {
    const {navigation} = this.props;
    return (
        <Provider>
          <View style={styles.alljob_box}>
            {/*header start*/}
            <Flex direction="row" justify="between" align="center" style={styles.header}>
              <Text style={styles.header_text}> web前端</Text>
              <View style={styles.header_right}>
                <Flex>
                  <Text style={styles.header_text}>+</Text>
                  <Text style={[styles.header_segment_line, styles.header_text]}>|</Text>
                  <IconOutline name="search" style={[styles.header_text, styles.header_search_icon]} color="white"/>
                  {/*<Text style={styles.header_text}></Text>*/}
                </Flex>
              </View>
            </Flex>
            {/*header end*/}
            {/*picker start*/}
            
            <View>
              <List >
                <Flex style={{paddingRight:20, width: deviceW}}>
                  <Flex.Item>
                    <Picker data={this.state.reccomendData}
                            cols={1}
                            value={this.state.reccomendValue}
                            onChange={this.onChange1}>
                      <List.Item arrow="down" wrap onPress={this.onPress} key="recommend" align="middle"
                                 style={styles.header_picker}>
                        {/*推荐*/}
                      </List.Item>
                    </Picker>
                  </Flex.Item>
                  
                  <Flex.Item>
                    <Picker data={this.state.cityData}
                            cols={1}
                            value={this.state.cityValue}
                            onChange={this.onChange2}>
                      <List.Item arrow="down" wrap onPress={this.onPress} key="city"
                                 style={[styles.header_picker, styles.header_picker2]}>
                      
                      </List.Item>
                    </Picker>
                  </Flex.Item>
  
                  <Flex.Item>
                  <Picker data={this.state.cityData}
                          cols={1}
                          value={this.state.cityValue}
                          onChange={this.onChange2}>
                    <List.Item arrow="down" wrap onPress={this.onPress} key="city"
                               style={[styles.header_picker, styles.header_picker2]}>
    
                    </List.Item>
                  </Picker>
                </Flex.Item>
  
                </Flex>
              </List>
            
            </View>
            
            
            {/*picker end*/}
            
            <View>
              <Button onPress={this.intoJobDetail.bind(this)} color="#941584">进入详情界面测试</Button>
            </View>
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
  header_picker: {
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    // width: 140,
    // right: 20,
  },
  header_picker2: {
    // right: 85,
  },
});
export default allJobs;