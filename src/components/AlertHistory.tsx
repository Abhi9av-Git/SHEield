import React, { useState } from 'react';
import { AlertTriangle, Clock, MapPin, Volume2, FileText, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AlertEvent {
  id: string;
  timestamp: string;
  type: 'anomaly' | 'manual' | 'false_positive';
  severity: 'low' | 'medium' | 'high';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  audioSummary: string;
  aiSummary: string;
  duration: number;
  resolved: boolean;
}

const AlertHistory: React.FC = () => {
  const [alerts] = useState<AlertEvent[]>([
    {
      id: '1',
      timestamp: '2024-01-15T22:30:00Z',
      type: 'anomaly',
      severity: 'high',
      location: {
        lat: 28.6139,
        lng: 77.2090,
        address: 'Connaught Place, New Delhi',
      },
      audioSummary: 'Detected aggressive shouting and rapid footsteps approaching',
      aiSummary: 'High-risk situation detected: Male voice shouting "stop" followed by quick footsteps. Recommended immediate alert to emergency contacts. Situation duration: 45 seconds.',
      duration: 45,
      resolved: true,
    },
    {
      id: '2',
      timestamp: '2024-01-14T19:15:00Z',
      type: 'anomaly',
      severity: 'medium',
      location: {
        lat: 28.5355,
        lng: 77.3910,
        address: 'Sector 18, Noida',
      },
      audioSummary: 'Glass breaking sound detected',
      aiSummary: 'Medium-risk event: Breaking glass sound detected nearby. Could indicate vandalism or accident. User was walking past a construction site. No immediate threat to user safety.',
      duration: 12,
      resolved: true,
    },
    {
      id: '3',
      timestamp: '2024-01-13T21:45:00Z',
      type: 'false_positive',
      severity: 'low',
      location: {
        lat: 28.7041,
        lng: 77.1025,
        address: 'Karol Bagh, New Delhi',
      },
      audioSummary: 'Loud music and crowd noise',
      aiSummary: 'False positive: Detected as crowded area with celebration sounds. Musical instruments and happy crowd noise. No safety threat identified.',
      duration: 30,
      resolved: true,
    },
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'anomaly': return 'AI Detected';
      case 'manual': return 'Manual Alert';
      case 'false_positive': return 'False Positive';
      default: return type;
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  };

  const groupedAlerts = alerts.reduce((groups, alert) => {
    const date = formatDate(alert.timestamp).date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(alert);
    return groups;
  }, {} as Record<string, AlertEvent[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Alert History</h2>
        <p className="text-sm text-muted-foreground">View past safety events and AI summaries</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-destructive">{alerts.filter(a => a.severity === 'high').length}</div>
            <div className="text-xs text-muted-foreground">High Alerts</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">{alerts.filter(a => a.severity === 'medium').length}</div>
            <div className="text-xs text-muted-foreground">Medium Alerts</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{alerts.filter(a => a.type === 'false_positive').length}</div>
            <div className="text-xs text-muted-foreground">False Positives</div>
          </div>
        </Card>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {Object.entries(groupedAlerts).map(([date, dayAlerts]) => (
          <div key={date}>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">{date}</h3>
            </div>
            <div className="space-y-3 ml-6">
              {dayAlerts.map((alert) => {
                const formatted = formatDate(alert.timestamp);
                return (
                  <Card key={alert.id} className="transition-all hover:shadow-md">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <CardTitle className="text-base">{getTypeLabel(alert.type)}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{formatted.time}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Location */}
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">{alert.location.address}</p>
                          <p className="text-xs text-muted-foreground">
                            {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
                          </p>
                        </div>
                      </div>

                      {/* Audio Summary */}
                      <div className="flex items-start gap-2">
                        <Volume2 className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Audio Detection</p>
                          <p className="text-xs text-muted-foreground">{alert.audioSummary}</p>
                        </div>
                      </div>

                      {/* AI Summary */}
                      <div className="flex items-start gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">AI Analysis</p>
                          <p className="text-xs text-muted-foreground">{alert.aiSummary}</p>
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Duration: {alert.duration}s</span>
                        <Badge variant="outline" className="text-xs">
                          {alert.resolved ? 'Resolved' : 'Pending'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {alerts.length === 0 && (
        <Card className="p-8 text-center">
          <div className="text-muted-foreground">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No Alerts Yet</h3>
            <p className="text-sm">Your safety history will appear here when events are detected</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AlertHistory;