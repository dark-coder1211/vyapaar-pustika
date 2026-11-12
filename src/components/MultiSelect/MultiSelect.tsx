import React from 'react';
import Select from 'react-select';
import type  { MultiValue, ActionMeta } from 'react-select';

// Define types for the options
interface Option {
    value: string;
    label: string;
}

// Define the props for the MultiSelect component
interface MultiSelectProps {
    options: Option[];
    selectedOptions: Option[];
    onChange: (selected: MultiValue<Option>, actionMeta: ActionMeta<Option>) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, selectedOptions, onChange }) => {
    return (
        <Select
            isMulti
            value={selectedOptions}
            onChange={onChange}
            options={options}
            className="w-full"
            classNamePrefix="react-select"
        />
    );
};

export default MultiSelect;
