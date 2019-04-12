/**
 * Created by admin-pc on 2019/4/12.
 */
import React, {Component} from 'react'
import {StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, ScrollView} from 'react-native'
import axios from 'axios'
import {Button, Flex, WhiteSpace, WingBlank, Picker, List, Provider, Modal} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class headerComp extends Component{
  constructor(props){
    super(props);
    this.state = {
    
    };
  };
  backView() {
    console.log('选择工作类型点击返回按钮');
    this.props.navigation.navigate('editJobIntention');
  }
  render() {
    return (
        <View style={styles.comp_header}>
            <Flex justify="between"  style={styles.edit_job_intention_header}>
              <IconOutline name="left" style={styles.back_icon} onPress={this.backView.bind(this)}/>
              <Text style={styles.comp_header_title}>选择职位类型</Text>
              <Text></Text>
          </Flex>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  comp_header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderColor: 'red',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  comp_header_title: {
    color: 'black',
    fontSize: 16,
  }
});

export default headerComp;