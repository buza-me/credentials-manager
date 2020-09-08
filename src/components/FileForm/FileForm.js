import './FileForm.css';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { PasswordInput } from 'Components';

export const FileForm = ({
  file,
  defaults = {},
  fileType = 'record',
  onSubmit = () => null,
  resetTrigger,
  className = '',
  id = ''
}) => {
  const { t } = useTranslation();
  const [formValue, setFormValue] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ type: fileType, file: { ...file, ...formValue } });
  };

  const handleReset = () => setFormValue(defaults);

  useEffect(() => handleReset(), [resetTrigger]);

  const getInputsModel = (type) => {
    const nameInputModel = {
      id: 'file-form-name-input',
      type: 'text',
      onChange: (event) => setFormValue({ ...formValue, name: event.target.value }),
      value: formValue.name || '',
      label: 'form.label.name'
    };

    if (type === 'folder') {
      return [nameInputModel];
    }

    if (type === 'record') {
      return [
        nameInputModel,
        {
          inputId: 'file-form-login-input',
          type: 'text',
          onChange: (event) => setFormValue({ ...formValue, login: event.target.value }),
          value: formValue.login || '',
          label: 'form.label.login'
        },
        {
          inputId: 'file-form-password-input',
          type: 'password',
          onChange: (event) => setFormValue({ ...formValue, password: event.target.value }),
          value: formValue.password || '',
          label: 'form.label.password'
        }
      ];
    }
    return [];
  };

  const renderInput = ({ onChange, inputId, label, type, value }) => (
    <FormControl key={`${id}${inputId}`}>
      <InputLabel htmlFor={`${id}${inputId}`}>{t(label)}</InputLabel>
      {type !== 'password' ? (
        <Input
          required
          id={`${id}${inputId}`}
          type={type}
          onChange={onChange}
          color='primary'
          autoComplete='off'
          value={value}
        />
      ) : (
        <PasswordInput
          required
          id={`${id}${inputId}`}
          onChange={onChange}
          color='primary'
          autoComplete='off'
          value={value}
        />
      )}
    </FormControl>
  );

  const renderInputs = () => getInputsModel(fileType).map((inputModel) => renderInput(inputModel));

  return (
    <form className={`file-form ${className}`} onSubmit={handleSubmit}>
      <div className='file-form__inputs-container'>{renderInputs()}</div>
      <div className='file-form__button-container'>
        <Button variant='contained' color='secondary' onClick={handleReset}>
          {t('action.reset')}
        </Button>
        <Button variant='contained' color='secondary' type='submit'>
          {t('action.submit')}
        </Button>
      </div>
    </form>
  );
};
