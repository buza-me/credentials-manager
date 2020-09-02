export const validateEmail = (email) => !!email && !/\S+@\S+\.\S+/.test(email);

export const validatePassword = (password) => !!password && password.length < 8;

export const validateName = (name) => /[^A-Za-zА-Яа-я0-9_іІїЇґҐ]/.test(name || '');
