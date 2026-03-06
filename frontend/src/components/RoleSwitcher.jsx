import React from 'react';
import '../styles/RoleSwitcher.css';

const RoleSwitcher = ({ userInfo, setUserInfo }) => {
    const handleToggle = () => {
        const isCurrentlyFaculty = userInfo?.role === 'Admin';
        const targetRole = isCurrentlyFaculty ? 'Student' : 'Faculty';

        const mockUser = {
            id: targetRole === 'Faculty' ? '6963cb360277a49685415cc5' : '6963d54b3151152909a56aee',
            name: targetRole === 'Faculty' ? 'Faculty Demo' : 'Karthi Keyan T (Student Demo)',
            email: `${targetRole.toLowerCase()}@demo.com`,
            role: targetRole === 'Faculty' ? 'Admin' : 'Student',
            isDemo: true
        };

        localStorage.setItem('userInfo', JSON.stringify(mockUser));
        setUserInfo(mockUser);
        window.location.reload(); // Ensure all components refresh with new role
    };

    if (!userInfo?.isDemo) return null;

    const otherRole = userInfo.role === 'Admin' ? 'Student' : 'Faculty';

    return (
        <div className="role-switcher-banner">
            <div className="container banner-content">
                <span className="demo-label">Click here to switch roles</span>
                <span className="divider">|</span>
                <div className="role-controls">
                    <span>View as: <strong>{userInfo.role === 'Admin' ? 'Faculty' : 'Student'}</strong></span>
                    <button onClick={handleToggle} className="role-toggle-btn">
                        Switch to {otherRole} View
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoleSwitcher;
