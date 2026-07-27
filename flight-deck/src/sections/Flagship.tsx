import { useState } from 'react';
import { profile } from '../data/profile';
import SectionEyebrow from '../components/SectionEyebrow';
import Badge from '../components/Badge';

const phases = [
  {
    num: '01',
    title: 'Hardware Integration',
    subtitle: 'Phase I / Physical Build',
    description: 'Physically constructed a fully autonomous drone from individual hardware components — carbon fiber frame, brushless motors, ESCs, Pixhawk flight controller, and an onboard companion computer.',
    deliverables: [
      'Custom-built quadcopter frame with propulsion system',
      'Pixhawk 6C flight controller with PX4 autopilot',
      'NVIDIA Jetson / Raspberry Pi onboard computer',
    ],
  },
  {
    num: '02',
    title: 'Autonomous Navigation',
    subtitle: 'Phase II / Flight Stack',
    description: 'Integrated ROS2 and PX4 flight stack for autonomous mission execution, real-time flight control, waypoint following, and mission logic without human intervention.',
    deliverables: [
      'ROS2 nodes for mission planning and execution',
      'MAVLink communication between companion computer and FC',
      'Autonomous waypoint navigation and geofencing',
    ],
  },
  {
    num: '03',
    title: 'Perception Pipeline',
    subtitle: 'Phase III / Computer Vision',
    description: 'Developed a computer-vision pipeline using YOLO for onboard object detection and environment perception, enabling the drone to identify and react to objects in real time.',
    deliverables: [
      'YOLO-based real-time object detection on onboard compute',
      'Camera calibration and image processing pipeline',
      'Environment mapping and obstacle awareness',
    ],
  },
  {
    num: '04',
    title: 'Ground Station',
    subtitle: 'Phase IV / Telemetry & Control',
    description: 'Built a ground-station interface for telemetry monitoring, mission control, and real-time data visualization — connecting the operator to the autonomous system.',
    deliverables: [
      'Real-time telemetry streaming and monitoring dashboard',
      'Mission planning UI with waypoint configuration',
      'Live video feed and detection overlay display',
    ],
  },
];

export default function Flagship() {
  const { flagship } = profile;
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);

  return (
    <section data-waypoint={1} aria-label="Primary Mission">
      <div className="section-wrap">
        <SectionEyebrow waypointIndex={1} />
        <h2 className="section-title">{flagship.title}</h2>
        <p className="section-subtitle" style={{ marginBottom: '0.5rem' }}>
          {flagship.subtitle}
        </p>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--color-text-muted)', marginBottom: '3rem',
        }}>
          Scroll through the architecture. Every phase represents another layer of the system.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {phases.map((phase, i) => (
            <div
              key={phase.num}
              className="process-phase"
              style={{ cursor: 'pointer' }}
              onClick={() => setExpandedPhase(expandedPhase === i ? null : i)}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '1.5rem', alignItems: 'start' }}>
                <div>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '1.6rem',
                    fontWeight: 700, color: 'var(--color-text-muted)',
                    lineHeight: 1,
                  }}>{phase.num}</span>
                </div>
                <div>
                  <div className="phase-title">{phase.title}</div>
                  <div className="phase-subtitle">{phase.subtitle}</div>
                  <div className="phase-description">{phase.description}</div>
                  {expandedPhase === i && (
                    <div className="phase-deliverables">
                      {phase.deliverables.map((d, j) => (
                        <div className="phase-deliverable" key={j}>{d}</div>
                      ))}
                    </div>
                  )}
                  <div className="phase-stack" style={{ marginTop: '0.75rem' }}>
                    {flagship.stack.slice(i * 2, i * 2 + 2).map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--color-text-muted)', marginTop: '2rem',
          textAlign: 'center',
        }}>
          System architecture complete.
        </p>
      </div>
    </section>
  );
}
