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
    console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
  }

  render() {
    return (
      <div className="form-field">
        <input className="form-text-input" type="file" name="firstName" id="firstname" required />
        <Cropper
          ref="cropper"
          src="http://i.pravatar.cc/200"
          style={{ height: 200 }}
          // Cropper.js options

          guides={false}
          crop={this._crop.bind(this)}
        />
      </div>
    );
  }
}
