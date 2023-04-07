import React, {FC, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {collection, getDocs, getDoc,doc, query, onSnapshot, where} from 'firebase/firestore';
import {db} from '../firebase';
import {useDispatch, useSelector} from 'react-redux';
import {redirectLink} from '../thunks';
import {RootState} from '../store/store';
import {redirectLink_success} from '../store/redirect';

const ShortedLink:FC = () => {
  const {id} = useParams() as any;

  useEffect(() => {
    return () => {
      fetch('http://localhost:5000/api/v1/short/'+id)
        .then(res => res.json())
        .then(json => {
          window.location.href = json.origin;
        });
    };
  },[]);


  return (
    <>
    </>
  );
};

export default ShortedLink;