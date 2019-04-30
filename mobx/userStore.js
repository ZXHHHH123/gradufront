/**
 * Created by admin-pc on 2019/2/1.
 */
import {observable, action} from "mobx"

class UserStore {
  
  @observable api = '';
  @observable phone = '';
  @observable pwd = '';
  @observable titImg = '';
  @observable isCompany = '';
  
  @observable isShowcomplainModal = false;
  //投诉职位时所选的modal_item，即诸如‘广告、色情、传销等选项’
  @observable complainItemId = '';
  @observable isShowTabOptionMask = false;
  @observable isShowLeaveEditJobView = false;
  @observable userToken = '';
  @observable chooseJob = '';
  @observable bossPublishChooseJobLabel = '';//所选工作的label值
  @observable bossPublishChooseJobValue = '';//所选工作的code值
  @observable jobAccount = '';
  @observable detailAddress = ''; //boss所填工作的详细地址
  @observable chooseCity = '';//boss所填工作的城市
  @observable chooseCityValue = '';//boss所填工作的城市value值
  @observable publishJobNum = 0;//boss所发布的工作数量
  @observable allPublishJobData = [];//boss所发布的所有工作详细值
  @observable isDeliverPublishParams = 0;//是否为从已发布的职位中进入发布界面, 0为否，1为0
  
  
  
  
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
  @action changeBossPublishChooseJob(label, value) {
    console.log('userStore -------- 修改bossPublishChooseJob' + label);
    this.bossPublishChooseJobLabel = label;
    this.bossPublishChooseJobValue = value;
  }
  @action changeJobAccount(value) {
    console.log('userStore -------- 修改JobAccount' + value);
    this.jobAccount = value;
  }
  @action changeJobAddress(detailAddress, chooseCity, chooseCityValue) {
    console.log('userStore -------- 修改JobAddress');
    this.detailAddress = detailAddress;
    this.chooseCity = chooseCity;
    this.chooseCityValue = chooseCityValue;
  }
  
  /*存储当前登陆者是招聘者还是求职者---招聘者：1 求职者： 0*/
  @action changeIsCompany(value) {
    console.log('userStore -------- 修改changeIsCompany' + value);
    this.isCompany = value;
  }
  
  @action changePublishJobNum(value) {
    console.log('userStore -------- 修改PublishJobNum' + value);
    this.publishJobNum = value;
  }
  @action changeAllPublishJobData(value) {
    console.log('userStore -------- 修改AllPublishJobData' + value);
    this.allPublishJobData = value;
    console.log(this.allPublishJobData.length)
  }
  /*判断是否为从已发布的职位中进入发布界面*/
  @action changeIsDeliverPublishParams(value) {
    console.log('userStore -------- 修改IsDeliverPublishParams' + value);
    this.isDeliverPublishParams = value;
  }
  
  
  
  
  
  
  
  
}
export default new UserStore();