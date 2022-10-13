import React from 'react';

export const Form = ({ username, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="username">{username}</label>
        <input className="form-control" id="name" />
      </div>
      <div className="form-group">
        <label htmlFor="old-password">Old Password</label>
        <input
          type="password"
          className="form-control"
          id="oldpw"
        />
      </div>
      <div className="form-group">
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          className="form-control"
          id="newpw"
        />
      </div>
      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
export default Form;
