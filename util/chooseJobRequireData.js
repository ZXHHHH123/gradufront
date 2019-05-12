/**
 * Created by admin-pc on 2019/5/12.
 */
let requireTypeList = [
  {
    label: '学历',
    value: '10000',
    children: [{
      label: '全部',
      value: '10001'
    },{
      label: '博士生',
      value: '10002'
    },{
      label: '研究生以上',
      value: '10003'
    },{
      label: '本科以上',
      value: '10004'
    },{
      label: '专科以上',
      value: '10005'
    },{
      label: '高中以上',
      value: '1006'
    }]
  },
  {
    label: '经验',
    value: '20000',
    children: [{
      label: '全部',
      value: '20001'
    },{
      label: '一年以内',
      value: '20002'
    },{
      label: '一年至二年',
      value: '20003'
    },{
      label: '二年至三年',
      value: '20004'
    },{
      label: '三年至四年',
      value: '20005'
    },{
      label: '四年至五年',
      value: '20006'
    },{
      label: '五年以上',
      value: '20007'
    }]
  },
  // {
  //   label: '薪水',
  //   value: '30000',
  //   children: [{
  //     label: '3k以下',
  //     value: '30001'
  //   },{
  //     label: '3k~5k',
  //     value: '30002'
  //   },{
  //     label: '5k~10k',
  //     value: '30003'
  //   },{
  //     label: '10~20k',
  //     value: '30004'
  //   },{
  //     label: '20k~50k',
  //     value: '30005'
  //   },{
  //     label: '50k以上',
  //     value: '30006'
  //   }]
  // }
];

const serverEarnRequire= {
  data: {
    requireTypeList
  },
  resmsg: "请求成功",
  resvalue: 1
};

export default  serverEarnRequire;