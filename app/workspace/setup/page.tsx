'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Chrome as Home, MessageSquare, Bell, File, MoveHorizontal as MoreHorizontal, Upload, CircleAlert as AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function WorkspaceSetup() {
  const [fullName, setFullName] = useState('');
  const [showError, setShowError] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleNext = () => {
    if (!fullName.trim()) {
      setShowError(true);
      return;
    }
    setShowError(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
    if (showError && e.target.value.trim()) {
      setShowError(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhoto = () => {
    setShowPhotoModal(false);
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-16 bg-[#4A154B] flex flex-col items-center py-2 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#4A154B] to-[#3d1140]" />

        <div className="relative z-10 flex flex-col items-center w-full">
          {/* Slack Logo */}
          <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center mb-4 mt-1">
            <span className="text-white font-bold text-lg">S</span>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col items-center space-y-1 w-full">
            <NavItem icon={Home} label="Home" />
            <NavItem icon={MessageSquare} label="DMs" />
            <NavItem icon={Bell} label="Activity" />
            <NavItem icon={File} label="Files" />
            <NavItem icon={MoreHorizontal} label="More" />
          </nav>
        </div>

        {/* User Avatar at Bottom */}
        <div className="mt-auto mb-2 relative z-10">
          <div className="w-9 h-9 bg-white/10 rounded-lg" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-start justify-center pt-20 px-8">
        <div className="w-full max-w-[520px]">
          <p className="text-sm text-gray-600 mb-4">Step 1 of 5</p>

          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            What's your name?
          </h1>

          <p className="text-base text-gray-700 mb-8 leading-relaxed">
            Adding your name and profile photo helps your teammates recognize and connect with you more easily.
          </p>

          {/* Name Input */}
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={handleNameChange}
              className={cn(
                "h-11 text-base border-gray-300 focus:border-[#1264A3] focus:ring-[#1264A3]",
                showError && "border-red-500 focus:border-red-500 focus:ring-red-500"
              )}
            />
            {showError && (
              <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>Unfortunately, you can't leave this blank.</span>
              </div>
            )}
          </div>

          {/* Profile Photo Section */}
          <div className="mb-8">
            <div className="mb-2">
              <span className="text-gray-900 font-medium">Your profile photo</span>
              <span className="text-gray-500 ml-1">(optional)</span>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              Help your teammates know they're talking to the right person.
            </p>

            <div className="flex items-center gap-4">
              {/* Avatar Preview */}
              <div className="relative">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-16 h-16 rounded-lg object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-[#2EB67D] flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-white/90 mb-1" />
                    <div className="absolute bottom-3 w-10 h-10 rounded-full bg-white/90" />
                  </div>
                )}
              </div>

              {/* Upload Button */}
              <Button
                variant="outline"
                className="h-9 px-4 text-sm font-medium border-gray-400 hover:bg-gray-50"
                onClick={() => setShowPhotoModal(true)}
              >
                Upload Photo
              </Button>
            </div>
          </div>

          {/* Next Button */}
          <Button
            onClick={handleNext}
            disabled={!fullName.trim()}
            className={cn(
              "h-11 px-6 text-base font-medium rounded-md",
              fullName.trim()
                ? "bg-[#007A5A] hover:bg-[#006644] text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200"
            )}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Photo Upload Modal */}
      <Dialog open={showPhotoModal} onOpenChange={setShowPhotoModal}>
        <DialogContent className="sm:max-w-[540px] p-0 gap-0">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle className="text-xl font-bold">Add a profile photo</DialogTitle>
            <button
              onClick={() => setShowPhotoModal(false)}
              className="absolute right-6 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogHeader>

          <div className="px-6 pb-6">
            {/* Drop Zone */}
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-12 mb-6 transition-colors",
                dragActive ? "border-[#1264A3] bg-blue-50" : "border-gray-300"
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center">
                <div className="mb-4 relative">
                  <div className="w-20 h-16 bg-gray-200 rounded-lg" />
                  <div className="absolute -right-2 -bottom-2 w-12 h-12 bg-white rounded-lg border-2 border-gray-300 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-gray-500" />
                  </div>
                </div>

                <p className="text-base font-medium text-gray-900 mb-4">
                  Drag and drop your photo
                </p>

                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileInput}
                />
                <label htmlFor="file-upload">
                  <Button
                    variant="outline"
                    className="h-9 px-4 text-sm font-medium border-gray-400 hover:bg-gray-50"
                    onClick={() => document.getElementById('file-upload')?.click()}
                    type="button"
                  >
                    Upload file
                  </Button>
                </label>
              </div>
            </div>

            {/* Preview Section */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-3">Preview</p>
              <div className="flex items-center gap-3">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Preview" className="w-10 h-10 rounded-lg object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-[#2EB67D] flex items-center justify-center relative overflow-hidden">
                    <div className="w-4 h-4 rounded-full bg-white/90 absolute top-1" />
                    <div className="w-7 h-7 rounded-full bg-white/90 absolute bottom-0" />
                  </div>
                )}
                <span className="text-sm text-gray-600">{getCurrentTime()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPhotoModal(false)}
                className="h-9 px-4 text-sm font-medium border-gray-400 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSavePhoto}
                className="h-9 px-4 text-sm font-medium bg-[#007A5A] hover:bg-[#006644] text-white"
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function NavItem({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <button
      className="w-full flex flex-col items-center py-2 px-1 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors group"
      aria-label={label}
    >
      <Icon className="w-5 h-5 mb-0.5" />
      <span className="text-[10px] leading-tight">{label}</span>
    </button>
  );
}
