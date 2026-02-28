import { useEffect } from "react";
import "./App.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import car from "./assets/car.png";

function App() {

  useEffect(() => {
    // Register GSAP plugin
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.normalizeScroll(true); // Normalize scroll across browsers

    // Use gsap.context for proper cleanup
    let ctx = gsap.context(() => {

      // Timeline for car movement and grass expansion
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });

      // Car moves horizontally across screen
      tl.to("#car", {
        x: () => window.innerWidth - document.querySelector("#car").offsetWidth * 0.2,
        ease: "none"
      }, 0)

      // Grass progress bar expands
      .to("#grass", {
        width: "96%",
        ease: "none"
      }, 0)

      // Milestone boxes fade in one by one
      .to(".top1", { opacity: 1, scale: 1, duration: 0.2 }, 0.10)
      .to(".bottom1", { opacity: 1, scale: 1, duration: 0.2 }, 0.19)
      .to(".top2", { opacity: 1, scale: 1, duration: 0.2 }, 0.26)
      .to(".bottom2", { opacity: 1, scale: 1, duration: 0.2 }, 0.34);

      // Road text fades in
      gsap.to(".road-text", {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top 30%",
          end: "bottom bottom",
          scrub: true
        }
      });

    });

    ScrollTrigger.refresh(); // Refresh triggers after setup

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <section className="hero">

      <div className="road-container">

        <div className="road"></div>
        <div id="grass" className="grass"></div>

        <h1 className="road-text">WELCOME ITZFIZZ</h1>

        <img
          id="car"
          className="car"
          src={car}
          alt="car"
        />

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
