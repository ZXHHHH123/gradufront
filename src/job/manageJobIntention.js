/**
 * Created by admin-pc on 2019/4/11.
 */
import React, {Component} from 'react'
import {StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, ScrollView} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {Button, Flex, WhiteSpace, WingBlank, Picker, List, Provider, Modal} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";



const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class ManageJobIntention extends Component{
  constructor(props){
    super(props);
    this.state = {
      jobIntentionStatus: 0,
      presentStatus: '',
      statusArray: ['离职-随时到岗', '在职-月内到岗', '在职-考虑机会', '在职-暂不考虑']
    };
    this.fixjobIntentionStatus = (value) => {
      console.log('abcd');
      this.setState({
        jobIntentionStatus: value,
        presentStatus: this.state.statusArray[value]
      }, ()=>{
        console.log(this.state.jobIntentionStatus);
        console.log(this.state.statusArray[1]);
      });
    };
    this.earnJobIntentionStatus = () => {
      //todo 获取当前用户的求职意向状态----》单独写一个接口获取,然后将获取到的value传到      this.fixjobIntentionStatus()方法中。
      this.fixjobIntentionStatus(0);
    };
    this.showModalOperation = () => {
      Modal.operation([
        { text: '离职-随时到岗', onPress: ()=>{this.fixjobIntentionStatus(0)}},
        { text: '在职-月内到岗', onPress: () =>{this.fixjobIntentionStatus(1)} },
        { text: '在职-考虑机会', onPress: () => {this.fixjobIntentionStatus(2)} },
        { text: '在职-暂不考虑', onPress: () => this.fixjobIntentionStatus(3) },
      ]);
    }
  };
  backView() {
    this.props.navigation.navigate('Main');
  };
  editJobIntention() {
    console.log('进入编辑具体工作意向界面');
    this.props.navigation.navigate('editJobIntention');
  };
  componentWillMount() {
    console.log('加载modal-operation');
    this.earnJobIntentionStatus();
  }
  render() {
    return (
        <Provider>
          <ScrollView>
        <View>
          <View style={styles.manage_job_intention_header}>
            <Flex align="center" justify="between">
              <IconOutline name="left" style={styles.back_icon} onPress={this.backView.bind(this)}/>
              <Text style={styles.manage_job_intention_title}>管理求职意向界面</Text>
              <Text></Text>
            </Flex>
          </View>
          
          <View style={styles.manage_job_intention_status}>
            <Flex justify="between">
              <Text style={styles.manage_job_intention_status_text}>求职状态</Text>
              <View>
                <Flex>
                  <Text>{this.state.presentStatus}</Text>
                  <IconOutline name="right" style={styles.manage_job_intention_choose_status} onPress={this.showModalOperation}/>
                </Flex>
              </View>
            </Flex>
          </View>
          
          
          <View >
            <Flex direction="column" justify="between" align="start" style={styles.manage_job_intention_account} onPress={this.editJobIntention.bind(this)}>
              <Text style={styles.manage_job_intention_account_header}>[长沙]web前端</Text>
              <Text>5k-8k不限</Text>
            </Flex>
          </View>
        </View>
          </ScrollView>
        </Provider>
    )
  }
}

const styles = StyleSheet.create({
  manage_job_intention_header: {
    borderColor: 'red',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  manage_job_intention_title: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  
  
  manage_job_intention_status: {
    padding: 12,
    borderColor: '#f6f6f8',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  manage_job_intention_status_text:{
    fontSize: 16,
    color: 'black'
  },
  manage_job_intention_account: {
    height: 70,
    borderBottomColor: '#f6f6f8',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    paddingVertical: 5,
    paddingHorizontal:10
  },
  manage_job_intention_account_header:{
    color: 'black',
    fontSize: 16,
  },
  
});

export default ManageJobIntention;