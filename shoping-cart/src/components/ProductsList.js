import React from "react";
import { connect } from "dva";
import { Button, Row, Col, Select } from "antd";
import styles from "./ProductsList.css";
import ProductCard from "./ProductCard";

const { Option } = Select;

@connect(({ products }) => ({
  products: products.result,
  now_size: products.now_size,
}))
export default class ProductsList extends React.Component {
  render() {
    const { products, now_size, dispatch } = this.props;
    const changeSize = (size) => {
      dispatch({
        type: "products/changeSize",
        payload: size,
      });
      dispatch({
        type: "products/query",
      });
    };
    const changeSort = (sort) => {
      dispatch({
        type: "products/changeSort",
        payload: sort,
      });
      dispatch({
        type: "products/query",
      });
    };
    const sizeTotal = ["XS", "S", "M", "ML", "L", "XL", "XXL"];
    const sizeList = sizeTotal.map((item, key) => (
      <Button
        size="large"
        onClick={() => changeSize(item)}
        style={{ margin: 5 }}
        shape="round"
        key={key}
        type={now_size.includes(item) ? "primary" : "default"}
      >
        {item}
      </Button>
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
          <div className={styles.products_list}>
            <ProductCard />
          </div>
        </Col>
      </Row>
    );
  }
}
