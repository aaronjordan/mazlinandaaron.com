import React, {useEffect, useState, useContext} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronCircleLeft, faChevronCircleRight, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {QUALITY_GRADES} from './ImageLoader';
import {ImageContext} from './App';

/**
 * Adaptive image element. Accepts props:
 * label<string>: the image label on server
 * maxQuality<number>: an integer to specify the maximum quality to use for the specified label. Default is 1.
 * alt<string>: alt text to use for the generated element
 * className<string>:an additional className to specify for the generated element
 */
const AdaptiveImg = props => {
  const ImageLibrary = useContext(ImageContext);
  const [imgBlob, setImgBlob] = useState(ImageLibrary[props.label]);
  const [imgQuality, setImgQuality] = useState(ImageLibrary.qualityTable?.[props.label] || QUALITY_GRADES[0]);
  const targetQuality = Number.isInteger(Number(props.maxQuality)) ? 
    QUALITY_GRADES[Math.min(props.maxQuality, QUALITY_GRADES.length-1)] : 
    QUALITY_GRADES[1];
  const updateRunning = React.useRef(false);

  const isModalEnabled = props.modal === true;
  const isModalControlEnabled = typeof props.onModalMove == "function";
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  useEffect(() => {
    setImgBlob(img => img !== ImageLibrary[props.label] ? ImageLibrary[props.label] : img);
  }, [props.label, ImageLibrary]);

  useEffect(() => {
    if(props.label && !updateRunning.current && typeof ImageLibrary.updateImage == "function") { 
      updateRunning.current = true;
      if (QUALITY_GRADES.indexOf(imgQuality) < QUALITY_GRADES.indexOf(targetQuality)) {
        console.log('update to label ', props.label)
        // get higher quality image and swap
        ImageLibrary.updateImage(props.label, targetQuality)
          .then(() => {
            setImgQuality(targetQuality); 
            updateRunning.current = false;
          })
          .catch((fail) => {
            fail && console.warn('image update failed for label ' + props.label);
            updateRunning.current = false;
          });
      }
    } 
  }, [imgQuality, props.label, ImageLibrary, targetQuality]);

  return imgBlob ? 
    <>
      <img 
        src={imgBlob} 
        alt={props.alt}
        id={props.label}
        className={`${imgQuality} ${props.className || ""} ${isModalEnabled ? "with-modal" : ""}`}
        onClick={isModalEnabled ? () => setIsModalOpen(true) : undefined} 
      />
      { isModalEnabled && isModalOpen &&
        <aside 
          className={`img-modal ${isModalOpen ? 'open' : 'closed'}`} 
          onClick={() => setIsModalOpen(false)} >
          <img 
            src={imgBlob} 
            alt={props.alt} 
            className={`${imgQuality}`}
          />
          <img 
            src={imgBlob} 
            alt={props.alt} 
            className={`${imgQuality} ${"modal-shadow"}`}
          />
          { isModalControlEnabled && 
            <div className="controls">
              <span className="action-button" onClick={e => props.onModalMove(e, props.label, 'back')}>
                <FontAwesomeIcon icon={faChevronCircleLeft} />
              </span>
              <span className="action-button" onClick={e => props.onModalMove(e, props.label, 'next')}>
                <FontAwesomeIcon icon={faChevronCircleRight} />
              </span>
            </div>
          }
          <div className="close-control">
            <span className="action-button">
              <FontAwesomeIcon icon={faTimesCircle} />
            </span>
          </div>
        </aside> 
      }
    </> : <img 
        src="https://via.placeholder.com/300" 
        alt={props.alt}
        id={props.label || ''}
        className={`${imgQuality} ${props.className || ""}`}
        onClick={isModalEnabled ? () => setIsModalOpen(true) : undefined} 
      />;

}

export default AdaptiveImg;