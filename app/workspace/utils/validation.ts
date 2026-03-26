export const validateFullName = (name: string): string | undefined => {
  if (!name || !name.trim()) {
    return "Unfortunately, you can't leave this blank.";
  }

  if (name.trim().length < 2) {
    return "Name must be at least 2 characters long.";
  }

  if (name.trim().length > 100) {
    return "Name must not exceed 100 characters.";
  }

  return undefined;
};

export const validatePhotoFile = (file: File): string | undefined => {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return "Please upload a valid image file (JPEG, PNG, WebP, or GIF).";
  }

  if (file.size > maxSize) {
    return "Image size must be less than 5MB.";
  }

  return undefined;
};

export const getFormattedTime = (): string => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};
