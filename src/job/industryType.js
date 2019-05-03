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
import IndustryBigType from './../../util/industryBigType'
import {observer} from 'mobx-react';
import UserStore from './../../mobx/userStore'


import {BoxShadow} from 'react-native-shadow'


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

@observer
class industryType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choosedIndustry: [],
    };
  };
  
  /*选择当前industryitem*/
  chooseIndustryItem(item) {
    let choosedIndustry = this.state.choosedIndustry;
    if(choosedIndustry.length > 2) {
      ToastAndroid.show('最多可选三个', ToastAndroid.SHORT);
      return;
    }
    let index = choosedIndustry.indexOf(item);
    if(index >= 0) {
      ToastAndroid.show('已选择该行业', ToastAndroid.SHORT);
      return;
    }
    choosedIndustry.push(item);
    this.setState({
      choosedIndustry: choosedIndustry,
    });
  };
  deleteIndustryItem(item){
    console.log(item);
    let choosedIndustry = this.state.choosedIndustry;
    console.log(choosedIndustry);
  
    let index = choosedIndustry.indexOf(item);
    console.log(index);
    choosedIndustry.splice(index, 1);
    this.setState({
      choosedIndustry: choosedIndustry
    })
  };
  saveChoosedIndustry(chooseIndustryData) {
    console.log('点击保存所选择的行业');
    console.log(chooseIndustryData);
    UserStore.changeChooseIndustryData(chooseIndustryData);
  }
  
  componentWillMount() {

  }
  
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
          <HeaderComp navigation={navigation} title="选择行业" routeName="editJobIntention" rightText="保存" method={this.saveChoosedIndustry} data={this.state.choosedIndustry}/>
          {/*组件头部end*/}
          
          
          <View style={styles.industry_type_choosed}>
            <Flex justify="between" style={styles.industry_type_header}>
              <Text style={{fontSize: 16, color: 'black',}}>已选行业</Text>
              <Text><Text style={{color: '#5dd5c8'}}>{this.state.choosedIndustry.length}</Text>/3</Text>
            </Flex>
            
            <View style={styles.industry_type_choosed_items}>
              {
                this.state.choosedIndustry.length === 0 ? <Text>请选择行业，最多三个</Text> : <View>
                  <Flex wrap="wrap">
                    {this.state.choosedIndustry.map((item) => {
                      return (
                          <Flex justify="center" align="center" style={styles.industry_type_choosed_item} onPress={this.deleteIndustryItem.bind(this, item)}>
                            <Text style={{color: '#5dd5c8'}}>{item}</Text>
                            <IconOutline name="close" style={{fontSize: 16}} color="#5dd5c8"/>
                          </Flex>
                      )
                    })}
                   
                  </Flex>
                </View>
              }
            </View>
          </View>
          
          {/*行业类别展示start*/}
          <ScrollView>
            <View style={styles.industry_type_choose_main}>
              {IndustryBigType.data.map((items) => {
                return (
                    <View>
                      <Text style={styles.industry_type_name} key={items.code}>{items.name}</Text>
                      <View>
                        <Flex wrap="wrap">
                          {items.subLevelModelList.map((item, index) => {
                            return (<Text key={index} style={styles.industry_type_item_name} onPress={this.chooseIndustryItem.bind(this, item)}>{item}</Text>)
                          })}
                        </Flex>
                      </View>
                    </View>
                )
              })}
            
            </View>
          </ScrollView>
          {/*行业类别展示end*/}
        
        
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
  },
  industry_type_choose_main: {
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
    paddingHorizontal: 20,
    marginBottom: 200,
  },
  industry_type_name: {
    paddingTop: 20,
    paddingBottom: 10,
    fontSize: 14,
  },
  industry_type_item_name: {
    color: 'black',
    fontSize: 14,
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginRight: 3,
    marginBottom: 3,
    borderColor: '#f6f6f8',
    borderWidth: 1,
    borderStyle: 'solid',
  }
});

export default industryType;