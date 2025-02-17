import React, { ReactElement, ReactNode } from "react";
import { AlertNotificationRoot } from "react-native-alert-notification";

interface CustomToastWrapperProps {
  children: ReactElement | ReactElement[];
}

const CustomToastWrapper: React.FC<CustomToastWrapperProps> = ({
  children,
}) => {
  return (
    <AlertNotificationRoot
      theme="dark"
      colors={[
        {
          overlay: "#121212", // Overlay background color (light theme)
          success: "#20C997", // Success icon and primary color
          danger: "#FF6347", // Danger/Error color
          warning: "#FFA500", // Warning color
          info: "#1E90FF", // Info color
          card: "#222222", // Card background color
          label: "#FFFFFF", // Label text color
        },
        {
          overlay: "#121212", // Overlay background color (dark theme)
          success: "#20C997", // Success icon and primary color
          danger: "#FF6347", // Danger/Error color
          warning: "#FFA500", // Warning color
          info: "#1E90FF", // Info color
          card: "#333333", // Card background color
          label: "#FFFFFF", // Label text color
        },
      ]}
    >
      {children}
    </AlertNotificationRoot>
  );
};

export default CustomToastWrapper;
