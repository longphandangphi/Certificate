import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label } from "reactstrap";
import { Select } from "antd";
const { Option } = Select;
const SelectInput = ({
  title,
  showSearch,
  placeholder,
  name,
  defaultValue,
  options,
  onChange,
  inputClass,
  required,
  valueField,
  nameField
}) => {
  return (
    <FormGroup>
      <Label className="label-input" for={name}>
        {title} {required && <span className="text-danger">*</span>}
      </Label>
      <br />
      <Select
        showSearch={showSearch}
        placeholder={placeholder}
        style={{ display: "block" }}
        optionFilterProp="children"
        onChange={onChange}
        className={`custom-form-coltrol ${inputClass}`}
        name={name}
        defaultValue={defaultValue}
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {options.map((o, i) => {
          return (
            <Option key={i} value={o[valueField]}>
              {o[nameField]}
            </Option>
          );
        })}
      </Select>
    </FormGroup>
  );
};

SelectInput.propTypes = {
  showSearch: PropTypes.bool,
  title: PropTypes.string,
  options: PropTypes.array.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string
};

SelectInput.defaultProps = {
  showSearch: false,
  title: "",
  name: "",
  placeholder: ""
};

export default SelectInput;
