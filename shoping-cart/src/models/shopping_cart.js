import service_shop from '../services/service_shop';
import { message } from 'antd';

const initialState = {
  cart_total_goods: [], //购物车商品
  cart_goods_number: { //购物车内每件商品的数量
  },
  total_goods_number: 0 //购物车内商品总量
}

const shopping_cart = {
  namespace: "shopping_cart",
  state: initialState,
  effects: {
    *checkout(action, { call, put, select }) {
      const { shopping_cart } = yield select();
      console.log("checkout cart", shopping_cart);
      const res = yield call(service_shop.buyProducts, shopping_cart);
      yield put({
        type: "checkoutCompleted",
        payload: res
      });
    }
  },
  reducers: {
    addToCart: (state, { payload: { id, size } }) => {
      message.success("添加物品成功", [2])
      return {
        ...state,
        cart_total_goods: state.cart_total_goods.findIndex((v) => { return v.id === id && v.size === size }) === -1 ? [...state.cart_total_goods, { id, size }] : [...state.cart_total_goods],
        cart_goods_number: {
          ...state.cart_goods_number,
          [id + size]: (state.cart_goods_number[id + size] || 0) + 1
        },
        total_goods_number: state.total_goods_number + 1,
      }
    },
    minusOne: (state, { payload: { id, size } }) => {
      message.success("移除物品成功", [2])
      return {
        ...state,
        cart_goods_number: {
          ...state.cart_goods_number,
          [id + size]: state.cart_goods_number[id + size] - 1
        },
        total_goods_number: state.total_goods_number - 1
      }
    },
    removeFromCart: (state, { payload: { id, size, goods_number } }) => {
      state.cart_total_goods.splice(state.cart_total_goods.findIndex((v) => { return v.id === id && v.size === size }),1)
      message.success("移除物品成功", [2])
      return {
        ...state,
        cart_goods_number: {
          ...state.cart_goods_number,
          [id + size]: 0
        },
        total_goods_number: state.total_goods_number - goods_number
      }
    },
    checkoutCompleted: () => initialState
  }
}
export default shopping_cart;