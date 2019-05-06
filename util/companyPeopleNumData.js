/**
 * Created by admin-pc on 2019/5/5.
 */
let companyPeropleList = [

];
(function settingPeopleNumData(){
  for(let i = 2, value = 101020000; i<5; i++, value+=10000){
    let children = [];
    console.log(value);
    for(let j = 1; j < 6;j++){
      children.push({
        value: value+j,
        label: (i+j) * 10,
      })
    };
    let obj = {
      value: value,
      label: i * 10,
      children
    };
    companyPeropleList.push(obj)
  }
})();



const serverEarnCity = {
  data: {
    companyPeropleList
  },
  resmsg: "请求成功",
  resvalue: 1
};

export default  serverEarnCity;