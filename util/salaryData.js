/**
 * Created by admin-pc on 2019/4/15.
 */
let salaryList = [
  {
    value: 101010000,
    label: "面议",
    children: [{
      value: 101010100,
      label: "面议",
    }]
  }
];
(function settingSalaryData(){
  for(let i = 1, value = 101020000; i<3; i++, value+=10000){
    let children = [];
    console.log(value);
    for(let j = 1; j < 6;j++){
      children.push({
        value: value+j,
        label: i+j+'k',
      })
    };
    let obj = {
      value: value,
      label: i + 'k',
      children
    };
    salaryList.push(obj)
  }
})();



const serverEarnCity = {
  data: {
    salaryList
  },
  resmsg: "请求成功",
  resvalue: 1
};

export default  serverEarnCity;