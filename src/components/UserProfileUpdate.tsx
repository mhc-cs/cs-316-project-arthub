import React, { useState } from 'react';

interface UserData {
  uid: string;
  firstName: string;
  lastName: string;
  connections: string;
  bio: string;
  location: string;
  profilePictureUrl: string;
}

interface UserProfileUpdateProps {
  userData: UserData;
  onSave: (updatedUserData: UserData) => void;
}

export default function UserProfileUpdate {}

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input type="text" name="firstName" value={formValues.firstName} onChange={handleChange} />
      </div>
      <div>
        <label>Last Name</label>
        <input type="text" name="lastName" value={formValues.lastName} onChange={handleChange} />
      </div>
      {/* Add other fields similarly */}
      <div>
        <label>Profile Picture URL</label>
        <input type="text" name="profilePictureUrl" value={formValues.profilePictureUrl} onChange={handleChange} />
      </div>
      <div>
        <label>Bio</label>
        <textarea name="bio" value={formValues.bio} onChange={handleChange} />
      </div>
      <div>
        <label>Location</label>
        <input type="text" name="location" value={formValues.location} onChange={handleChange} />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
}
