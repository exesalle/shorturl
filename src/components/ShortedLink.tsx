import React, {FC, useEffect} from 'react';
import {useParams} from 'react-router-dom';


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