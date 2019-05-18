/**
 * Created by admin-pc on 2019/5/12.
 */
let companyTypeList = [
  // {
  //   label: '融资阶段',
  //   value: '10000',
  //   children: [{
  //     label: '未融资',
  //     value: '10001'
  //   },{
  //     label: '天使轮',
  //     value: '10002'
  //   },{
  //     label: 'A轮',
  //     value: '10003'
  //   },{
  //     label: 'B轮',
  //     value: '10004'
  //   },{
  //     label: 'C轮',
  //     value: '10005'
  //   },{
  //     label: 'D轮级以上',
  //     value: '1006'
  //   },{
  //     label: '已上市',
  //     value: '10007'
  //   },{
  //     label: '不需要融资',
  //     value: '10008'
  //   }]
  // },
  {
    label: '人员规模',
    value: '10000',
    children: [{
      label: '不限',
      value: '10007'
    },{
      label: '0~20人',
      value: '10001'
    },{
      label: '20~99人',
      value: '10002'
    },{
      label: '100~499人',
      value: '10003'
    },{
      label: '500~999人',
      value: '10004'
    },{
      label: '10000~9999人',
      value: '10005'
    },{
      label: '10000人以上',
      value: '10006'
    }]
  },{
    label: '行业',
    value: '20000',
    children: [{
      label: '全部',
      value: '20001'
    },{
      label: '电子商务',
      value: '20002'
    },{
      label: '游戏',
      value: '20003'
    },{
      label: '媒体',
      value: '20004'
    },{
      label: '广告营销',
      value: '20005'
    },{
      label: '数据服务',
      value: '20006'
    },{
      label: '医疗健康',
      value: '20007'
    },{
      label: '生活服务',
      value: '20008'
    },{
      label: 'O2O',
      value: '20009'
    },{
      label: '旅游',
      value: '30010'
    },{
      label: '分类信息',
      value: '30011'
    },{
      label: '音乐/视频/阅读',
      value: '30012'
    },{
      label: '在线教育',
      value: '30013'
    },{
      label: '社交网络',
      value: '30014'
    },{
      label: '人力资源服务',
      value: '30015'
    },{
      label: '企业服务',
      value: '30016'
    },{
      label: '信息安全',
      value: '30017'
    },{
      label: '新零售',
      value: '30018'
    },{
      label: '智能硬件',
      value: '30019'
    },{
      label: '移动互联网',
      value: '30020'
    },{
      label: '互联网',
      value: '30021'
    },{
      label: '计算机软件',
      value: '30022'
    },{
      label: '计算机硬件',
      value: '30023'
    },{
      label: '计算机服务',
      value: '30024'
    }]
  }
];

const serverEarnCompany= {
  data: {
    companyTypeList
  },
  resmsg: "请求成功",
  resvalue: 1
};

export default  serverEarnCompany;