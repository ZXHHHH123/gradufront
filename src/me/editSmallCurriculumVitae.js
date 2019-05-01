/**
 * Created by admin-pc on 2019/5/1.
 */
import React, {Component} from 'react'
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, FlatList,
  ScrollView
} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {Button, Flex, WhiteSpace, WingBlank, Picker, ListView, List, Provider} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import HeaderComp from './../../util/headerComp'


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class editSmallCurriculumVitae extends Component {
  constructor(props){
    super(props);
    this.state = {
    
    }
  };
  editBasicInfo() {
    console.log('编写个人基本信息');
    this.props.navigation.navigate('editBasicInfo');
  }
  render() {
    const {navigation} = this.props;
    return (
        <View style={styles.editSmallCurriculumViate_box}>
          <HeaderComp navigation={navigation} title="我的简历" routeName="personCenter" rightText="预览"/>
          
          <Flex justify="between" style={styles.editSmallCurriculumViate_box_person_info} onPress={this.editBasicInfo.bind(this)}>
            <View>
             <Text style={styles.editSmallCurriculumViate_box_person_name}>求职者姓名<IconOutline name="edit" style={{fontSize: 16}}/></Text>
              <Text style={styles.editSmallCurriculumViate_box_person_basic_account}>1年以内.22岁.本科</Text>
            </View>
            <Image style={styles.editSmallCurriculumViate_box_person_titimg} source={require('./../image/userPhoto.jpg')}/>
          </Flex>
          
        </View>
    )
  }
}

const styles = StyleSheet.create({
  editSmallCurriculumViate_box: {
  
  },
  editSmallCurriculumViate_box_person_info: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderColor: 'red',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  editSmallCurriculumViate_box_person_name: {
    fontSize: 24,
    color: 'black',
    
  },
  editSmallCurriculumViate_box_person_basic_account: {
    marginTop: 10,
    fontSize: 14,
    color: '#f6f6f8'
  },
  editSmallCurriculumViate_box_person_titimg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  }
});

export default editSmallCurriculumVitae;
