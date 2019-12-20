Vue.component('tabs', {
  template: `
    <div class="tabs">
      <div class="tabs-bar">
        <div :class="tabCls(item)" 
              v-for="(item, index) in navList" 
              @click="handleChange(index)">
              {{item.label}}
        </div>
      </div>
      <div class="tabs-content">
        <slot></slot>
      </div>
    </div>
  `,
  props: {
    value: {
      type: [String, Number],
    }
  },
  data () {
    return {
      currentValue: this.value,
      // 用于渲染tabs的标题
      navList: []
    }
  },
  methods: {
    tabCls (item) {
      return [
        'tabs-tab',
        {
          'tabs-tab-active': item.name === this.currentValue
        }
      ]
    },
    getTabs () {
      return this.$children.filter((item) => {
        return item.$options.name === 'pane'
      })
    },
    updateNav () {
      this.navList = []
      this.getTabs().forEach((pane, index) => {
        this.navList.push({
          label: pane.label,
          name: pane.name || index
        })
        if (!pane.name) pane.name = index
        if (index === 0) {
          if (!this.currentValue) {
            this.currentValue = pane.name || index
          }
        }
        this.updateStatus()
      })
    },
    updateStatus () {
      let tabs = this.getTabs()
      tabs.forEach((tab) => {
        return tab.show = tab.name === this.currentValue
      })
    },
    handleChange (index) {
      let nav = this.navList[index]
      let name = nav.name
      this.currentValue = name
      this.$emit('input',name)
      this.$emit('on-click', name)
    },
  },
  watch: {
    value (val) {
      this.currentValue = val
    },
    currentValue () {
      this.updateStatus()
    }
  },
  mounted () {
    console.log(this.currentValue === this.value, this.navList[0].name, this.value);
  }
})
