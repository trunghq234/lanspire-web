import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

const NotFound = () => {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/">
            <Button type="primary">Back to home</Button>
          </Link>
        }
      />
    </div>
  );
};

export default NotFound;
