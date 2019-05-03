/**
 * Created by admin-pc on 2019/5/3.
 */

import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import AllJobHunter from './../src/jobHunter/allJobHunter';
import JobHunterDetail from './../src/jobHunter/jobHunterDetail';



const MainStackNavigator = createStackNavigator({
  jobHunterMain: {
    screen: AllJobHunter,
  },
  jobHunterDetail: {
    screen: JobHunterDetail
  },
}, {
  initialRouteName: 'jobHunterDetail',
  mode: 'modal',
  headerMode: 'none',
});

export default MainStackNavigator;