import './RegistrationPage.css';
import React, { useState } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@material-ui/icons/VisibilityOffTwoTone';
import Button from '@material-ui/core/Button';
import { Header } from 'Components';
import { useTranslation } from 'react-i18next';

export const RegistrationPage = () => {
  const { t } = useTranslation();
  const [passwordInputType, setPasswordInputType] = useState('password');
  const [repeatPasswordInputType, setRepeatPasswordInputType] = useState('password');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const renderEndAdornment = (typeVar, typeSetter) => (
    <InputAdornment position='end'>
      <IconButton onClick={() => typeSetter(typeVar === 'password' ? 'text' : 'password')}>
        {typeVar === 'password' ? (
          <VisibilityTwoToneIcon className='registration-page__form_reveal-button-icon' />
        ) : (
          <VisibilityOffTwoToneIcon className='registration-page__form_reveal-button-icon' />
        )}
      </IconButton>
    </InputAdornment>
  );

  const inputsModel = [
    {
      isError: /[^A-Za-zА-Яа-я0-9_іІїЇґҐ]/.test(name || ''),
      id: 'registration-page-text-field__name',
      label: 'form.label.name',
      errorText: 'form.error.name',
      type: 'text',
      onInput: (e) => setName(e.target.value),
      endAdornment: null
    },
    {
      isError: !!email && !/\S+@\S+\.\S+/.test(email),
      id: 'registration-page-text-field__email',
      label: 'form.label.email',
      errorText: 'form.error.email',
      type: 'text',
      onInput: (e) => setEmail(e.target.value),
      endAdornment: null
    },
    {
      isError: !!password && password.length < 8,
      id: 'registration-page-text-field__password',
      label: 'form.label.password',
      errorText: 'form.error.password',
      type: passwordInputType,
      onInput: (e) => setPassword(e.target.value),
      endAdornment: renderEndAdornment(passwordInputType, setPasswordInputType)
    },
    {
      isError: !!password && !!repeatPassword && password !== repeatPassword,
      id: 'registration-page-text-field__password-repeat',
      label: 'form.label.password.repeat',
      errorText: 'form.error.password.repeat',
      type: repeatPasswordInputType,
      onInput: (e) => setRepeatPassword(e.target.value),
      endAdornment: renderEndAdornment(repeatPasswordInputType, setRepeatPasswordInputType)
    }
  ];

  const isInvalid =
    !name || !email || !password || !repeatPassword || inputsModel.some(({ isError }) => isError);

  const renderInput = ({ isError, errorText, endAdornment, onInput, id, label, type }) => (
    <FormControl error={isError} key={id}>
      <InputLabel htmlFor={id}>{t(label)}</InputLabel>
      <Input
        required
        id={id}
        type={type}
        endAdornment={endAdornment}
        onInput={onInput}
        color='primary'
        autoComplete='off'
      />
      {isError ? <FormHelperText>{t(errorText)}</FormHelperText> : null}
    </FormControl>
  );

  return (
    <main className='registration-page__container'>
      <Header />
      <section className='registration-page__content'>
        <form onSubmit={(e) => !isInvalid && handleSubmit(e)} className='registration-page__form'>
          {inputsModel.map((inputModel) => renderInput(inputModel))}
          <Button
            type='submit'
            disabled={isInvalid}
            color='secondary'
            variant='contained'
            disableElevation
          >
            {t('link.registration')}
          </Button>
        </form>
      </section>
    </main>
  );
};
