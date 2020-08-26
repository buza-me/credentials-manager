import './RegistrationPage.css';
import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';

import Alert from '@material-ui/lab/Alert';

import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@material-ui/icons/VisibilityOffTwoTone';

import { Page } from 'Containers';
import { Header, Spinner } from 'Components';
import { useTranslation } from 'react-i18next';
import { USER_URL } from 'Constants';

export const RegistrationPage = () => {
  const { t } = useTranslation();
  const [passwordInputType, setPasswordInputType] = useState('password');
  const [repeatPasswordInputType, setRepeatPasswordInputType] = useState('password');
  const [isLoading, setIsLoading] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setRepeatPassword('');
  };

  useEffect(() => {
    if (registrationStatus === 'success') resetForm();
  }, [registrationStatus]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }
    try {
      setIsLoading(true);

      const response = await fetch(USER_URL, {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const userId = await response.json();

      setIsLoading(false);

      if (userId) {
        setRegistrationStatus('success');
        return;
      }
      throw new Error();
    } catch (error) {
      setIsLoading(false);
      setRegistrationStatus('error');
    }
  };

  const renderEndAdornment = (type, typeSetter) => (
    <InputAdornment position='end'>
      <IconButton onClick={() => typeSetter(type === 'password' ? 'text' : 'password')}>
        {type === 'password' ? (
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
      onChange: (e) => setName(e.target.value),
      endAdornment: null,
      value: name
    },
    {
      isError: !!email && !/\S+@\S+\.\S+/.test(email),
      id: 'registration-page-text-field__email',
      label: 'form.label.email',
      errorText: 'form.error.email',
      type: 'text',
      onChange: (e) => setEmail(e.target.value),
      endAdornment: null,
      value: email
    },
    {
      isError: !!password && password.length < 8,
      id: 'registration-page-text-field__password',
      label: 'form.label.password',
      errorText: 'form.error.password',
      type: passwordInputType,
      onChange: (e) => setPassword(e.target.value),
      endAdornment: renderEndAdornment(passwordInputType, setPasswordInputType),
      value: password
    },
    {
      isError: !!password && !!repeatPassword && password !== repeatPassword,
      id: 'registration-page-text-field__password-repeat',
      label: 'form.label.password.repeat',
      errorText: 'form.error.password.repeat',
      type: repeatPasswordInputType,
      onChange: (e) => setRepeatPassword(e.target.value),
      endAdornment: renderEndAdornment(repeatPasswordInputType, setRepeatPasswordInputType),
      value: repeatPassword
    }
  ];

  const isInvalid =
    !name || !email || !password || !repeatPassword || inputsModel.some(({ isError }) => isError);

  const renderInput = ({ isError, errorText, endAdornment, onChange, id, label, type, value }) => (
    <FormControl error={isError} key={id}>
      <InputLabel htmlFor={id}>{t(label)}</InputLabel>
      <Input
        required
        id={id}
        type={type}
        endAdornment={endAdornment}
        onChange={onChange}
        color='primary'
        autoComplete='off'
        value={value}
      />
      {isError ? <FormHelperText>{t(errorText)}</FormHelperText> : null}
    </FormControl>
  );

  return (
    <Page>
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
              endIcon={isLoading ? <Spinner /> : null}
            >
              {t('link.registration')}
            </Button>
          </form>
        </section>
        <Snackbar
          className='registration-page__snackbar'
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={!!registrationStatus}
          autoHideDuration={3000}
          onClose={() => setRegistrationStatus(null)}
        >
          {registrationStatus ? (
            <Alert
              onClose={() => setRegistrationStatus(null)}
              severity={registrationStatus}
              variant='filled'
            >
              {t(`registration.${registrationStatus}`)}
            </Alert>
          ) : null}
        </Snackbar>
      </main>
    </Page>
  );
};
