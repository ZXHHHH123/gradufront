/**
 * Created by admin-pc on 2019/4/29.
 */
import React from 'react';
import {createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import JobStack from './jobRouteConfig';
import CompanyStack from './companyRouteConfig';
import AllJobs from './../src/job/allJobs';
import allJobHunters from './../src/jobHunter/allJobHunter';
import AllCompanys from './../src/company/allCompanys';
// import MessageList from './../src/chat/messageList';
import PersonCenter from './../src/me/personCenter';



/*底部导航栏工作项*/
const JobMainStack =createStackNavigator({
  jobHuntersMain: {
    screen: allJobHunters,
  }}, {
  mode: 'modal',
  headerMode: 'none',
});
/*底部导航栏公司项*/
// const CompanyMainStack =createStackNavigator({
//   companyMain: {
//     screen: AllCompanys,
//   }}, {
//   mode: 'modal',
//   headerMode: 'none',
// });
/*底部导航栏chat项*/
// const ChatMainStack =createStackNavigator({
//   messageList: {
//     screen: MessageList,
//   }}, {
//   mode: 'modal',
//   headerMode: 'none',
// });
/*底部导航栏个人中心项*/
const MeMainStack =createStackNavigator({
  personCenter: {
    screen: PersonCenter,
  }}, {
  mode: 'modal',
  headerMode: 'none',
  
  
});

const TabNavigator  = createAppContainer(createBottomTabNavigator({
  牛人: JobMainStack,
  // Company: CompanyMainStack,
  // Chat: ChatMainStack,
  我的: MeMainStack,
},{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarOnPress:(obj) => {
      // communicateData
      console.log(1234);
      obj.defaultHandler();
      console.log(obj.navigation.state.params);
      obj.navigation.state.params.earnCommunicate();
  
    }
  }),
 

}));
export default TabNavigator;