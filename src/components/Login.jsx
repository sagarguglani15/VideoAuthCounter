import React, { useState } from "react";
import styled from "styled-components";
import Firebase from "../firebase-config";

const StyledLogin = styled.div`
  padding: 50px;
  padding-bottom: 0px;
  display: flex;
  flex-direction: column;
  & * {
    outline: none;
  }
  & input {
    margin: 10px 0px;
    width: 300px;
    border-radius: 10px;
    padding: 10px;
    font-size: 16px;
  }
  & button {
    margin: 20px 0px;
    border-radius: 25px;
    width: 150px;
    background-color: black;
    color: white;
    font-weight: 900;
    padding: 10px;
    font-size: 18px;
    cursor: pointer;
  }
  & button:disabled {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
  }
  & u {
    cursor: pointer;
  }
`;

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const handleLogin = () => {
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        alert(`${err?.message} ${err?.code}`);
      });
  };

  const handleSignup = () => {
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        alert(`${err?.message} ${err?.code}`);
      });
  };

  const getButtonDisabled = () => {
    if (props.user) {
      return true;
    }
    return false;
  };

  return (
    <StyledLogin>
      <input
        placeholder="Enter email"
        type="text"
        className="email_input"
        autoFocus
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target?.value);
        }}
      />
      <input
        placeholder="Enter password"
        type="password"
        className="password_input"
        required
        value={password}
        onChange={(e) => {
          setPassword(e.target?.value);
        }}
      />
      <div className="btns">
        {hasAccount ? (
          <>
            <button onClick={handleLogin} disabled={getButtonDisabled()}>
              LogIn
            </button>
            <p>
              Don't have an account ?{" "}
              <u
                onClick={() => {
                  setHasAccount(!hasAccount);
                }}
              >
                Create Account
              </u>
            </p>
          </>
        ) : (
          <>
            <button onClick={handleSignup} disabled={getButtonDisabled()}>
              SignUp
            </button>
            <p>
              Already have an account ?{" "}
              <u
                onClick={() => {
                  setHasAccount(!hasAccount);
                }}
              >
                SignIn
              </u>
            </p>
          </>
        )}
      </div>
    </StyledLogin>
  );
};

export default Login;
