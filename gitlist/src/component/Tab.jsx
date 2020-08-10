import React from "react";
import axios from "axios";
import GithubList from "./GithubList";
import Load from "./Load";
import "../css/Tab.css";
import InfiniteScroll from "react-infinite-scroller";

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabList: [
        {
          name: "All",
          url:
            "https://api.github.com/search/repositories?q=stars:%3E11&sort=stars&order=desc&type=Repositories&page=",
        },
        {
          name: "java",
          url:
            "https://api.github.com/search/repositories?q=stars:%3E11+language:java&sort=stars&order=desc&type=Repositories&page=",
        },
        {
          name: "javascript",
          url:
            "https://api.github.com/search/repositories?q=stars:%3E11+language:javascript&sort=stars&order=desc&type=Repositories&page=",
        },
        {
          name: "css",
          url:
            "https://api.github.com/search/repositories?q=stars:%3E11+language:css&sort=stars&order=desc&type=Repositories&page=",
        },
        {
          name: "ruby",
          url:
            "https://api.github.com/search/repositories?q=stars:%3E1+language:ruby&sort=stars&order=desc&type=Repositories&page=",
        },
        {
          name: "python",
          url:
            "https://api.github.com/search/repositories?q=stars:%3E1+language:python&sort=stars&order=desc&type=Repositories&page=",
        },
      ],
      tabName: "All",
      tabUrl:
        "https://api.github.com/search/repositories?q=stars:%3E11&sort=stars&order=desc&type=Repositories&page=",
      githubData: [],
      count: 0,
      loading: true,
      pageNum: 1,
      pageTotal: 3,
      hasMore: true,
    };
  }

  switchTab = (e, { name, url }) => {
    let { target } = e;
    const filterOption = target.getAttribute("data-filter");
    if (filterOption) {
      document.querySelectorAll(".tab-list.active").forEach((btn) => {
        btn.classList.remove("active");
      });
      target.classList.add("active");
    }
    this.setState({
      githubData: [],
      tabName: name,
      tabUrl: url,
      pageNum: 1,
      hasMore: true,
    });
    localStorage.setItem("name", name);
    localStorage.setItem("url", url);
    setTimeout(() => {
      this.FetchGit();
    }, 200);
  };

  //获得数据
  async FetchGit() {
    if (this.state.count === 0) {
      const name = localStorage.getItem("name");
      if (name) {
        const res = await axios.get(localStorage.getItem("url"));
        this.setState({
          githubData: res.data.items,
          loading: false,
          count: this.state.count + 1,
          name: localStorage.getItem("name"),
          tabUrl: localStorage.getItem("url"),
          pageNum: 2,
        });
        const filterOption = document.getElementById(
          localStorage.getItem("name")
        );
        if (filterOption) {
          document
            .querySelectorAll(".tab-list.active")
            .forEach((btn) => btn.classList.remove("active"));
          filterOption.classList.add("active");
        }
      } else {
        const { pageNum, tabUrl, githubData, pageTotal } = this.state;
        if (pageNum > pageTotal) {
          this.setState({
            hasMore: false,
          });
          return;
        }
        const url = tabUrl + pageNum;
        const res = await axios.get(url);
        this.setState({
          githubData: githubData.concat(res.data.items),
          loading: false,
          pageNum: pageNum + 1,
        });
        const filterOption = document.getElementById("All");
        if (filterOption) {
          document
            .querySelectorAll(".tab-list.active")
            .forEach((btn) => btn.classList.remove("active"));
          filterOption.classList.add("active");
        }
      }
    } else {
      const { pageNum, tabUrl, githubData, pageTotal } = this.state;
      if (pageNum > pageTotal) {
        this.setState({
          hasMore: false,
        });
        return;
      }
      const url = tabUrl + pageNum;
      const res = await axios.get(url);
      this.setState({
        githubData: githubData.concat(res.data.items),
        loading: false,
        pageNum: pageNum + 1,
      });
    }
  }

  componentDidMount() {
    this.FetchGit();
  }

  render() {
    let renderInfo;
    const { githubData, loading, hasMore } = this.state;
    const addList = loading ? "add_hide" : "add_more";
    if (githubData.length !== 0) {
      renderInfo = (
        <InfiniteScroll
          pageStart={0}
          loadMore={() => this.FetchGit()}
          hasMore={hasMore}
          loader={
            <div className="tabLoading">
              <div className="tabLoadingContent">
                正在查找<i className="fa fa-spinner fa-spin"></i>
              </div>
            </div>
          }
        >
          <div className="listContent">
            {githubData.map((item, index) => {
              return (
                <GithubList
                  key={index}
                  listNum={++index}
                  avatar={item.owner.avatar_url}
                  name={item.name}
                  starsCount={item.stargazers_count}
                  forksCount={item.forks_count}
                  openIssuesCount={item.open_issues_count}
                  htmlUrl={item.html_url}
                />
              );
            })}
          </div>
        </InfiniteScroll>
      );
    } else {
      renderInfo = (
        <div>
          <h3 style={{ textAlign: "center" }}>
            世界名画~（github热门项目加载中）
          </h3>
          <Load />
        </div>
      );
    }
    return (
      <div>
        <span className="title">Github热门项目</span>
        <div className="tab">
          {this.state.tabList.map((list, index) => {
            return (
              <button
                key={index}
                className="tab-list"
                data-filter={list.name}
                id={list.name}
                onClick={(e) => this.switchTab(e, list)}
              >
                {list.name}
              </button>
            );
          })}
        </div>
        <div className="list-content">{renderInfo}</div>
      </div>
    );
  }
}

export default Tab;
