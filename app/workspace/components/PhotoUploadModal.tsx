'use client';

import { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PhotoPreview } from './PhotoPreview';
import { validatePhotoFile, getFormattedTime } from '../utils/validation';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (photoData: string) => void;
}

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    setError(null);

    const validationError = validatePhotoFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPhotoData(result);
    };
    reader.onerror = () => {
      setError('Failed to read the file. Please try again.');
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      if (e.dataTransfer.files?.[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        handleFile(e.target.files[0]);
      }
    },
    [handleFile]
  );

  const handleSave = () => {
    if (photoData) {
      onSave(photoData);
      onClose();
      setPhotoData(null);
      setError(null);
    }
  };

  const handleClose = () => {
    onClose();
    setPhotoData(null);
    setError(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[540px] p-0 gap-0 bg-white">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-gray-900">
              Add a profile photo
            </DialogTitle>
            <button
              onClick={handleClose}
              className="rounded-md opacity-70 hover:opacity-100 transition-opacity"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </DialogHeader>

        <div className="px-6 py-6">
          {/* Upload Drop Zone */}
          <div
            className={cn(
              'border-2 border-dashed rounded-lg p-12 mb-6 transition-all duration-200',
              isDragActive
                ? 'border-[#1264A3] bg-blue-50'
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center">
              {/* Icon Illustration */}
              <div className="mb-4 relative">
                <div className="w-20 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg" />
                <div className="absolute -right-3 -bottom-3 w-12 h-12 bg-white rounded-lg border-2 border-gray-300 flex items-center justify-center shadow-sm">
                  <Upload className="w-6 h-6 text-gray-500" />
                </div>
              </div>

              <p className="text-base font-semibold text-gray-900 mb-3">
                Drag and drop your photo
              </p>

              <p className="text-sm text-gray-600 mb-4">or</p>

              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileInput}
              />
              <label htmlFor="file-upload">
                <Button
                  variant="outline"
                  className="h-9 px-4 text-sm font-medium border-gray-300 hover:bg-gray-100 cursor-pointer"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  type="button"
                >
                  Upload file
                </Button>
              </label>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Preview Section */}
          {photoData && (
            <div className="mb-6 pb-6 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-3">Preview</p>
              <div className="flex items-center gap-3">
                <PhotoPreview src={photoData} size="sm" />
                <p className="text-sm text-gray-600">{getFormattedTime()}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={handleClose}
              className="h-9 px-4 text-sm font-medium border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!photoData}
              className={cn(
                'h-9 px-4 text-sm font-medium text-white transition-colors',
                photoData
                  ? 'bg-[#007A5A] hover:bg-[#006644]'
                  : 'bg-gray-300 cursor-not-allowed'
              )}
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
