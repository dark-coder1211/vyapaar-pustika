import React from 'react'
import type { ChangeEvent } from 'react'


interface TextBoxOneProps {
  id?: string
  label?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  value?: string | number
  defaultValue?: string | number
  readOnly?: boolean
  required?: boolean
  labelColor?: string
  className?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  name?: string
}

const TextBoxOne: React.FC<TextBoxOneProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  disabled = false,
  value,
  defaultValue,
  readOnly = false,
  required = false,
  labelColor,
  className = '',
  onChange,
  name
}) => {
  return (
    <div className='flex flex-col'>
      {label && (
        <label htmlFor={id} className={`block text-sm font-medium text-black ${className}`}>
          {label}
          {labelColor && <span style={{ color: labelColor, marginLeft: 4 }}>*</span>}
        </label>
      )}

      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value !== undefined ? value : undefined} // controlled if value exists
        defaultValue={value === undefined ? defaultValue : undefined} // uncontrolled fallback
        readOnly={readOnly}
        required={required}
        onChange={onChange}
        className={`rounded-lg border border-gray-300 bg-transparent md:px-1 px-1 py-3 outline-none transition
    focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary h-9
    text-black`}
      />
    </div>
  )
}

export default TextBoxOne
