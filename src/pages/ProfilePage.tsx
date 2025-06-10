import React, { useState, useRef, ChangeEvent } from 'react';
import { useAuth } from '../context/UserContext';
import { useTranslation } from 'react-i18next';
import AvatarIcon from '../assets/avatar.webp';
import authApi from '../api/authApi';
import { UserProfile } from '../types/user';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';
interface UserFormData {
  name: string;
  email: string;
  avatar: string;    

  avatarFile: File | null;
  showPasswordFields: boolean;
  newPassword: string;
  confirmPassword: string;
}

const Profile: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCorrectPassword, setIsCorrectPassword] = useState<boolean>(false);
  const {t} = useTranslation();
  const {toast, showToast} = useToast();

  const {user, setUser} = useAuth();

  const [formData, setFormData] = useState<UserFormData>({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
    avatarFile: null,
    showPasswordFields: false,
    newPassword: '',
    confirmPassword: ''
  });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        avatarFile: file,
        avatar: URL.createObjectURL(file),
      }));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(name === "confirmPassword" || name === "newPassword"){
      setIsCorrectPassword(false);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      formData.showPasswordFields &&
      formData.newPassword !== formData.confirmPassword
    ) {
      setIsCorrectPassword(true);
      return ;
    }

    try {
      const data:UserProfile = {
        _id: user?._id,
        email: formData.email,
        password: formData.newPassword,
        name: formData.name,
        avatarFile: formData.avatarFile
      }
      const res = await authApi.updateProfile(data);
      if(res){
        showToast(t("updateSuccess"), 'success');
        setUser(res);
      }
    } catch (error) {
      console.error(error);
      showToast(t("updateFailed"), 'error');

    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 p-6 shadow-xl dark:bg-white rounded-md">
      {/* Avatar */}
      <div className='flex justify-center'>
        <div className="w-fit text-center p-3 border border-primary-1 rounded-md">
          <div
            onClick={handleAvatarClick}
            className="w-24 h-24 mx-auto rounded-full overflow-hidden cursor-pointer border border-gray-300"
          >
            <img src={formData.avatar || AvatarIcon} alt="Avatar" className="object-cover w-full h-full" />
          </div>
          <p onClick={handleAvatarClick} className="text-primary-1 hover:underline cursor-pointer mt-2">
            {t("changeAvatar")}
          </p>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Email (readonly) */}
      <div>
        <label className="block font-semibold mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
        />
      </div>

      {/* Name */}
      <div>
        <label className="block font-semibold mb-1">{t("name")}</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"         
        />
      </div>

      {/* Change Password */}
      <div>
        {!formData.showPasswordFields ? (
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, showPasswordFields: true }))}
            className="text-sm text-primary-1 hover:underline"
          >
            {t("changePassword")}
          </button>
        ) : (
          <>
            <div className="mb-2">
              <label className="block font-semibold mb-1">{t("newPassword")}</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="New password"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">{t("confirmPassword")}</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Confirm password"
              />
            </div>
            {isCorrectPassword && <p className='text-base16 text-red-500'>{t("incorrectPassword")}</p>}
            
            <div className='flex justify-end'>
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, showPasswordFields: false }))}
                className="text-sm text-primary-1 hover:underline"
              >
                {t("hidePassword")}
              </button>
            </div>
          </>
        )}
        {toast.show && <Toast message={toast.message} status={toast.status} />}
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-primary-1 text-white px-6 py-2 rounded hover:bg-primary-3"
        >
          {t("updateProfile")}
        </button>
      </div>
    </form>
  );
};

export default Profile;
