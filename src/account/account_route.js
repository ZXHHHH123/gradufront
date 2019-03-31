// /**
//  * Created by admin-pc on 2019/2/1.
//  */
// import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
// import Login from './../account/login';
// import Home from './../home';
// import AccountRegister from './../account/accountRegister';
//
// import AllJobs from './../job/allJobs';
// import JobDetail from './../job/jobDetail';
//
// const MainStackNavigator = createStackNavigator({
//   jobMain: {
//     screen: AllJobs,
//   },
//   jobDetail: {
//     screen: JobDetail
//   }
// }, {
//   initialRouteName: 'jobMain',
//   // headerMode: 'none',
//   // defaultNavigationOptions: {
//   //   header: null
//   // }
// });
// const LoginStack = createStackNavigator({
//   Login: {
//     screen: Login,
//   },
//   Home: {
//     screen: Home,
//   },
//   AccountRegister: {
//     screen: AccountRegister,
//   }
// }, {
//   mode: 'modal',
//   headerMode: 'none',
//   initialRouteName: 'Login',
//   defaultNavigationOptions: {
//     header: null
//   }
// });
//
// const RootStack = createStackNavigator({
//   Login: {
//     screen: LoginStack
//   },
//   Main: {
//     screen: MainStackNavigator
//   }
// }, {
//   mode: 'modal',
//   headerMode: 'none',
// });
//
// // const tabStackNavigator = createBottomTabNavigator({
// //
// // })
//
// const Root = createAppContainer(RootStack);
// export default Root