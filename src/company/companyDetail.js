/**
 * Created by admin-pc on 2019/3/29.
 */
/**
 * Created by admin-pc on 2019/3/29.
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


class CompanyDetail extends Component {
  _keyExtractor = (item, index) => item.id;
  
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
    };
    this.ModalClose = () => {
      this.setState({
        isShowModal: false,
      }, () => {
        console.log('打印isshowmodal' + this.state.isShowModal)
      })
    };
  }
  
  backView() {
    console.log('点击返回按钮');
    this.props.navigation.navigate('companyMain');
  };
  
  complainComp() {
    console.log('点击投诉按钮');
    this.setState({
      isShowModal: true
    }, () => {
      console.log('isshowmodal' + this.state.isShowModal);
    })
  };
  
  chooseComplainItem() {
    console.log('点击举报按钮');
    this.ModalClose();
    ToastAndroid.show('举报成功-我们会尽快和公司方核实', ToastAndroid.SHORT);
    
  }
  
  render() {
    const {navigation} = this.props;
    return (
        <ImageBackground source={require('./../image/companyBack.png')} style={{width: '100%', height: '100%'}}>
          <Provider>
            <ScrollView>
              <View style={styles.companyDetail_box}>
                <View style={styles.companyDetail_header}>
                  <Flex justify="between" align="center">
                    <IconOutline name="left" color="white" style={{fontSize: 16}} onPress={this.backView.bind(this)}/>
                    <Flex style={styles.companyDetail_header_right}>
                      <Text style={styles.companyDetail_header_right_text}>+关注</Text>
                      <IconOutline name="ellipsis" color="white" style={{fontSize: 20}}
                                   onPress={this.complainComp.bind(this)}/>
                    </Flex>
                  </Flex>
                
                </View>
                
                {/*公司名字以及基本介绍start*/}
                <View style={styles.companyDetail_main_header}>
                  <Flex justify="between">
                    <View>
                      <Text style={styles.companyDetail_main_company_name}>公司名字</Text>
                      <Text style={styles.companyDetail_main_company_information}>是否上市.1000-9999人.旅游</Text>
                    </View>
                    <Image style={styles.companyDetail_main_header_company_logo} source={require('./../image/company_logo.jpg')}/>
                  </Flex>
                </View>
                {/*公司名字以及基本介绍end*/}
                
                
                {/*公司上班制度介绍start*/}
                <View style={styles.companyDetail_main_work_system}>
                  <Flex wrap="wrap">
                    <IconOutline name="right" style={styles.companyDetail_main_work_system_icon}/>
                    <IconOutline name="right" style={styles.companyDetail_main_work_system_icon}/>
                    <IconOutline name="right" style={styles.companyDetail_main_work_system_icon}/>
                  </Flex>
                </View>
                {/*公司上班制度介绍end*/}
  
  
  
                <Modal
                    popup
                    visible={this.state.isShowModal}
                    animationType="slide-up"
                    onClose={this.ModalClose}
                    maskClosable
                >
                  <View>
                    <FlatList
                        data={ComplainItem}
                        keyExtractor={this._keyExtractor}
                        renderItem={
                          ({item, index}) => (
                              <Text onPress={() => this.chooseComplainItem(item.id, index)}
                                    style={styles.companyDetail_modal_item}>{item.value}</Text>
                          )
                        }
                    />
                    <Text style={[styles.companyDetail_modal_item, styles.modal_item_cancel]} onPress={this.ModalClose}>取消</Text>
                  </View>
                </Modal>
                
                <Text>显示公司具体信息界面</Text>
              </View>
            </ScrollView>
          </Provider>
        </ImageBackground>
    
    )
  }
}

const styles = StyleSheet.create({
  companyDetail_box: {
    borderColor: 'gray',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: 10,
  },
  companyDetail_header: {
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
    marginTop: 15,
  },
  
  companyDetail_header_right: {
  
  },
  companyDetail_header_right_text: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    marginRight: 10,
    color: 'white',
  },
  
  
  companyDetail_main_header: {
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
    marginTop: 30
  },
  companyDetail_main_company_name: {
    fontSize: 24,
    color: 'white',
    marginBottom: 5,
  },
  companyDetail_main_company_information: {
    fontSize: 14,
    color: '#9B9B9C',
  },
  companyDetail_main_header_company_logo: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  
  
  
  
  companyDetail_modal_item: {
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    borderBottomColor: '#f6f6f8',
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  modal_item_cancel: {
    color: 'blue'
  }
  
})
export default CompanyDetail