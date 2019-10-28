/**
 * Created by Administrator on 2019/10/21.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userId: 92,
  username:'郭凯凯',
  pathimg:'http://guokaikaio.vicp.cc'
}

export default  new  Vuex.Store({
  state
})

