/**
 * Created by admin-pc on 2019/3/28.
 */
import React, {Component} from 'react'
import {StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {Button, Flex, WhiteSpace, WingBlank, Picker, List, Provider } from '@ant-design/react-native';
import { IconFill, IconOutline } from "@ant-design/icons-react-native";

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class allJobs extends Component {
  static navigationOptions = {
    title: 'alljobs',
  };
  constructor(props) {
    super(props);
    
  };
  intoJobDetail() {
    console.log('点击进入jobdetail按钮');
    this.props.navigation.navigate('jobDetail');
  }
  render() {
    const { navigation } = this.props;
    return (
        <View style={styles.alljob_box}>
            <Flex direction="row" justify="between" align="center" style={styles.header}>
            <Text style={styles.header_text}> web前端</Text>
              <View style={styles.header_right}>
                <Flex>
                <Text style={styles.header_text}>+</Text>
                  <Text style={[styles.header_segment_line, styles.header_text]}>|</Text>
                  <IconOutline name="search" style={styles.header_text} color="white"/>
                {/*<Text style={styles.header_text}></Text>*/}
                
                </Flex>
              </View>
            </Flex>
          <View>
            <Button onPress={this.intoJobDetail.bind(this)} color="#941584">进入详情界面测试</Button>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  alljob_box: {
    backgroundColor: '#f6f6f8',
  },
  header:{
    backgroundColor: '#5dd5c8',
    height: 60,
    width: deviceW,
    paddingLeft: 20,
    paddingRight: 20,
    
  },
  header_text: {
    fontSize: 16,
    color: 'white',
  },
  header_segment_line: {
    marginLeft: 10,
    marginRight: 10,
  }
});
export default allJobs;