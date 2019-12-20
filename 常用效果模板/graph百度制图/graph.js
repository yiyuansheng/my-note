// 战绩人数统计
var persons = echarts.init(document.getElementById('persons'));
var psOption = {
    title: {
        text:'人数趋势'
    },
    xAxis: {
        name: '月份',
        data:["1","2","3","4","5","6","7","8","9","10","11","12"],
        boundaryGap: false,
    },
    yAxis: {
       type: 'value',
       name: '人数趋势',
    },
    // 鼠标放上提示框
    tooltip:{
        trigger: 'axis'
    },
    // 内容与画布的距离
    grid: {
      right: '15%',
        left: '10%',
        top: '20%'
    },
    series: [{
        type: 'line',
        // 圆滑曲线
        smooth: 0.2,
        // color:'blue',
        data: [10,25,35,55,45,65,55,75,85,95,85,75],
        // 分隔区域样式、面积图渐变色、
        areaStyle:{
            color:{
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    {
                        offset: 0,
                        color: 'red'
                    },
                    {
                        offset: 0.5,
                        color: 'blue'
                    },
                    {
                        offset: 1,
                        color: 'green'
                    }
                ],
                globalCoord: false
            }
        },
        // 坐标点的样式
        symbol: 'roundRect',
        symbolSize: 10
    }],
    color: 'green',
    // 内容缩放设置
    dataZoom: [
        {
            type: 'inside',
            xAxisindex: 0,
            start: 0,
            end:45,
            zoomLock: true
        }
    ]
}
persons.setOption(psOption)
// 登录次数
var loginTimes = echarts.init(document.getElementById('loginTimes'));
var ltOption = {
    title: {
        text: '登录次数',
        show: true,
        subtext: '最近一周',
        x: 'center',
    },
    tooltip:{
        trigger: 'axis'
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    // legend: {
    //     data:['登录次数']
    // },
    yAxis: {
        type: 'value',
    },
    series: [{
        name: '登录次数',
        data: [2450,1500,2352,1345,2450,3456,3520],
        type: 'line',
        areaStyle: {}
    }],
    color: '#85DA46',
    backgroundColor: '#fff'
};
loginTimes.setOption(ltOption);
// 登录人数
var loginPeople = echarts.init(document.getElementById('loginPeople'));
var lpOption = {
    title: {
        text: '登录人数',
        show: true,
        subtext: '最近一周',
        x: 'center'
    },
    tooltip:{
        trigger: 'axis'
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis: {
        type: 'value',
    },
    series: [{
        name: '登录次数',
        data: [850,700,954,823,1005,1500,1020],
        type: 'line',
        areaStyle: {}
    }],
    color: '#00D2DB',
    backgroundColor: '#fff'
}
loginPeople.setOption(lpOption);
// 销售数量
var salesVolume = echarts.init(document.getElementById('salesVolume'));
var svOption = {
    title: {
        text: '销售量',
        show: true,
        subtext: '最近一周',
        x: 'center'
    },
    // 提示窗类型
    tooltip:{
        trigger: 'item'
    },
    legend: {
      bottom: 10,
      left: 'center',
      data: ['光学盈润磁膜','时光机光电活肤仪','光学修护喷喷霜','光学水润面膜']
    },
    // xAxis: {
    //     type: 'category',
    //     data: ['光学盈润磁膜','时光机光电活肤仪','光学修护喷喷霜','光学水润面膜']
    // },
    // yAxis: {
    //     type: 'value',
    // },
    series: [{
        name: '销售数量',
        type: 'pie',
        data: [
            {value:535, name: '光学盈润磁膜(一件两膜)'},
            {value:510, name: '时光机光电活肤仪'},
            {value:634, name: '光学修护喷喷霜'},
            {value:735, name: '光学水润面膜'}
        ],
        // 饼状图大小
        radius: '50%',
        label:{
            normal:{
                formatter(v) {
                    let text = v.name
                    return text.length < 8 ? text : `${text.slice(0,8)}\n${text.slice(8)}`
                }
            }
        }
}],
    backgroundColor: '#fff'
}
salesVolume.setOption(svOption);
// 销售额
var saleroom = echarts.init(document.getElementById('saleroom'));
var srOption = {
    title: {
        text: '销售额(元)',
        show: true,
        subtext: '最近一周',
        x: 'center'
    },
    tooltip:{
        trigger: 'item'
    },
    legend: {
      bottom: 10,
      left: 'center'
    },
    xAxis: {
        type: 'category',
        // boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis: {
        type: 'value',
    },
    series: [{
        data: [850,700,954,823,1005,1500,1020],
        type: 'bar'
    }],
    backgroundColor: '#fff'
}
saleroom.setOption(srOption);

/*窗口自适应，关键代码*/
setTimeout(function (){
    window.onresize = function () {
        loginTimes.resize()
        loginPeople.resize()
        salesVolume.resize();
        saleroom.resize();
    }
},200)