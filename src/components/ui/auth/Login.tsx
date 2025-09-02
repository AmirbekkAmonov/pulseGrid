import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface LoginPageProps {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginPageProps> = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev: { email: string; password: string }) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      alert("Iltimos, barcha maydonlarni to'ldiring");
      return;
    }

    setIsLoggingIn(true);

    // Demo uchun oddiy login (real loyihada API chaqiruv bo'ladi)
    setTimeout(() => {
      setIsAuth(true);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="login-page">
      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          className="login-form"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
        >
          <motion.h2
            className="login-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
          >
            Tizimga kirish
          </motion.h2>

          <motion.form
            onSubmit={handleLogin}
            className="login-form__content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
          >
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                placeholder="Email manzilingizni kiriting"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Parol</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                placeholder="Parolingizni kiriting"
                required
              />
            </div>

            <motion.button
              type="submit"
              className="login-btn"
              disabled={isLoggingIn}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoggingIn ? 'Kirilmoqda...' : 'Kirish'}
            </motion.button>
          </motion.form>

          <motion.div
            className="login-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <p>Demo uchun: istalgan email va parol</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
