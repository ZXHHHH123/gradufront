/**
 * Created by admin-pc on 2019/3/28.
 */
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import AllJobs from './../src/job/allJobs';
import JobDetail from './../src/job/jobDetail';
import ComplainDetail from './../src/job/complainDetail';
import ManageJobIntention from './../src/job/manageJobIntention';

const MainStackNavigator = createStackNavigator({
  jobMain: {
    screen: AllJobs,
  },
  jobDetail: {
    screen: JobDetail
  },
  complainDetail: {
    screen: ComplainDetail
  },
  manageJobIntention: {
    screen: ManageJobIntention
  }
}, {
  initialRouteName: 'jobDetail',
  mode: 'modal',
  headerMode: 'none',
});

export default MainStackNavigator;