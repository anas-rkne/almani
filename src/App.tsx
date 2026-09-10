/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HeroSection } from './components/HeroSection';
import { PhilosophySection } from './components/PhilosophySection';
import { PatternSystemSection } from './components/PatternSystemSection';
import { CoursesBentoGridSection } from './components/CoursesBentoGridSection';

export default function App() {
  return (
    <main>
      <HeroSection />
      <PhilosophySection />
      <PatternSystemSection />
      <CoursesBentoGridSection />
    </main>
  );
}
