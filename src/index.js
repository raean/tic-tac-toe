import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


    // This is it's own function and not a class as it's simply a function component.
    /**
     * This is it's own function and not a class as it's simply a function component. It is passed props which contain the onClick we created and the value of the square ('X' or 'O')
     */
    function Square(props) {
        return(
        <button 
        className="square" 
        onClick={() => props.onClick()}>
          {props.value}
        </button>
      );
    }
    
    /**
     * This function is another 'function component' that is  passed the current state of the squares to determine if there is a winner or not. If there is a winner, it will return the value of the square ('X' or 'O') and if there is no declared winner, it will return null;
     */
    function calculateWinner(squares) {
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
        for (let i = 0 ; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] ) {
                return squares[a];
            }
        }
        return null;
    }
  
  class Board extends React.Component {


    renderSquare(i) {
      return (
      <Square 
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      />
      );
    }
  
    render() {
        
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null)
        }],
        xIsNext:true,
        stepNumber: 0
      };
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) == 0,
      });
    }

    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      // The below if-statement prevents users from filling in the square button if it has already been filled or if a winner is present.
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
          history: history.concat([{
            squares: squares
          }]),
          xIsNext: !this.state.xIsNext,
          stepNumber: history.length
      });
  }

    render() {
      //const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
          return (
            <li key={move}>
              <button onClick={() => this.jumpTo(move)}> {desc} </button>
            </li>
          );
      });

      let status;
      if (winner) {
          status = 'Winner: ' + winner;
      } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

        return (
          <div className="game">
            <div className="game-board">
              <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}/>
            </div>
            <div className="game-info">
              <div>{status}</div>
              <ol>{moves}</ol>
            </div>
          </div>
        );
      }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  