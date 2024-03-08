import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, handleError } from "helpers/api";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Register.scss";

const FormField = ({ label, value, onChange }) => {
  return (
    <div className="register field">
      <label className="register label">{label}</label>
      <input
        className="register input"
        placeholder="enter here.."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const doRegister = async () => {
    try {
      const requestBody = JSON.stringify({ name, username, password });
      const response = await api.post("/users", requestBody);

      // Registration successful, proceed with login
      const loginRequestBody = JSON.stringify({ username, password });
      const loginResponse = await api.post("/login", loginRequestBody);

      // Get the returned user and update a new object.
      const user = response.data;

      // Store the token into the local storage.
      localStorage.setItem("token", user.token);

      // Login successfully worked --> navigate to the route /game
      navigate("/game");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Username already taken");
      } else {
        alert(`Something went wrong during registration: \n${handleError(error)}`);
      }
      navigate("/register");
    }
  };

  return (
    <BaseContainer>
      <div className="register container">
        <div className="register form">
          <FormField
            label="Name"
            value={name}
            onChange={(un: string) => setName(un)}
          />
          <FormField
            label="Username"
            value={username}
            onChange={(un: string) => setUsername(un)}
          />
          <FormField
            label="Password"
            value={password}
            onChange={(n) => setPassword(n)}
          />
          <div className="register button-container">
            <Button
              disabled={!username || !password || !name}
              width="100%"
              onClick={() => doRegister()}
            >
              Register
            </Button>
            <div className="register link-container">
              <Link to="/login">Back to Login</Link>
            </div>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Register;

