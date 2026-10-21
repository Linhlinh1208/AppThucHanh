export const validateLogin = (username, password) => {
  if (!username || username.trim() === '') {
    return { isValid: false, message: 'Tài khoản không được để trống!' };
  }
  if (!password || password.trim() === '') {
    return { isValid: false, message: 'Mật khẩu không được để trống!' };
  }
  return { isValid: true, message: '' };
};