/**
 * Created by admin-pc on 2019/3/29.
 */
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import AllCompanys from './../src/company/allCompanys';
import CompanyDetail from './../src/company/companyDetail';

const CompanyStackNavigator = createStackNavigator({
  companyMain: {
    screen: AllCompanys
  },
  companyDetail: {
    screen: CompanyDetail
  }
}, {
  initialRouteName: 'companyMain',
});
export default CompanyStackNavigator;