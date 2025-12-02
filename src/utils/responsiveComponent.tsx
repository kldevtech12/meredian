import React from 'react';
import { useDeviceType } from '../hooks/useWindowSize';

export function withResponsive<T extends React.ComponentType<any>>(
  DesktopComponent: T,
  MobileComponent: T
) {
  type Props = React.ComponentProps<T>;
  
  return (props: Props) => {
    const { isMobile } = useDeviceType();
    const Component = isMobile ? MobileComponent : DesktopComponent;
    return <Component {...props} />;
  };
}