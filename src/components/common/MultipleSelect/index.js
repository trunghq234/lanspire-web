import { Select } from 'antd';
import 'antd/dist/antd.css';
import React, { useState } from 'react';

const { Option } = Select;

const MultipleSelect = props => {
  const [selectedValues, setSelectedValues] = useState([]);

  function onChange(value) {
    setSelectedValues(value);
  }
  function onBlur() {}
  function onFocus() {}
  function onSearch() {}
  const renderOptions = () => {
    const dataList = props.options;
    if (dataList.length) {
      return dataList.map(data => {
        return (
          <Option key={data[props.optionName]} value={data[props.optionValue]}>
            {data[props.optionName]}
          </Option>
        );
      });
    }
    return null;
  };

  let optionRendered = renderOptions();
  return (
    <div>
      <Select
        mode="multiple"
        value={props.value}
        showSearch
        style={{ width: props.width || '100%' }}
        placeholder={props.placeholder}
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        disabled={props.disabled || false}
        defaultValue={selectedValues}>
        {optionRendered}
      </Select>
    </div>
  );
};

export default MultipleSelect;
