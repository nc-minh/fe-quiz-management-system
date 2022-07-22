import React from 'react';
import { Modal } from 'antd';

function Notification(status, message, seconds = 5) {
  let secondsToGo = seconds;
  const handleSuccess = () => {
    const modal = Modal.success({
      title: message,
      content: `This notification will be destroyed after ${secondsToGo} second.`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `This notification will be destroyed after ${secondsToGo} second.`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  };

  const handleError = (mes) => {
    const modal = Modal.error({
      title: mes,
      content: `This notification will be destroyed after ${secondsToGo} second.`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `This notification will be destroyed after ${secondsToGo} second.`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  };

  const handleWarning = () => {
    const modal = Modal.warning({
      title: message,
      content: `This notification will be destroyed after ${secondsToGo} second.`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `This notification will be destroyed after ${secondsToGo} second.`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  };

  const handleInfo = () => {
    const modal = Modal.info({
      title: message,
      content: `This notification will be destroyed after ${secondsToGo} second.`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `This notification will be destroyed after ${secondsToGo} second.`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  };

  const handleEvents = () => {
    if (status === 'success') {
      handleSuccess();
    } else if (status === 'error') {
      handleError(message);
    } else if (status === 'warning') {
      handleWarning();
    } else if (status === 'info') {
      handleInfo();
    } else {
      handleError('Not receive status!');
    }
  };

  return (
    <div style={{ zIndex: '10' }}>
      {handleEvents()}
    </div>
  );
}

export default Notification;
