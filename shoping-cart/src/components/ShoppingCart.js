import React from "react";
import { connect } from "dva";
import { Button, List } from "antd";
const ShoppingCart = (props) => {
  const {
    products,
    subtotal,
    onCheckout,
    loading,
    checking,
    addToCart,
    minusOne,
    removeFromCart,
  } = props;
  return (
    <div style={{ height: "100%" }}>
      <div style={{ height: "75%", overflow: "auto" }}>
        <List
          itemLayout="horizontal"
          dataSource={products}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button.Group size="small">
                  <Button
                    onClick={() => minusOne(item.id, item.size)}
                    disabled={item.goods_number === 1}
                    type="primary"
                    size="middle"
                    shape="round"
                    style={{marginRight:"5px"}}
                  >
                    -
                  </Button>
                  <Button
                    onClick={() => addToCart(item.id, item.size)}
                    type="primary"
                    size="middle"
                    shape="round"
                  >
                    +
                  </Button>
                </Button.Group>,
                <Button
                  onClick={() =>
                    removeFromCart(item.id, item.size, item.goods_number)
                  }
                  shape="circle"
                  type="danger"
                  size="middle"
                >
                  X
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <img
                    src={"./assets/products_img/" + item.sku + "_2.jpg"}
                    alt={item.title + "_2.jpg"}
                    style={{ width: 50 }}
                  />
                }
                title={item.title}
                description={item.size + " | " + item.description}
              />
              <div>Quantity: {item.goods_number}</div>
            </List.Item>
          )}
        />
      </div>
      <div style={{ height: "25%" }}>
        <h3 style={{ textAlign: "center" }}>Subtotal: ${subtotal}</h3>
        <Button
          onClick={onCheckout}
          disabled={subtotal <= 0.0 || loading}
          size="large"
          block
        >
          {checking ? (
            <div style={{ color: "green" }}>CHECKOUT...</div>
          ) : (
            <div>CHECKOUT</div>
          )}
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ shopping_cart, products, loading }) => ({
  products: shopping_cart.cart_total_goods.map(({ id, size }) => ({
    ...products.productsTotal.filter((item) => item.id === id)[0],
    size: size,
    goods_number: shopping_cart.cart_goods_number[id + size],
  })),
  subtotal: shopping_cart.cart_total_goods
    .reduce(
      (amount, { id, size }) =>
        products.productsTotal.filter((item) => item.id === id)[0].price *
          shopping_cart.cart_goods_number[id + size] +
        amount,
      0
    )
    .toFixed(2),
  loading: loading.models["shopping_cart"],
  checking: loading.effects["shopping_cart/checkout"],
});

const mapDispatchToProps = (dispatch) => ({
  onCheckout: () =>
    dispatch({
      type: "shopping_cart/checkout",
    }),
  addToCart: (id, size) =>
    dispatch({
      type: "shopping_cart/addToCart",
      payload: {
        id,
        size,
      },
    }),
  minusOne: (id, size) =>
    dispatch({
      type: "shopping_cart/minusOne",
      payload: {
        id,
        size,
      },
    }),
  removeFromCart: (id, size, goods_number) =>
    dispatch({
      type: "shopping_cart/removeFromCart",
      payload: {
        id,
        size,
        goods_number,
      },
    }),
});
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
