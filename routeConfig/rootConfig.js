/**
 * Created by admin-pc on 2019/3/28.
 */
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';

import LoginStack from './loginRouteConfig'
import JobStackNavigator from './jobRouteConfig'
import CompanyStackNavigator from './companyRouteConfig'
import TabNavigator from './tabRouteConfig'
import JobDetail from './../src/job/jobDetail';

const RootStack = createStackNavigator({
  Login: {
    screen: LoginStack
  },
  /*
  * 这样设置导航栏可以使得进入二级页面（详情界面）不会出现底部的tab导航栏*/
  //tab导航栏
  Main: {
    screen: TabNavigator
  },
  //工作详情导航栏
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