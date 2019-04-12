/**
 * Created by admin-pc on 2019/4/12.
 */
import React, {Component} from 'react'
import {StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, ScrollView} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {Button, Flex, WhiteSpace, WingBlank, Picker, List, Provider, Modal} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;


class EditJobIntention extends Component{
  constructor(props){
    super(props);
    this.state = {
    
    };
  };
  backView() {
    console.log('返回');
    this.props.navigation.navigate('manageJobIntention');
  };
  chooseType(type) {
    console.log('进入选择工作岗位界面' + type);
    this.props.navigation.navigate(type);
    
  };
  saveJobIntention(){
    console.log('保存求职意向func');
  }
  render() {
    return (
        <View style={styles.edit_job_intention_box}>
          {/*edit_job_intention_box_header------start*/}
          <View>
            <Flex justify="between"  style={styles.edit_job_intention_header}>
              <IconOutline name="left" style={styles.back_icon} onPress={this.backView.bind(this)}/>
              <Text style={styles.edit_job_intention_header_text_title}>编辑求职意向</Text>
            <Text onPress={this.saveJobIntention.bind(this)} style={styles.edit_job_intention_header_text_save}>保存</Text>
            </Flex>
          </View>
          {/*edit_job_intention_box_header------end*/}
  
  
          {/*edit_job_intention_box_body_choose------start*/}
          <View>
            <Flex justify="between" align="center" style={styles.edit_job_intention_main_item}  onPress={this.chooseType.bind(this, 'jobType')}>
              <View>
                <Text style={styles.edit_job_intention_main_item_key}>期望职位</Text>
                <Text style={styles.edit_job_intention_main_item_value}>web前端</Text>
              </View>
              <IconOutline name="right" style={styles.right_icon}/>

            </Flex>
  
            <Flex justify="between" align="center" style={styles.edit_job_intention_main_item} onPress={this.chooseType.bind(this, 'industryType')}>
              <View>
                <Text style={styles.edit_job_intention_main_item_key}>期望行业</Text>
                <Text style={styles.edit_job_intention_main_item_value}>不限</Text>
              </View>
              <IconOutline name="right" style={styles.right_icon}/>
  
            </Flex>
  
            <Flex justify="between" align="center" style={styles.edit_job_intention_main_item} onPress={this.chooseType.bind(this, 'cityType')}>
              <View>
                <Text style={styles.edit_job_intention_main_item_key}>工作城市</Text>
                <Text style={styles.edit_job_intention_main_item_value}>长沙</Text>
              </View>
              <IconOutline name="right" style={styles.right_icon}/>
  
            </Flex>
  
            <Flex justify="between" align="center" style={styles.edit_job_intention_main_item} onPress={this.chooseType.bind(this, 'salaryStage')}>
              <View>
                <Text style={styles.edit_job_intention_main_item_key}>薪资要求</Text>
                <Text style={styles.edit_job_intention_main_item_value}>5k-8k</Text>
              </View>
              <IconOutline name="right" style={styles.right_icon}/>
  
            </Flex>

          </View>
          {/*edit_job_intention_box_body_choose------end*/}
        </View>
    )
  }
}

const styles = StyleSheet.create({
  edit_job_intention_box: {
    paddingHorizontal: 15,
  },
  edit_job_intention_header: {
    paddingVertical: 15,
    borderBottomColor: '#f6f6f8',
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  edit_job_intention_header_text_title: {
    color: 'black',
    fontSize: 18,
  },
  edit_job_intention_header_text_save: {
    color: 'black',
    fontSize: 16,
  },
  
  
  edit_job_intention_main_item: {
    paddingVertical: 15,
    borderBottomColor: '#f6f6f8',
    borderBottomWidth: 2,
    height: 80,
    borderStyle: 'solid',
  },
  edit_job_intention_main_item_key: {
    fontSize: 14,
  },
  edit_job_intention_main_item_value: {
    fontSize: 18,
    color: 'black',
    marginTop: 10,
  },
  right_icon: {
    color: '#9b9b9c'
  }
});

export default EditJobIntention