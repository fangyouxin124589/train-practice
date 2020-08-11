import React from "react";
import { connect } from "dva";
import { Layout, Button, Drawer, Badge, Row, Col} from "antd";
import { createFromIconfontCN } from "@ant-design/icons";

const { Header, Content, Footer, Sider} = Layout;
const IconFont = createFromIconfontCN({
  scriptUrl: [
    "//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js", // icon-javascript, icon-java, icon-shoppingcart (overrided)
    "//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js", // icon-shoppingcart, icon-python
  ],
});

class ShoppingCart extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  closeDrawer = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
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
              Welcome to ShoppingCart
            </div>
          </Header>
          <Content></Content>
          <Footer style={{ textAlign: "center" }}>
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
        <div style={{ position: "fixed", top: 45, right: 60 }}>
          <Badge count={0} showZero>
            <Button size="large" onClick={this.showDrawer} shape="round">
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
          onClose={this.closeDrawer}
          visible={this.state.visible}
        ></Drawer>
      </div>
    );
  }
}

ShoppingCart.propTypes = {};

export default connect()(ShoppingCart);
