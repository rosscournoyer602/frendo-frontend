/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-string-refs */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'react-cropper';
import placeholder from '../assets/avatar.jpg';
import 'cropperjs/dist/cropper.css';

export default class ImageCropper extends Component {
  render() {
    const { cropButton, handleCrop } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    const imageSrc = this.props.imageSrc || placeholder;
    return (
      <>
        <div className="image-cropper">
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
          />
        </div>
        <div className="form-field">
          <input
            className={`btn form-button ${cropButton}`}
            type="button"
            value="Crop Image"
            onClick={() => handleCrop(this.refs.cropper.getCroppedCanvas().toDataURL('image/jpeg'))}
          />
        </div>
      </>
    );
  }
}

ImageCropper.propTypes = {
  handleCrop: PropTypes.func.isRequired,
  imageSrc: PropTypes.string.isRequired,
  cropButton: PropTypes.string.isRequired
};
