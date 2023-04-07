import React, {useEffect, useState} from 'react';
import {IShortedLinks} from '../Types';
import {Button, Input, Space} from 'antd';
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
  const [newLink, setNewLink] = useState('');


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
        <Button type="primary" onClick={() => {
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