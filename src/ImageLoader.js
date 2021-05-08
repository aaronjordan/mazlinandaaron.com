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
    return new Promise((resolve, reject) => {

      if (!library.dictionary || library.qualityTable?.[label] === preferredQuality) {
        reject(false);
      } else if (library.hasOwnProperty(label) 
      && library.dictionary?.[label]?.[preferredQuality]) {
        axios.get(library.dictionary[label][preferredQuality], {...ALLOW_CORS, responseType: 'blob'}).then(res => {
          if(res.data) {
            // return image at quality target
            const updatedTable = {...library.qualityTable};
            updatedTable[label] = preferredQuality;

            const newProperties = Object.defineProperty({}, label, {
              value: URL.createObjectURL(res.data),
              enumerable: true,
              writable: true,
            });

            // join new object with all non-enumerable properties
            setLibrary(lib => {
              return Object.defineProperties(newProperties, {
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
    });
  };

  updateRef.current = getHigherQuality;

  const init = useCallback(async () => {
    const dict = await getImageDictionary();
    
    const keyedCollection = {};
    Object.defineProperty(keyedCollection, 'dictionary', {
      value: Object.freeze(dict),
      enumerable: false,
      writable: false 
    });
    Object.defineProperty(keyedCollection, 'qualityTable', {
      value: {},
      enumerable: false,
      writable: true,
    });
    Object.defineProperty(keyedCollection, 'updateImage', {
      value: (...params) => updateRef.current(...params),
      enumerable: false,
      writable: false
    });
    
    // if images list was returned, load low-quality for each symbol.
    if(Object.keys(dict).length > 0) {
      const imgRequests = Object.entries(dict).map(([key, val]) => {
        const thisReq = val[AUTO_LOAD_TYPE] && axios.get(val[AUTO_LOAD_TYPE], {...ALLOW_CORS, responseType: 'blob'});
        thisReq?.then(res => {
          if(res.data) {
            Object.defineProperty(keyedCollection, key, {
              value: URL.createObjectURL(res.data),
              enumerable: true,
              writable: true
            });
            Object.defineProperty(keyedCollection.qualityTable, key, {
              value: AUTO_LOAD_TYPE,
              enumerable: true,
              writable: true
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
    library.dictionary && onInitialLoadComplete?.();
  }, [onInitialLoadComplete, library]);

  return <></>;
}

export default ImageLoader;