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
      //方法一
      const { products } = yield select();
      /* //方法二
      const sort = yield select(state => state.products.sort);
      //方法三
      const { now_size } = yield select(_ => _.products)
      console.log(now_size);
      console.log(sort); */
      // console.log(products);
      if (products.now_size.length === 0) {
        if (products.sort === "default") {
          yield put({
            type: "getProducts",
            payload: res.data.products,
          });
          return;
        } else if (products.sort === "upper") {
          const result = new Array(...res.data.products);
          yield put({
            type: "getProducts",
            payload: result.sort((a, b) => { return a.price - b.price}),
          });
          return;
        } else if (products.sort === "lower") {
          const result = new Array(...res.data.products);
          yield put({
            type: "getProducts",
            payload: result.sort((a, b) => { return b.price - a.price}),
          });
          return;
        }
        yield put({
          type: "getProducts",
          payload: res.data.products,
        });
        return;
      }
      //result: 存放尺寸筛选后的结果
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
          type: "getProducts",
          payload: result,
        });
        return;
      } else if (products.sort === "upper") {
        yield put({
          type: "getProducts",
          payload: result.sort((a, b) => { return a.price - b.price}),
        });
        return;
      } else if (products.sort === "lower") {
        yield put({
          type: "getProducts",
          payload: result.sort((a, b) => { return b.price - a.price}),
        });
        return;
      }
    },
  },
  reducers: {
    getProducts: (state, { payload }) => {
      return {
        ...state,
        result: payload,
      };
    },
    changeSize: (state, { payload }) => {
      if (state.now_size[0] === payload) {
        // state.now_size.splice(0, 1);
        state.now_size = [];
        return {
          ...state,
        };
      }
      state.now_size = [];
      return {
        ...state,
        now_size: [...state.now_size, payload],
      };
    },
    changeSort: (state, { payload }) => {
      return {
        ...state,
        sort: payload,
      };
    },
  },
};

export default products;
