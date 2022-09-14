class Scroll {

    constructor(toScroll) {
        this.scrolling = false;
        this.element = toScroll;
    
        return this;
    }

    request(options) {
        if (this.scrolling)
            return;

        if (!options)
            options = {};

        // px
        let scroll = options.scroll || 225;
        // ms
        const time = options.time || 95;
        // fps
        const interval = (time / scroll) * (scroll.fps || 30);

        if ((options.direction || 'right') == 'left')
            scroll *= -1;

        let i = 0;

        this.scrolling = true;

        const anim = () => {
            if (i >= interval) {
                this.scrolling = false;
                return;
            }

            i += 1;
            this.element.scrollLeft += scroll / interval;
            setTimeout(anim, interval);
        };

        anim();
    }
}

const list = document.getElementById('list');
const options = {
  scroll: 300,
  time: 150,
  fps: 30
};

const scroll = new Scroll(list);

document.getElementById('nav-left').onclick = () => {
  const opts = options;
  opts.direction = 'left';
  
  scroll.request(opts);
}

document.getElementById('nav-right').onclick = () => {
  const opts = options;
  opts.direction = 'right';
  
  scroll.request(opts);
}