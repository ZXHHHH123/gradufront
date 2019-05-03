/**
 * Created by admin-pc on 2019/4/12.
 */
import React, {Component} from 'react'
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, ScrollView, FlatList
} from 'react-native'
import axios from 'axios'
import axiosUtil from './../../config/system'
import {Button, Flex, WhiteSpace, WingBlank, Picker, List, Provider, Modal} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import {observer} from 'mobx-react';
import HeaderComp from './../../util/headerComp'
import JobBigType from './../../util/jobBigType'

import TwoTabOption from './../../util/twoTabOption'
import UserStore from './../../mobx/userStore'



const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

@observer
class jobType extends Component {
  _keyExtractor = (item, index) => item.id.toString();
  
  constructor(props) {
    super(props);
    this.state = {
      BigType1: [],
      oneOptionData: [],
      twoOptionData: [],
      pickerOptionValue: [],
      twoOptionValue: [],
      presentJobType: [],
      testData: [ { value: 150400,
        label: '高级管理职位',
        children:
            [ { value: 150407,
              label: 'CEO/总裁/总经理',
              children: null,
              firstChar: null,
              pinyin: null,
              rank: 0 },
              { value: 150408,
                label: '副总裁/副总经理',
                children: null,
                firstChar: null,
                pinyin: null,
                rank: 0 },
              { value: 150409,
                label: '事业部负责人',
                children: null,
                firstChar: null,
                pinyin: null,
                rank: 0 },
              { value: 150410,
                label: '区域/分公司/代表处负责人',
                children: null,
                firstChar: null,
                pinyin: null,
                rank: 0 },
              { value: 150411,
                label: '总裁/总经理/董事长助理',
                children: null,
                firstChar: null,
                pinyin: null,
                rank: 0 },
              { value: 150412,
                label: '合伙人',
                children: null,
                firstChar: null,
                pinyin: null,
                rank: 0 },
              { value: 150413,
                label: '创始人',
                children: null,
                firstChar: null,
                pinyin: null,
                rank: 0 },
              { value: 150414,
                label: '董事会秘书',
                children: null,
                firstChar: null,
                pinyin: null,
                rank: 0 } ],
        firstChar: null,
        pinyin: null,
        rank: 0 } ]
  
    }
  };
  
  intoDetailJobChoose(item, index) {
    // console.log('点击详细的工作按钮');
    // console.log(index);
    // console.log(item);
    // for (let i in JobBigType.data){
    //   if(JobBigType.data[i].value === item.id) {
    //     UserStore.changeOneOptionData(JobBigType.data[i].children);
    //     // this.setState({
    //     //   oneOptionData: JobBigType.data[i].children,
    //     // }, () =>{
    //     //   console.log('打印oneoptiondata');
    //     //   console.log(this.state.oneOptionData);
    //     // })
    //   }
    // }
    // UserStore.changeIsShowTabOptionMask(true);
    
  };
  
  eartJobBigType() {
    console.log('获取数据');
    let BigType = [];
    for (let i in JobBigType.data) {
      BigType.push({id: Number(JobBigType.data[i].value), value: JobBigType.data[i].label});
    }
    this.setState({
      BigType1: BigType
    }, () => {
      // console.log(this.state.BigType1)
    })
    // axios.get('https://www.zhipin.com/common/data/position.json').then(res => {
    //   console.log(res);
    // }).catch(err => {
    //   console.log(err);
    // });
  };
  chooseJobType() {
  
  }
  changeChooseJob(v, index, routeName) {
    console.log(v);
    let BigJobData = JobBigType.data[index].children;
    BigJobData.forEach((item, index) => {
      if(item.value === v[0]) {
        item.children.forEach((item1, index1) =>{
          if(item1.value === v[1]) {
            console.log(item1);
            if(this.props.navigation.state.params.publishJob) {
              UserStore.changeBossPublishChooseJob(item1.label, item1.value);
            }else {
              UserStore.changeChooseJob(item1.label, item1.value);
            }
            ToastAndroid.show('选择成功', ToastAndroid.SHORT);
            this.props.navigation.navigate(this.props.navigation.state.params.routeName);
          }
        })
      }
    })
  }
  changeOption(jobBigTypeData) {
    jobBigTypeData.map((items) => {
    
    })
  }
  
