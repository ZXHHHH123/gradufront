/**
 * Created by admin-pc on 2019/3/28.
 */
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import Login from './../src/account/login';
import AccountRegister from './../src/account/accountRegister';
import AccountFixPwd from './../src/account/accountFixPwd';
import Home from './../src/home';

const LoginStack = createStackNavigator({
  Login: {
    screen: Login,
  },
  Home: {
    screen: Home,
  },
  AccountRegister: {
    screen: AccountRegister,
  },
  AccountFixPwd: {
    screen: AccountFixPwd
  }
}, {
  mode: 'modal',
  headerMode: 'none',
  initialRouteName: 'Login',
  defaultNavigationOptions: {
    header: null
  }
});
export default LoginStack