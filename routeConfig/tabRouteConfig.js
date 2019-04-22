/**
 * Created by admin-pc on 2019/3/28.
 */
import React from 'react';
import {createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import JobStack from './jobRouteConfig';
import CompanyStack from './companyRouteConfig';
import AllJobs from './../src/job/allJobs';
import AllCompanys from './../src/company/allCompanys';
// import MessageList from './../src/chat/messageList';
import PersonCenter from './../src/me/personCenter';



/*底部导航栏工作项*/
const JobMainStack =createStackNavigator({
  jobMain: {
    screen: AllJobs,
  }}, {
  mode: 'modal',
  headerMode: 'none',
});
/*底部导航栏公司项*/
const CompanyMainStack =createStackNavigator({
  companyMain: {
    screen: AllCompanys,
  }}, {
  mode: 'modal',
  headerMode: 'none',
});
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
  Job: JobMainStack,
  Company: CompanyMainStack,
  // Chat: ChatMainStack,
  Me: MeMainStack,
}));
export default TabNavigator;