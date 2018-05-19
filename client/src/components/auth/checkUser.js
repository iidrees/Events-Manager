import jwt from 'jsonwebtoken';

const checkUser = () => {
  // checks again if token is present or not
  try {
    let token = localStorage.getItem('x-access-token');
    if (token === null || token == undefined) {
      return false;
    }

    const decoded = jwt.decode(token);

    if (decoded.exp * 1000 < new Date().getTime()) {
      localStorage.clear();
      return false;
    }
  } catch (error) {
    return false;
  }
  return true;
};

export default checkUser;
