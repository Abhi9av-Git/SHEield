import React, { useState } from 'react';
import { Shield, MapPin, Phone, Activity, AlertTriangle, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AudioMonitor from '@/components/AudioMonitor';
import EmergencyContacts from '@/components/EmergencyContacts';
import AlertHistory from '@/components/AlertHistory';
import SafetyStatus from '@/components/SafetyStatus';

const Index = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [activeTab, setActiveTab] = useState('monitor');

  const tabs = [
    { id: 'monitor', label: 'Monitor', icon: Activity },
    { id: 'contacts', label: 'Contacts', icon: Users },
    { id: 'history', label: 'History', icon: AlertTriangle },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'monitor':
        return <AudioMonitor isMonitoring={isMonitoring} setIsMonitoring={setIsMonitoring} />;
      case 'contacts':
        return <EmergencyContacts />;
      case 'history':
        return <AlertHistory />;
      default:
        return <AudioMonitor isMonitoring={isMonitoring} setIsMonitoring={setIsMonitoring} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-xl shadow-glow">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Sentinel</h1>
                <p className="text-xs text-muted-foreground">Women Safety Guardian</p>
              </div>
            </div>
            <SafetyStatus isActive={isMonitoring} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="max-w-md mx-auto px-4">
          <div className="flex justify-around py-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Emergency Button - Always Visible */}
      <div className="fixed bottom-20 right-4">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full bg-gradient-danger text-white shadow-danger animate-pulse-danger"
        >
          <Phone className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
