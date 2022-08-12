import { PureComponent } from "react";
export class Dropdown extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      haveText: "",
    };
  }
  render() {
    const { haveText } = this.state;
    const { isOpen } = this.props;

    return (
      <div
        className={isOpen ? "dropdown active-dd" : "dropdown"}
        onClick={() => {
          this.props.handleClick()
        }}
      >
        <div id="dd-text" data-iso={haveText} className="dropdown-text">
          {!haveText ? "$" : haveText}
        </div>
        <div className={isOpen ? "modal-backdrop" : ""}></div>
        {this.itemList(this.props.currencyList)}
      </div>
    );
  }

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
