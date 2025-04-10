import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface FilterTextboxProps {
  filterText: string;
  onFilterChange: (filter: string) => void;
  placeholder?: string;
  delay?: number;
  dataTestId?: string;
}

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

const FilterInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const FilterTextbox: React.FC<FilterTextboxProps> = ({
  filterText,
  onFilterChange,
  placeholder = 'Filter customers...',
  delay = 300,
  dataTestId = 'filter-textbox',
}) => {
  const [inputValue, setInputValue] = useState(filterText);
  
  useEffect(() => {
    setInputValue(filterText);
  }, [filterText]);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue !== filterText) {
        onFilterChange(inputValue);
      }
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, filterText, onFilterChange, delay]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  return (
    <FilterContainer>
      <FilterInput
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        data-testid={dataTestId}
      />
    </FilterContainer>
  );
};

export default FilterTextbox;
