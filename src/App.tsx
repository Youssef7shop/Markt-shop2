import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { UsersPage } from './pages/Users';
import { DashboardPage } from './pages/Dashboard';
import { OrdersPage } from './pages/Orders';
import { ServicesPage } from './pages/Services';
import { WalletPage } from './pages/Wallet';
import { SettingsPage } from './pages/Settings';
import { SupportPage } from './pages/Support';
import { HistoryPage } from './pages/History';
import { AIPage } from './pages/AI';
import { ReportsPage } from './pages/Reports';
import { CouponsPage } from './pages/Coupons';
import { TransactionsPage } from './pages/Transactions';
import { PlaceholderPage } from './pages/Placeholder';
import { InboxPage } from './pages/Inbox';
import { GoogleSheetsContext, appendToSheet } from './lib/googleSheets';
import { initAuth } from './lib/auth';
import { RoleContext, UserRole } from './lib/roleContext';

export default function App() {
  const [activePage, setActivePage] = useState('users');
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [spreadsheetId, setSpreadsheetId] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole>('admin');

  useEffect(() => {
    initAuth((user, token) => {
      setAccessToken(token);
    }, () => {
      setAccessToken(null);
    });
  }, []);

  const logToSheet = async (type: 'User' | 'Order', data: any[]) => {
    if (!accessToken || !spreadsheetId) return;
    try {
      const range = type === 'User' ? 'Users!A1' : 'Orders!A1';
      await appendToSheet(accessToken, spreadsheetId, range, [data]);
    } catch (e) {
      console.error('Failed to log to sheet', e);
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'users':
        return <UsersPage />;
      case 'orders':
        return <OrdersPage />;
      case 'services':
        return <ServicesPage />;
      case 'transactions':
        return <TransactionsPage />;
      case 'wallet':
        return <WalletPage />;
      case 'coupons':
        return <CouponsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'inbox':
        return <InboxPage />;
      case 'ai':
        return <AIPage />;
      case 'support':
        return <SupportPage />;
      case 'history':
        return <HistoryPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <PlaceholderPage id={activePage} />;
    }
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      <GoogleSheetsContext.Provider value={{ accessToken, spreadsheetId, setAccessToken, setSpreadsheetId, logToSheet }}>
        <div className="flex h-screen overflow-hidden bg-background text-white">
          <Sidebar activePage={activePage} onPageChange={setActivePage} />
          <div className="flex-1 pr-64 flex flex-col">
            <Header onPageChange={setActivePage} />
            <main className="flex-1 overflow-y-auto">
              {renderPage()}
            </main>
          </div>
        </div>
      </GoogleSheetsContext.Provider>
    </RoleContext.Provider>
  );
}


