import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone';
import React, { useRef, useState } from 'react';

export const FileInput = ({ name, value, handleChange, error, setError }: any) => {
  const fileInput: any = useRef();
  const [val, setVal] = useState(value);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { files } = e.target;
    if (!files[0]) return;
    setVal(files[0].name);
    handleChange(e, name);
    setError(files[0].name.search('.img') == -1);
  };

  return (
    <FormControl fullWidth sx={{ marginBottom: '15px' }}>
      <input type="file" ref={fileInput} style={{ display: 'none' }} onChange={handleChangeInput} />
      <InputLabel error={error} sx={{ height: '100%', zIndex: '10' }} htmlFor={name}>
        {name}
      </InputLabel>
      <OutlinedInput
        onClick={() => fileInput.current.click()}
        id={name}
        error={error}
        type="text"
        value={val || ''}
        endAdornment={
          <InputAdornment position="end" sx={{ position: 'absolute', right: '0px' }}>
            <IconButton aria-label="file">
              <AttachmentTwoToneIcon
                color={error ? 'error' : 'primary'}
                sx={{
                  transform: 'rotate(135deg) scaleX(-1)'
                }}
              />
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText sx={{ color: '#000' }}>{error ? 'get only .img' : ''}</FormHelperText>
    </FormControl>
  );
};
