/**
 * Created by admin-pc on 2019/3/29.
 */
import React, {Component} from 'react'
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, FlatList, ScrollView
} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {Button, Flex, WhiteSpace, WingBlank, Picker, ListView, List, Provider} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import CompanyItemComp from './../component/CompanyItemComp'


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class allCompanys extends Component {
  _keyExtractor = (item, index) => item.id;
  constructor(props) {
    super(props);
    this.state = {
      financingValue: [0],
      financingData: [{value: 0, label: '全部'}, {value: 1, label: '未融资'}, {value: 2, label: '天使轮'}, {
        value: 3, label: 'A轮'
      }, {value: 4, label: 'B轮'}, {value: 5, label: 'C轮'}, {value: 6, label: 'D轮及以上'}, {
        value: 7, label: '已上市'
      }, {value: 8, label: '不需要融资'}],
  
      sizeValue: [0],
      sizeData: [{value: 0, label: '全部'}, {value: 1, label: '0-20人'}, {value: 2, label: '20-99人'}, {
        value: 3, label: '100-499人'
      }, {value: 4, label: '500-999人'}, {value: 5, label: '1000-9999人'}, {value: 6, label: '10000人以上'}],
  
      industryValue: [0],
      industryData: [{value: 0, label: '全部'}, {value: 1, label: '电子商务'}, {value: 2, label: '游戏'}, {
        value: 3, label: '媒体'
      }, {value: 4, label: '广告营销'}, {value: 5, label: '数据服务'}, {value: 6, label: '医疗健康'}, {
        value: 7, label: '生活服务'
      }, {value: 8, label: 'O2O'}, {value: 9, label: '旅游'}, {value: 10, label: '分类信息'}, {
        value: 11, label: '音乐/视频/阅读'
      }, {value: 12, label: '在线教育'}, {value: 13, label: '社交网络'}, {value: 14, label: '人力资源服务'}, {
        value: 15, label: '企业服务'
      }, {value: 16, label: '信息安全'}, {value: 17, label: '智能硬件'}, {value: 18, label: '移动互联网'}, {
        value: 19, label: '互联网'
      }, {value: 20, label: '计算机软件'}, {value: 21, label: '通信/网络设备'}, {value: 22, label: '广告/公关/会展'}, {
        value: 23, label: '互联网金融'
      }, {value: 24, label: '物流/仓储'}, {value: 25, label: '贸易/进出口'}, {value: 26, label: '咨询'}, {
        value: 27, label: '工程施工'
      }, {value: 28, label: '汽车生产'}, {value: 29, label: '其他行业'}],
  
      allcompanyData: [{key: 'a', id: '0'}, {key: 'b', id: '1'}, {key: 'c', id: '2'}, {key: 'd', id: '3'}, {
        key: 'e', id: '4'
      }, {key: 'f', id: '5'}, {key: 'g', id: '6'}, {key: 'h', id: '7'}],
    }
    ;
    
    this.onChange1 = financingValue => {
      this.setState({financingValue});
    };
    this.onChange2 = sizeValue => {
      this.setState({sizeValue});
    };
    this.onChange3 = industryValue => {
      this.setState({industryValue});
    };
  }
  
  intoCompanyDetail() {
    console.log(123);
    let params = {params: this.props.navigation};
    // let params = {params: this.props.navigation};
    this.props.navigation.navigate('companyDetail', params);
  }
  
  render() {
    return (
        <Provider>
          <View style={styles.allcompany_box}>
            {/*header start*/}
            <Flex direction="row" justify="between" align="center" style={styles.header}>
              <Text></Text>
              <Text style={styles.header_text}> 公司</Text>
              <IconOutline name="search" style={[styles.header_text, styles.header_search_icon]} color="white"/>
            </Flex>
            {/*header end*/}
            
            
            <View>
              <List style={styles.allcompany_box_plcker_list}>
                {/*<Flex style={{paddingRight:20, width: deviceW}}>*/}
                <Flex justify="between">
                  <Flex.Item>
                    <Picker data={this.state.financingData}
                            cols={1}
                            extra="1"
                            value={this.state.financingValue}
                            onChange={this.onChange1}>
                      <Flex justify="center" wrap="nowrap" style={styles.header_picker}>
                        {this.state.financingValue[0] === 0 ? <Text>融资</Text> : <Text>{this.state.financingData[this.state.financingValue].label}</Text>}
                        <IconOutline name="down" color="#818182"/>
                      </Flex>
                    </Picker>
                  </Flex.Item>
                  
                  <Flex.Item>
                    <Picker data={this.state.sizeData}
                            cols={1}
                            extra="1"
                            value={this.state.sizeValue}
                            onChange={this.onChange2}>
                      <Flex justify="center" wrap="nowrap" style={styles.header_picker}>
                        {this.state.sizeValue[0] === 0 ? <Text>规模</Text> : <Text>{this.state.sizeData[this.state.sizeValue].label}</Text>}
                        <IconOutline name="down" color="#818182"/>
                      </Flex>
                    </Picker>
                  </Flex.Item>
                  
                  <Flex.Item>
                    <Picker data={this.state.industryData}
                            cols={1}
                            extra="1"
                            value={this.state.industryValue}
                            onChange={this.onChange3}>
                      <Flex justify="center" wrap="nowrap" style={styles.header_picker}>
                        {this.state.industryValue[0] === 0 ? <Text>行业</Text> : <Text>{this.state.industryData[this.state.industryValue].label}</Text>}
                        <IconOutline name="down" color="#818182"/>
                      </Flex>
                    </Picker>
                  </Flex.Item>
                
                </Flex>
              </List>
            
            </View>
            
            <View style={styles.company_list}>
  
              <FlatList
                data={this.state.allcompanyData}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={this.intoCompanyDetail.bind(this)}>
                      <CompanyItemComp item={item}/>
                    </TouchableOpacity>
                )}
                keyExtractor={this._keyExtractor}
              />


            </View>
            
          
          </View>
        </Provider>
    )
  }
}

const styles = StyleSheet.create({
  allcompany_box: {
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
  
  header_picker: {
    borderRightColor: '#f6f6f8',
    borderRightWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 10,
    overflow: 'hidden',
    // width: 140,
    // right: 20,
  },
  
  
  company_list: {
    /*避免被底部tab导航栏遮挡*/
    marginBottom: 180,
  }
});
export default allCompanys