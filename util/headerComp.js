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
    console.log('选择工作类型点击返回按钮' + this.props.routeName);
    // personCenter
    this.props.navigation.navigate(this.props.routeName);
  };
  saveChooseIndustry() {
    console.log('保存所选按钮');
    this.props.method(this.props.data);
    this.props.navigation.navigate(this.props.routeName);
  }
  render() {
    return (
        <View style={styles.comp_header}>
            <Flex justify="between">
              <IconOutline name="left" color="#818182" style={{fontSize: 20}} onPress={this.backView.bind(this)}/>
              <Text style={styles.comp_header_title}>{this.props.title}</Text>
              <Text style={styles.comp_header_text} onPress={this.saveChooseIndustry.bind(this)}>{this.props.rightText}</Text>
          </Flex>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  comp_header: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  comp_header_title: {
    color: 'black',
    fontSize: 18,
  },
  comp_header_text: {
    color: 'black',
    fontSize: 14,
  }
});

export default headerComp;