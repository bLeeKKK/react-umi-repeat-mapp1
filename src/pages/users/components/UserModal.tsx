import React, { useEffect, FC, Dispatch } from 'react';
import { Modal, Form, Input } from 'antd';
import { IEditForm, IDataItem } from '../types';

interface IUserModalProps {
  visible: boolean;
  setVisible: Dispatch<React.SetStateAction<boolean>>;
  handleOkModal: (values: IEditForm) => void;
  editObj: IDataItem | undefined
}

const UserModal: FC<IUserModalProps> = ({
  visible = false,
  setVisible,
  handleOkModal,
  editObj
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        handleOkModal(values)
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      })
    // setModalText('The modal will be closed after two seconds');
    // setConfirmLoading(true);
    // setTimeout(() => {
    //   setVisible(false);
    //   setConfirmLoading(false);
    // }, 2000);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  }

  useEffect(() => {
    if (visible) {
      if (editObj) {
        let { name, create_time } = editObj;
        form.setFieldsValue({
          name,
        });
      } else {
        form.resetFields();
      }
    } else {
      form.resetFields();
    }
  }, [visible])

  return (
    <>
      <Modal
        title="新增"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        forceRender
      >
        <Form
          form={form}
          name="editAddUser"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="名字"
            name="name"
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            label="创建时间"
            name="create_time"
          >
            <Input />
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};

export default UserModal
