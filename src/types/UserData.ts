export interface UserData {
    uid: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    profilePictureUrl?: string; // Optional field
    gender?: string;
    pronouns?: string;
    artistStatement?: string;
    creativeNiche?: string;
    city?: string;
    work?: string;
    education?: string;
  }