import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useMemo, useCallback } from "react"

function ParticlesComponent() {
  const options = useMemo(() => {
    return {
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push"
          }
        }
      },
      particles: {
        move: {
          enable: true,
          speed: {min: 1, max: 2}
        },
        size: {
          value: {min: 1, max: 3}
        },
        opacity: {
          value: {min: 0.3, max: 0.8}
        }
      }
    };
  }, []);

  const particlesInit = useCallback((engine) => {
    loadSlim(engine);
  }, []);

  return(
    <Particles init={particlesInit} options={options} />
  );

}

export default ParticlesComponent;