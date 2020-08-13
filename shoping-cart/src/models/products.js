import service_shop from "../services/service_shop";

const products = {
  namespace: "products",
  state: {
    productsTotal: [], //全部商品
    result: [], //存放尺寸筛选后的结果
    now_size: [], //当前尺寸
    sort: "default", //排序默认default
  },
  effects: {
    *query(action, { call, put, select }) {
      const res = yield call(service_shop.getProducts);
      yield put({
        type: "setAllProducts",
        payload: res.data.products,
      });
      const { products } = yield select();
      if (products.now_size.length === 0) {
        if (products.sort === "default") {
          yield put({
            type: "setProducts",
            payload: res.data.products,
          });
          return;
        } else if (products.sort === "upper") {
          const result = new Array(...res.data.products);
          yield put({
            type: "setProducts",
            payload: result.sort((a, b) => a.price - b.price),
          });
          return;
        } else if (products.sort === "lower") {
          const result = new Array(...res.data.products);
          yield put({
            type: "setProducts",
            payload: result.sort((a, b) => b.price - a.price),
          });
          return;
        }
        yield put({
          type: "setProducts",
          payload: res.data.products,
        });
        return;
      }
      const result = res.data.products.filter((item) => {
        for (let value of products.now_size.values()) {
          if (item.availableSizes.includes(value)) {
            return true;
          }
        }
        return false;
      });
      if (products.sort === "default") {
        yield put({
          type: "setProducts",
          payload: result,
        });
        return;
      } else if (products.sort === "upper") {
        yield put({
          type: "setProducts",
          payload: result.sort((a, b) => a.price - b.price),
        });
        return;
      } else if (products.sort === "lower") {
        yield put({
          type: "setProducts",
          payload: result.sort((a, b) => b.price - a.price),
        });
        return;
      }
      yield put({
        type: "setProducts",
        payload: result,
      });
      return;
    },
  },
  reducers: {
    setAllProducts: (state, { payload }) => {
      return {
        ...state,
        productsTotal: payload,
      };
    },
    setProducts: (state, { payload }) => {
      return {
        ...state,
        result: payload,
      };
    },
    changeScreen: (state, { payload }) => {
      if(state.now_size[0] === payload) {
        state.now_size.splice(payload, 1)
        return {
          ...state
        }
      }
      if(state.now_size.length){
        const index = state.now_size.findIndex((v)=>{
          return v === state.now_size[0]
        })
        state.now_size.splice(index, 1)
      }
      return {
        ...state,
        now_size: [...state.now_size, payload]
      }
    },
    changeSort: (state, { payload = "default" }) => {
      return {
        ...state,
        sort: payload,
      };
    },
  },
};

export default products;
