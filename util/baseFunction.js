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
}