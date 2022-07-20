import React from 'react';

export class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      haveText: '',
    };
  }

  // Dropdown closes when users click outside the dd list
  componentDidMount() {
    const dd = document.querySelector('.dropdown');
    window.addEventListener('click', (e) => {
      if (e.target.getAttribute('id') !== 'dd-text') {
        dd.classList.remove('active-dd');
      }
    });
  }

  componentDidUpdate() {
    const aud = document.querySelector('#dd-text');
    if (aud.getAttribute('data-iso') === 'A$') {
      aud.classList.add('dropdown-text-aud');
    } else {
      aud.classList.remove('dropdown-text-aud');
    }
  }

  render() {
    const { isOpen, haveText } = this.state;

    return (
      <div
        className={isOpen ? 'dropdown active-dd' : 'dropdown'}
        onClick={this.handleClick}
      >
        <div id='dd-text' data-iso={haveText} className='dropdown-text'>
          {!haveText ? '$' : haveText}
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
    const list = props.map((item) => (
      <div
        onClick={this.handleText}
        className='dropdown-item'
        key={item.toString()}
      >
        {item}
      </div>
    ));

    return <div className='dropdown-items'> {list} </div>;
  };
}

export default Dropdown;
