/**
 * Created by admin-pc on 2019/5/6.
 */
let workTimeList = [
  {
    label: '8:30',
    value: '85000',
    children: [{
      label: '15:00',
      value: '85001'
    },{
      label: '15:30',
      value: '85002'
    },{
      label: '16:00',
      value: '85003'
    },{
      label: '16:30',
      value: '85004'
    },{
      label: '17:00',
      value: '85005'
    },{
      label: '17:30',
      value: '85006'
    },{
      label: '18:00',
      value: '85007'
    },{
      label: '18:30',
      value: '85008'
    },{
      label: '19:00',
      value: '85009'
    }]
  },
  {
    label: '9:00',
    value: '90000',
    children: [{
      label: '15:00',
      value: '90001'
    },{
      label: '15:30',
      value: '90002'
    },{
      label: '16:00',
      value: '90003'
    },{
      label: '16:30',
      value: '90004'
    },{
      label: '17:00',
      value: '90005'
    },{
      label: '17:30',
      value: '90006'
    },{
      label: '18:00',
      value: '90007'
    },{
      label: '18:30',
      value: '90008'
    },{
      label: '19:00',
      value: '90009'
    }]
  },
  {
    label: '9:30',
    value: '95000',
    children: [{
      label: '15:00',
      value: '95001'
    },{
      label: '15:30',
      value: '95002'
    },{
      label: '16:00',
      value: '95003'
    },{
      label: '16:30',
      value: '95004'
    },{
      label: '17:00',
      value: '95005'
    },{
      label: '17:30',
      value: '95006'
    },{
      label: '18:00',
      value: '95007'
    },{
      label: '18:30',
      value: '95008'
    },{
      label: '19:00',
      value: '95009'
    }]
  },
  {
    label: '10:00',
    value: '100000',
    children: [{
      label: '15:00',
      value: '100001'
    },{
      label: '15:30',
      value: '100002'
    },{
      label: '16:00',
      value: '100003'
    },{
      label: '16:30',
      value: '100004'
    },{
      label: '17:00',
      value: '100005'
    },{
      label: '17:30',
      value: '100006'
    },{
      label: '18:00',
      value: '100007'
    },{
      label: '18:30',
      value: '100008'
    },{
      label: '19:00',
      value: '100009'
    }]
  },
  {
    label: '10:30',
    value: '105000',
    children: [{
      label: '15:00',
      value: '105001'
    },{
      label: '15:30',
      value: '105002'
    },{
      label: '16:00',
      value: '105003'
    },{
      label: '16:30',
      value: '105004'
    },{
      label: '17:00',
      value: '105005'
    },{
      label: '17:30',
      value: '105006'
    },{
      label: '18:00',
      value: '105007'
    },{
      label: '18:30',
      value: '105008'
    },{
      label: '19:00',
      value: '105009'
    }]
  },
  {
    label: '11:00',
    value: '110000',
    children: [{
      label: '15:00',
      value: '110001'
    },{
      label: '15:30',
      value: '110002'
    },{
      label: '16:00',
      value: '110003'
    },{
      label: '16:30',
      value: '110004'
    },{
      label: '17:00',
      value: '110005'
    },{
      label: '17:30',
      value: '110006'
    },{
      label: '18:00',
      value: '110007'
    },{
      label: '18:30',
      value: '110008'
    },{
      label: '19:00',
      value: '110009'
    }]
  },
];

const serverEarnCity = {
  data: {
    workTimeList
  },
  resmsg: "请求成功",
  resvalue: 1
};

export default  serverEarnCity;