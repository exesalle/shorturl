import React, {FC, useEffect, useState} from 'react';
import {collection, getDocs, deleteDoc, setDoc, query, doc,} from 'firebase/firestore';
import {auth, db} from '../firebase';
import {InitialShortedLinks, IShortedLinks, IUserData} from '../Types';
import {CurrentUser} from '../state/useAuthState';
import {Button, Input, Space} from 'antd';
import {useAuthState} from 'react-firebase-hooks/auth';


const Profile:React.FC = () => {

  const [linksData, setLinksData] = useState<IShortedLinks>({
    id: 1,
    link: '',
    short: '',
  });

  const [linksList, setLinksList] = useState<IShortedLinks[]>(InitialShortedLinks);
  const [shortID,setShortID] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const [userEmail, setUserEmail] = useState('user@user.com');

  const email = () => {
    if (user) {

      // @ts-ignore
      setUserEmail(user.email.toString);
    }

  };


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
    hashCode();
    try {
      await setDoc(doc(db, userEmail+'/', shortID+'/'), {
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
          <th>link</th>
          <th>shorted link</th>
        </tr>
        {linksList.map(el =>
          <tr key={el.id}>
            <td>{el.link}</td>
            <td>localhost:3000/{el.short}</td>
            <td><Button type="primary">Редактировать</Button></td>
            <td><Button type="primary" onClick={() => {deleteLink(el.short);}}> Удалить</Button></td>
          </tr>)}
      </table>
    </>
  );
};

export default Profile;