// CoinQuestFrontend/src/components/SignIn.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const SpinnerIcon = (props) => (
    <svg
        className={`animate-spin h-5 w-5 ${props.className}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
    >
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
        ></circle>
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
    </svg>
);

const SubmitButton = ({ color, isLoading, children }) => (
  <button
    type="submit"
    disabled={isLoading}
    className={`w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-${color}-600 hover:bg-${color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500 transition-all duration-300 transform hover:scale-105 disabled:bg-${color}-400 disabled:scale-100 disabled:cursor-not-allowed`}
  >
    {isLoading ? <SpinnerIcon className="text-white" /> : children}
  </button>
);


const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        // Use the login function from context to handle storing user and token
        login(response.data.user, response.data.token);
        navigate('/vote'); // Redirect to the voting page
      } else {
        throw new Error(response.data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred.';
      setError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const currentConfig = {
    title: 'Voter Sign-In',
    description: 'Enter your credentials to cast your vote.',
    fields: [
      { name: 'email', label: 'Email Address', type: 'email', placeholder: 'voter@example.com' },
      { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' }
    ],
    buttonText: 'Sign In & Vote',
    color: 'blue',
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="animate-fade-in-up space-y-6">
            <div className="text-center space-y-3">
              <h1 className="text-3xl font-bold text-gray-800">{currentConfig.title}</h1>
              <p className="mt-2 text-gray-500">{currentConfig.description}</p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                {currentConfig.fields.map((field) => (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      required
                      value={formData[field.name]}
                      onChange={handleChange}
                      className={`block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-${currentConfig.color}-500 focus:border-transparent transition duration-200`}
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-600 text-center">{error}</p>
                </div>
              )}
              <SubmitButton color={currentConfig.color} isLoading={isLoading}>
                {currentConfig.buttonText}
              </SubmitButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;