<template lang="jade">
.tab-container
  .tab-nav
    ul.tab-main-nav
      li.tab-main-nav-item(@click='setCategoryNav(0)', :class='{active: categoryNav === 0}') 产品设计
      li.tab-main-nav-item(@click='setCategoryNav(1)',:class='{active: categoryNav === 1}') 交互设计
      li.tab-main-nav-item(@click='setCategoryNav(2)',:class='{active: categoryNav === 2}') 视觉设计
    ul.tab-sub-nav
      li.tab-sub-nav-item(v-for='item in subNavList', :class='{active: subNav === item}' @click='setSubNav(item)') {{item}}
  .tab-list
    tab-item(v-for='item in subList', :info='item')
</template>

<script>
import TabItem from '../components/TabItem.vue'

export default {
  el() {
    return '#app'
  },
  data() {
    return {
      categoryNav: 0,
      totalData: allData,
      subNav: '全部'
    }
  },
  computed:{
    subNavList() {
      let self = this;
      let subList = self.totalData[self.categoryNav];

      let navList = ['全部'];
      for (var i = 0; i < subList.length; i++) {
        navList.push(subList[i].name);
      }
      return navList;
    },
    subList() {
      let self = this;
      let subList = self.totalData[self.categoryNav];

      let list = [];
      for (var i = 0; i < subList.length; i++) {
        let wList = subList[i].list;
        for (var j = 0; j < wList.length; j++) {
          if (self.subNav == '全部') {
            list.push(wList[j]);
          } else if (self.subNav == subList[i].name) {
            list.push(wList[j]);
          }
        }
      }
      return list;
    }
  },
  ready() {
  },
  methods: {
    setCategoryNav(nav) {
      this.categoryNav = nav;
      this.subNav = '全部';
    },
    setSubNav(nav) {
      this.subNav = nav;
    }
  },
  events: {
  },
  components: {
    TabItem
  }
}
</script>
