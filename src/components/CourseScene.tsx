import Image from "next/image";
import MouseParallax from "@/components/MouseParallax";
import SceneReveal from "@/components/SceneReveal";
import SpinDie from "@/components/SpinDie";

/**
 * Layered, lightly-animated course-card illustrations, built from sliced PSD
 * layers (see public/img/course-*). Each layer is exported at the full canvas
 * size so it sits at inset-0 and lines up automatically; depth comes from
 * grouping layers into planes with a very small mouse parallax.
 *
 * The planes are plain `absolute inset-0` (no bleed) so the die layers keep the
 * exact box their spin `transform-origin` was measured against.
 */
const L = "absolute inset-0 h-full w-full object-cover select-none";
const SIZES = "(min-width: 768px) 50vw, 100vw";

function Layer({ src, extra = "" }: { src: string; extra?: string }) {
  return (
    <Image src={src} alt="" aria-hidden fill sizes={SIZES} className={`${L} ${extra}`} />
  );
}

export default function CourseScene({ scene }: { scene: string }) {
  if (scene === "narrative") {
    const base = "/img/course-narrative";
    return (
      <SceneReveal className="absolute inset-0">
        {/* Back — desk */}
        <MouseParallax strength={2} className="absolute inset-0">
          <Layer src={`${base}/bg.webp`} />
        </MouseParallax>
        {/* Mid — character + props */}
        <MouseParallax strength={3.5} className="absolute inset-0">
          <Layer src={`${base}/character.webp`} />
          {/* Computer mouse — nudges and clicks */}
          <Layer src={`${base}/mouse.webp`} extra="mouse-nudge" />
          {/* Cat paws — playful bat, staggered */}
          <Layer src={`${base}/cat1.webp`} extra="cat-paw cat-paw-a" />
          <Layer src={`${base}/cat2.webp`} extra="cat-paw cat-paw-b" />
          <Layer src={`${base}/ipad.webp`} />
          <Layer src={`${base}/panel.webp`} />
        </MouseParallax>
        {/* Front — closest props + die */}
        <MouseParallax strength={5} className="absolute inset-0">
          <Layer src={`${base}/keyboard.webp`} />
          <Layer src={`${base}/cup.webp`} />
          {/* D20 die — spins in place, with a soft ground shadow */}
          <div aria-hidden className="absolute inset-0 die-shadow" />
          <SpinDie src={`${base}/cube.webp`} fx={0.1495} fy={0.5171} className={`${L} die-spin`} />
          {/* Click ripple near the mouse */}
          <span aria-hidden className="click-ring" style={{ left: "6.5%", top: "20%" }} />
        </MouseParallax>
      </SceneReveal>
    );
  }

  if (scene === "game-design") {
    const base = "/img/course-gamedesign";
    return (
      <SceneReveal className="absolute inset-0">
        {/* Back — desk */}
        <MouseParallax strength={2} className="absolute inset-0">
          <Layer src={`${base}/bg.webp`} />
        </MouseParallax>
        {/* Mid — character + props */}
        <MouseParallax strength={3.5} className="absolute inset-0">
          {/* Mouse — nudges and clicks */}
          <Layer src={`${base}/mouse.webp`} extra="mouse-nudge" />
          <Layer src={`${base}/panel.webp`} />
          <Layer src={`${base}/character.webp`} />
          {/* Dog — playful bob */}
          <Layer src={`${base}/dog.webp`} extra="dog-bob" />
          <Layer src={`${base}/ipad.webp`} />
        </MouseParallax>
        {/* Front — closest props + die */}
        <MouseParallax strength={5} className="absolute inset-0">
          {/* D20 die — spins in place, with a soft ground shadow */}
          <div aria-hidden className="absolute inset-0 die-shadow-gd" />
          <SpinDie src={`${base}/die.webp`} fx={0.1321} fy={0.1158} className={`${L} die-spin`} />
          <Layer src={`${base}/cup.webp`} />
          <Layer src={`${base}/keyboard.webp`} />
          {/* Click ripple near the mouse (top-right) */}
          <span aria-hidden className="click-ring" style={{ left: "90%", top: "12%" }} />
        </MouseParallax>
      </SceneReveal>
    );
  }

  if (scene === "consultations") {
    const base = "/img/course-consultations";
    return (
      <SceneReveal className="absolute inset-0">
        {/* Back — room */}
        <MouseParallax strength={2} className="absolute inset-0">
          <Layer src={`${base}/bg.webp`} />
        </MouseParallax>
        {/* Mid — the two people */}
        <MouseParallax strength={3.5} className="absolute inset-0">
          <Layer src={`${base}/man.webp`} />
          <Layer src={`${base}/girl.webp`} />
        </MouseParallax>
        {/* Front — desk + props */}
        <MouseParallax strength={5} className="absolute inset-0">
          <Layer src={`${base}/table.webp`} />
          <Layer src={`${base}/shadow.webp`} />
          <Layer src={`${base}/paper.webp`} />
          {/* Mouse — nudges and clicks */}
          <Layer src={`${base}/mouse.webp`} extra="mouse-nudge" />
          {/* D20 die — spins in place, with a soft ground shadow */}
          <div aria-hidden className="absolute inset-0 die-shadow-cons" />
          <SpinDie src={`${base}/cube.webp`} fx={0.2734} fy={0.8776} className={`${L} die-spin`} />
          <Layer src={`${base}/notebook.webp`} />
          <Layer src={`${base}/pencil.webp`} />
          {/* Click ripple near the mouse */}
          <span aria-hidden className="click-ring" style={{ left: "34%", top: "88%" }} />
        </MouseParallax>
      </SceneReveal>
    );
  }

  if (scene === "hero") {
    const b = "/img/hero1";
    return (
      <SceneReveal className="absolute inset-0">
        {/* Ground plane — sky/hills + coin-path */}
        <MouseParallax strength={3} className="absolute inset-0">
          <div className="absolute -inset-[4%]">
            <Layer src={`${b}/bg.webp`} extra="object-bottom" />
            <Layer src={`${b}/dots.webp`} extra="object-bottom" />
          </div>
        </MouseParallax>
        {/* Subject — light burst + cart + floating blocks */}
        <MouseParallax strength={6} className="absolute inset-0">
          <Layer src={`${b}/light.webp`} extra="hero-glow" />
          <Layer src={`${b}/shadow.webp`} />
          <Layer src={`${b}/horse.webp`} />
          <Layer src={`${b}/light4.webp`} extra="hero-glow" />
          <Layer src={`${b}/cube4.webp`} extra="hero-float hero-float-a" />
          <Layer src={`${b}/light3.webp`} extra="hero-glow" />
          <Layer src={`${b}/cube3.webp`} extra="hero-float hero-float-b" />
          <Layer src={`${b}/light2.webp`} extra="hero-glow" />
          <Layer src={`${b}/cube2.webp`} extra="hero-float hero-float-c" />
          <Layer src={`${b}/light1.webp`} extra="hero-glow" />
          <Layer src={`${b}/cube1.webp`} extra="hero-float hero-float-d" />
        </MouseParallax>
        {/* Foreground — big die + grass */}
        <MouseParallax strength={9} className="absolute inset-0">
          <div className="absolute -inset-[3%]">
            <Layer src={`${b}/dice.webp`} />
            <Layer src={`${b}/grass.webp`} extra="object-bottom" />
          </div>
        </MouseParallax>
        {/* Clouds */}
        <MouseParallax strength={11} className="absolute inset-0">
          <div className="absolute -inset-[4%]">
            <Layer src={`${b}/clouds.webp`} />
          </div>
        </MouseParallax>
      </SceneReveal>
    );
  }

  return null;
}
