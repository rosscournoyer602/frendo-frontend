/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-string-refs */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export default class componentName extends Component {
  _crop() {
    // image in dataUrl
    console.log('CROP');
    if (this.refs.cropper) {
      console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
    }
  }

  render() {
    return (
      <div className="form-field image-cropper">
        {/* <input className="form-text-input" type="file" name="firstName" id="firstname" /> */}
        <div className="cropper-cover" />
        <Cropper
          ref="cropper"
          className="cropper"
          src="http://i.pravatar.cc/200"
          style={{ height: 200, width: 200 }}
          // Cropper.js options
          autoCrop={false}
          responsive
          zoomOnTouch
          modal="false"
          dragMode="move"
          guides={false}
          aspectRatio={1}
          viewMode={3}
          minCropBoxHeight={200}
          minContainerWidth={200}
          crop={this._crop.bind(this)}
        />
      </div>
    );
  }
}
