import { useState } from 'react';
import { DraggableResizable } from './DraggableResizable';
import SpotifyHome from '../music/SpotifyHome';
import TaskTracker from '../tasks-app/TaskTracker';

type propsHomeWidgets = {

}

interface Bounds {
    x: number;
    y: number;
    width: number;
    height: number;
  }

export default function HomeWidgets(props: propsHomeWidgets) {
    const [bounds, setBounds] = useState<Record<string, Bounds>>({});

    const handleBoundsChange = (id: string, newBounds: Bounds) => {
      setBounds(prev => ({
        ...prev,
        [id]: newBounds
      }));
    };
  
    const getOtherBounds = (id: string): Bounds[] => {
      return Object.entries(bounds)
        .filter(([boundId]) => boundId !== id)
        .map(([, bound]) => bound);
    };
    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <DraggableResizable
            id="box1"
            initialPosition={{ x: 50, y: 50 }}
            initialSize={{ width: 400, height: 200 }}
            onBoundsChange={handleBoundsChange}
            otherBounds={getOtherBounds("box1")}
        >
            <SpotifyHome/>
        </DraggableResizable>

        <DraggableResizable
            id="box2"
            initialPosition={{ x: 500, y: 50 }}
            initialSize={{ width: 600, height: 300 }}
            onBoundsChange={handleBoundsChange}
            otherBounds={getOtherBounds("box2")}
        >
            <TaskTracker/>
        </DraggableResizable>
        </div>
    )
}

