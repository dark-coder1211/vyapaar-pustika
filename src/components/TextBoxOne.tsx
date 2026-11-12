import React from 'react'
import type { ChangeEvent, FocusEvent } from 'react'


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
  selectOnFocus?: boolean
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
  name,
  selectOnFocus = false
}) => {
  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (selectOnFocus) {
      e.target.select()
    }
  }

  return (
    <div className='flex flex-col'>
      {label && (
        <label htmlFor={id} className={`block text-sm font-medium text-black ${className}`}>
          {label}
          {(labelColor || required) && <span style={{ color: labelColor || 'red', marginLeft: 4 }}>*</span>}
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
        onFocus={handleFocus}
        autoComplete='off'
        className={`rounded-lg border border-gray-300 bg-transparent md:px-1 px-1 py-3 outline-none transition
    focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary h-8
    text-black`}
      />
    </div>
  )
}

export default TextBoxOne
