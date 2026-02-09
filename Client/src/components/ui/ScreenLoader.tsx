import React, { useEffect, useState } from 'react';
import loaderEventEmitter from '../../shared/utils/loaderEventEmitter';

const keyframes = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;

export const ScreenLoader: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = keyframes;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const show = () => setVisible(true);
    const hide = () => setVisible(false);
    const offStart = loaderEventEmitter.on('startLoader', show);
    const offStop = loaderEventEmitter.on('stopLoader', hide);
    return () => {
      offStart();
      offStop();
    };
  }, []);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
      document.body.style.pointerEvents = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.pointerEvents = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.pointerEvents = '';
    };
  }, [visible]);

  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 pointer-events-auto">
      <div className="h-16 w-16 animate-spin rounded-full border-8 border-gray-200 border-t-blue-500" />
    </div>
  );
};
