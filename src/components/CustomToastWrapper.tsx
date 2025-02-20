import React, { ReactElement, ReactNode } from "react";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { colors } from "../constants/colors";

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
          overlay: "#fff", // Overlay background color (light theme)
          success: "#20C997", // Success icon and primary color
          danger: "#FF6347", // Danger/Error color
          warning: "#FFA500", // Warning color
          info: colors.primary, // Info color
          card: colors.secondaryWhite, // Card background color
          label: colors.secondaryLight, // Label text color
        },
        {
          overlay: "#fff", // Overlay background color (dark theme)
          success: "#20C997", // Success icon and primary color
          danger: "#FF6347", // Danger/Error color
          warning: "#FFA500", // Warning color
          info: colors.primary, // Info color
          card: colors.secondaryWhite, // Card background color
          label: colors.secondaryLight, // Label text color
        },
      ]}
    >
      {children}
    </AlertNotificationRoot>
  );
};

export default CustomToastWrapper;
