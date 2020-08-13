import React from "react";
import { connect } from "dva";
import { Card, Button, Popover, List, Row, Col, Select } from "antd";
import styles from "./ProductsList.css";

const { Option } = Select;

class ProductsList extends React.Component {
  render() {
    const {
      products,
      now_size,
      addToCart,
      changeScreen,
      changeSort,
    } = this.props;
    const sizeTotal = ["XS", "S", "M", "ML", "L", "XL", "XXL"];
    const sizeList = sizeTotal.map((item, key) => (
      <Button
        size="large"
        onClick={() => changeScreen(item)}
        style={{ margin: 5 }}
        shape="round"
        key={key}
        type={now_size.includes(item) ? "primary" : "default"}
      >
        {item}
      </Button>
    ));
    const productsList = (products || []).map((item, key) => (
      <Card
        hoverable 
        className={styles.card}
        key={key}
        cover={<img alt={item.title + "_1.jpg"} src={"./assets/products_img/" + item.sku + "_1.jpg"}></img>}
      >
        <h2 style={{ textAlign: "center" }}>{item.title}</h2>
        <hr
          style={{
            width: "20%",
            backgroundColor: "orange",
            height: "2px",
            border: "none",
          }}
        />
        <h3 style={{ textAlign: "center" }}>
          {item.currencyFormat} <strong>{item.price.toFixed(2)}</strong>
        </h3>
        <Popover
          content={
            <List
              size="small"
              dataSource={item.availableSizes}
              renderItem={(sitem) => (
                <List.Item>
                  <Button
                    onClick={() => addToCart(item.id, sitem)}
                    block
                    style={{
                      background: "black",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    {sitem}
                  </Button>
                </List.Item>
              )}
            />
          }
          title="Please to select your size"
          trigger="click"
        >
          <Button
            size="large"
            block
            style={{ background: "black", color: "white", fontWeight: "600" }}
          >
            Add to cart
          </Button>
        </Popover>
      </Card>
    ));
    return (
      <Row>
        <Col span={24}>
          <div
            style={{
              margin: 5,
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "space-around",
            }}
          >
            <div>
              <h3 style={{ margin: 5 }}>
                {products.length + " Product(s) found."}
              </h3>
            </div>
            <div style={{ marginRight: 20 }}>
              <span
                style={{
                  marginRight: "10px",
                  fontSize: "18px",
                  fontWeight: "bolder",
                }}
              >
                Order by
              </span>
              <Select
                defaultValue="default"
                style={{ width: 160 }}
                onChange={(value) => changeSort(value)}
              >
                <Option value="default">default</Option>
                <Option value="upper">toUpper</Option>
                <Option value="lower">toLower</Option>
              </Select>
            </div>
          </div>
        </Col>
        <Col span={24}>
          <div
            style={{
              margin: 5,
              justifyContent: "center",
              display: "flex",
              flexFlow: "row wrap",
            }}
          >
            <h2>Sizes:</h2>
          </div>
          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "center",
            }}
          >
            {sizeList}
          </div>
        </Col>
        <Col span={24}>
          <div className={styles.products_list}>{productsList}</div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ products }) => ({
  products: products.result,
  now_size: products.now_size,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (id, size) =>
    dispatch({
      type: "shopping_cart/addToCart",
      payload: {
        id,
        size,
      },
    }),
  changeScreen: (size) => {
    dispatch({
      type: "products/changeScreen",
      payload: size,
    });
    dispatch({
      type: "products/query",
    });
  },
  changeSort: (sort) => {
    dispatch({
      type: "products/changeSort",
      payload: sort,
    });
    dispatch({
      type: "products/query",
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
