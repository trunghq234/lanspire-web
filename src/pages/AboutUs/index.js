import React from 'react';
import { Col, Row } from 'antd';
import ProfileCard from 'components/AboutUs/ProfileCard';

const AboutUs = () => {
  const team = [
    {
      name: 'Trung Huỳnh',
      imgUrl:
        'https://firebasestorage.googleapis.com/v0/b/lanspire.appspot.com/o/images%2Ftrunghuynh.jpg?alt=media&token=1070eb20-a905-44fb-805f-7708d7ba4e00',
      title: 'Software engineer',
      github: 'https://github.com/akaijs',
      facebook: 'https://www.facebook.com/trunghuynh2304/',
    },
    {
      name: 'Quang Pn',
      imgUrl:
        'https://firebasestorage.googleapis.com/v0/b/lanspire.appspot.com/o/images%2Fquangpn.jpg?alt=media&token=eb17f1d7-aaf2-40e1-a8a1-a181a6c585d4',
      title: 'Software engineer',
      github: 'https://github.com/QuanggPn',
      facebook: 'https://www.facebook.com/quangpn24',
    },
    {
      name: 'Thế Anh',
      imgUrl:
        'https://firebasestorage.googleapis.com/v0/b/lanspire.appspot.com/o/images%2Ftheanh.jpg?alt=media&token=5eb87569-2324-4603-84f0-1533c48d0fed',
      title: 'Software engineer',
      github: 'https://github.com/anhtt2211',
      facebook: 'https://www.facebook.com/trananh2211',
    },
    {
      name: 'Đỗ Bảo',
      imgUrl:
        'https://firebasestorage.googleapis.com/v0/b/lanspire.appspot.com/o/images%2Fdobao.jpg?alt=media&token=d7de835f-e879-4c70-b612-4f62a26cd382',
      title: 'Software engineer',
      github: 'https://github.com/baodv1001',
      facebook: 'https://www.facebook.com/ghostlove1001',
    },
  ];
  return (
    <Row gutter={[20, 20]} justify="center" style={{ padding: '40px', margin: 'auto' }}>
      <Col span={24}>
        <h3>Our team</h3>
      </Col>
      {team.map(e => (
        <Col xs={24} sm={12} md={6} key={e.name}>
          <ProfileCard user={e} />
        </Col>
      ))}
    </Row>
  );
};

export default AboutUs;
