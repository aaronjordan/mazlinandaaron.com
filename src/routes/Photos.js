import React, {useState, useCallback} from 'react';
import AdaptiveImg from '../AdaptiveImg';
import {ImageContext} from '../App';
import FlexBorderContainer from '../layout/FlexBorderContainer';

import plusIcon from '../img/ajPlusIcon.svg'
import {NO_PREFETCH_PREFIX} from '../ImageLoader';
import './Photos.scss';

/**
 * This component is special because it does not have all images prefetched on load.
 */
export default function Photos() {
  const ImageLibrary = React.useContext(ImageContext);
  const isInitComplete = useCallback((sectionIndex) => Object.keys(ImageLibrary).some(key => key.startsWith?.(NO_PREFETCH_PREFIX[sectionIndex])), [ImageLibrary]);
  const [imageInitComplete, setImageInitComplete] = useState([isInitComplete(0),isInitComplete(1),isInitComplete(2)]);
  const initWasCalled = React.useRef([false, false, false]);

  const quickLabelList = new Array(35).fill(3).map((x, i) => String(x+i).padStart(2, '0'));
  quickLabelList.splice(11, 1);
  quickLabelList.splice(8, 1);

  const weddingLabelList = new Array(44).fill(2).map((x, i) => String(x+i).padStart(3, '0'));
  const engagementLabelList = new Array(17).fill(2).map((x, i) => String(x+i).padStart(3, '0'));

  const clickThisIndex = idx => void document.getElementById(NO_PREFETCH_PREFIX + quickLabelList[idx]).click();

  const handleModalMove = (e, startLabel, type) => {
    const thisIdx = startLabel.slice(-2);
    const thisArrayIdx = quickLabelList.findIndex(x => x === thisIdx);
    switch (type) {
      case 'next':
        clickThisIndex((thisArrayIdx + 1) % quickLabelList.length);
        break;
      case 'back':
        clickThisIndex((thisArrayIdx - 1) < 0 ? quickLabelList.length-1 : thisArrayIdx - 1);
        break;
      default:
        break;
    }
  };

  const initializeSection = (sectionIndex) => {
    if(typeof ImageLibrary.initAllWithPrefix == "function"
    && initWasCalled.current[sectionIndex] === false
    && !isInitComplete(sectionIndex)) {
      initWasCalled.current[sectionIndex] = true;
      
      const initGallery = async () => {
        console.log('dispatch for section ', sectionIndex)
        await ImageLibrary.initAllWithPrefix?.(NO_PREFETCH_PREFIX[sectionIndex]);
        setImageInitComplete(arr => [...arr].splice(sectionIndex, 1, true));
      };
      
      initGallery();
    } else {
      initWasCalled.current[sectionIndex] = true;
    }
  };

  //FIXME: merge new section code below

  const [sectionsOpen, setSectionsOpen] = useState([false, false, false]); // in rendering order, which sections are open?
  const toggleSectionByIndex = (idx) => setSectionsOpen(current => {
    const newArr = new Array(...current);
    newArr[idx] = !current[idx];
    return newArr;
  });

  const handleToggle = (e, idx) => {
    e.stopPropagation();
    toggleSectionByIndex(idx);
    initializeSection(idx);
  };

  const generateHeading = (title, index) => (
    <FlexBorderContainer 
      align="left" 
      as="h2" 
      customClassName="photo-expander"
      onClick={(e) => handleToggle(e, index)}>
      <img 
        src={plusIcon} 
        alt="expand gallery section"
        className={`expand-section-icon ${sectionsOpen[index] ? "open" : "closed"}`}
      />
      <span className="heading-title">{title}</span>
    </FlexBorderContainer>
  );

  return (
    <main className="photos-tab">
      {generateHeading("Wedding Day", 0)}
      <section className={`wedding-photos ${sectionsOpen[0] ? "open" : "closed"}`}>
        {!imageInitComplete ? <p className="center">loading gallery...</p> : 
        <div id="grid1">
          { weddingLabelList.map(
              (labelID) => <AdaptiveImg 
              key={labelID} 
              label={"w0" + labelID} 
              className={'i'+labelID} 
              onModalMove={handleModalMove}
              modal 
              static />
            )
          }
        </div>}
      </section>
      {generateHeading("Formal Engagement Photos", 1)}
      <section className={`wedding-photos ${sectionsOpen[1] ? "open" : "closed"}`}>
        {!imageInitComplete ? <p className="center">loading gallery...</p> : 
        <div id="grid2">
          { engagementLabelList.map(
              (labelID) => <AdaptiveImg 
              key={labelID} 
              label={"e0" + labelID} 
              className={'i'+labelID} 
              onModalMove={handleModalMove}
              modal 
              static />
            )
          }
        </div>}
      </section>
      {generateHeading("Engagement Party and Earlier", 2)}
      <section className={`other-photos ${sectionsOpen[2] ? "open" : "closed"}`}>
        {!imageInitComplete ? <p className="center">loading gallery...</p> : 
        <div id="grid">
          { quickLabelList.map(
              (labelID) => <AdaptiveImg 
              key={labelID} 
              label={"p0" + labelID} 
              className={'i'+labelID} 
              onModalMove={handleModalMove}
              modal 
              static />
            )
          }
        </div>}
      </section>
    </main>
  )
}