  componentWillMount() {
    this.eartJobBigType()
  }
  
  render() {
    const {navigation} = this.props;
    let jobBigTypeData = [];
    JobBigType.data.forEach((item, index) =>{
      if(item.children) {
        item.children.forEach((item1, index1) => {
          jobBigTypeData.push(item1);
        })
      }
    });
    console.log('打印jobBigTypeData========');
    // for(let i =0; i<10;i++) {
    //   console.log(jobBigTypeData[i]);
    // }
    return (
        <Provider>
        <View style={styles.job_type_box}>
          {/*组件头部start*/}
          <HeaderComp navigation={navigation} title="选择职位类型" routeName={this.props.navigation.state.params.routeName}/>
          {/*组件头部end*/}
  
          {
            // UserStore.isShowTabOptionMask ? <TwoTabOption /> : <Text></Text>
          }
          {/*职位大类型start*/}
          {/*todo 需要改用flatlist*/}
          <ScrollView>
            <View style={styles.job_type_items_box}>
              <FlatList
                data={this.state.BigType1}
                keyExtractor={this._keyExtractor}
                renderItem={
                  ({item, index}) => (
                      <Picker
                          title="选择具体职位"
                          data={JobBigType.data[index].children}
                          cols={2}
                          value={this.state.pickerOptionValue}
                           onChange={v => {
                             console.log(v);
                            this.setState({pickerOptionValue: v}, () => {
                               this.changeChooseJob(this.state.pickerOptionValue, index);
                            })
                           }}
                           onOk={v => this.setState({pickerCityValue: v})}
                      >
                      <Flex justify="between" style={styles.job_type_list_item}
                            onPress={this.intoDetailJobChoose.bind(this, item, index)}>
                        <Text style={styles.job_type_list_item_name}>{item.value}</Text>
                        <IconOutline name="right" style={styles.job_type_list_item_right}/>
                      </Flex>
                      </Picker>
                  )
                }
            />
  
              
              {/*<List>*/}
                {/*<Picker*/}
                    {/*title="选择具体职位"*/}
                    {/*data={this.state.testData}*/}
                    {/*cols={2}*/}
                    {/*value={this.state.oneOptionData}*/}
                    {/*// onChange={v => {*/}
                    {/*//   console.log(v);*/}
                    {/*//   this.setState({pickerCityValue: v}, () => {*/}
                    {/*//     this.changeOption(jobBigTypeData);*/}
                    {/*//   })*/}
                    {/*// }}*/}
                    {/*// onOk={v => this.setState({pickerCityValue: v})}*/}
                {/*>*/}
                  {/*<Flex justify="between" align="center" style={styles.edit_job_intention_main_item}*/}
                        {/*onPress={this.chooseJobType.bind(this, 'cityType')}>*/}
                    {/*<Text>aaaaaaaaaaaaaaa</Text>*/}
                    {/*<IconOutline name="right" style={styles.right_icon}/>*/}
              
                  {/*</Flex>*/}
              
                {/*</Picker>*/}
              {/*</List>*/}

            </View>
          </ScrollView>
          
          {/*职位大类型end*/}
        </View>
        </Provider>
    )
  }
}

const styles = StyleSheet.create({
  job_type_box: {},
  job_type_items_box: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  job_type_list_item: {
    paddingVertical: 15,
    borderBottomColor: '#f6f6f8',
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  job_type_list_item_name: {
    color: '#818182'
  },
  job_type_list_item_right: {
    color: '#9b9b9c'
  }
});

export default jobType;