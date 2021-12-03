import React, { useState } from 'react';
import { Modal, Progress, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'utils/firebase';
import { v4 as uuidv4 } from 'uuid';

const ImageUploader = ({ onUploaded, url }) => {
  const [previewImage, setPreviewImage] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [fileList, setFileList] = useState([
    { uid: '-1', url: url, thumbUrl: url, status: 'success' },
  ]);
  const [progress, setProgress] = useState(0);
  const [progressVisible, setProgressVisible] = useState(false);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = file => {
    setPreviewImage(file.thumbUrl);
    setPreviewVisible(true);
  };

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  const checkFileSize = file => {
    if (file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must be smaller than 2MB!');
      }
      return isLt2M ? true : Upload.LIST_IGNORE;
    }
    return Upload.LIST_IGNORE;
  };

  const uploadFiles = options => {
    const { onSuccess, onError, file } = options;
    if (!file) return;
    const sotrageRef = ref(storage, `images/${uuidv4()}_${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      'state_changed',
      snapshot => {
        setProgressVisible(true);
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(prog);
      },
      error => {
        onError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          onUploaded(downloadURL);
        });
        onSuccess('Ok');
        setProgressVisible(false);
      }
    );
  };

  return (
    <div>
      <Upload
        accept="image/*"
        listType="picture-card"
        multiple={false}
        maxCount={1}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleUpload}
        beforeUpload={checkFileSize}
        customRequest={uploadFiles}>
        {fileList.length < 1 && <UploadOutlined />}
      </Upload>
      {progressVisible && <Progress percent={progress} />}
      <Modal width={400} visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default ImageUploader;
