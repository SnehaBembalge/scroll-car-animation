import { useEffect } from "react";
import "./App.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import car from "./assets/car.png";

function App() {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.normalizeScroll(true);

    // Context to avoid global GSAP pollution
    let ctx = gsap.context(() => {
      // ---------------------------
      // Car & Road Scroll Animation
      // ---------------------------
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // Move car horizontally across the screen
      tl.to("#car", {
        x: () =>
          window.innerWidth - document.querySelector("#car").offsetWidth * 0.2,
        ease: "none",
      }, 0);

      // Expand grass width
      tl.to("#grass", { width: "96%", ease: "none" }, 0);

      // ---------------------------
      // Milestone Boxes Appear
      // ---------------------------
      const boxes = [
        { selector: ".top1", delay: 0.1 },
        { selector: ".bottom1", delay: 0.19 },
        { selector: ".top2", delay: 0.26 },
        { selector: ".bottom2", delay: 0.34 },
      ];

      boxes.forEach(({ selector, delay }) => {
        tl.to(selector, { opacity: 1, scale: 1, duration: 0.2 }, delay);
      });

      // ---------------------------
      // Road Text Fade-In
      // ---------------------------
      gsap.to(".road-text", {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top 30%",
          end: "bottom bottom",
          scrub: true,
        },
      });
    });

    // Refresh ScrollTrigger
    ScrollTrigger.refresh();

    // Cleanup on component unmount
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero">
      <div className="road-container">
        {/* Road & Grass */}
        <div className="road"></div>
        <div id="grass" className="grass"></div>

        {/* Road Text */}
        <h1 className="road-text">WELCOME ITZFIZZ</h1>

        {/* Car Image */}
        <img id="car" className="car" src={car} alt="car" />

        {/* Milestone Boxes */}
        <div className="milestones">
          <div className="box top top1">
            <h2>58%</h2>
            <p>Increase in pick up point use</p>
          </div>

          <div className="box bottom bottom1">
            <h2>23%</h2>
            <p>Decrease in customer phone calls</p>
          </div>

          <div className="box top top2">
            <h2>27%</h2>
            <p>Increase in pick up point use</p>
          </div>

          <div className="box bottom bottom2">
            <h2>40%</h2>
            <p>Decrease in customer phone calls</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
