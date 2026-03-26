export interface UserProfile {
  id: string;
  fullName: string;
  profilePhotoUrl: string | null;
  onboardingStep: number;
  createdAt: string;
  updatedAt: string;
}

export interface SetupFormState {
  fullName: string;
  profilePhoto: string | null;
  errors: {
    fullName?: string;
  };
  isLoading: boolean;
}

export interface PhotoPreviewProps {
  src?: string;
  alt?: string;
}
