import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'
export default {
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.isCheck = false
    state.carList.push(payload)
  }
}
  //mutations唯一的目的是修改state中的状态
  //mutations中的每个方法尽可能完成的事件比较单一
  // 对于逻辑比较复杂的事件，最好不要放在mutations中，应该放在actions