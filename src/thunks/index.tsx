import {
  getLinks,
} from '../store/reducer';


export const fetchLinks = ():any => {
  return function(dispatch: any) {
    fetch('https://firestore.googleapis.com/v1/projects/shorturl-d5837/databases/(default)/documents/links')
      .then(res => res.json())
      .then(json => dispatch(getLinks(json)));
  };
};