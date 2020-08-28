export const validateEmail = (email) => !!email && !/\S+@\S+\.\S+/.test(email);

export const validatePassword = (password) => !!password && password.length < 8;
