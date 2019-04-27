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
  @observable userToken = '';
  @observable chooseJob = '';
  @observable bossPublishChooseJob = '';
  @observable jobAccount = '';
  
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
  @action changeToken(value) {
    console.log('修改token');
    this.userToken = value;
  }
  @action changeChooseJob(value) {
    console.log('userStore -------- 修改chooseJob');
    this.chooseJob = value;
  }
  @action changeBossPublishChooseJob(value) {
    console.log('userStore -------- 修改bossPublishChooseJob' + value);
    this.bossPublishChooseJob = value;
  }
  @action changeJobAccount(value) {
    console.log('userStore -------- 修改JobAccount' + value);
    this.jobAccount = value;
  }
  
  
}
export default new UserStore();