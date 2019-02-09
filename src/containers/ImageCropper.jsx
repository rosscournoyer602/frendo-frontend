/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-string-refs */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'react-cropper';
import debounce from 'lodash.debounce';
import placeholder from '../assets/avatar.jpg';
import 'cropperjs/dist/cropper.css';

export default class ImageCropper extends Component {
  _crop() {
    const { handleCrop } = this.props;
    handleCrop(this.refs.cropper.getCroppedCanvas().toDataURL());
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const imageSrc = this.props.imageSrc || placeholder;
    return (
      <div className="form-field image-cropper">
        <div className="cropper-cover" />
        <Cropper
          ref="cropper"
          className="cropper"
          src={imageSrc}
          style={{ height: 200, width: 200 }}
          // Cropper.js options
          autoCrop={false}
          responsive
          zoomOnTouch
          modal={false}
          dragMode="move"
          guides={false}
          aspectRatio={1}
          viewMode={3}
          minCropBoxHeight={200}
          minContainerWidth={200}
          crop={debounce(this._crop.bind(this), 100, {
            leading: true
          })}
        />
      </div>
    );
  }
}

ImageCropper.propTypes = {
  handleCrop: PropTypes.func.isRequired,
  imageSrc: PropTypes.string.isRequired
};
