import React from "react";
import { connect } from "dva";
import ProductsList from "../components/ProductsList";
import ShoppingCart from '../components/ShoppingCart'
import { Layout, Button, Drawer, Badge, Row, Col } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
import styles from './Shopping.css'

const { Header, Content, Footer, Sider } = Layout;
const IconFont = createFromIconfontCN({
  scriptUrl: [
    "//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js", // icon-javascript, icon-java, icon-shoppingcart (overrided)
    "//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js", // icon-shoppingcart, icon-python
  ],
});

class Shopping extends React.Component {
  state = { visible1: false, visible2: false };

  showDrawer1 = () => {
    this.setState({
      visible1: true,
    });
  };

  closeDrawer1 = () => {
    this.setState({
      visible1: false,
    });
  };

  showDrawer2 = () => {
    this.setState({
      visible2: true,
    });
  };

  closeDrawer2 = () => {
    this.setState({
      visible2: false,
    });
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "products/query",
    });
  }

  render() {
    const { total_goods_number } = this.props;
    return (
      <div>
        <Layout>
          <Header>
            <div
              style={{
                color: "white",
                fontWeight: "bolder",
                fontSize: "20px",
                textAlign: "center",
              }}
            >
              Welcome to Shopping
            </div>
          </Header>
          <Content>
            <Row>
              <Col span={2}></Col>
              <Col span={20}>
                <ProductsList />
              </Col>
              <Col span={2}></Col>
            </Row>
          </Content>
          <Footer
            style={{ textAlign: "center", background: "rgb(199, 199, 199)" }}
          >
            <div
              style={{
                color: "black",
                fontWeight: "bolder",
                fontSize: "18px",
              }}
            >
              版权所属@方友鑫
            </div>
          </Footer>
        </Layout>
        <div className={styles.cart_btn1}>
          <Badge count={total_goods_number} showZero>
            <Button size="large" onClick={this.showDrawer1} shape="round">
              <IconFont
                type="icon-shoppingcart"
                style={{ fontSize: "28px", width: "30px" }}
              />
            </Button>
          </Badge>
        </div>
        <div className={styles.cart_btn2}>
          <Badge count={total_goods_number} showZero>
            <Button size="large" onClick={this.showDrawer2} shape="round">
              <IconFont
                type="icon-shoppingcart"
                style={{ fontSize: "28px", width: "30px" }}
              />
            </Button>
          </Badge>
        </div>
        <Drawer
          title="Your Shopping Cart"
          width="600"
          placement="right"
          onClose={this.closeDrawer1}
          visible={this.state.visible1}
        >
          <ShoppingCart />
        </Drawer>
        <Drawer
          title="Your Shopping Cart"
          width="350"
          placement="right"
          onClose={this.closeDrawer2}
          visible={this.state.visible2}
        >
          <ShoppingCart />
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = ({ shopping_cart }) => ({
  total_goods_number: shopping_cart.total_goods_number
})

export default connect(mapStateToProps)(Shopping);
