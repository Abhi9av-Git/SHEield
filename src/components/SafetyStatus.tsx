import React from 'react';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SafetyStatusProps {
  isActive: boolean;
  alertLevel?: 'safe' | 'caution' | 'danger';
}

const SafetyStatus: React.FC<SafetyStatusProps> = ({ isActive, alertLevel = 'safe' }) => {
  const getStatusConfig = () => {
    if (!isActive) {
      return {
        icon: Shield,
        label: 'Inactive',
        className: 'bg-muted text-muted-foreground',
      };
    }

    switch (alertLevel) {
      case 'danger':
        return {
          icon: ShieldAlert,
          label: 'Alert',
          className: 'bg-destructive text-destructive-foreground animate-pulse',
        };
      case 'caution':
        return {
          icon: ShieldAlert,
          label: 'Caution',
          className: 'bg-warning text-warning-foreground',
        };
      default:
        return {
          icon: ShieldCheck,
          label: 'Protected',
          className: 'bg-success text-success-foreground',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Badge className={config.className}>
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  );
};

export default SafetyStatus;