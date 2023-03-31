import React, {FC, useEffect, useState} from 'react';
import {collection, getDocs, deleteDoc, setDoc, query, doc,} from 'firebase/firestore';
import {auth, db} from '../firebase';
import {InitialShortedLinks, IShortedLinks, IUserData} from '../Types';
import {CurrentUser} from '../state/useAuthState';
import {Button, Input, Space} from 'antd';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useParams} from 'react-router-dom';

const Profile:React.FC = () => {

  const [linksData, setLinksData] = useState<IShortedLinks>({
    id: 1,
    link: '',
    short: '',
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

  const deleteLink = (link:string) => {
    deleteDoc(doc(db, userEmail+'', link+''));
    displayLinks();
  };

  const addLink = async () => {
    await hashCode();
    try {
      await setDoc(doc(db, userEmail, shortID), {
        id: Date.now(),
        link: linksData.link,
        short: shortID
      });
      await setDoc(doc(db, 'links', shortID), {
        id: Date.now(),
        link: linksData.link,
        short: shortID
      });

    } catch (e) {
      console.log(e);
    }
    displayLinks();
  };



  const displayLinks = async () => {
    const linksCollection = query(collection(db, userEmail+''));
    const linksSnapshot = await getDocs(linksCollection);
    const links: any[] = [];
    await linksSnapshot.forEach((doc:any) => {
      links.push(doc.data());
    });
    setLinksList(links);
  };


  useEffect(() => {
    return () => {
      displayLinks();
    };
  }, []);


  return (
    <>
      <CurrentUser/>
      <Space.Compact>
        <Input addonBefore="Link:" placeholder="Введите ссылку..." value={linksData.link} onChange={(e) => setLinksData({...linksData, link: e.target.value})} allowClear />
        <Button type="primary" onClick={addLink}>Сократить</Button>
      </Space.Compact>
      <table className="table">
        <tr>
          <th>Link</th>
          <th>Shorted link</th>
          <th>Редактировать</th>
        </tr>
        {linksList.map(el =>
          <tr key={el.id}>
            <td>{el.link}</td>
            <td>localhost:3000/{el.short}</td>
            <td>
              <Space.Compact>
                <Input addonBefore="Новая ссылка:" placeholder="Введите новую ссылку..." onChange={(e) => setNewLink( e.target.value)} allowClear />
                <Button type="primary">Изменить</Button></Space.Compact></td>
            <td><Button type="primary" onClick={() => {deleteLink(el.short);}}> Удалить</Button></td>
          </tr>)}
      </table>
    </>
  );
};

export default Profile;