import { useState, useEffect } from 'react';
import './profile.css';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../services/fetch';
import { toast } from 'react-toastify';

const Profile = () => {
    const token = localStorage.getItem('token');
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        profile_picture: ''
    });

    const [isChanged, setIsChanged] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        const fetchDetails = async () => {
            try {
                const res = await fetchData(
                    'api/users/me',
                    'GET',
                    null,
                    token
                );

                setProfile({ name: res.name, email: res.email, profile_picture: res.profileImg });
            } catch (error) {
                return navigate('/login')
            }
        };

        fetchDetails();
    }, []);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetchData(
                'api/users/uploadProfilePhoto',
                'POST',
                formData,
                token,
                false
            );

            setProfile({ ...profile, profile_picture: res.profileImg });
        } catch (error) {
            console.log(error)
        }
    };

    const handleInputChange = (e) => {
        setIsChanged(true);
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };


    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const res = await fetchData(
                'api/users/editMe',
                'PATCH',
                { name: profile.name, email: profile.email },
                token
            );

            if (res.error) return toast.error(res.error);


            return toast.success(res.message)

        } catch (error) {
            return toast.error('Something went wrong...')
        }
        finally {
            setIsChanged(false)
        }

    }

    const [passwords, setPasswords] = useState({ old_password: '', new_password: '', new_password_confirm: '' });

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_])[A-Za-z\d!@#$%^&*_]{10,}$/;
        return regex.test(password);
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();

        const { old_password, new_password, new_password_confirm } = passwords;

        if (!old_password || !new_password || !new_password_confirm) {
            return toast.error("All fields are required.");
        }

        if (!validatePassword(new_password)) {
            return toast.error(
                "Password must be at least 10 characters long, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
            );
        }

        if (new_password !== new_password_confirm) {
            return toast.error("Passwords do not match.");
        }

        try {
            const res = await fetchData(
                'api/users/editPassword',
                'PATCH',
                {
                    currentPassword: old_password,
                    newPassword: new_password
                },
                token
            );

            if (res.error) {
                return toast.error(res.error);
            }

            return toast.success(res.message);
        } catch (error) {
            return toast.error("Something went wrong...");
        }
    };


    return (
        <div className="profile_page">
            <div className="profile-container">
                <h1 className="profile-title">
                    My
                    Profile
                </h1>
                <div className="profile-image-container">
                    <img
                        src={profile?.profile_picture?.length > 0 ? profile?.profile_picture : '/images/default_profile.webp'}
                        className="profile-image"
                    />
                    <label htmlFor="profileImageInput" className="change-image-label">
                        Change Image
                    </label>
                    <input
                        type="file"
                        id="profileImageInput"
                        hidden
                        onChange={handleImageChange}
                    />
                </div>
                <div className="profile-info">
                    <form onSubmit={handleUpdate}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                onChange={handleInputChange}
                                value={profile.name}
                                minLength={3}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleInputChange}
                                value={profile.email}
                                required
                            />
                        </div>
                        <button type='submit' disabled={!isChanged} className="update-button">
                            Update Profile
                        </button>
                    </form>
                </div>

                <hr />

                <div className="change_password_container">
                    <h3>Change Password</h3>
                    <form onSubmit={handlePasswordUpdate}>
                        <div className="form-group">
                            <label>Current Password</label>
                            <input
                                type="password"
                                name="currpw"
                                onChange={(e) => setPasswords({ ...passwords, old_password: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>New Password</label>
                            <input
                                type="password"
                                name="newpw"
                                onChange={(e) => setPasswords({ ...passwords, new_password: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>New Password Confirm</label>
                            <input
                                type="password"
                                name="confirmnewpw"
                                onChange={(e) => setPasswords({ ...passwords, new_password_confirm: e.target.value })}
                                required
                            />
                        </div>

                        <button className="update-button change_pw" type='submit'>
                            Update Password
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Profile;