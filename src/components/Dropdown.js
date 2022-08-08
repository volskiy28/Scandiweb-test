import React from "react";
export class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      haveText: "",
    };
  }
  render() {
    const { isOpen, haveText } = this.state;
    return (
      <div
        className={isOpen ? "dropdown active-dd" : "dropdown"}
        onClick={this.handleClick}
      >
        <div id="dd-text" data-iso={haveText} className="dropdown-text">
          {!haveText ? "$" : haveText}
        </div>
        {this.itemList(this.props.currencyList)}
      </div>
    );
  }

  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  handleText = (e) => {
    this.setState({
      haveText: e.currentTarget.textContent.slice(0, 2),
    });
  };

  itemList = (props) => {
    let i = 0;
    const list = props.map((item) => (
      <div onClick={this.handleText}>
        <li
          className="dropdown-item"
          key={item.toString()}
          value={i++}
          onClick={(e) => {
            this.props.selectCurrency(e.target.value);
          }}
        >
          {item}
        </li>
      </div>
    ));

    return <div className="dropdown-items"> {list} </div>;
  };
}

export default Dropdown;
