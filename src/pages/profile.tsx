import React, {FC, useEffect, useState} from 'react';
import {collection, getDocs, deleteDoc, setDoc, query, doc,} from 'firebase/firestore';
import {auth, db} from '../firebase';
import {InitialShortedLinks, IShortedLinks, IUserData} from '../Types';
import {Button, Input, Space} from 'antd';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {getLinks, addLink, deleteLink, updateHash, updateLink} from '../thunks';

const Profile:React.FC = () => {

  const dispatch = useDispatch();
  const links = useSelector((state: RootState) => state.Reducer.links);

  const [linksData, setLinksData] = useState<IShortedLinks>({
    _id: '',
    origin: '',
    hash: '',
  });
  const {id} = useParams() as any;
  const [linksList, setLinksList] = useState<IShortedLinks[]>(InitialShortedLinks);
  const [shortID,setShortID] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const [userEmail, setUserEmail] = useState(id);
  const [newLink, setNewLink] = useState('');

  const hashCode = () => {
    let code  = '';
    const symbols = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    const max_position = symbols.length - 1;
    for( let i = 0; i < 5; ++i ) {
      const position = Math.floor ( Math.random() * max_position );
      code = code + symbols.substring(position, position + 1);
    }
    return setShortID(code);
  };

  const handleDelete = (id:string) => {
    dispatch(deleteLink(id));
  };

  const handleUpdateHash = (id:string) => {
    dispatch(updateHash(id));
    dispatch(getLinks());
  };

  const handleUpdateLink = (id: string, link:string) => {
    dispatch(updateLink(id, link));
  };

  const handleAdd = (link: string) => {
    hashCode();
    dispatch(addLink(link));
  };



  useEffect(() => {
    return () => {
      dispatch(getLinks());
    };
  }, []);

  return (
    <>
      <Space.Compact>
        <Input addonBefore="Link:" placeholder="Введите ссылку..." value={linksData.origin} onChange={(e) => setLinksData({...linksData, origin: e.target.value})} allowClear />
        <Button type="primary" onClick={(e) => {
          handleAdd(linksData.origin);}}>Сократить</Button>
      </Space.Compact>
      <table className="table">
        <tr>
          <th>Link</th>
          <th>Shorted link</th>
          <th>Редактировать</th>
        </tr>
        {links.map(el =>
          <tr key={el._id}>
            <td>{el.origin}</td>
            <td>localhost:3000/{el.hash}</td>
            <td>
              <Space.Compact>
                <Input addonBefore="Новая ссылка:" placeholder="Введите новую ссылку..." onChange={(e) => setNewLink( e.target.value)} allowClear />
                <Button type="primary" onClick={() => {handleUpdateLink(el._id, newLink);}}>Изменить</Button></Space.Compact></td>
            <td><Button type="primary" onClick={() => {handleUpdateHash(el._id);}}>Обновить HASH</Button></td>
            <td><Button type="primary" onClick={() => {handleDelete(el._id);}}> Удалить</Button></td>
          </tr>)}
      </table>
    </>
  );
};

export default Profile;