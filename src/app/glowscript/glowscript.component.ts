import { Component, AfterViewInit } from '@angular/core';

declare const color: any;
declare const vec: (x: number, y: number, z: number) => any;
declare const box: (options: { pos: any; size: any; color: any }) => any;
declare const canvas: (options?: { width?: number; height?: number }) => any;
declare const cylinder: any;
declare const turns: number;
declare const pitch: number;
declare const radius: number;
declare const width: 600;
declare const height: 600;


@Component({
  selector: 'app-glowscript',
  standalone: true,
  imports: [],
  templateUrl: './glowscript.component.html',
  styleUrls: ['./glowscript.component.css']
})
export class GlowscriptComponent implements AfterViewInit {
  ngAfterViewInit(): void {

      if (typeof window === 'undefined' || typeof document === 'undefined') {
          console.warn('GlowScript cannot run on the server. Skipping initialization.');
          return;
      }

      console.log('Initializing GlowScript...');

      // Ensure the container exists
      const container = document.getElementById('glowscript');
      if (!container) {
        console.error('GlowScript container not found!');
        return;
      }

      // Initialize GlowScript
      (function () {
          function __main__() {
            const scene = canvas({ width: 900, height: 600 }); // Create a 3D canvas
            scene.background = vec(0.06666666666, 0.42745098039, 0.49411764705);

            // DNA Helix Visualization

            // Parameters for the helix
            const radius = 2; // Radius of the helix
            const pitch = 10; // Vertical spacing between turns
            const turns = 20; // Number of turns in the helix
            const pointsPerTurn = 50; // Smoothness of the helix
            const basePairsPerTurn = 4; // Number of base pairs per turn

            // Function to generate helix points
            function generateHelix(radius: number, pitch: number, turns: number, offset = 0) {
              const points = [];
              const totalPoints = turns * pointsPerTurn;

              for (let i = 0; i < totalPoints; i++) {
                const theta = (2 * Math.PI * i) / pointsPerTurn;
                const x = radius * Math.cos(theta + offset);
                const y = radius * Math.sin(theta + offset);
                const z = (pitch * i) / pointsPerTurn;
                points.push(vec(x, y, z));
              }

              return points;
            }

            function rotatePoints(points: any[], axis: string, angle: number): any[] {
              const rotatedPoints = [];
              const radianAngle = angle * (Math.PI / 180); // Convert degrees to radians
              const cosA = Math.cos(radianAngle);
              const sinA = Math.sin(radianAngle);

              for (const point of points) {
                let x, y, z;

                if (axis === 'x') {
                  // Rotate around the X-axis
                  x = point.x;
                  y = point.y * cosA - point.z * sinA;
                  z = point.y * sinA + point.z * cosA;
                } else if (axis === 'y') {
                  // Rotate around the Y-axis
                  x = point.x * cosA + point.z * sinA;
                  y = point.y;
                  z = -point.x * sinA + point.z * cosA;
                } else if (axis === 'z') {
                  // Rotate around the Z-axis
                  x = point.x * cosA - point.y * sinA;
                  y = point.x * sinA + point.y * cosA;
                  z = point.z;
                } else {
                  throw new Error('Invalid axis for rotation');
                }

                rotatedPoints.push(vec(x, y, z));
              }

              return rotatedPoints;
            }

            function centerHelix(points: any[]): any[] {
              // Calculate the midpoint of the helix along the Z-axis
              const zCoords = points.map((p: any) => p.z);
              const zMin = Math.min(...zCoords);
              const zMax = Math.max(...zCoords);
              const zMid = (zMin + zMax) / 2;

              // Shift all points to center the helix
              return points.map((p: any) => vec(p.x, p.y, p.z - zMid));
            }

            // Generate the two helices
            let helix1 = generateHelix(radius, pitch, turns);
            let helix2 = generateHelix(radius, pitch, turns, Math.PI);

            helix1 = centerHelix(helix1);
            helix2 = centerHelix(helix2);

            helix1 = rotatePoints(helix1, 'x', 90); // Rotate to stand vertically
            helix2 = rotatePoints(helix2, 'x', 90);

            // Draw the helices
            for (const point of helix1) {
              box({ pos: point, size: vec(0.2, 0.2, 0.2), color: color.red });
            }

            for (const point of helix2) {
              box({ pos: point, size: vec(0.2, 0.2, 0.2), color: color.blue });
            }

            // Add base pairs (cylinders between the helices)
            const stepSize = Math.floor(pointsPerTurn / basePairsPerTurn);
            for (let i = 0; i < helix1.length; i += stepSize) {
              const basePairStart = helix1[i];
              const basePairEnd = helix2[i];
              const midpoint = basePairStart.add(basePairEnd).div(2); // Midpoint for visual alignment
              const axis = basePairEnd.sub(basePairStart);

              // Add a cylinder to represent the base pair
              cylinder({
                pos: basePairStart,
                axis: axis,
                radius: 0.05,
                color: color.green
              });
            }
          }

          // Bind GlowScript to the container
          window.__context = { glowscript_container: document.getElementById('glowscript') };
          __main__();
        })();
    }
}


