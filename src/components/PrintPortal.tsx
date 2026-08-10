import React from 'react';
import { createPortal } from 'react-dom';

interface PrintPortalProps {
  children: React.ReactNode;
}

export const PrintPortal: React.FC<PrintPortalProps> = ({ children }) => {
  const mountNode = document.getElementById('standalone-print-root');
  if (!mountNode) return null;

  return createPortal(children, mountNode);
};
