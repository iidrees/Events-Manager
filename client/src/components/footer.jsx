import React from 'react';

export default () => {
  return (
    <div className="footer">
      {/* <!-- Footer--> */}
      <p id="footer-para" className="text-center">
        <strong>
          Made with{' '}
          <span id="red-footer">
            <i className="fa fa-heart" aria-hidden="true" />
          </span>{' '}
          by Idrees Ibraheem &copy; 2018
        </strong>
        <strong>
          <a id="email" href="mailto:idreesibraheem@gmail.com">
            {' '}
            Contact Me{' '}
            <span id="red">
              <i className="fa fa-heart" aria-hidden="true" />
            </span>{' '}
          </a>
        </strong>
      </p>
    </div>
  );
};
