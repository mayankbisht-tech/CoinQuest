import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

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


const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [role, setRole] = useState('voter'); 
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email: formData.email,
        password: formData.password,
        role: role 
      });

      if (response.data.success) {
        login(response.data.user, response.data.token);
        navigate('/vote');
      } else {
        throw new Error(response.data.message || 'Registration failed.');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const config = {
      title: 'Create an Account',
      description: 'Join the platform to vote or participate.',
      fields: [
          { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
          { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
          { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: '••••••••' }
      ],
      buttonText: 'Sign Up',
      color: 'green',
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="animate-fade-in-up space-y-6">
            <div className="text-center space-y-3">
              <h1 className="text-3xl font-bold text-gray-800">{config.title}</h1>
              <p className="mt-2 text-gray-500">{config.description}</p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                {config.fields.map((field) => (
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
                      className={`block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-${config.color}-500 focus:border-transparent transition duration-200`}
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Register as a:</label>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <input
                            id="role-voter"
                            name="role"
                            type="radio"
                            value="voter"
                            checked={role === 'voter'}
                            onChange={(e) => setRole(e.target.value)}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                        />
                        <label htmlFor="role-voter" className="ml-2 block text-sm text-gray-900">
                            Voter
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            id="role-participant"
                            name="role"
                            type="radio"
                            value="participant"
                            checked={role === 'participant'}
                            onChange={(e) => setRole(e.target.value)}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                        />
                        <label htmlFor="role-participant" className="ml-2 block text-sm text-gray-900">
                            Participant
                        </label>
                    </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-600 text-center">{error}</p>
                </div>
              )}
              <SubmitButton color={config.color} isLoading={isLoading}>
                {config.buttonText}
              </SubmitButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;