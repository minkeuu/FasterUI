import { useState, useEffect, useRef } from "react";
import {
  User,
  Mail,
  Lock,
  Camera,
  LogOut,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Loader2,
  Shield,
  Zap,
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
const DEFAULT_AVATAR =
  "/default_avatar.jpg";

export default function Profile() {
  const [user, setUser] = useState({
    id: "1",
    email: "user@example.com",
    user_metadata: {
      full_name: "Иван Иванов",
      avatar_url: DEFAULT_AVATAR,
    }
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [originalAvatarUrl, setOriginalAvatarUrl] = useState(DEFAULT_AVATAR);
  const [avatarUrl, setAvatarUrl] = useState(DEFAULT_AVATAR);
  const [avatarFile, setAvatarFile] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState(null);

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwMsg, setPwMsg] = useState(null);
  const [savingPw, setSavingPw] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const fileInputRef = useRef(null);
  // Имитация загрузки данных пользователя
  useEffect(() => {
    getProfile();
  }, []);
  async function getProfile() {
    setLoading(true);

    const response = await fetch(`/api/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("Error");
      return;
    }
    setUser(data);

    const avatar = data.avatar || DEFAULT_AVATAR;

    setAvatarUrl(avatar);
    setOriginalAvatarUrl(avatar);

    console.log(data);
    setName(data.name);
    setLoading(false);
  }

  const showMessage = (setter, type, text) => {
    setter({ type, text });
    setTimeout(() => setter(null), 3500);
  };

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showMessage(setProfileMsg, "error", "Изображение должно быть меньше 2 МБ");
      return;
    }

    setAvatarFile(file);

    const preview = URL.createObjectURL(file);
    setAvatarUrl(preview);
  };

    const handleSaveProfile = async () => {
    setSavingProfile(true);

    try {
      if (name) {
        await handleNameChange();
      }
      if (avatarFile) {
        const formData = new FormData();

        formData.append("avatar", avatarFile);

        const response = await fetch(`/api/profile/avatar`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message);
        }

        const newAvatar = result.avatar;

        setAvatarUrl(newAvatar);
        setOriginalAvatarUrl(newAvatar);
        setAvatarFile(null);
      }


      showMessage(setProfileMsg, "success", "Профиль сохранён");
      getProfile()
    } catch (err) {
      showMessage(setProfileMsg, "error", err.message);
    } finally {
      setSavingProfile(false);
    }
  };
  const handleNameChange = async () => {
    try {
      const response = await fetch(`/api/profile/name`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      const newName = result.name;

      console.log(result);
      console.log(newName);

      setName(newName);
      setUser(prev => ({
        ...prev,
        name: newName,
      }));
      getProfile()
    } catch (err) {
      console.log(err)
    }
  }
  const handleChangePassword = async () => {
    setPwMsg(null);

    if (newPw.length < 6) {
      showMessage(setPwMsg, "error", "Новый пароль должен быть не менее 6 символов");
      return;
    }
    if (newPw !== confirmPw) {
      showMessage(setPwMsg, "error", "Пароли не совпадают");
      return;
    }

    setSavingPw(true);
    try {
      const response = await fetch(`/api/profile/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: currentPw,
          newPassword: newPw,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }
      setCurrentPw("");
      setNewPw("");
      setConfirmPw("");
      showMessage(setPwMsg, "success", "Пароль изменён");
    } catch (err) {
      showMessage(setPwMsg, "error", err.message || "Не удалось изменить пароль");
    } finally {
      setSavingPw(false);
      navigate("/")
    }
  };

  const handleSignOut = async () => {
    // Симуляция выхода
    setUser(null);
    navigate("/")
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f4fb] flex items-center justify-center">
        <Loader2 className="animate-spin text-slate-400" size={32} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f4f4fb] flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-sm p-10 text-center max-w-md w-full">
          <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Lock className="text-white" size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Требуется вход</h2>
          <p className="text-slate-400 text-sm">Войдите, чтобы просмотреть свой профиль.</p>
        </div>
      </div>
    );
  }

  const email = user.email || "";

  return (
    <div className="min-h-screen bg-[#f4f4fb] font-sans flex justify-center px-4 py-10 sm:py-16">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center">
            <Zap size={17} className="text-white" />
          </div>
          <span className="text-slate-900 font-bold text-lg tracking-tight">FasterUI</span>
        </div>

        {/* Profile card */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-6">
          <div className="h-28 bg-gradient-to-r from-slate-900 via-slate-800 to-violet-900 relative">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 50%, #7c3aed 0%, transparent 60%), radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 50%)",
              }}
            />
          </div>

          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-14 mb-6">
              <div className="relative w-24 h-24 group">
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-lg"
                />
                <button
                  onClick={handleAvatarClick}
                  disabled={uploadingAvatar}
                  className="absolute inset-0 rounded-2xl bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                >
                  {uploadingAvatar ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <Camera size={20} />
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>

              <div className="sm:pb-1">
                <p className="text-xs text-slate-400">Нажмите на аватар, чтобы загрузить новое фото (макс. 2 МБ)</p>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <User size={12} />
                Полное имя
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
                className="w-full text-slate-900 text-lg font-medium border border-slate-200 rounded-xl px-4 py-3 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all"
              />
            </div>

            {/* Email (read-only) */}
            <div className="mt-5 space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Mail size={12} />
                Электронная почта
              </label>
              <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-4 py-3 bg-slate-50">
                <Mail size={16} className="text-slate-400" />
                <span className="text-slate-500 text-sm">{email}</span>
              </div>
            </div>

            {/* Message */}
            {profileMsg && (
              <div
                className={`mt-4 flex items-center gap-2 text-sm px-4 py-3 rounded-xl ${
                  profileMsg.type === "success"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-rose-50 text-rose-600"
                }`}
              >
                {profileMsg.type === "success" ? <Check size={16} /> : <AlertCircle size={16} />}
                {profileMsg.text}
              </div>
            )}

            {/* Save */}
            <button
              onClick={handleSaveProfile}
              disabled={
                savingProfile ||
                (name === user.name && !avatarFile)
              }
              className="mt-5 w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold py-3 rounded-xl transition-colors"
            >
              {savingProfile ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />}
              Сохранить изменения
            </button>
          </div>
        </div>

        {/* Password card */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 bg-violet-50 rounded-lg flex items-center justify-center">
              <Lock size={14} className="text-violet-600" />
            </div>
            <h3 className="text-slate-900 font-bold text-base">Изменить пароль</h3>
          </div>
          <p className="text-slate-400 text-xs mb-5">Используйте не менее 6 символов для нового пароля.</p>

          <div className="space-y-4">
            {/* Old password */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500">Старый пароль</label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 pr-11 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all"
                />
                <button
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {/* New password */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500">Новый пароль</label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 pr-11 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all"
                />
                <button
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500">Подтвердите новый пароль</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 pr-11 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all"
                />
                <button
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {pwMsg && (
              <div
                className={`flex items-center gap-2 text-sm px-4 py-3 rounded-xl ${
                  pwMsg.type === "success"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-rose-50 text-rose-600"
                }`}
              >
                {pwMsg.type === "success" ? <Check size={16} /> : <AlertCircle size={16} />}
                {pwMsg.text}
              </div>
            )}

            <button
              onClick={handleChangePassword}
              disabled={
                savingPw ||
                !currentPw ||
                !newPw ||
                !confirmPw
              }
              className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold py-3 rounded-xl transition-colors"
            >
              {savingPw ? <Loader2 className="animate-spin" size={16} /> : <Lock size={15} />}
              Обновить пароль
            </button>
          </div>
        </div>

        {/* Danger zone */}
        <div className="bg-white rounded-3xl shadow-sm p-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 bg-rose-50 rounded-lg flex items-center justify-center">
              <Shield size={14} className="text-rose-500" />
            </div>
            <h3 className="text-slate-900 font-bold text-base">Выйти</h3>
          </div>
          <p className="text-slate-400 text-xs mb-5">Вы будете возвращены к экрану входа.</p>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-sm font-semibold py-3 rounded-xl transition-colors"
          >
            <LogOut size={16} />
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
}
