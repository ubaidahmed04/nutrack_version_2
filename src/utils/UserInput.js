import React from "react";
import { ErrorMessage, Field } from "formik";
import { Input, Select, Typography } from "antd";

const { Option } = Select;
const { TextArea } = Input;

const InputFields = ({ label, type, placeholder, name, options ,disabled }) => {
  if (type === "select") {
    return (
      <div>
        <label>
          <Typography.Text strong>{label}</Typography.Text>
        </label>
        <Field name={name}>
          {({ field, form }) => (
            <Select
              {...field}
              placeholder={placeholder}
              className="w-full"
              onChange={(value) => form.setFieldValue(name, value)}
            >
              {options?.length > 0 ? (
                options.map((opt, idx) => (
                  <Option key={idx} value={opt.value}>
                    {opt.label}
                  </Option>
                ))
              ) : (
                <Option disabled>No Category Available</Option>
              )}
            </Select>
          )}
        </Field>
        <ErrorMessage
          name={name}
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div>
        <label>
          <Typography.Text strong>{label}</Typography.Text>
        </label>
        <Field name={name}>
          {({ field }) => (
            <TextArea
              {...field}
              placeholder={placeholder}
              rows={4}
              className="w-full"
            />
          )}
        </Field>
        <ErrorMessage
          name={name}
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    );
  }
  if (type === "password") {
        return (
      <div>
        <label>
          <Typography.Text strong>{label}</Typography.Text>
        </label>
        <Field name={name}>
        {({ field }) => (
          <Input.Password
            {...field}
            type={type}
            placeholder={placeholder}
            className="w-full"
          />
        )}
        </Field>
        <ErrorMessage
          name={name}
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    );
  }
  
  return (
    <div>
      <label>
        <Typography.Text strong>{label}</Typography.Text>
      </label>
      <Field name={name}>
        {({ field }) => (
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full"
          />
        )}
      </Field>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default InputFields;
