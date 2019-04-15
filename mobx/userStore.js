/**
 * Created by admin-pc on 2019/2/1.
 */
import {observable, action} from "mobx"

class UserStore {
  
  @observable api = '';
  @observable phone = '';
  @observable pwd = '';
  @observable titImg = '';
  
  @observable isShowcomplainModal = false;
  //投诉职位时所选的modal_item，即诸如‘广告、色情、传销等选项’
  @observable complainItemId = '';
  @observable isShowTabOptionMask = false;
  @observable isShowLeaveEditJobView = false;
  
  @action changeApi (api) {
    console.log('mobx 打印api' + api);
    this.api = api;
  }
  @action changePhone (phone) {
    console.log('mobx 打印phone' + phone);
    this.phone = phone;
  }
  
  
  @action changeIsShowcomplainModal(isShow) {
    this.isShowcomplainModal = isShow;
    console.log('mobx 更改 isShowcomplainModal' + this.isShowcomplainModal);
  }
  @action changeComplainItemId(complainItemId) {
    this.complainItemId = complainItemId;
    console.log('mobx 更改 complainItem' + this.complainItemId);
  }
  @action changeIsShowTabOptionMask(value) {
    this.isShowTabOptionMask = value;
  }
  @action changeConfirmLeaveEditJob(value) {
    this.isShowLeaveEditJobView = value;
  }
}
export default new UserStore();