let currentX = 0; // Tracks the current interpolated x position
let currentY = 0; // Tracks the current interpolated y position
let targetX = 0; // Tracks the target x position
let targetY = 0; // Tracks the target y position
let animationFrameId; // To cancel the animation frame if needed

const handleMouseMove = e => {
  const { currentTarget: target } = e;
  const rect = target.getBoundingClientRect();

  // Calculate target position relative to the element
  targetX = e.clientX - rect.left;
  targetY = e.clientY - rect.top;

  // Start the animation loop if not already running
  if (!animationFrameId) {
    animationFrameId = requestAnimationFrame(updateMousePosition.bind(null, target));
  }
};

const updateMousePosition = (target) => {
  // Interpolate between current position and target position
  const lerpFactor = 0.1; // Adjust for desired smoothness (0.1 is smooth, closer to 1 is snappier)
  currentX += (targetX - currentX) * lerpFactor;
  currentY += (targetY - currentY) * lerpFactor;

  // Apply interpolated position to CSS variables
  target.style.setProperty("--mouse-x", `${currentX}px`);
  target.style.setProperty("--mouse-y", `${currentY}px`);

  // Check if we need to continue animating
  if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
    animationFrameId = requestAnimationFrame(updateMousePosition.bind(null, target));
  } else {
    // Stop animation loop
    animationFrameId = null;
  }
};

const processArea = document.querySelector(".process");
processArea.onmousemove = e => handleMouseMove(e);

const { animate, scroll, inView } = Motion;


// Bottom scroll bar animation
scroll(animate(".progress", { scaleX: [0, 1] }, { ease: "linear" }));

// Process element fade in and out
document.querySelectorAll(".process h3").forEach((item) => {
  scroll(animate(item, { 
      y: [300, 0, 0, 0]
    }, 
    { 
      ease: "linear",
    }), {
    target: item,
    offset: ["start end", "end end", "start start", "end start"],
  });
})

document.querySelectorAll(".process li").forEach((item) => {
  scroll(animate(item, { 
      opacity: [0, 1, 1, 0] ,
      x: [-100, 50, 50, -100]
    }, 
    { 
      ease: "linear",
    }), {
    target: item,
    offset: ["start end", "end end", "start start", "end start"],
  });
});

;

// inView(".process li", (info) => {
//   animate(info.target.querySelector("img"), 
//     { opacity: 1, x: [-100, 0]  },
//     {
//       duration: 0.5,
//       easing: [0.17, 0.55, 0.55, 1],
//       amount: 1
//     }
//   )

// }, { margin: "0px 500px 0px 0px"});