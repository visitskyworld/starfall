function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

class StarrySky extends React.Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, 'state', {
      num: 80,
      vw: Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      ),
      vh: Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      ),
      scrollY: 1,
    });
    _defineProperty(
      this,
      'starryNight',

      () => {
        anime({
          targets: ['#sky .star'],
          opacity: [
            {
              duration: 700,
              value: '0',
            },

            {
              duration: 700,
              value: '1',
            },
          ],

          easing: 'linear',
          loop: true,
          delay: (el, i) => 50 * i,
        });
      }
    );
    _defineProperty(this, 'shootingStars', () => {
      anime({
        targets: ['#shootingstars .wish'],
        easing: 'linear',
        loop: true,
        delay: (el, i) => 1000 * i,
        opacity: [
          {
            duration: 700,
            value: '1',
          },
        ],

        width: [
          {
            value: '150px',
          },

          {
            value: '0px',
          },
        ],

        translateX: 350,
      });
    });
    _defineProperty(this, 'randomRadius', () => {
      return Math.random() * 0.7 + 2.5;
    });
    _defineProperty(this, 'getRandomX', () => {
      return Math.floor(Math.random() * Math.floor(this.state.vw)).toString();
    });
    _defineProperty(this, 'getRandomY', () => {
      return Math.floor(Math.random() * Math.floor(this.state.vh)).toString();
    });
  }
  componentDidMount() {
    this.starryNight();
    this.shootingStars();
    window.addEventListener(
      'wheel',
      (event) => {
        console.log(event.wheelDeltaY);
        if (event.wheelDeltaY > 0 && this.state.scrollY < 3) {
          this.setState(({ scrollY }) => ({
            scrollY: scrollY + event.wheelDeltaY / 1000,
          }));
        }
      },
      true
    );
  }
  componentWillUnmount() {
    window.removeEventListener('wheel');
  }
  render() {
    const { num } = this.state;
    return React.createElement(
      'div',
      { id: 'App' },
      React.createElement(
        'svg',
        { id: 'sky' },
        [...Array(num)].map((x, y) =>
          React.createElement('circle', {
            cx: this.getRandomX(),
            cy: this.getRandomY(),
            r: this.randomRadius(),
            stroke: 'none',
            strokeWidth: '0',
            fill: 'white',
            key: y,
            className: 'star',
          })
        )
      ),

      React.createElement(
        'div',
        { id: 'shootingstars' },
        [...Array(80)].map((x, y) =>
          React.createElement('div', {
            key: y,
            className: 'wish',
            style: {
              left: `${this.getRandomY()}px`,
              top: `${this.getRandomX()}px`,
            },
          })
        )
      ),

      React.createElement('img', {
        className: 'wallpaper',
        width: `${this.state.scrollY * 100}%`,
        height: `${this.state.scrollY * 100}%`,
        style: {
          left: `${(1 - this.state.scrollY) * 50}%`,
          top: `${(1 - this.state.scrollY) * 50}%`,
        },
        src: 'wallpaper.jpg',
      }),

      React.createElement('div', {
        className: 'neon',
        children: [
          React.createElement('h1', {
            className: 'pulse',
            children: 'Coming Soon...',
            style: {
              opacity: (this.state.scrollY - 1) / 2,
            },
          }),
        ],
      })
    );
  }
}

ReactDOM.render(
  React.createElement(StarrySky, null),
  document.getElementById('root')
);
