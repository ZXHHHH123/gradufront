/**
 * Created by admin-pc on 2019/3/28.
 */
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import AllJobs from './../src/job/allJobs';
import JobDetail from './../src/job/jobDetail';

const MainStackNavigator = createStackNavigator({
  jobMain: {
    screen: AllJobs,
  },
  jobDetail: {
    screen: JobDetail
  }
}, {
  initialRouteName: 'jobDetail'
});

export default MainStackNavigator;