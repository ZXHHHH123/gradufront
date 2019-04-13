/**
 * Created by admin-pc on 2019/4/12.
 */
import React, {Component} from 'react'
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, ScrollView
} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {Button, Flex, WhiteSpace, WingBlank, Picker, List, Provider, Modal} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import HeaderComp from './../../util/headerComp'

import {BoxShadow} from 'react-native-shadow'


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class industryType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choosedIndustry: [1],
    };
  };
  
  render() {
    const shadowOpt = {
      width: deviceW, //包裹的子内容多宽这里必须多宽
      height: 14,//同上
      color: "#000",//阴影颜色
      border: 1,//阴影宽度
      opacity: 0.2,//透明度
      x: 0,
      y: 120,
      style: {marginVertical: 5}
    };
    
    const {navigation} = this.props;
    return (
        <View style={styles.industry_type_box}>
          {/*组件头部start*/}
          <HeaderComp navigation={navigation} title="选择行业" rightText="保存"/>
          {/*组件头部end*/}
          
          
          <View style={styles.industry_type_choosed}>
            <Flex justify="between" style={styles.industry_type_header}>
              <Text style={{fontSize: 16, color: 'black',}}>已选行业</Text>
              <Text><Text style={{color: '#5dd5c8'}}>2</Text>/3</Text>
            </Flex>
            
            <View style={styles.industry_type_choosed_items}>
              {
                this.state.choosedIndustry.length === 0 ? <Text>请选择行业，最多三个</Text> : <View>
                  <Flex wrap="wrap">
                    <Flex justify="center" align="center" style={styles.industry_type_choosed_item}>
                      <Text style={{color: '#5dd5c8'}}>span1</Text>
                      <IconOutline name="close" style={{fontSize:16 }} color="#5dd5c8"/>
                    </Flex>
                    <Flex justify="center" align="center" style={styles.industry_type_choosed_item}>
                      <Text style={{color: '#5dd5c8'}}>sfffffffffffffffffffffafdafdafdsafffffffpan1</Text>
                      <IconOutline name="close" style={{fontSize:16 }} color="#5dd5c8"/>
                    </Flex>
                    <Flex justify="center" align="center" style={styles.industry_type_choosed_item}>
                      <Text style={{color: '#5dd5c8'}}>span1</Text>
                      <IconOutline name="close" style={{fontSize:16 }} color="#5dd5c8"/>
                    </Flex>
                  </Flex>
                </View>
              }
            </View>
          </View>
        
        </View>
    )
  }
}

const styles = StyleSheet.create({
  industry_type_box: {},
  industry_type_choosed: {
    height: 130,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    elevation: 5,
    shadowOffset: {width: 0, height: 3},
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 5
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  industry_type_header: {
    marginTop: 15,
  },
  industry_type_choosed_items: {
    marginTop: 20,
  },
  industry_type_choosed_item: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderColor: '#5dd5c8',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  }
});

export default industryType;