/**
 * Created by admin-pc on 2019/4/9.
 */
import React, {Component} from 'react'
import {StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {Button, Flex, WhiteSpace, WingBlank, Picker, List, Provider} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class JobDetaiHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    }
  }
  backView() {
    this.props.navigation.navigate('Main');
  }
  render() {
    console.log(this.props);
    // const {navigation} = this.props;
    // const params = navigation.getParam('params');
    // console.log(params);
    return (
        <View style={styles.job_detail_header}>
          <Flex>
          <IconOutline name="left" style={styles.back_icon}  onPress={this.backView.bind(this)} />
          <Text>123456</Text>
          </Flex>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  job_detail_header: {
    padding: 20,
    borderColor: 'red',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  back_icon: {
    fontSize: 24,
    color: 'black',
  }
});

export default JobDetaiHeader