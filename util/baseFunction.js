/**
 * Created by admin-pc on 2019/2/2.
 */
import {StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions} from 'react-native'
const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;
import axios from 'axios'
import axiosUtil from './../config/system'

const url = axiosUtil.axiosUrl;


const earnSMSCode = function (phone) {
 axios.post(url + '', {phone}).then( res =>{
   console.log('获取验证码res---then')
   console.log(res);
 }).catch(err =>{
   console.log('获取验证码接口报错');
   console.log(err);
 })
};

const changeSubYear = function(time) {
  console.log('进入转换时间方法');
  let substract = new Date().getTime() - new Date(time).getTime();
  let subYear = parseInt(substract/(365*24*3600*1000));
  return subYear;
};

/*通过学历id转换为学历label*/
const changeStudyBackground = function (value) {
  if(value == '10') {
    value = '博士生'
  }else if(value == '11') {
    value = '研究生'
  }else if(value == '12') {
    value= '本科'
  }else if(value == '13') {
    value= '专科'
  }else if(value == '14') {
    value= '高中'
  }else if(value == '15') {
    value= '其他'
  };
  return value;
};

/*将时间转换为年-月*/
const changeYearAndMonth = function(value) {
  return new Date(value).getFullYear() +  '.' + (new Date(value).getMonth()+1);
};

export {earnSMSCode, changeSubYear, changeStudyBackground, changeYearAndMonth}