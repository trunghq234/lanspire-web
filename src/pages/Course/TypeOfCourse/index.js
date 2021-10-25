import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Input, Select, Table, Tag } from 'antd';
import MoreButton from 'components/common/MoreButton';
import React from 'react';
import styles from './index.module.less';
const TypeOfCourse = () => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Number Of Courses',
      dataIndex: 'courses',
      key: 'courses',
      sorter: {
        compare: (a, b) => a.courses - b.courses,
      },
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
      sorter: {
        compare: (a, b) => a.language.localeCompare(b.language),
      },
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => {
            var color = 'orange';
            switch (tag) {
              case 'reading':
                color = 'volcano';
                break;
              case 'speaking':
                color = 'green';
                break;
              case 'writing':
                color = 'blue';
                break;
              default:
                color = 'gold';
                break;
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: () => <MoreButton></MoreButton>,
    },
  ];

  const data = [
    {
      id: '1',
      key: '1',
      name: 'Toeic',
      courses: 3,
      language: 'English',
      tags: ['reading', 'listening'],
    },
    {
      id: '2',
      key: '2',
      name: 'Ielts',
      courses: 2,
      language: 'English',
      tags: ['reading', 'listening', 'speaking', 'writing'],
    },
    {
      id: '3',
      key: '3',
      name: 'A1',
      courses: 2,
      language: 'Spanish',
      tags: ['reading', 'listening'],
    },
    {
      id: '4',
      key: '4',
      name: 'N5',
      courses: 4,
      language: 'Japanese',
      tags: ['speaking', 'listening'],
    },
    {
      id: '5',
      key: '5',
      name: 'N4',
      courses: 2,
      language: 'Japanese',
      tags: ['speaking', 'listening'],
    },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log('1');
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log('2');
    },
  };
  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }
  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <h3 className={styles.title}>Type Of Course</h3>
        <Breadcrumb className={styles.breadcrumb}>
          <Breadcrumb.Item>
            <a href="../">Dashboard</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Type Of Courses</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={styles.body}>
        <div className={styles['cart-border']}>
          <div className={styles['cart-body']}>
            <Card className={styles['ant-cart-body']}>
              <div className={styles['cart-item']}>
                <div className={styles['cart-item-search']}>
                  <div className={styles['search-box']}>
                    <Input placeholder="Search" prefix={<SearchOutlined />} size="large"></Input>
                  </div>
                  <div className={styles['filter-box']}>
                    <Select
                      className={styles['input-filter']}
                      defaultValue="Option1-1"
                      size="large"
                    >
                      <Select.Option value="Option1-1">All</Select.Option>
                      <Select.Option value="Option1-2">Option1-2</Select.Option>
                    </Select>
                  </div>
                </div>
                <div className={styles['col-6']}>
                  <Button className={styles['btn-add']} type="primary" size="large">
                    <PlusCircleOutlined />
                    Add Type Of Course
                  </Button>
                </div>
              </div>
              <div className={styles['cart-item']}>
                <Table
                  className={styles['table-course']}
                  columns={columns}
                  rowSelection={{ ...rowSelection }}
                  dataSource={data}
                  onChange={onChange}
                  showSorterTooltip={{ title: 'Click to sort' }}
                  pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '15', '20'],
                  }}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeOfCourse;
