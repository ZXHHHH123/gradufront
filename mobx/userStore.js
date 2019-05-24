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
  
  @observable backRouteName = '';
  
  
  @observable personAccount = ''; // 个人微简历中的自我描述
  
  @observable joinWorkTime = '';//个人工作开始时间
  @observable birthTime = '';//个人出生日期
  @observable allPublishJobType = [];//招聘者所发的所有职位类型
  @observable expectJobLabel = '';//期望职位
  @observable expectCity = '';//期望城市
  @observable expectCityValue = '';//期望城市value
  
  
  
  
  
  
  
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
  @observable jobId = '';
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
  
  @observable jobDetailItem = {};//单个工作的详细介绍
  @observable companyDetailItem = {};//单个公司的详细介绍
  @observable collectJob = 0;//招聘者所感兴趣的职位
  @observable collectJobHunter = 0;//招聘者所感兴趣的求职者
  
  
  @observable complainImage = [];//招聘者投诉所上传的图片
  
  
  
  
  @observable companyAccount = '';//招聘者所填写的公司名字
  @observable companyName = '';//招聘者所填写的公司名字
  @observable companyCode = '';//招聘者所填写的公司代码
  @observable companyStar = '';//招聘者所填写的公司亮点
  @observable companyImage = [];//招聘者所填写的公司特色照片
  @observable companyLogo = '';//招聘者所填写的公司logo
  @observable companyAddress = [];//招聘者所填写的公司地址
  
  
  @observable place = '';//招聘者所填写的公司的职位
  @observable wxCode = '';//招聘者所的微信号
  @observable userEmail = '';//招聘者所写的接收简历的邮箱号
  @observable companyWelfare = [];//招聘者所写的公司福利
  @observable companyEmail = '';//招聘者所写的接收简历的邮箱号
  
  @observable isBelisted = [];//招聘者所填写的公司是否上市
  @observable holidaySystem = '';//招聘者所填写的公司放假制度
  @observable companyPeopleNum = '';//招聘者所填写的公司人数
  @observable companyWorkTime = [];//招聘者所填写的公司工作时间
  
  
  @observable allCommunicateData = {
    allCommunicateData: [],
    interviewData: [],
    hasCurriculumVitaeData: [],
    hadCurriculumVitaeData: [],
  };//招聘者的所有沟通信息
  
  
  
  
  
  
  
  
  
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
  
  @action changeCompanyName(value) {
    console.log('userStore -------- 修改companyName' + value);
    this.companyName = value;
  }
  @action changeCompanyCode(value) {
    console.log('userStore -------- 修改changeCompanyCode' + value);
    this.companyCode = value;
  }
  @action changePlace(value) {
    console.log('userStore -------- changePlace' + value);
    this.place = value;
  }
  
  @action changeWxCode(value) {
    console.log('userStore -------- changeWxCode' + value);
    this.wxCode = value;
  }
  @action changeEmail(value) {
    console.log('userStore -------- changeEmail' + value);
    this.userEmail = value;
  }
  
  @action changeCompanyImage(value) {
    console.log('userStore -------- changeCompanyImage' + value);
    this.companyImage = value;
  }
  @action changeComplainImage(value) {
    console.log('userStore -------- changeComplainImage' + value);
    this.complainImage = value;
  }
  
  @action changeCompanyLogo(value) {
    console.log('userStore -------- changeCompanyLogo' + value);
    this.companyLogo = value;
  }
  
  
  
  @action changeCompanyWelfare(value, isChecked = true) {
    if(value instanceof Array) {
      this.companyWelfare = value;
      return;
    }
    console.log('userStore -------- changeCompanyWelfare' + value + isChecked);
    let companyWelfare = Array.from(this.companyWelfare);
    let flag = 0;
    if(companyWelfare.length === 0) {
      if(isChecked) {
        companyWelfare.push(value);
        this.companyWelfare = companyWelfare;
      }
    }
    for(let i = 0, len = companyWelfare.length; i < len; i++) {
      if(companyWelfare[i] == value) {
        flag = 1;
        if(!isChecked) {
          companyWelfare.splice(i, 1);
          this.companyWelfare = companyWelfare;
          console.log(this.companyWelfare);
        }
        break;
      }
    }
    if(flag === 0) {
      console.log('abcd');
      if(isChecked){
        companyWelfare.push(value);
        this.companyWelfare = companyWelfare;
        console.log(this.companyWelfare);
      }
    }
    console.log(999999)
    console.log(this.companyWelfare);
  }
  
  
  
  @action changeCompanyAccount(value) {
    console.log('userStore -------- changeCompanyAccount' + value);
    this.companyAccount = value;
  }
  
  @action changeIsBelisted(value) {
    console.log('userStore -------- changeIsBelisted' + value);
    this.isBelisted = value;
  }
  
  @action changeHolidaySystem(value) {
    console.log('userStore -------- changeHolidaySystem' + value);
    this.holidaySystem = value;
  }
  
  @action changeCompanyPeopleNum(value) {
    console.log('userStore -------- changeCompanyPeopleNum' + value);
    this.companyPeopleNum = value;
  }
  
  @action changeCompanyWebsite(value) {
    console.log('userStore -------- changeCompanyWebsite' + value);
    this.companyWebsite = value;
  }
  
  @action changeCompanyEmail(value) {
    console.log('userStore -------- changeCompanyEmail' + value);
    this.companyEmail = value;
  }
  
  @action changeCompanyWorkTime(value) {
    console.log('userStore -------- changeCompanyWorkTime' + value);
    
    console.log(typeof value);
    if(typeof value === 'string') {
      console.log('abbbbbbbb');
      let workTimeArr = value.split(',');
      console.log(workTimeArr);
      this.companyWorkTime = workTimeArr;
    }else {
      this.companyWorkTime = value;
    }
  }
  
  
  @action changeExpectJobLabel(value) {
    console.log('userStore -------- changeExpectJobLabel' + value);
    this.expectJobLabel = value;
  }
  @action changeExpectCity(value) {
    console.log('userStore -------- changeExpectCity' + value);
    this.expectCity = value;
  }
  @action changeExpectCityValue(value) {
    console.log('userStore -------- changeExpectCityValue' + value);
    this.expectCityValue = value;
  }
  
  
  @action changeJobDetailItem(value) {
    console.log('userStore -------- changeJobDetailItem' + value);
    this.jobDetailItem = value;
  }
  
  @action changeCompanyDetailItem(value) {
    console.log('userStore -------- changeCompanyDetailItem' + value);
    this.companyDetailItem = value;
  }
  
  @action changeCompanyAddress(value) {
    console.log('userStore -------- changeCompanyAddress' + value);
    this.companyAddress = value;
  }
  
  @action changeJobId(value) {
    console.log('userStore -------- changeJobId' + value);
    this.jobId = value;
  }
  
  @action changeBackRouteName(value) {
    console.log('userStore -------- changeBackRouteName' + value);
    this.backRouteName = value;
  }
  @action changeCollectJob(value) {
    console.log('userStore -------- changeCollectJob' + value);
    this.collectJob = value;
  }
  @action changeCollectJobHunter(value) {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log('userStore -------- changeCollectJobHunter' + value);
    this.collectJobHunter = value;
  }
  
  
  @action changeAllCommunicateData(value) {
    console.log('userStore -------- changeAllCommunicateData' + value);
    console.log(value);
    console.log(value.allCommunicateData);
    this.allCommunicateData = value;
  }
  
  
  
  
}
export default new UserStore();