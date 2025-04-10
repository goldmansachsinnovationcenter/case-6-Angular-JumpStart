import React, { useState, useEffect } from 'react';
import { useAngularServices } from '../../shared/react/angular-services-context';
import { Events } from '../services/event-bus.service';

interface OverlayComponentProps {
  delay?: number;
  dangerouslySetInnerHTML?: { __html: string };
}

export const OverlayComponent: React.FC<OverlayComponentProps> = ({ 
  delay = 500, 
  dangerouslySetInnerHTML 
}) => {
  const [enabled, setEnabled] = useState(false);
  const [queue, setQueue] = useState<any[]>([]);
  const { eventBus } = useAngularServices();

  useEffect(() => {
    if (!eventBus) return;

    const httpRequestSub = eventBus.on(Events.httpRequest, () => {
      setQueue(prev => {
        const newQueue = [...prev, {}];
        if (newQueue.length === 1) {
          setTimeout(() => {
            setQueue(current => {
              if (current.length) {
                setEnabled(true);
              }
              return current;
            });
          }, delay);
        }
        return newQueue;
      });
    });

    const httpResponseSub = eventBus.on(Events.httpResponse, () => {
      setQueue(prev => {
        const newQueue = [...prev];
        newQueue.pop();
        if (newQueue.length === 0) {
          setTimeout(() => {
            setQueue(current => {
              if (current.length === 0) {
                setEnabled(false);
              }
              return current;
            });
          }, delay);
        }
        return newQueue;
      });
    });

    return () => {
      httpRequestSub.unsubscribe();
      httpResponseSub.unsubscribe();
    };
  }, [eventBus, delay]);

  return (
    <div className={`overlay ${enabled ? 'active' : ''}`}>
      <div className="overlay-background"></div>
      <div className="overlay-content" dangerouslySetInnerHTML={dangerouslySetInnerHTML}>
      </div>
    </div>
  );
};
