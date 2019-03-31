/**
 * Created by admin-pc on 2019/3/28.
 */
import React from 'react';
import {createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import JobStack from './jobRouteConfig';
import CompanyStack from './companyRouteConfig';
import AllJobs from './../src/job/allJobs';
import AllCompanys from './../src/company/allCompanys';


const JobMainStack =createStackNavigator({
  jobMain: {
    screen: AllJobs,
  }}, {
  mode: 'modal',
  headerMode: 'none',
});
const CompanyMainStack =createStackNavigator({
  companyMain: {
    screen: AllCompanys,
  }}, {
  mode: 'modal',
  headerMode: 'none',
});

const TabNavigator  = createAppContainer(createBottomTabNavigator({
  Job: JobMainStack,
  Company: CompanyMainStack,
}));
export default TabNavigator;