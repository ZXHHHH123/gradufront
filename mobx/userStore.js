/**
 * Created by admin-pc on 2019/2/1.
 */
import {observable, action} from "mobx"

class UserStore {
  
  @observable api = '';
  @observable phone = '';
  @observable pwd = '';
  @observable titImg = '';
  
  @action changeApi (api) {
    console.log('mobx 打印api' + api);
    this.api = api;
  }
  @action changePhone (phone) {
    console.log('mobx 打印phone' + phone);
    this.phone = phone;
  }
}
export default new UserStore();