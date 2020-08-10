import React from "react";
import { HashRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import '../css/Header.css'

//头部的链接：Popular Battle
class LinkList extends React.Component {
  render() {
    return (
      <ul className="header_ul">
        <li className="header_li">
          <NavLink to="/Popular" className="navlink">Popular</NavLink>
        </li>
        <li className="header_li">
          <NavLink to="/Battle" className="navlink">Battle</NavLink>
        </li>
      </ul>
    );
  }
}

//头部
class Header extends React.Component {
  render() {
    const nav = {
        width: "1200px",
        margin: "0 auto"
    }
    const { pagesClick, nowpages } = this.props;
    return (
      <nav style={nav}>
        <LinkList pagesClick={pagesClick} nowpages={nowpages}></LinkList>
      </nav>
    );
  }
}
export default Header;
