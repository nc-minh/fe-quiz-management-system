import React, { memo } from 'react';
import './recentDash.scss';
import { Table, Tag } from 'antd';

function RecentDash() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
        {
          text: 'Black',
          value: 'Black',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.address.startsWith(value),
      width: '30%',
    },
    {
      title: 'Point',
      dataIndex: 'point',
      sorter: (a, b) => a.point - b.point,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      filters: [
        {
          text: <span>Day</span>,
          value: '19',
        },
        {
          text: <span>Month</span>,
          value: '6',
        },
      ],
      onFilter: (value, record) => record.address.startsWith(value),
      filterSearch: (input, record) => record.value.indexOf(input) > -1,
      width: '40%',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (tags) => (
        <>
          {tags.map((tag) => {
            const color = tag === 'Success' ? 'green' : 'red';
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      point: 66,
      time: '16:03:10 17-06-2021',
      status: ['Success'],
    },
    {
      key: '2',
      name: 'Jim Green',
      point: 52,
      time: '10:02:22 12-02-2022',
      status: ['Failure'],
    },
    {
      key: '3',
      name: 'Joe Black',
      point: 88,
      time: '09:06:33 15-03-2022',
      status: ['Success'],
    },
    {
      key: '4',
      name: 'Jim Red',
      point: 32,
      time: '21:19:06 22-01-2022',
      status: ['Failure'],
    },
  ];
  return (
    <div className="recentDash">
      <div className="recentDash-container">
        <div className="recentDash-container-title">
          Recent Examinations
        </div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
}

export default memo(RecentDash);
