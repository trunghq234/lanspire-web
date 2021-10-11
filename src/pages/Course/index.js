import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Input, Select, Table, Tag } from 'antd';
import MoreButton from 'components/common/MoreButton';
import React from 'react';
import styles from './index.module.less';
const Course= ()=> {
    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'Category',
          dataIndex: 'category',
          key: 'category',
          filters: [
            { text: 'Toeic', value: 'toeic' },
            { text: 'Ielts', value: 'ielts' },
          ],
        },
        {
          title: 'Number Of Classes',
          dataIndex: 'classes',
          key: 'classes',
          sorter: {
            compare: (a, b) => a.math - b.math,
          },
        },
        {
          title: 'Number Of Students',
          dataIndex: 'students',
          key: 'students',
          sorter: {
            compare: (a, b) => a.english - b.english,
          },
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          render: tags => (
            <span>
              {tags.map(tag => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'ending' || tag==='bad') {
                  color = 'volcano';
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
          render: () => 
          (
            <MoreButton></MoreButton>
          )
        },
      ];
      
      const data = [
        {
          id: '1',
          key: '1',
          name: 'John Brown',
          category: "Toeic",
          classes: 3,
          students: 70,
          tags: ['ending', 'good'],
        },
        {
          id: '2',
          key: '2',
          name: 'Jim Green',
          category: "Ielts",
          classes: 4,
          students: 90,
          tags: ['opening', 'bad'],
        },
        {
          id: '3',
          key: '3',
          name: 'Joe Black',
          category: "Ielts",
          classes: 2,
          students: 50,
          tags: ['opening', 'good'],
        },
        {
          id: '4',
          key: '4',
          name: 'Jim Red',
          category: "Toeic",
          classes: 3,
          students: 80,
          tags: ['opening', 'good'],
        },
        {
          id: '5',
          key: '5',
          name: 'Jim Red',
          category: "Toeic",
          classes: 3,
          students: 80,
          tags: ['opening', 'good'],
        },
        {
          id: '6',
          key: '6',
          name: 'Jim Red',
          category: "Toeic",
          classes: 3,
          students: 80,
          tags: ['opening', 'good'],
        },
        {
          id: '7',
          key: '7',
          name: 'Jim Red',
          category: "Toeic",
          classes: 3,
          students: 80,
          tags: ['opening', 'good'],
        },
        {
          id: '8',
          key: '8',
          name: 'Jim Red',
          category: "Toeic",
          classes: 3,
          students: 80,
          tags: ['opening', 'good'],
        },
        {
          id: '9',
          key: '9',
          name: 'Jim Red',
          category: "Toeic",
          classes: 3,
          students: 80,
          tags: ['opening', 'good'],
        },
        {
          id: '10',
          key: '10',
          name: 'Jim Red',
          category: "Toeic",
          classes: 3,
          students: 80,
          tags: ['opening', 'good'],
        },
        {
          id: '11',
          key: '11',
          name: 'Jim Red',
          category: "Toeic",
          classes: 3,
          students: 80,
          tags: ['opening', 'good'],
        },

      ];
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
          console.log("1");
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          console.log("2");
        },
      };
      function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
      }
    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <h3 className={styles.title}>Course</h3>
                <Breadcrumb className={styles.breadcrumb}>
                      <Breadcrumb.Item>
                        <a href="../">Dashboard</a>
                      </Breadcrumb.Item>
                    <Breadcrumb.Item>Courses</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className={styles.body}>
                <div className={styles['cart-border']}>
                    <div className={styles['cart-body']}>
                        <Card className={styles['ant-cart-body']}>
                            <div className={styles['cart-item']}>
                                <div className={styles['cart-item-search']}>
                                    <div className={styles['search-box']}>
                                        <Input  
                                            placeholder="Search"
                                            prefix={<SearchOutlined />}
                                            size="large">
                                        </Input>
                                    </div>
                                    <div className={styles['filter-box']}>
                                        <Select 
                                            className={styles['input-filter']} 
                                            defaultValue="Option1-1" size="large">
                                            <Select.Option value="Option1-1">All</Select.Option>
                                            <Select.Option value="Option1-2">Option1-2</Select.Option>
                                        </Select>
                                    </div>
                                </div>
                                <Button
                                        className={styles['btn-add']}
                                        type="primary"
                                        size="large">
                                            <PlusCircleOutlined />
                                        Add Course
                                    </Button>
                            </div>
                            <div className={styles['cart-item']}>
                                <Table 
                                  className={styles['table-course']}
                                  columns={columns} 
                                  rowSelection={{...rowSelection}}
                                  dataSource={data} 
                                  onChange={onChange} 
                                  showSorterTooltip={{ title: 'Click to sort' }}
                                  pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '15', '20']}}
                                  />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Course;