/**
 * Created by admin-pc on 2019/2/1.
 */
import {observable, action} from "mobx"
import {changeStudyBackground} from './../util/baseFunction'

class UserStore {
  
  @observable api = '';
  @observable phone = '';
  @observable pwd = '';
  @observable nickName = '';
  @observable gender = '';
  @observable studyBackground = '';
  
  @observable titImg = '';
  @observable isCompany = '';
  
  @observable personAccount = ''; // 个人微简历中的自我描述
  
  @observable joinWorkTime = '';//个人工作开始时间
  @observable birthTime = '';//个人出生日期
  @observable allPublishJobType = [];//招聘者所发的所有职位类型
  
  
  
  @observable isShowcomplainModal = false;
  //投诉职位时所选的modal_item，即诸如‘广告、色情、传销等选项’
  @observable complainItemId = '';
  @observable isShowTabOptionMask = false;
  @observable isShowLeaveEditJobView = false;
  @observable userToken = '';
  @observable chooseJobLabel = '';
  @observable chooseJobValue = '';
  @observable bossPublishChooseJobLabel = '';//所选工作的label值
  @observable bossPublishChooseJobValue = '';//所选工作的code值
  @observable jobAccount = '';
  @observable detailAddress = ''; //boss所填工作的详细地址
  @observable chooseCity = '';//boss所填工作的城市
  @observable chooseCityValue = '';//boss所填工作的城市value值
  @observable publishJobNum = 0;//boss所发布的工作数量
  @observable allPublishJobData = [];//boss所发布的所有工作详细值
  @observable isDeliverPublishParams = 0;//是否为从已发布的职位中进入发布界面, 0为否，1为0
  
  @observable chooseIndustryData = [];//求职者所选择的期望行业
  @observable floorMoney = '';//求职者期望工资下限
  @observable upMoney = '';//求职者期望工资上限
  
  @observable workExperience = [];//求职者的工作经验
  
  
  @observable companyStar = '';//招聘者所填写的公司亮点
  
  
  
  
  @action changeApi (api) {
    console.log('mobx 打印api' + api);
    this.api = api;
  }
  @action changePhone (phone) {
    console.log('mobx 打印phone' + phone);
    this.phone = phone;
  }
  @action changeNickName (value) {
    console.log('mobx 打印nickName' + value);
    this.nickName = value;
  }
  @action changeGender (value) {
    if(value == 0) {
      value = '男'
    }else if(value == 1) {
      value= '女'
    }
    console.log('mobx 打印Gender' + value);
    this.gender = value;
  }
  @action changeStudyBackground (value) {
    console.log('mobx 打印changeStudyBackground' + value);
    // if(value == '10') {
    //   value = '博士生'
    // }else if(value == '11') {
    //   value = '研究生'
    // }else if(value == '12') {
    //   value= '本科'
    // }else if(value == '13') {
    //   value= '专科'
    // }else if(value == '14') {
    //   value= '高中'
    // }else if(value == '15') {
    //   value= '其他'
    // }
    
    this.studyBackground = changeStudyBackground(value);
    console.log(this.studyBackground);
  }
  
  @action changeTitImg (value) {
    console.log('mobx 打印TitImg' + value);
    this.titImg = value;
  }
  
  @action changePersonAccount (value) {
    console.log('mobx 打印personAccount' + value);
    this.personAccount = value;
    console.log(this.personAccount);
  }
  
  @action changeJoinWorkTime (value) {
    console.log('mobx 打印joinWorkTime' + value);
    this.joinWorkTime = value;
    console.log(this.joinWorkTime);
  }
  @action changeBirthTime (value) {
    console.log('mobx 打印birthTimet' + value);
    this.birthTime = value;
    console.log(this.birthTime);
  }
  @action changeAllPublishJobType (value) {
    console.log('mobx 打印AllPublishJobType' + value);
    if(value instanceof Array) {
      this.allPublishJobType = value;
    }else {
      Object.keys(value).forEach((key) => {
        this.allPublishJobType.push(value[key]);
      });
    }
    console.log(this.allPublishJobType);
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
  @action changeChooseJob(label, value) {
    console.log('userStore -------- 修改chooseJob');
    this.chooseJobLabel = label;
    this.chooseJobValue = value;
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
  @action changeChooseIndustryData(value) {
    console.log('userStore -------- 修改ChooseIndustryData' + value);
    this.chooseIndustryData = value;
  }
  /*存储工作经验*/
  @action changeWorkExperience(value) {
    console.log('userStore -------- 修改changeWorkExperience' + value);
    this.workExperience = value;
  }
  @action changeJobSalary(floorMoney, upMoney) {
    console.log('userStore -------- 修改changeJobSalary' + floorMoney + upMoney);
    this.floorMoney = floorMoney;
    this.upMoney = upMoney;
  }
  
  @action changeCompanyStar(value) {
    console.log('userStore -------- 修改PCompanyStar' + value);
    this.companyStar = value;
  }
  
  
  
  
  
  
  
  
  
  
  
}
export default new UserStore();