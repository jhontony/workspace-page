'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CircleAlert as AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PhotoPreview } from './PhotoPreview';
import { PhotoUploadModal } from './PhotoUploadModal';
import { validateFullName } from '../utils/validation';

interface SetupFormProps {
  onSubmit: (data: { fullName: string; profilePhoto: string | null }) => void;
}

export const SetupForm: React.FC<SetupFormProps> = ({ onSubmit }) => {
  const [fullName, setFullName] = useState('');
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFullName(value);

    if (fullNameError) {
      const error = validateFullName(value);
      setFullNameError(error || null);
    }
  }, [fullNameError]);

  const validateForm = useCallback((): boolean => {
    const nameError = validateFullName(fullName);
    if (nameError) {
      setFullNameError(nameError);
      return false;
    }
    return true;
  }, [fullName]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        fullName: fullName.trim(),
        profilePhoto,
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [fullName, profilePhoto, validateForm, onSubmit]);

  const handlePhotoSave = useCallback((photoData: string) => {
    setProfilePhoto(photoData);
  }, []);

  const handlePhotoEdit = useCallback(() => {
    setShowPhotoModal(true);
  }, []);

  const isFormValid = fullName.trim().length > 0 && !fullNameError;

  return (
    <div className="w-full max-w-[520px]">
      {/* Step Indicator */}
      <p className="text-sm font-medium text-gray-600 mb-4">Step 1 of 5</p>

      {/* Heading */}
      <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
        What's your name?
      </h1>

      {/* Description */}
      <p className="text-base text-gray-700 mb-8 leading-relaxed">
        Adding your name and profile photo helps your teammates recognize and
        connect with you more easily.
      </p>

      {/* Full Name Input */}
      <div className="mb-8">
        <Input
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={handleNameChange}
          disabled={isSubmitting}
          className={cn(
            'h-11 text-base border-gray-300 placeholder:text-gray-500',
            'focus:border-[#1264A3] focus:ring-[#1264A3]',
            'transition-colors duration-200',
            fullNameError && 'border-red-500 focus:border-red-500 focus:ring-red-500'
          )}
        />

        {fullNameError && (
          <div className="flex items-center gap-2 mt-3">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span className="text-sm text-red-600">{fullNameError}</span>
          </div>
        )}
      </div>

      {/* Profile Photo Section */}
      <div className="mb-8">
        <div className="flex items-baseline gap-1.5 mb-2">
          <span className="text-base font-semibold text-gray-900">
            Your profile photo
          </span>
          <span className="text-base text-gray-500">(optional)</span>
        </div>

        <p className="text-sm text-gray-700 mb-5">
          Help your teammates know they're talking to the right person.
        </p>

        <div className="flex items-center gap-4">
          {/* Photo Preview */}
          <PhotoPreview src={profilePhoto || undefined} size="md" />

          {/* Photo Button */}
          <Button
            onClick={handlePhotoEdit}
            variant="outline"
            disabled={isSubmitting}
            className="h-9 px-4 text-sm font-medium border-gray-300 hover:bg-gray-50 transition-colors"
          >
            {profilePhoto ? 'Edit Photo' : 'Upload Photo'}
          </Button>
        </div>
      </div>

      {/* Next Button */}
      <Button
        onClick={handleSubmit}
        disabled={!isFormValid || isSubmitting}
        className={cn(
          'h-11 px-6 text-base font-medium rounded-md transition-all duration-200',
          isFormValid
            ? 'bg-[#007A5A] hover:bg-[#006644] text-white shadow-sm hover:shadow-md'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        )}
      >
        {isSubmitting ? 'Setting up...' : 'Next'}
      </Button>

      {/* Photo Upload Modal */}
      <PhotoUploadModal
        isOpen={showPhotoModal}
        onClose={() => setShowPhotoModal(false)}
        onSave={handlePhotoSave}
      />
    </div>
  );
};
