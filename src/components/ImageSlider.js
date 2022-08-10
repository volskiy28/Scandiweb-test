import React, {  PureComponent } from 'react';

class ImageSlider extends PureComponent {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

    this.state = {
      current: 0,
    };

    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
  }
  length = this.props.length;

  nextSlide() {
    if (this.state.current === this.length - 1) {
      this.setState({
        current: 0,
      });
    } else {
      this.setState({
        current: this.state.current + 1,
      });
    }
  }

  prevSlide() {
    if (this.state.current === 0) {
      this.setState({
        current: this.length - 1,
      });
    } else {
      this.setState({
        current: this.state.current - 1,
      });
    }
  }

  render() {
    return (
      <section className='slider'>
        {this.props.length > 1 && (
          <div className='img-nav'>
            <span onClick={this.prevSlide}>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='24' height='24' fill='black' fill-opacity='0.73' />
                <path
                  d='M14.25 6.06857L8.625 11.6876L14.25 17.3066'
                  stroke='white'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
            </span>
            <span onClick={this.nextSlide}>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  width='24'
                  height='24'
                  transform='matrix(-1 0 0 1 24 0)'
                  fill='black'
                  fill-opacity='0.73'
                />
                <path
                  d='M9.75 6.06808L15.375 11.6871L9.75 17.3062'
                  stroke='white'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
            </span>
          </div>
        )}
        {this.props.imgGallery.map((img, index) => {
          return (
            <div
              className={
                index === this.state.current ? 'slide active-slide' : 'slide'
              }
            >
              {index === this.state.current && (
                <img src={img} alt={this.props.imgAlt}></img>
              )}
            </div>
          );
        })}
      </section>
    );
  }
}

export default ImageSlider;
