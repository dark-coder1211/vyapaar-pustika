import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { PiMagnifyingGlass } from "react-icons/pi";

interface SearchProps {
  onSearch: (term: string) => void
}

const SearchBar: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  // Debounce the search term
  const debouncedSearch = debounce((term: string) => {
    onSearch(term)
  }, 500)

  useEffect(() => {
    // Trigger debounced search when searchTerm changes
    debouncedSearch(searchTerm)

    // Cleanup function to cancel the debounce on component unmount
    return () => debouncedSearch.cancel()
  }, [searchTerm, debouncedSearch])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <TextField
      size='small'
      autoComplete='off'
      placeholder='Search...'
      onChange={handleSearchChange}
      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 5 }, mr: '30px', ml: '30px', mb: '5px' }}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <PiMagnifyingGlass fontSize='small' />
          </InputAdornment>
        )
      }}
    />
  )
}

export default SearchBar
