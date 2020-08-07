import React from "react";
import Square from "./Square";
import "../css/Board.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(""),
      player: "X",
      winner: "",
      winnerArr: [],
      history: [
        {
          squares: Array(9).fill(""),
          player: "X",
        },
      ],
      step: 1,
    };

    this.changePlayer = this.changePlayer.bind(this);
    this.calculateWinner = this.calculateWinner.bind(this);
    this.getClassName = this.getClassName.bind(this);
  }

  //更换棋手
  changePlayer(index) {
    if (this.state.winner) {
      return;
    }
    let player = this.state.player === "X" ? "O" : "X";
    let squares = [...this.state.squares];
    if (squares[index]) {
      return;
    }
    squares[index] = player;
    let history = this.state.history.slice(0, this.state.step);
    history.push({
      squares,
      player,
    });
    this.setState({
      player,
      squares,
      history,
      step: history.length,
    });
    let winner = this.calculateWinner(squares);
    if (winner) {
      this.setState({
        winner: winner.squares,
        winnerArr: winner.winnerArr,
      });
    }
  }

  //计算获胜旗子
  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return {
          squares: squares[a],
          winnerArr: lines[i],
        };
      }
    }

    return null;
  }

  //获胜棋子高亮
  getClassName(index) {
    let { winner, winnerArr } = this.state;
    if (winner) {
      for (let i = 0; i < 3; i++) {
        if (winnerArr[i] === index) {
          return "winner-square";
        }
      }
      return "";
    }
    return "";
  }

  //悔棋
  backTo = (e, i) => {
    let { target } = e;
    document.querySelectorAll(".back_btn.active").forEach((btn) => {
      btn.classList.remove("active");
    });
    target.classList.add("active");
    this.setState((state) => {
      return {
        winner: "",
        squares: state.history[i].squares,
        player: state.history[i].player,
        step: i + 1,
      };
    });
  };

  render() {
    let { player, squares, winner, history } = this.state;
    let title = "";
    if (!winner) {
      title = <p>Next player: {player == "X" ? "O" : "X"}</p>;
    } else {
      title = <p>Winner is: {winner}</p>;
    }
    return (
      <div className="flex">
        <div className="board">
          <h1>井字棋游戏--React</h1>
          {title}
          {squares.map((e, index) => {
            return (
              <Square
                key={index}
                player={e}
                changePlayer={() => {
                  this.changePlayer(index);
                }}
                winnerClass={this.getClassName(index)}
              />
            );
          })}
        </div>
        <div className="back_step">
          <p>悔棋</p>
          {history.map((e, i) => {
            return (
              <button
                key={i}
                onClick={(e) => {
                  this.backTo(e, i);
                }}
                data-filter={"number" + i}
                className="back_btn"
              >
                {i === 0 ? "Back to game start" : "Back to No:" + i + " step"}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Board;
