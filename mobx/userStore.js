/**
 * Created by admin-pc on 2019/2/1.
 */
import {observable, action} from "mobx"

class UserStore {
  
  
  @observable phone = '';
  @observable pwd = '';
  @observable titImg = '';
  
  @action changePhone (phone) {
    console.log('mobx 打印phone' + phone);
    this.phone = phone;
  }
}
export default new UserStore();