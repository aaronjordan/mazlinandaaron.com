import React from 'react';

const imageReducer = (state, action) => {

  switch (action?.type) {
    case 'INIT_IMAGE_LIST':
      // make call to get list of images with links only
      break;

    case 'IMAGE_PREFETCH':
      // make call to get thumbnail for all images
      break;
    
    case 'FETCH_IMAGE':
      // get image with params: q -> quality 'm'/'h' ; id -> label 'img1' 
  }

  return state;
}

export const ImageStore = () => {
  /*
  {
    img1: {
      low: <IMAGE>
      med: <IMAGE>
      high: <IMAGE>
      linkLow: <string>
      linkMed: <string> || null
      linkHigh: <string> || null
    },
    ...
  }

  */

  const [imgStore, dispatch] = React.useReducer(imageReducer, {});

  return <></>;
};

export default ImageEngine;