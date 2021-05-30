import React, { useState, FC, Dispatch } from 'react';
import { Table, Space, Popconfirm, Button, } from 'antd';
import { connect, ConnectProps } from 'umi';
import UserModal from './components/UserModal'
import { IUserState, IDataItem, IEditForm } from './types'

interface PageProps extends ConnectProps {
  users: IUserState;
}

const Users: FC<PageProps> = ({ users: { data }, dispatch }) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [editObj, setEditObj] = useState<IDataItem>()

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: IDataItem) => (
        <Space size="middle">
          <a onClick={() => { editHandleAdd(record) }}>编辑</a>
          <Popconfirm
            title="Are you sure delete？"
            onConfirm={() => { handleOkDel(record) }}
            okText="Yes"
            cancelText="No"
          // okButtonProps={{ loading: confirmLoading }}
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  function editHandleAdd(r?: IDataItem) {
    setEditObj(r)
    setVisible(true)
  }

  function handleOkModal(values: IEditForm): void {
    if (!dispatch) {
      return
    }
    if (editObj) {
      dispatch({
        type: 'users/editUser',
        payload: {
          values,
          id: editObj.id
        }
      })
    } else {
      dispatch({
        type: 'users/addUser',
        payload: {
          values
        }
      })
    }
  }

  function handleOkDel(r: IDataItem): void {
    if (!dispatch) {
      return
    }
    dispatch({
      type: 'users/delUser',
      payload: {
        id: r.id
      }
    })
  }

  return (<>
    <Button type='primary' onClick={() => { editHandleAdd() }}>新增</Button>
    <Table columns={columns} dataSource={data} rowKey='id' />
    <UserModal
      visible={visible}
      setVisible={setVisible}
      handleOkModal={handleOkModal}
      editObj={editObj}
    />
  </>);
}

const mapStateTop = ({ users }: { users: IUserState }) => {
  return { users }
}

export default connect(mapStateTop)(Users)
