/**
 * Created by admin-pc on 2019/3/28.
 */
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import AllJobs from './../src/job/allJobs';
import JobDetail from './../src/job/jobDetail';
import ComplainDetail from './../src/job/complainDetail';
import ManageJobIntention from './../src/job/manageJobIntention';
import EditJobIntention from './../src/job/editJobIntention';
import JobType from './../src/job/jobType';
import 	IndustryType from './../src/job/industryType';
import CityType from './../src/job/cityType';
import SalaryStage from './../src/job/salaryStage';


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
  },
  editJobIntention: {
    screen: EditJobIntention
  },
  jobType: {
    screen: JobType
  },
  industryType: {
    screen: IndustryType
  },
  cityType: {
    screen: CityType
  },
  salaryStage: {
    screen: SalaryStage
  }
}, {
  // initialRouteName: 'jobDetail',
  mode: 'modal',
  headerMode: 'none',
});

export default MainStackNavigator;