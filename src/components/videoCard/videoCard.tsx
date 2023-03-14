import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import React from 'react';

import avatarImg from '../../assets/avatar.jpeg';

const { Meta } = Card;

const VideoCard = ({ title, description, cover, link }: any) => (
  <Card
    style={{ width: 300 }}
    cover={
      <a href={link}>
        <img alt='example' src={cover} style={{ width: 300 }} />
      </a>
    }
    actions={[
      <SettingOutlined key='setting' />,
      <EditOutlined key='edit' />,
      <EllipsisOutlined key='ellipsis' />,
    ]}
  >
    <Meta avatar={<Avatar src={avatarImg} />} title={title} description={description} />
  </Card>
);

export default VideoCard;
