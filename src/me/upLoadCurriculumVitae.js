/**
 * Created by admin-pc on 2019/5/11.
 */
import React, {Component} from 'react'
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, FlatList,
  ScrollView,
  ImageBackground
} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../../graduFront/config/system'
import {Button, Flex, WhiteSpace, WingBlank, Provider, Modal} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import ComplainItem from './../../util/complainItem.json'
import JobItemComp from "../component/JobItemComp";
import CompanyItemComp from './../component/CompanyItemComp'
import UserStore from './../../mobx/userStore'
import HeaderComp from './../../util/headerComp'
import {changeWorkTime} from './../../util/baseFunction'
import ImagePicker from 'react-native-image-crop-picker';




const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class upLoadCurriculumVitae extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allAttentionCompany: [],
    }
  }
  
  earnAllAttentionCompany() {
    let url = axiosUtil.axiosUrl;
    axios.post(url + 'jobhunter/earnAllAttentionCompany', {}, {
      headers: {
        'Authorization': 'Bearer ' + UserStore.userToken
      }
    }).then((res) => {
      if(res.data.code === 200) {
        this.setState({
          allAttentionCompany: res.data.data,
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  
  

  upLoadCurriculumVitae() {
    console.log('点击上传按钮');
  }
  
  componentWillMount() {
    this.earnAllAttentionCompany();
    this.printPaths();
  }
  render() {
    const {navigation} = this.props;
    return (
        <View>
          <HeaderComp navigation={navigation} title="上传简历" routeName='personCenter'/>
  
  
          <TouchableOpacity onPress={this.upLoadCurriculumVitae.bind(this, 'curriculumVitae')}>
            <Flex justify="center" align="center" style={styles.upLoadCurriculumVitae_upload_text}><Text>上传本人简历</Text></Flex>
          </TouchableOpacity>
         
        </View>
    )
  }
  
}


const styles = StyleSheet.create({
  upLoadCurriculumVitae_upload_text: {
    paddingVertical: 15,
  }
})

export default upLoadCurriculumVitae;