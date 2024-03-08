import React, { useState, useEffect } from "react";
import { api, handleError } from "helpers/api";
import { useParams, Link } from "react-router-dom"; // Import Link from react-router-dom
import "styles/views/ProfilePage.scss";
import { User } from "types";

interface ProfilePageProps {
  userid: string;
}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const { userid } = useParams<{ userid: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [birthDate, setBirthDate] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get<User>(`/users/${userid}`);
        setUser(response.data);
        setBirthDate(response.data.birthDate || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userid]);

  const handleBirthDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(event.target.value);
  };

  const saveBirthDate = async () => {
    try {
      await api.put(`/users/${userid}`, { birthDate });
      alert("Birth date saved successfully!");
    } catch (error) {
      alert(`Error saving birth date: ${handleError(error)}`);
    }
  };

  return (
    <div className="profile-page">
      {user && (
        <div className="profile-details">
          <h2>{user.username}</h2>
          <p>Status: {user.online ? "Online" : "Offline"}</p>
          <p>Creation Date: {user.creationDate}</p>
          <p>
            Birth Date:{" "}
            <input
              type="date"
              value={birthDate}
              onChange={handleBirthDateChange}
            />
            <button onClick={saveBirthDate}>Save</button>
          </p>
          {user.loggedInUser && ( // Display the edit button only if the user is logged in
            <Link to={`/profile/${userid}/edit`}>Edit</Link>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
