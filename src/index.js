import React from 'react';
import stackblur from 'stackblur';
import isEqual from 'lodash.isequal';

function blurCanvasForURL(canvas, src, radius) {
  let img = new Image();
  img.src = src;
  img.crossOrigin = 'Anonymous';
  img.onload = e => {
    blurCanvasFromImg(canvas, e.target, radius);
  }
}

function blurCanvasFromImg(canvas, img, radius=10) {
  let [w, h] = [img.width, img.height];
  canvas.width = w;
  canvas.height = h;

  let ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, w, h);

  let data = ctx.getImageData(0, 0, w, h);
  stackblur(data.data, w, h, radius);
  ctx.putImageData(data, 0, 0);
  return canvas;
}

export default class BlurredImage extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(newProps) {
    return !isEqual(newProps, this.props);
  }

  componentDidMount() {
    blurCanvasForURL(this.refs.canvas, this.props.src, this.props.radius);
    this.props.onLoad && this.props.onLoad.call(this);
  }

  componentDidUpdate() {
    blurCanvasForURL(this.refs.canvas, this.props.src, this.props.radius);
    this.props.onLoad && this.props.onLoad.call(this);
  }

  render() {
    return (
       <canvas ref="canvas" className="BlurredImage" aria-label={this.props.alt} aria-role="img" style={this.props.style} />
    )
  }
}
