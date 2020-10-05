import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    allBtn: false
  },
  mutations: {
    setList(state, list) {
      state.list = list
    },
    isSelectAll(state, boo) {
      state.allBtn = boo
      state.list.forEach(item => (item.isPay = boo))
    },
    oneSelect(state, params) {
      const index = state.list.findIndex(item => item.id === params.id)
      state.list[index].isPay = params.boo
      let total = 0
      state.list.forEach(item => {
        if (item.isPay) {
          total += 1
        }
      })
      state.allBtn = total === state.list.length
    }
  },
  actions: {
    async getShopList(ctx) {
      const { data: res } = await axios.get('/list.json')
      ctx.commit('setList', res)
    }
  },
  getters: {
    amount(state) {
      let allPrice = 0
      state.list.forEach(item => {
        if (item.isPay) {
          allPrice += item.num * item.price
        }
      })
      return allPrice
    },
    total(state) {
      let allGoods = 0
      state.list.forEach(item => {
        if (item.isPay) {
          allGoods += item.num
        }
      })
      return allGoods
    }
  },
  modules: {}
})
