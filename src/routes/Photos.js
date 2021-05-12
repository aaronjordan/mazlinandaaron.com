import React, {useState, useEffect} from 'react';
import AdaptiveImg from '../AdaptiveImg';
import {ImageContext} from '../App';

import {NO_PREFETCH_PREFIX} from '../ImageLoader';
import './Photos.scss';

/**
 * This component is special because it does not have all images prefetched on load.
 */
export default function Photos() {
  const ImageLibrary = React.useContext(ImageContext);
  const isInitComplete = () => Object.keys(ImageLibrary).some(key => key.startsWith?.(NO_PREFETCH_PREFIX));
  const [imageInitComplete, setImageInitComplete] = useState(isInitComplete());
  const initWasCalled = React.useRef(false);

  const quickLabelList = new Array(35).fill(2).map((x, i) => String(x+i).padStart(2, '0'));
  quickLabelList.splice(11, 1);
  quickLabelList.splice(8, 1);

  useEffect(() => {
    if(typeof ImageLibrary.initAllWithPrefix == "function"
    && initWasCalled.current === false
    && !isInitComplete()) {
      initWasCalled.current = true;
      
      const initGallery = async () => {
        await ImageLibrary.initAllWithPrefix?.(NO_PREFETCH_PREFIX);
        setImageInitComplete(true);
      };
      
      initGallery();
    }
  }, [ImageLibrary, setImageInitComplete]);

  return (
    <main className="photos-tab">
      {!imageInitComplete ? <p className="center">loading gallery...</p> : 
      <div id="grid">
        { quickLabelList.map((labelID) => <AdaptiveImg key={labelID} label={"p0" + labelID} className={'i'+labelID} modal />)}
      </div>}
    </main>
  )
}
