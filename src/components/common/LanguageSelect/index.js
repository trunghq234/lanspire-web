import React from 'react';
import { Select } from 'antd';
import languages from 'constant/languages.json';

const { Option } = Select;

const LanguageSelect = ({ value = '', onChange, ...props }) => {
  const handleChange = value => {
    if (onChange) {
      onChange(value);
    }
  };

  const renderOptions = dataList => {
    if (dataList.length) {
      return dataList.map(data => {
        return (
          <Option key={data['name']} value={data['name']}>
            {data['name']}
          </Option>
        );
      });
    }
    return null;
  };

  let optionRendered = renderOptions(languages);

  return (
    <Select
      showSearch
      value={value}
      placeholder="Language"
      style={{ width: props.width || '100%' }}
      onChange={handleChange}>
      {optionRendered}
    </Select>
  );
};

export default LanguageSelect;
