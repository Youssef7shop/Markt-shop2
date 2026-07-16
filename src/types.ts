export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'client' | 'provider';
  roleLabel: string;
  balance: number;
  balanceLabel?: string;
  status: 'active' | 'suspended' | 'pending';
  statusLabel: string;
  lastSeen: string;
  lastSeenTime: string;
  registrationDate: string;
  registrationTime: string;
}

export interface Stat {
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
  icon: any;
  color: string;
}
