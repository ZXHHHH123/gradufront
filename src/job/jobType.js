/**
 * Created by admin-pc on 2019/4/12.
 */
import React, {Component} from 'react'
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, ScrollView, FlatList
} from 'react-native'
import axios from 'axios'
import axiosUtil from './../../config/system'
import {Button, Flex, WhiteSpace, WingBlank, Picker, List, Provider, Modal} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import {observer} from 'mobx-react';
import HeaderComp from './../../util/headerComp'
import JobBigType from './../../util/jobBigType'

// import TwoTabOption from './../../util/twoTabOption'
import UserStore from './../../mobx/userStore'



const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

@observer
class jobType extends Component {
  _keyExtractor = (item, index) => item.id.toString();
  
  constructor(props) {
    super(props);
    this.state = {
      BigType1: [],
      /*isShowOption控制双层选项是否显示*/
      isShowOption: false
    };
  };
  
  intoDetailJobChoose() {
    console.log('点击详细的工作按钮');
    UserStore.changeIsShowTabOptionMask(true);
  };
  
  eartJobBigType() {
    console.log('获取数据');
    let BigType = [];
    for (let i in JobBigType.data) {
      BigType.push({id: Number(JobBigType.data[i].code), value: JobBigType.data[i].name});
    }
    this.setState({
      BigType1: BigType
    }, () => {
      // console.log(this.state.BigType1)
    })
    // axios.get('https://www.zhipin.com/common/data/position.json').then(res => {
    //   console.log(res);
    // }).catch(err => {
    //   console.log(err);
    // });
  }
  
  componentWillMount() {
    this.eartJobBigType()
  }
  
  render() {
    const {navigation} = this.props;
    return (
        <View style={styles.job_type_box}>
          {/*组件头部start*/}
          <HeaderComp navigation={navigation} title="选择职位类型"/>
          {/*组件头部end*/}
  
          {
            UserStore.isShowTabOptionMask ? <TwoTabOption/> : <Text></Text>
          }
          {/*职位大类型start*/}
          {/*todo 需要改用flatlist*/}
          <ScrollView>
            <View style={styles.job_type_items_box}>
              <FlatList
                  data={this.state.BigType1}
                  keyExtractor={this._keyExtractor}
                  renderItem={
                    ({item, index}) => (
                        <Flex justify="between" style={styles.job_type_list_item}
                              onPress={this.intoDetailJobChoose.bind(this)}>
                          <Text style={styles.job_type_list_item_name}>{item.value}</Text>
                          <IconOutline name="right" style={styles.job_type_list_item_right}/>
                        </Flex>
                    )
                  }
              />
            </View>
          </ScrollView>
          
          {/*职位大类型end*/}
        </View>
    )
  }
}

const styles = StyleSheet.create({
  job_type_box: {},
  job_type_items_box: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  job_type_list_item: {
    paddingVertical: 15,
    borderBottomColor: '#f6f6f8',
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  job_type_list_item_name: {
    color: '#818182'
  },
  job_type_list_item_right: {
    color: '#9b9b9c'
  }
});

export default jobType;