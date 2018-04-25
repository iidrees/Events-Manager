import jwt from 'jsonwebtoken';

import { users } from './testSeed';

const genToken = (id, admin, isSuperAdmin, name) => {
  const payload = {
    id,
    admin,
    isSuperAdmin,
    name
  };

  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: '3h'
  });

  return token;
};

export const user1Token = genToken(
  1,
  users[0].isAdmin,
  users[0].isSuperAdmin,
  users[0].name
);

export const userSuperAdmin = genToken(
  2,
  users[1].isAdmin,
  users[1].isSuperAdmin,
  users[1].name
);

export const userAdmin = genToken(
  3,
  users[2].isAdmin,
  users[2].isSuperAdmin,
  users[2].name
);
