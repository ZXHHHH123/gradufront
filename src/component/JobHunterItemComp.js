/**
 * Created by admin-pc on 2019/4/29.
 */
import React, {Component} from 'react'
import {StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {Button, Flex, WhiteSpace, WingBlank, Picker, List, Provider} from '@ant-design/react-native';
import {changeSubYear, changeStudyBackground} from './../../util/baseFunction'


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class JobHunterItemComp extends Component {
  constructor(props){
    super(props);
    this.state = {
      // item: {},
      jobName: '',
      moneySpace: '',
      companyName: '',
      companyAddress: '',
    }
  }
  render() {
    let itemData = this.props.item;
    console.log('aaavvvvvvvvvv');
    console.log(itemData.personAccount);
    return (
        <View style={styles.jobHunterItem_box}>
          <View style={styles.jobHunterItem_body}>
            <Flex>
              <Image style={styles.jobHunterItem_box_titimg} source={{uri: itemData.image}}/>
              <View style={{marginLeft: 25}}>
            <Flex justify="between" style={styles.jobHunterItem_header}>
              <Text style={styles.job_name}>{itemData.nickName}</Text>
              <Text style={styles.job_money}>{changeSubYear(itemData.joinWorkTime)}年{'.' + changeStudyBackground(itemData.studyBackground)}{'.' + itemData.expectFloorMoney}~{itemData.expectUpMoney}</Text>
            </Flex>
            {/*<Flex>*/}
              {/*<Text style={styles.comp_name}>公式名字</Text>*/}
              {/*<Text style={styles.comp_isCooperate}>是否融资</Text>*/}
            {/*</Flex>*/}
              </View>
            </Flex>
            <Flex justify="between" style={styles.jobHunterItem_main}>
              {itemData.expectIndustry.map((item, index) => {
                return (
                    <Text key={index} style={styles.tag_item}>{item}</Text>
                )
              })}
              
              {/*<Text style={styles.tag_item}>节日活动策划</Text>*/}
              {/*<Text style={styles.tag_item}>视频</Text>*/}
            </Flex>
            <View style={styles.jobHunterItem_person_account}>
              <Text numberOfLines={2} style={styles.jobHunterItem_person_account_text}>{itemData.personAccount}</Text>
            </View>
          </View>
        
        </View>
    )
  }
}

const styles = StyleSheet.create({
  jobHunterItem_box: {
    paddingTop: 10,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  jobHunterItem_box_titimg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  jobHunterItem_body: {
    width: deviceW,
    paddingLeft: 30,
    paddingRight: 30,
  },
  jobHunterItem_header: {
  
  },
  job_name: {
    fontSize: 18,
    color: 'black',
  },
  job_money: {
    fontSize: 14,
    color: '#5dd5c8',
    marginLeft: 10
  },
  jobHunterItem_main: {
    width: deviceW*0.4,
    marginTop: 10,
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  jobHunterItem_footer: {
    marginTop: 10
  },
  comp_name: {
    color: 'black',
    fontSize: 14,
    marginRight: 5,
  },
  comp_isCooperate: {
    color: 'black',
    fontSize: 14,
  },
  tag_item: {
    padding: 2,
    backgroundColor: '#f8f9fb',
    borderRadius: 2,
  },
  jobHunterItem_person_account: {
    marginVertical: 10,
    
  },
  jobHunterItem_person_account_text: {
    fontSize: 14,
    color: '#89898a'
  }
  
});
export default JobHunterItemComp;