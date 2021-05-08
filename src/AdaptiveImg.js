import React, {useEffect, useState, useContext} from 'react';
import {QUALITY_GRADES} from './ImageLoader';
import {ImageContext} from './App';

const AdaptiveImg = props => {
  const ImageLibrary = useContext(ImageContext);
  const [imgBlob, setImgBlob] = useState(ImageLibrary[props.label]);
  const [imgQuality, setImgQuality] = useState(ImageLibrary.qualityTable?.[props.label] || QUALITY_GRADES[0]);
  const targetQuality = Number.isInteger(Number(props.maxQuality)) ? 
    QUALITY_GRADES[Math.min(props.maxQuality, QUALITY_GRADES.length-1)] : 
    QUALITY_GRADES[1];

  useEffect(() => {
    setImgBlob(img => img !== ImageLibrary[props.label] ? ImageLibrary[props.label] : img);
  }, [props.label, ImageLibrary]);

  useEffect(() => {
      if (QUALITY_GRADES.indexOf(imgQuality) < QUALITY_GRADES.indexOf(targetQuality)) {
        // get higher quality image and swap
        ImageLibrary.updateImage?.(props.label, targetQuality)
          .then(() => setImgQuality(targetQuality))
          .catch((fail) => {
            fail && console.warn('image update failed for label ' + props.label);
          });
      }
  }, [imgQuality, props.label, ImageLibrary, targetQuality]);

  return imgBlob ? <img src={imgBlob} alt={props.alt} className={`${imgQuality} ${props.className}`} /> : <></>;
}

export default AdaptiveImg;