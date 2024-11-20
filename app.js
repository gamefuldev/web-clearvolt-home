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

const { animate, scroll, stagger } = Motion;


// Bottom scroll bar animation
scroll(animate(".progress", { scaleX: [0, 1] }, { ease: "linear" }));

// About element fade in and out
document.querySelectorAll(".about-content p").forEach((item) => {
  scroll(animate(item, { 
      y: [-30, 0, 0, 30],
      opacity: [0, 1, 1, 0],
    }, 
    { 
      ease: "linear",
    }), {
    target: item,
    offset: ["start end", "end end", "start start", "end start"],
  });
})

// Process element fade in and out
document.querySelectorAll(".process h3").forEach((item) => {
  scroll(animate(item, { 
      y: [300, 0, 0, -300]
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
      x: [-100, 50, 50, -100],
      scale: [0.75, 1, 1, 0.75]
    }, 
    { 
      ease: "linear",
    }), {
    target: item,
    offset: ["start end", "end end", "start start", "end start"],
  });
});

document.querySelectorAll(".benefits .card").forEach((item) => {
  scroll(animate(item, { 
      opacity: [0.75, 1, 1, 0.75] ,
      scale: [0.75, 1, 1, 0.75]
    }), {
    target: item,
    offset: ["start end", "end end", "start start", "end start"],
  });
});

document.querySelectorAll(".nutshell li").forEach((item, index) => {
  scroll(animate(item, { 
      opacity: [0.75, 1, 1, 1],
      scale: [0.9, 1, 1, 1],
      y: [50, 0, 0, -50],
    }, {
      delay: index * 0.05, // Apply staggered delay
    }), {
    target: item,
    offset: ["start end", "end end", "start start", "end start"],
  });
});


const blogCards = document.querySelectorAll(".blog-card");

blogCards.forEach((item, index) => {
  scroll(
    animate(
      item,
      { 
        opacity: [0.75, 1, 1, 0.75],
        scale: [0.9, 1, 1, 0.9],
        y: [50, 0, 0, -50],
      },
      {
        delay: index * 0.1, // Apply staggered delay
      }
    ),
    {
      target: item,
      offset: ["start end", "end end", "start start", "end start"],
    }
  );
});

document.querySelectorAll("footer > div").forEach((item) => {
  scroll(animate(item, { 
      opacity: [0, 1, 1, 0] ,
    }), {
    target: item,
    offset: ["start end", "end end", "start start", "end start"],
  });
});

let wrapper = document.querySelector(".about-grid");
let columns = Math.floor(wrapper.offsetWidth / 50);
let rows = Math.floor(wrapper.offsetHeight / 50);

wrapper.style.setProperty("--columns", columns);
wrapper.style.setProperty("--rows", rows);

const handleTileHover = index => {
  animate(`.tile:nth-child(${index + 1})`, {
    opacity: [0, 0.1, 0]
  },{
    duration: 3,
    ease: "ease-in-out"
  });
};

const createTile = index => {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.onmouseover = e => handleTileHover(index);
  return tile;
}

const createTiles = quantity => {
  Array.from(Array(quantity)).map((tile, index) => {
    wrapper.appendChild(createTile(index));
  });
};

const createGrid = () => {
  wrapper.innerHTML = "";
  columns = Math.floor(wrapper.offsetWidth / 50);
  rows = Math.floor(wrapper.offsetHeight / 50);
  createTiles(columns * rows);
};

const triggerRandomTiles = () => {
  const totalTiles = columns * rows;
  const randomTileCount = Math.floor(Math.random() * 10) + 1; // Choose 1-5 random tiles
  const triggeredIndices = new Set();

  while (triggeredIndices.size < randomTileCount) {
    const randomIndex = Math.floor(Math.random() * totalTiles);
    if (!triggeredIndices.has(randomIndex)) {
      triggeredIndices.add(randomIndex);
      handleTileHover(randomIndex);
    }
  }
};

window.onload = () => {
  createGrid();
  setInterval(triggerRandomTiles, 1000); // Trigger random tiles every 1 second
};
window.onresize = () => createGrid();