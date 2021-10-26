import React from 'react';
import { Select } from 'antd';
import languages from './languages.json';

const LanguageSelect = () => {
  for (let language of Object.values(languages)) {
    console.log(language);
  }
  return (
    <div>
      <Select showSearch />
    </div>
  );
};

export default LanguageSelect;
