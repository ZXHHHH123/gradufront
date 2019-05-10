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
// import PersonStackNavigator from './personRouteConfig'
import Main from './tabRouteConfig'


import BossMain from './tabBossRouteConfig'
import jobHunterNavigator from './jobHunterRouteConfig'
import JobDetail from './../src/job/jobDetail';


import PersonSetting from './../src/me/personSetting';
import HadChat from './../src/me/hadChat';
import TodayInterview from './../src/me/todayInterview'
import HadDeliver from './../src/me/hadDeliver'
import InterestedJob from './../src/me/interestedJob'
import ChangeStatus from './../src/me/changeStatus'
import BossInfoDetail from './../src/me/bossInfoDetail'
import FixPhone from './../src/me/fixPhone'
import FixPwd from './../src/me/fixPwd'
import AddWorkExperience from './../src/me/addWorkExperience'


import EditSmallCurriculumVitae from './../src/me/editSmallCurriculumVitae'
import PersonAccount from './../src/me/personAccount'
import EditBasicInfo from './../src/me/editBasicInfo'
import PositionManage from './../src/me/positionManage'
import RecruitManage from './../src/me/recruitManage'
import EditCompanyStar from './../src/me/editCompanyStar'
import EditCompanyIntro from './../src/me/editCompanyIntro'
import CompanyLeaderIntro from './../src/me/companyLeaderIntro'
import CompanyProductIntro from './../src/me/companyProductIntro'



import PublishJob from './../src/publish/publishJob'
import JobAccount from './../src/publish/jobAccount'
import JobAddress from './../src/publish/jobAddress'






const RootStack = createStackNavigator({
  Login: {
    screen: LoginStack
  },
  Main: {
    screen: Main
  },
  BossMain: {
    screen: BossMain
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
  },
  // meDetail: {
  //   screen: PersonStackNavigator
  // },
  /*个人中心界面------不能单独开stack，因为个人中心有好几种不同的路由跳转，如果开单独跳转物理返回键会有问题---可以取消上一行的注释然后点击个人中心进入任何一个详情界面，然后点击返回键。出现的问题想一下大概就知道了，主要和initialRouteName有关系*/
  
  jobHunterDetail: {
    screen: jobHunterNavigator
  },
  personSetting: {
    screen: PersonSetting
  },
  hadChat: {
    screen: HadChat
  },
  todayInterview: {
    screen: TodayInterview
  },
  hadDeliver: {
    screen: HadDeliver
  },
  interestedJob: {
    screen: InterestedJob
  },
  fixPhone: {
    screen: FixPhone
  },
  fixPwd: {
    screen: FixPwd
  },
  addWorkExperience: {
    screen: AddWorkExperience
  },
  editSmallCurriculumVitae: {
    screen: EditSmallCurriculumVitae
  },
  personAccount: {
    screen: PersonAccount
  },
  editBasicInfo: {
    screen: EditBasicInfo
  },
  positionManage: {
    screen: PositionManage
  },
  recruitManage: {
    screen: RecruitManage
  },
  editCompanyStar: {
    screen: EditCompanyStar
  },
  editCompanyIntro: {
    screen: EditCompanyIntro
  },
  companyLeaderIntro: {
    screen: CompanyLeaderIntro
  },
  companyProductIntro: {
    screen: CompanyProductIntro
  },
  changeStatus: {
    screen: ChangeStatus
  },
  bossInfoDetail: {
    screen: BossInfoDetail
  },
  publishJob: {
    screen: PublishJob
  },
  jobAccount: {
    screen: JobAccount
  },
  jobAddress: {
    screen: JobAddress
  },
  
}, {
  mode: 'modal',
  headerMode: 'none',
});


const Root = createAppContainer(RootStack);
export default Root