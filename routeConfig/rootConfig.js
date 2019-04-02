/**
 * Created by admin-pc on 2019/3/28.
 */
import {createStackNavigator, createAppContainer} from 'react-navigation';
import LoginStack from './loginRouteConfig'
import AllJobs from './../src/job/allJobs'
import AccountRegister from './../src/account/accountRegister';
import AccountFixPwd from './../src/account/accountFixPwd';


import JobStackNavigator from './jobRouteConfig'
import CompanyStackNavigator from './companyRouteConfig'
import Main from './tabRouteConfig'
import JobDetail from './../src/job/jobDetail';

const RootStack = createStackNavigator({
  Login: {
    screen: LoginStack
  },
  // AccountRegister: {
  //   screen: AccountRegister,
  // },
  // AccountFixPwd: {
  //   screen: AccountFixPwd
  // },
  Main: {
    screen: Main
  },
 
  // Main: {
  //   screen: Main
  // },
  // 工作详情导航栏
  jobDetail: {
    screen: JobStackNavigator
  },
  //公司详情导航栏
  companyDetail: {
    screen: CompanyStackNavigator
  }
}, {
  mode: 'modal',
  headerMode: 'none',
});


const Root = createAppContainer(RootStack);
export default Root