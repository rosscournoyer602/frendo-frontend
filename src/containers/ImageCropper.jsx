import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const ImageCropper = (props) => {
	const cropperRef = useRef(null);
	const [imageSrc, setImageSrc] = useState(props.cropper)
	const [hideInput, setHideInput] = useState(false)
	const [canCrop, setCanCrop] = useState(false)

	const handleCrop = () => {
		const imageElement = cropperRef.current;
		const cropper =  imageElement.cropper;
		const canvas = cropper.getCroppedCanvas()
		if (canCrop) {
			const data = canvas.toDataURL()
			props.callback(data)
		} else {
			props.callback(null)
		}
	}
	
	const handleFile = (e) => {
    if (!e.target.files[0]) return;
    // const selectedFile = document.getElementById('avatar').files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const elem = document.createElement('canvas');    
        const width = 250;
        const scaleFactor = width / img.width;
        elem.width = width;
        const height = img.height * scaleFactor;
        elem.height = height;
        const ctx = elem.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
				const data = ctx.canvas.toDataURL('image/jpeg', .8);
				setImageSrc(data);
				setHideInput(true);
				setCanCrop(true);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    e.target.value = '';
	};

  return (
		<>
			<div className="cropper-cover" />
			<input 
				className={`form-file-input ${hideInput ? 'behind' : ''}`}
				accept="image/*" 
				onChange={handleFile} 
				type="file"
				name="avatar"
				id="avatar"
			/>
			<Cropper
				className="cropper"
				src={imageSrc}
				style={{ height: 200, width: 200 }}
				// Cropper.js options
				autoCrop
				responsive
				zoomOnTouch
				modal={false}
				dragMode="move"
				guides={false}
				aspectRatio={1}
				viewMode={3}
				minCropBoxHeight={200}
				minContainerWidth={200}
				checkCrossOrigin={false}
				ref={cropperRef}
			/>
			<button
				className="btn form-button"
				type="button"
				onClick={handleCrop}
			>
				Done
			</button>
		</>
  );
};

export default ImageCropper