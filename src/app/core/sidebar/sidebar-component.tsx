import React, { useState } from 'react';
import { useAngularServices } from '../../shared/react/angular-services-context';

interface NavigationItem {
  path: string;
  label: string;
  icon?: string;
}

interface SidebarComponentProps {
  onItemSelected?: (path: string) => void;
}

export const SidebarComponent: React.FC<SidebarComponentProps> = ({ onItemSelected }) => {
  const { router } = useAngularServices();
  const [activeItem, setActiveItem] = useState<string>('');

  const navigationItems: NavigationItem[] = [
    { path: '/customers', label: 'Customers', icon: 'users' },
    { path: '/orders', label: 'Orders', icon: 'shopping-cart' },
    { path: '/about', label: 'About', icon: 'info-circle' }
  ];

  const handleItemClick = (path: string) => {
    setActiveItem(path);
    router.navigate([path]);
    if (onItemSelected) {
      onItemSelected(path);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h4>Navigation</h4>
      </div>
      <ul className="sidebar-nav">
        {navigationItems.map((item) => (
          <li 
            key={item.path} 
            className={activeItem === item.path ? 'active' : ''}
            onClick={() => handleItemClick(item.path)}
          >
            <a>{item.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
