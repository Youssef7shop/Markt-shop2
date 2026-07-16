import { createContext, useContext } from 'react';

export const GoogleSheetsContext = createContext<{
  accessToken: string | null;
  spreadsheetId: string | null;
  setAccessToken: (token: string | null) => void;
  setSpreadsheetId: (id: string | null) => void;
  logToSheet: (type: 'User' | 'Order', data: any[]) => Promise<void>;
}>({
  accessToken: null,
  spreadsheetId: null,
  setAccessToken: () => {},
  setSpreadsheetId: () => {},
  logToSheet: async () => {},
});

export const useGoogleSheets = () => useContext(GoogleSheetsContext);

export const createSpreadsheet = async (accessToken: string, title: string) => {
  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: title,
      },
      sheets: [
        {
          properties: {
            title: 'Users',
          },
        },
        {
          properties: {
            title: 'Orders',
          },
        }
      ]
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to create spreadsheet');
  }
  return await response.json();
};

export const appendToSheet = async (accessToken: string, spreadsheetId: string, range: string, values: any[][]) => {
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: values,
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to append to sheet');
  }
  return await response.json();
};
