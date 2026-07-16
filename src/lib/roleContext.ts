import { createContext, useContext } from 'react';

export type UserRole = 'admin' | 'client' | 'guest';

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

export const RoleContext = createContext<RoleContextType>({
  role: 'admin',
  setRole: () => {},
});

export const useRole = () => useContext(RoleContext);
