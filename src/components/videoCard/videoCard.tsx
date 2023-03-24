import { DeleteFilled, EditOutlined, EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import React from 'react';

import avatarImg from '../../assets/avatar.jpeg';

const { Meta } = Card;

const VideoCard = ({ title, description, cover, link, visible }: any) => (
  <Card
    style={{ width: 300 }}
    cover={
      <a href={link}>
        <img alt='example' src={cover} style={{ width: 300 }} />
      </a>
    }
    actions={[
      visible === true ? <EyeFilled key='shown' /> : <EyeInvisibleFilled key='hidden' />,
      <EditOutlined key='edit' />,
      <DeleteFilled key='delete' />,
    ]}
  >
    <Meta avatar={<Avatar src={avatarImg} />} title={title} description={description} />
  </Card>
);

export default VideoCard;
