import React from 'react';
import Toast from 'react-native-toast-message';

const CustomToast = () => {
  return (
    <Toast ref={(ref) => Toast.setRef(ref)} />  // Pastikan Toast memiliki ref
  );
};

export default CustomToast;
