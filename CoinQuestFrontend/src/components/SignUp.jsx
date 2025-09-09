import React, { useState, useMemo } from 'react';

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


export default function App() {
    const [currentView, setCurrentView] = useState('roleSelection');
    const [selectedRole, setSelectedRole] = useState(null);
    const [user, setUser] = useState(null); 

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setCurrentView('signIn');
    };

    const handleSignInSuccess = (userData) => {
        setUser(userData);
        setCurrentView('success');
    };

    const handleSignOut = () => {
        setUser(null);
        setSelectedRole(null);
        setCurrentView('roleSelection');
    };

    const handleBack = () => {
        setSelectedRole(null);
        setCurrentView('roleSelection');
    };

    
    const RoleSelection = ({ onSelect }) => (
        <div className="animate-fade-in-up space-y-8">
            <div className="text-center space-y-3">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Select Your Role</h1>
                <p className="text-gray-500 dark:text-gray-400">Choose how you'd like to sign in to the platform.</p>
            </div>
            <div className="space-y-4">
                <RoleButton onClick={() => onSelect('admin')} color="indigo">
                     Sign in as Admin
                </RoleButton>
                <RoleButton onClick={() => onSelect('participant')} color="green">
                     Sign in as Hackathon Participant
                </RoleButton>
            </div>
        </div>
    );

    const SignInForm = ({ role, onBack, onSignInSuccess }) => {
        const [isLoading, setIsLoading] = useState(false);
        const [formData, setFormData] = useState({});
        const [error, setError] = useState('');

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
            if (error) setError('');
        };

        const config = useMemo(() => ({
            admin: {
                title: 'Administrator Sign-In',
                description: 'Use your predefined administrator credentials.',
                fields: [
                    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'admin@example.com' },
                    { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' }
                ],
                buttonText: 'Sign In Securely',
                color: 'indigo',
            },
            participant: {
                title: 'Participant Sign-In',
                description: 'Use the Team ID and password provided to you.',
                fields: [
                    { name: 'teamId', label: 'Team ID', type: 'text', placeholder: 'Team-Unicorn-42' },
                    { name: 'password', label: 'Team Password', type: 'password', placeholder: '••••••••' }
                ],
                buttonText: 'Sign In',
                color: 'green',
            }
        }), []);

        const currentConfig = config[role];

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');
            setIsLoading(true);
            
            await new Promise(resolve => setTimeout(resolve, 1500));

            const predefinedCredentials = {
                admin: { email: 'admin@example.com', password: 'securePassword123' },
                participant: { teamId: 'Team-Unicorn-42', password: 'password456' }
            };

            const expected = predefinedCredentials[role];
            const providedKey = role === 'admin' ? 'email' : 'teamId';
            const isValid = formData[providedKey] === expected[providedKey] && formData.password === expected.password;
            
            setIsLoading(false);

            if (isValid) {
                const userData = {
                    role: role,
                    identifier: formData.email || formData.teamId,
                };
                onSignInSuccess(userData);
            } else {
                setError('Invalid credentials. Please check your details and try again.');
            }
        };

        return (
            <div className="animate-fade-in-up space-y-6">
                 <button onClick={onBack} className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-200">
                    
                    Back to role selection
                </button>
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{currentConfig.title}</h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">{currentConfig.description}</p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {currentConfig.fields.map((field) => (
                            <div key={field.name}>
                                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{field.label}</label>
                                <input
                                    id={field.name}
                                    name={field.name}
                                    type={field.type}
                                    required
                                    onChange={handleChange}
                                    className={`block w-full px-4 py-3 border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-${currentConfig.color}-500 focus:border-transparent transition duration-200`}
                                    placeholder={field.placeholder}
                                />
                            </div>
                        ))}
                    </div>

                    {error && <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>}

                    <SubmitButton color={currentConfig.color} isLoading={isLoading}>
                        {currentConfig.buttonText}
                    </SubmitButton>
                </form>
            </div>
        );
    };

    const SuccessView = ({ user, onSignOut }) => (
        <div className="animate-fade-in-up text-center space-y-8">
             <div className="text-center space-y-3">
                
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Sign-In Successful</h1>
                <p className="text-gray-500 dark:text-gray-400">Welcome, <span className="font-semibold text-gray-700 dark:text-gray-200">{user?.identifier}</span>!</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">You can now proceed to your dashboard.</p>
            </div>
            
            <button
                onClick={onSignOut}
                className="px-8 py-3 text-base font-medium rounded-xl text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/50"
            >
                Sign Out
            </button>
        </div>
    );

    const RoleButton = ({ onClick, color, children }) => (
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-${color}-600 hover:bg-${color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-${color}-500/50`}
        >
            {children}
        </button>
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

    return (
        <main className="bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-black flex items-center justify-center min-h-screen font-sans p-4 transition-colors duration-500">
            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
            `}</style>
            <div className="w-full max-w-md p-8 md:p-10 space-y-8 bg-white/70 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-500">
                {currentView === 'roleSelection' && <RoleSelection onSelect={handleRoleSelect} />}
                
                {currentView === 'signIn' && (
                    <SignInForm 
                        role={selectedRole} 
                        onBack={handleBack} 
                        onSignInSuccess={handleSignInSuccess}
                    />
                )}

                {currentView === 'success' && <SuccessView user={user} onSignOut={handleSignOut} />}
            </div>
        </main>
    );
}
