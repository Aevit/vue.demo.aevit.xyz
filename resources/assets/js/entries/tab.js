import Vue from 'vue';
import Tab from '../views/Tab.vue';

Vue.config.debug = true;

Promise.all([
  new Promise((resolve) => {
    if (window.addEventListener) {
      window.addEventListener('DOMContentLoaded', resolve);
    } else {
      window.attachEvent('onload', resolve);
    }
  }),
]).then((event) => {
  new Vue(Tab);
});
