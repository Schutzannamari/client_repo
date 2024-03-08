import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

const FormField = (props) => {
  return (
    <div className="login field">
      <label className="login label">{props.label}</label>
      <input
        className="login input"
        placeholder="enter here.."
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>(null);
  const [username, setUsername] = useState<string>(null);

  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({ username, password });
      const response = await api.post("/login", requestBody); // Corrected endpoint

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem("token", user.token);

      // Check the current URL
      const currentUrl = window.location.pathname;

      // Navigate based on the current URL
      if (currentUrl === "/login") {
        // Redirect to /game only if the user is coming from the login page
        navigate("/game");
      } else {
        // Otherwise, maintain the intended destination
        navigate(currentUrl);
      }
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  return (
    <BaseContainer>
      <div className="login container">
        <div className="login form">
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
          <div className="login button-container">
            <Button
              disabled={!username || !password}
              width="100%"
              onClick={() => doLogin()}
            >
              Login
            </Button>
          </div>
          <div className="login register-link"> {/* New div for the registration link */}
            <Link to="/register">Register here</Link>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Login;
