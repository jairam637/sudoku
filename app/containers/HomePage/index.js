import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import  Timer from "react-time-counter"
import './style.css'
export default class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      numbers: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      errorNum: {i: "", j: ""},
      colors: { 0: "zero", 2: "two", 4: "four", 8: "eight", 16: "sixteen", 32: "thirty-two", 64: "sixty-four", 128: "one-twenty-eight", 256: "two-fifty-six", 512: "five-twelve", 1024: "thousond-twenty-four", 2048: "twenty-forty-eight" },
      moves: 0,
      won: false,
    }
    this.layout = [];
    this.array = []
    this.errorNum = [];
    this.initialState = [];
    this.fillNumbers = this.fillNumbers.bind(this);
    // this.getLayout = this.getLayout.bind(this);
    this.onInput = this.onInput.bind(this);
  }
  componentWillMount() {
    this.fillNumbers().then(res => {
      this.setState({ numbers: res,init: res })
    })

  }
  async fillNumbers() {
    let numbers = this.state.numbers;
    let element = "";
    let i = 0;
    for (let i = 0; this.array.length <= 9; i++) {
      if (i == 50) {
        break;
      }
      element = parseInt(Math.random() * 10)
      if (!this.array.includes(element) && element != 0) {
        this.array.push(element)
        if (this.array.length == 1)
          numbers[1][2] = element
        else if (this.array.length == 2)
          numbers[0][4] = element
        else if (this.array.length == 3)
          numbers[2][7] = element
        else if (this.array.length == 4)
          numbers[5][1] = element
        else if (this.array.length == 5)
          numbers[4][5] = element
        else if (this.array.length == 6)
          numbers[3][8] = element
        else if (this.array.length == 7)
          numbers[6][0] = element
        else if (this.array.length == 8)
          numbers[8][3] = element
        else if (this.array.length == 9)
          numbers[7][6] = element
      }
    }
    
    this.initialState=numbers;
    return numbers
  }
  restart() {
    // this.forceUpdate();]
    console.log(this.initialState)
    this.setState({ numbers: this.state.init, moves: 0, }, );
  }
  undo() {
    this.setState({ numbers: this.state.last, moves: this.state.moves - 1, });
  }
  onInput(row, col, e) {
    let value = ""
    if(e.target.value !== "")
       value= parseInt(e.target.value);
    const regex = /^[1-9]*$/;
    let num = this.state.numbers;
    let error = false;
    for (let i = 0; i < 9; i++) {
      if (i != row && num[i][col] == value && value!="") {
        let errorNum = {i: i, j: col};
        
        this.setState({errorNum},this.forceUpdate());
        
        error = true;
      }
    }
    for (let i = 0; i < 9; i++) {
      if (i != col && num[row][i] == value && !error && value!="") {
        let errorNum = {i: row, j: i};
        this.setState({errorNum},this.forceUpdate());
        error = true;
      }
    }
    for (let i = parseInt(row / 3) * 3; i < parseInt(row / 3) * 3 + 3; i++) {
      for (let j = parseInt(col / 3) * 3; j < parseInt(col / 3) * 3 + 3; j++) {
        if (i != row && j != col && num[i][j] == value && !error && value!="") {
          let errorNum = {i: i, j: j};
          this.setState({errorNum},this.forceUpdate());

          error = true;
        }
      }
    }
    
    if ((regex.test(value) || value == "")  && !error) {
      num[row][col] = value;
      let errorNum = {i: "",j: ""};
      this.setState({ numbers: num,errorNum }, this.forceUpdate());

    }
    else if(value==""){
      num[row][col] = 0;
      let errorNum = {i: "",j: ""};
      this.setState({ numbers: num,errorNum }, this.forceUpdate());

    }
  }
  clear(){
    let errorNum = {i: "",j: ""};
    this.setState({errorNum},this.forceUpdate());
  }
  render() {
    let numbers = { ...this.state.numbers }
    let classRow = "";
    let modalShow = true;
    this.layout = [];

    for (let i = 0; i < 9; i++) {
      if (i == 0 || i == 3 || i == 6) {
        classRow = "rows border-top"
      }
      else if (i == 8) {
        classRow = "rows border-bot"
      }
      else {
        classRow = "rows"
      }
      this.layout.push(<div className={classRow}>
        {numbers[i][0] != 0 ? <div className={i==this.state.errorNum["i"] && this.state.errorNum["j"]==0 ? "tile border-left red":"tile border-left"}>{i != 6 ? <input className="inp" value={numbers[i][0] == 0 ? "" : numbers[i][0]} onChange={this.onInput.bind(this, i, 0)} maxLength={1} />:<div className="gray">{numbers[i][0]}</div>}</div> : <div className="inp-div border-left"><input className="inp" value={numbers[i][0] == 0 ? "" : numbers[i][0]} onChange={this.onInput.bind(this, i, 0)} maxLength={1} /></div>}
        {numbers[i][1] != 0 ? <div className={i==this.state.errorNum["i"] && this.state.errorNum["j"]==1 ? "tile red":"tile"}>{i != 5 ? <input className="inp" value={numbers[i][1] == 0 ? "" : numbers[i][1]} onChange={this.onInput.bind(this, i, 1)} maxLength={1} />:<div className="gray">{numbers[i][1]}</div>}</div> : <div className="inp-div "><input className="inp" value={numbers[i][1] == 0 ? "" : numbers[i][1]} onChange={this.onInput.bind(this, i, 1)} maxLength={1} /></div>}
        {numbers[i][2] != 0 ? <div className={i==this.state.errorNum["i"] && this.state.errorNum["j"]==2 ? "tile red":"tile"}>{i != 1 ? <input className="inp" value={numbers[i][2] == 0 ? "" : numbers[i][2]} onChange={this.onInput.bind(this, i, 2)} maxLength={1} />:<div className="gray">{numbers[i][2]}</div>}</div> : <div className="inp-div"><input className="inp" value={numbers[i][2] == 0 ? "" : numbers[i][2]} onChange={this.onInput.bind(this, i, 2)} maxLength={1} /></div>}
        {numbers[i][3] != 0 ? <div className={i==this.state.errorNum["i"] && this.state.errorNum["j"]==3 ? "tile border-left red":"tile border-left"}>{i != 8 ? <input className="inp" value={numbers[i][3] == 0 ? "" : numbers[i][3]} onChange={this.onInput.bind(this, i, 3)} maxLength={1} />:<div className="gray">{numbers[i][3]}</div>}</div> : <div className="inp-div border-left"><input className="inp" value={numbers[i][3] == 0 ? "" : numbers[i][3]} onChange={this.onInput.bind(this, i, 3)} maxLength={1} /></div>}
        {numbers[i][4] != 0 ? <div className={i==this.state.errorNum["i"] && this.state.errorNum["j"]==4 ? "tile red":"tile"}>{i != 0 ? <input className="inp" value={numbers[i][4] == 0 ? "" : numbers[i][4]} onChange={this.onInput.bind(this, i, 4)} maxLength={1} />:<div className="gray">{numbers[i][4]}</div>}</div> : <div className="inp-div"><input className="inp" value={numbers[i][4] == 0 ? "" : numbers[i][4]} onChange={this.onInput.bind(this, i, 4)} maxLength={1} /></div>}
        {numbers[i][5] != 0 ? <div className={i==this.state.errorNum["i"] && this.state.errorNum["j"]==5 ? "tile red":"tile"}>{i != 4 ? <input className="inp" value={numbers[i][5] == 0 ? "" : numbers[i][5]} onChange={this.onInput.bind(this, i, 5)} maxLength={1} />:<div className="gray">{numbers[i][5]}</div>}</div> : <div className="inp-div"><input className="inp" value={numbers[i][5] == 0 ? "" : numbers[i][5]} onChange={this.onInput.bind(this, i, 5)} maxLength={1} /></div>}
        {numbers[i][6] != 0 ? <div className={i==this.state.errorNum["i"] && this.state.errorNum["j"]==6 ? "tile border-left red":"tile border-left"}>{i != 7 ? <input className="inp" value={numbers[i][6] == 0 ? "" : numbers[i][6]} onChange={this.onInput.bind(this, i, 6)} maxLength={1} />:<div className="gray">{numbers[i][6]}</div>}</div> : <div className="inp-div border-left"><input className="inp" value={numbers[i][6] == 0 ? "" : numbers[i][6]} onChange={this.onInput.bind(this, i, 6)} maxLength={1} /></div>}
        {numbers[i][7] != 0 ? <div className={i==this.state.errorNum["i"] && this.state.errorNum["j"]==7 ? "tile red":"tile"}>{i != 2 ? <input className="inp" value={numbers[i][7] == 0 ? "" : numbers[i][7]} onChange={this.onInput.bind(this, i, 7)} maxLength={1} />:<div className="gray">{numbers[i][7]}</div>}</div> : <div className="inp-div"><input className="inp" value={numbers[i][7] == 0 ? "" : numbers[i][7]} onChange={this.onInput.bind(this, i, 7)} maxLength={1} /></div>}
        {numbers[i][8] != 0 ? <div className={i==this.state.errorNum["i"] && this.state.errorNum["j"]==8 ? "tile border-right red":"tile border-right"}>{i != 3 ? <input className="inp" value={numbers[i][8] == 0 ? "" : numbers[i][8]} onChange={this.onInput.bind(this, i, 8)} maxLength={1} />:<div className="gray">{numbers[i][8]}</div>}</div> : <div className="inp-div border-right"><input className="inp" value={numbers[i][8] == 0 ? "" : numbers[i][8]} onChange={this.onInput.bind(this, i, 8)} maxLength={1} /></div>}
      </div>)
      for(let j=0;j<9;j++){
        if(numbers[i][j] == 0){
          modalShow = false;
        }
      }
    }
    return (
      <div onClick={this.clear.bind(this)}>
        <div className="main-div">
          {
            this.layout
          }
        </div>
        <div onClick = {this.restart.bind(this)}>x</div>
          <div className="time">Time taken:  <Timer /></div>
        {modalShow ? <div><div onClick={()=>{ location.reload();}} className="modal-cover"></div><div className="modal"><div className="close-btn" onClick={()=>{ location.reload();}}>X</div><div className="win-msg">you won.....!!!! and you completed this task</div></div></div>:""}
      </div>
    );
  }
}
