import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone';
import React, { LegacyRef, RefObject, useRef, useState } from 'react';

interface FileInputProps {
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  errors: boolean;
  setErrors: (error: boolean) => void;
}

interface IFiles {
    name: string;
}

export const FileInput: React.FC<FileInputProps> = ({ name, handleChange, errors, setErrors }) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [val, setVal] = useState('');

  const getImage = () => {
    const { current } = fileInput;
    current?.click();
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const files: FileList = e.target.files!;
    const { files } = e.target;
    // const { name } = files[0];
    if (files?.length) return;
      const fileName = files?[0].name;
    setVal(name);
    handleChange(e, fileName);
      setErrors(files?[0].name.search('.img') === -1);
  };

  return (
    <FormControl fullWidth sx={{ marginBottom: '15px' }}>
      <input type="file" ref={fileInput} style={{ display: 'none' }} onChange={handleChangeInput} />
      <InputLabel error={errors} sx={{ height: '100%', zIndex: '10' }} htmlFor={name}>
        {name}
      </InputLabel>
      <OutlinedInput
        onClick={getImage}
        id={name}
        error={errors}
        type="text"
        value={val || ''}
        endAdornment={
          <InputAdornment position="end" sx={{ position: 'absolute', right: '0px' }}>
            <IconButton aria-label="file">
              <AttachmentTwoToneIcon
                color={errors ? 'error' : 'primary'}
                sx={{
                  transform: 'rotate(135deg) scaleX(-1)'
                }}
              />
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText sx={{ color: '#000' }}>{errors ? 'get only .img' : ''}</FormHelperText>
    </FormControl>
  );
};
