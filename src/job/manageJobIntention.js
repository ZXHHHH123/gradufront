/**
 * Created by admin-pc on 2019/4/11.
 */
import React, {Component} from 'react'
import {StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {Button, Flex, WhiteSpace, WingBlank, Picker, List, Provider} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";



const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class ManageJobIntention extends Component{
  constructor(props){
    super(props);
    this.state = {

    };
  };
  backView() {
    this.props.navigation.navigate('Main');
  };
  render() {
    return (
        <View>
          <View style={styles.manage_job_intention_header}>
            <Flex align="center" justify="between">
              <IconOutline name="left" style={styles.back_icon} onPress={this.backView.bind(this)}/>
              <Text style={styles.manage_job_intention_title}>管理求职意向界面</Text>
              <Text></Text>
            </Flex>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  manage_job_intention_header: {
    borderColor: 'red',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  manage_job_intention_title: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  }
  
});

export default ManageJobIntention;