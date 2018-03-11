// import jsonwebtoken for authentication
import jwt from 'jsonwebtoken';

/*
 A middleware to help with verifying a user trying to
  view a resource on the API
 if the verification fails, the user will be disbarred
 from viewing the content
 until a token is supplied and verified
 */
export default { // exported into the server module/file
  /**
   * @param {any} req {request object}
   * @param {any} res {response object}
   * @param {any} next {calls next middleware}
   * @returns {object} JSON
   */
  verifyUser(req, res, next) {
    // grab token from req object and store it
    const token = req.headers['x-access-token'] || req.headers.token;

    if (token) { // when token is supplied, it is verified here
      jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) { // if error, user is not allowed access for expired token
          return res.status(403).send({
            status: 'Unsuccessful',
            message: 'Session Expired, Please signin again.'
          });
        }// we store token in the req object for later authentication use
        req.decoded = decoded;
        next();
      });
    } else { // when token is not supplied, this error response is returned
      return res.status(401).send({
        status: 'Unsuccessful',
        message: 'Unauthorized'
      });
    }
  }
};
