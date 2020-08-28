import './LoginPage.css';
import React, { useState, useContext } from 'react';

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
import { LOGIN_URL } from 'Constants';
import { validateEmail, validatePassword } from 'Utils';
import { LoginContext } from 'Contexts';
import { Redirect } from 'react-router-dom';

export const LoginPage = () => {
  const { t } = useTranslation();
  const [passwordInputType, setPasswordInputType] = useState('password');
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatus, setIsLoginStatus] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { logIn } = useContext(LoginContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }
    try {
      setIsLoading(true);

      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const parsedResponse = await response.json();

      if (!parsedResponse) {
        throw new Error();
      }

      const { access_token: token, userId, willExpireTime } = parsedResponse;

      setIsLoading(false);
      logIn({ token, willExpireTime, userId });
      setIsLoginStatus('success');
    } catch (error) {
      setIsLoading(false);
      setIsLoginStatus('error');
    }
  };

  const renderEndAdornment = (type, typeSetter) => (
    <InputAdornment position='end'>
      <IconButton onClick={() => typeSetter(type === 'password' ? 'text' : 'password')}>
        {type === 'password' ? (
          <VisibilityTwoToneIcon className='login-page__form_reveal-button-icon' />
        ) : (
          <VisibilityOffTwoToneIcon className='login-page__form_reveal-button-icon' />
        )}
      </IconButton>
    </InputAdornment>
  );

  const inputsModel = [
    {
      isError: validateEmail(email),
      id: 'login-page-text-field__email',
      label: 'form.label.email',
      errorText: 'form.error.email',
      type: 'text',
      onChange: (e) => setEmail(e.target.value),
      endAdornment: null,
      value: email
    },
    {
      isError: validatePassword(password),
      id: 'login-page-text-field__password',
      label: 'form.label.password',
      errorText: 'form.error.password',
      type: passwordInputType,
      onChange: (e) => setPassword(e.target.value),
      endAdornment: renderEndAdornment(passwordInputType, setPasswordInputType),
      value: password
    }
  ];

  const isInvalid = !email || !password || inputsModel.some(({ isError }) => isError);

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
      <main className='login-page__container'>
        <Header />
        <section className='login-page__content'>
          <form onSubmit={(e) => !isInvalid && handleSubmit(e)} className='login-page__form'>
            {inputsModel.map((inputModel) => renderInput(inputModel))}
            <Button
              type='submit'
              disabled={isInvalid}
              color='secondary'
              variant='contained'
              disableElevation
              endIcon={isLoading ? <Spinner /> : null}
            >
              {t('link.login')}
            </Button>
          </form>
        </section>
        <Snackbar
          className='login-page__snackbar'
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={loginStatus === 'error'}
          autoHideDuration={3000}
          onClose={() => setIsLoginStatus(null)}
        >
          {loginStatus === 'error' ? (
            <Alert onClose={() => setIsLoginStatus(null)} severity='error' variant='filled'>
              {t('login.error')}
            </Alert>
          ) : null}
        </Snackbar>
        {loginStatus === 'success' ? <Redirect to='/profile' /> : null}
      </main>
    </Page>
  );
};
