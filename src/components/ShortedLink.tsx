import React, {FC, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {collection, getDocs, getDoc,doc, query, onSnapshot, where} from 'firebase/firestore';
import {db} from '../firebase';

const ShortedLink:FC = () => {
  const {id} = useParams() as any;

  useEffect(() => {
    const docRef = doc(db, 'links', id);
    onSnapshot(docRef, (doc) => {
      window.location.href = doc.get('link');
    });
  }, []);




  return (
    <>
    </>
  );
};

export default ShortedLink;