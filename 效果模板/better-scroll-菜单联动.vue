<template>
  <div class="flex-start">
    <ul class="aside" :style="{ height: height + 'px' }">
      <li class="item" v-for="(item, index) in menus" :key="item.ID"
          :class="{active: active === index}"
          @click="clickMenu(index)"
      >
        <img :src="item.IMG1" alt="" class="img" v-if="item.IMG1">
        <van-icon name="photo-o" size="32" v-else/>
        <p class="mt-x">{{item.CAT_NAME}}</p>
      </li>
    </ul>
    <div class="section" ref="wrapper" :style="{ height: height + 'px' }">
      <div class="pv-1x">
        <section class="food-class" :ref="`c${idx}`"
                 v-for="(temp, idx) in menus" :key="'menu' + idx"
        >
          <p class="ph-2x text-c">
            <span class="primary">————</span>
            <b class="mh-2x font-l">{{temp.CAT_NAME}}</b>
            <span class="primary">————</span>
          </p>
          <ul>
            <li class="cards relative" v-for="(val, i) in temp.content" :key="'content' + i">
              <van-row>
                <van-col span="12">
                  <div class="img-container">
                    <img :src="val.IMG1" alt="" class="img" v-if="val.IMG1">
                    <van-icon name="photo-o" size="64" class="img disabled" v-else/>
                  </div>
                </van-col>
                <van-col span="11" offset="1" class="text-r">
                  <h3 class="text-nowrap-1">{{val.GOOD_DESCR}}</h3>
                  <h3 class="orange mt-2x">¥{{val.PRICE}}</h3>
                  <van-button type="info" icon="completed" round class="size-btn"
                              @click="choose(idx,i)" v-if="val.SELL_OUT !== 'Y'"
                  >选规格</van-button>
                  <van-button type="info" icon="discount" round class="size-btn" disabled v-else>已售罄</van-button>
                </van-col>
              </van-row>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Foods",
    data() {
      return {
        active: 0,
        menus: [], // 菜谱
        BScroll: null,
        height: 0, // 滚动区域高度
        heightList: [], // 点击菜单，内容滚动位置列表
      }
    },
    created() {
      this.getInnerHeight()
      window.onresize = () => {
        // this.$toast(window.matchMedia('(orientation: portrait)').matches.toString()) // 是否竖屏
        this.getInnerHeight()
      }
      this.loadFoods()
    },
    mounted() {
    },
    methods: {
      // 加载菜单
      loadFoods() {
        Promise.all([
          this.$fetch({
            url: '/api/Pos/GetGoodsCat'
          }),
          this.$fetch({
            url: '/api/Pos/GetPluInfByWhere'
          })
        ])
          .then(([menus, content]) => {
            menus.forEach(item => {
              item.content = content.filter(temp => item.ID === temp.GOODS_CAT_ID)
            })
            this.menus = menus
            this.initScroll()
          })
      },
      // 初始化滚动
      initScroll() {
        this.$nextTick(() => {
          const heightList = [0]
          let height = 0
          const content = this.$refs.wrapper
          const contentList = content.getElementsByClassName('food-class')
          contentList.forEach(item => {
            height += item.clientHeight
            heightList.push(height)
          })
          this.heightList = heightList
          this.BScroll = new BScroll(this.$refs.wrapper, {
            click: true,
            probeType: 3,
            swipeTime: 1000,
          })
          // 监听滚动
          this.BScroll.on('scrollEnd', ({ y }) => {
            const Y = Math.abs(y)
            for(let i = 0; i < this.heightList.length; i++) {
              const height = this.heightList[i]
              const height1 = this.heightList[i + 1]
              if (Math.abs(this.BScroll.maxScrollY) === Y) {
                this.active =  this.menus.length - 1
                break
              }
              if (!height1 || (Y < height1 && Y >= height)) {
                this.active =  i
                break
              }
            }
          })
        })
      },
      getInnerHeight() {
        this.height = window.innerHeight - 50
      },
      // 点击菜单
      clickMenu(i) {
        this.active = i
        const el = this.$refs[`c${i}`][0]
        this.BScroll.scrollToElement(el, 300, 0, -16)
      },
      // 选择规格
      choose() {
        console.log(6)
      }
    }
  }
</script>

<style scoped lang="less">
  .aside{
    width: 20vw;
    max-width: 120px;
    text-align: center;
    background: #fff;
    overflow-y: scroll;
    .item{
      border-left: 4px solid transparent;
      padding: 12px 12px 12px 8px;
      border-bottom: 0.5px solid #ebedf0;
      &.active{
        position: relative;
        border-left-color: var(--primary);
        font-weight: bold;
        color: black;
        background-color: #f5f5f5;
        &:after{
          display: block;
          content: '';
          width: 8px;
          height: 8px;
          position: absolute;
          right: -4px;
          bottom: -4px;
          border-radius: 50%;
          background: #f5f5f5;
        }
        &:before{
          display: block;
          content: '';
          width: 8px;
          height: 8px;
          position: absolute;
          right: -4px;
          top: -4px;
          border-radius: 50%;
          background: #f5f5f5;
        }
      }
      .img{
        width: 32px;
        height: 32px;
      }
    }
  }
  .section{
    flex-grow: 1;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    .img-container{
      position: relative;
      width: 100%;
      &:before {
        content: '';
        display: block;
        padding-top: 75%;
      }
      .img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .size-btn{
      position: absolute;
      right: 16px;
      bottom: 16px;
    }
  }

  @media screen and (max-width: 500px){
    .aside{
      .item{
        padding: 8px 12px 8px 8px;
        font-size: 12px;
      }
    }
    .section{
      .size-btn{
        height: 32px;
        padding: 0 12px;
        font-size: 12px;
      }
      h3{
        font-size: 14px;
        margin-top: 4px;
      }
    }
  }
</style>