let app = new Vue({
  el: '#app',
  data: {
    columns: [
      {
        title: '姓名',
        key: 'name'
      },
      {
        title: '年龄',
        key: 'age',
        sortable: true
      },
      {
        title: '出生日期',
        key: 'birthday',
        sortable: true
      },
      {
        title: '地址',
        key: 'address',
      }
    ],
    data: [
      {
        name: '王小明',
        age: 18,
        birthday: '1999-02-21',
        address: '北京市朝阳区芍药居'
      },
      {
        name: '王小明2',
        age: 23,
        birthday: '1999-05-21',
        address: '北京市朝阳区芍药居'
      },
      {
        name: '王小明3',
        age: 22,
        birthday: '1999-06-21',
        address: '北京市朝阳区芍药居'
      },
      {
        name: '王小明4',
        age: 34,
        birthday: '1999-08-21',
        address: '北京市朝阳区芍药居'
      },
    ]
  },
  methods: {
    handleAddData () {
      this.data.push( {
        name: '刘小天',
        age: 33,
        birthday: '2200-05-21',
        address: '北京市朝阳区芍药居'
      })
    }
  }
})
