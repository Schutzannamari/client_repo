import React, { useState, useEffect } from "react";
import { api, handleError } from "helpers/api";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "styles/views/ProfilePage.scss";
import { User } from "types";

interface ProfileEditProps {
  userId: string;
}

const ProfileEdit: React.FC<ProfileEditProps> = () => {
  const { userid } = useParams<{ userid: string }>();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get<User>(`/users/${userid}`);
        setUser(response.data);
        setUsername(response.data.username);
        setBirthDate(response.data.birthDate || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userid]);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleBirthDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(event.target.value);
  };

  const saveProfile = async () => {
    try {
      await api.put(`/users/${userid}/edit`, { username, birthDate });
      alert("Profile updated successfully!");
      // Redirect to the profile page after saving changes
      navigate(`/profile/${userid}`); // Use navigate instead of history.push
    } catch (error) {
      alert(`Error updating profile: ${handleError(error)}`);
    }
  };

  return (
    <div className="profile-page">
      {user && (
        <div className="profile-details">
          <h2>Edit Profile</h2>
          <div className="field">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="field">
            <label>Birth Date:</label>
            <input
              type="date"
              value={birthDate}
              onChange={handleBirthDateChange}
            />
          </div>
          <button onClick={saveProfile}>Save</button>
        </div>
      )}
    </div>
  );
};

export default ProfileEdit;


