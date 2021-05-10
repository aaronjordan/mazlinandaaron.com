import React, {useEffect, useCallback, useRef} from 'react';
import axios from 'axios';

const IMAGE_BASE_URL =  '/media/image';
const ALLOW_CORS = Object.freeze(process.env.NODE_ENV === 'development' ? {headers: {'Access-Control-Allow-Origin': '*'}} : {});
export const QUALITY_GRADES = Object.freeze(['lq', 'mq', 'hq']);
const AUTO_LOAD_TYPE = QUALITY_GRADES[0];

/**
 * getImageDictionary()
 * Will fetch the list of images on the server organized into
 * groups of quality. 
 * @returns {object} the JSON dictionary, parsed.
 */
const getImageDictionary = () => {
    return new Promise((resolve, reject) => {
      axios.get(`${IMAGE_BASE_URL}/list`, ALLOW_CORS).then(res => {
        let dictionary = {};
        if (typeof res.data == 'object') {
          dictionary = res.data;
          resolve(dictionary);
        } else {
          console.error('Image dictionary failed at server call: invalid data');
          reject({});
        }
      }).catch(e => {
        console.error('Image dictionary failed at server call: invalid request');
        reject({});
      });
    });
};

/**
 * A component to manage images displayed.
 * Would like to load a low-res placeholder for every image on 
 * page load, then lazily update to a high-res version as a user
 * navigates the website.
 * 
 * props:
 * library<Array>: A result of a call to React.useState()
 * onInitialLoadComplete<function>: A callback function for the initial low-res images being loaded
 * 
 */
export const ImageLoader = props => {
  const { onInitialLoadComplete } = props;
  const [library, setLibrary] = props.library;

  const updateRef = useRef(null);

  const getHigherQuality = (label, preferredQuality) => {
    const currentAction = (resolve, reject) => {
      if (!library.dictionary || library.qualityTable?.[label] === preferredQuality) {
        reject(false);
      } else if (library.hasOwnProperty(label) 
      && library.dictionary?.[label]?.[preferredQuality]) {
        axios.get(library.dictionary[label][preferredQuality], {...ALLOW_CORS, responseType: 'blob'}).then(res => {
          if(res.data) {
            setLibrary(lib => {
              // return image at quality target
              const updatedTable = {...lib.qualityTable, [label]: preferredQuality};
              const imagesList = {...lib, [label]: URL.createObjectURL(res.data)};
  
              // join new object with all non-enumerable properties
              return Object.defineProperties(imagesList, {
                dictionary: {
                  value: lib.dictionary,
                },
                qualityTable: {
                  value: updatedTable,
                  writable: true 
                },
                updateImage: {
                  value: lib.updateImage,
                }
              });
            });

            resolve(true);
          } else {
            throw Error; // can be caught by .catch
          }
        }).catch(() => {
          console.warn('Higher quality could not be pulled for an image.');
          reject(true);
        });
      } else {
        console.error('An image label requested was not found.')
        reject(true);
      }
    };

    return new Promise(currentAction);
  };

  updateRef.current = getHigherQuality;

  const init = useCallback(async () => {
    const dict = await getImageDictionary();
    
    const keyedCollection = Object.defineProperties({}, {
      dictionary: {
        value: Object.freeze(dict),
        enumerable: false,
        writable: false 
      },
      qualityTable: {
        value: {},
        enumerable: false,
        writable: true,
      },
      updateImage: {
        value: (...params) => updateRef.current(...params),
        enumerable: false,
        writable: false
      },
      isInitialLoad: {
        value: true,
        writable: true,
      }
    });
    
    // if images list was returned, load low-quality for each symbol.
    if(Object.keys(dict).length > 0) {
      const imgRequests = Object.entries(dict).map(([key, val]) => {
        const thisReq = val[AUTO_LOAD_TYPE] && axios.get(val[AUTO_LOAD_TYPE], {...ALLOW_CORS, responseType: 'blob'});
        thisReq?.then(res => {
          if(res.data) {
            Object.defineProperties(keyedCollection, {
              [key]: {
                value: URL.createObjectURL(res.data),
                enumerable: true,
                writable: true
              },
              qualityTable: {
                value: { ...keyedCollection.qualityTable, [key]: AUTO_LOAD_TYPE },
                enumerable: false,
                writable: true
              }
            });
          } else {
            console.warn('An image call failed.');
          }
        });
        return thisReq;
      });

      await Promise.allSettled(imgRequests);
      setLibrary(keyedCollection);
    }
  }, [setLibrary]);

  useEffect(() => init(), [init]);

  useEffect(() => {
    library.isInitialLoad && onInitialLoadComplete?.();
  }, [onInitialLoadComplete, library]);

  return <></>;
}

export default ImageLoader;