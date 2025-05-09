// Dashboard functionality
document.addEventListener("DOMContentLoaded", function () {
  // Handle navigation links - ensure Explore link works
  const exploreLinks = document.querySelectorAll('a[href="bot.html"]');
  exploreLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      window.location.href = "bot.html";
    });
  });

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const headerActions = document.querySelector(".header-actions");

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      headerActions.classList.toggle("active");
      // Change icon between bars and times
      const icon = this.querySelector("i");
      if (icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  }

  // Add current date to the astronomy card
  const dateElement = document.querySelector(".astronomy-today .date");
  if (dateElement) {
    const now = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    dateElement.textContent = now.toLocaleDateString("en-US", options);
  }

  // Simulate notification badge
  const notifications = document.querySelector(".notifications");
  if (notifications) {
    // Add a notification badge
    const badge = document.createElement("div");
    badge.className = "notification-badge";
    badge.textContent = "3";
    badge.style.position = "absolute";
    badge.style.top = "-5px";
    badge.style.right = "-5px";
    badge.style.background = "var(--accent)";
    badge.style.color = "white";
    badge.style.borderRadius = "50%";
    badge.style.width = "18px";
    badge.style.height = "18px";
    badge.style.fontSize = "10px";
    badge.style.display = "flex";
    badge.style.alignItems = "center";
    badge.style.justifyContent = "center";
    notifications.style.position = "relative";
    notifications.appendChild(badge);

    // Add notification popup on click
    notifications.addEventListener("click", function () {
      // Check if popup already exists
      if (document.querySelector(".notification-popup")) return;

      const popup = document.createElement("div");
      popup.className = "notification-popup";
      popup.style.position = "absolute";
      popup.style.top = "50px";
      popup.style.right = "0";
      popup.style.width = "300px";
      popup.style.background = "rgba(15, 15, 28, 0.95)";
      popup.style.backdropFilter = "blur(10px)";
      popup.style.borderRadius = "12px";
      popup.style.boxShadow = "0 5px 25px rgba(0, 0, 0, 0.3)";
      popup.style.padding = "1rem";
      popup.style.zIndex = "100";
      popup.style.border = "1px solid rgba(255, 255, 255, 0.1)";
      popup.style.transform = "translateY(-10px)";
      popup.style.opacity = "0";
      popup.style.transition = "all 0.3s ease";

      // Add notification items
      popup.innerHTML = `
                <h3 style="margin-bottom: 1rem; font-size: 1rem; display: flex; justify-content: space-between; align-items: center;">
                    Notifications
                    <span class="close-popup" style="cursor: pointer; font-size: 1.2rem;">×</span>
                </h3>
                <div class="notification-item" style="padding: 0.8rem; border-radius: 8px; margin-bottom: 0.5rem; background: rgba(255, 255, 255, 0.05); border-left: 3px solid var(--primary);">
                    <div style="font-weight: 500; margin-bottom: 0.3rem;">New Celestial Event</div>
                    <div style="font-size: 0.8rem; color: rgba(255, 255, 255, 0.6);">Meteor shower tonight at 11 PM</div>
                    <div style="font-size: 0.7rem; color: rgba(255, 255, 255, 0.4); margin-top: 0.5rem;">10 minutes ago</div>
                </div>
                <div class="notification-item" style="padding: 0.8rem; border-radius: 8px; margin-bottom: 0.5rem; background: rgba(255, 255, 255, 0.05); border-left: 3px solid var(--accent);">
                    <div style="font-weight: 500; margin-bottom: 0.3rem;">Mission Update</div>
                    <div style="font-size: 0.8rem; color: rgba(255, 255, 255, 0.6);">James Webb Telescope has completed its alignment</div>
                    <div style="font-size: 0.7rem; color: rgba(255, 255, 255, 0.4); margin-top: 0.5rem;">2 hours ago</div>
                </div>
                <div class="notification-item" style="padding: 0.8rem; border-radius: 8px; background: rgba(255, 255, 255, 0.05); border-left: 3px solid var(--primary);">
                    <div style="font-weight: 500; margin-bottom: 0.3rem;">Community Post</div>
                    <div style="font-size: 0.8rem; color: rgba(255, 255, 255, 0.6);">AstroFan22 shared new photos of Jupiter</div>
                    <div style="font-size: 0.7rem; color: rgba(255, 255, 255, 0.4); margin-top: 0.5rem;">Yesterday</div>
                </div>
            `;

      document.body.appendChild(popup);

      // Animate popup
      setTimeout(() => {
        popup.style.transform = "translateY(0)";
        popup.style.opacity = "1";
      }, 10);

      // Close popup when clicking the X
      popup
        .querySelector(".close-popup")
        .addEventListener("click", function () {
          popup.style.transform = "translateY(-10px)";
          popup.style.opacity = "0";
          setTimeout(() => {
            popup.remove();
          }, 300);
        });

      // Close popup when clicking outside
      document.addEventListener("click", function closePopup(e) {
        if (!popup.contains(e.target) && e.target !== notifications) {
          popup.style.transform = "translateY(-10px)";
          popup.style.opacity = "0";
          setTimeout(() => {
            popup.remove();
          }, 300);
          document.removeEventListener("click", closePopup);
        }
      });
    });
  }

  // Add hover effect to mission items
  const missions = document.querySelectorAll(".mission");
  missions.forEach((mission) => {
    mission.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.3)";
      this.style.transition = "all 0.3s ease";
    });

    mission.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "none";
    });

    // Add click effect for missions
    mission.addEventListener("click", function () {
      // Pulse animation
      this.style.animation = "pulse 0.6s ease-out";
      setTimeout(() => {
        this.style.animation = "";
      }, 600);

      // Add mission details popup (could be expanded)
      const missionName = this.querySelector(".mission-name").textContent;
      const missionStatus = this.querySelector(".mission-status").textContent;

      console.log(
        `Mission details for: ${missionName} - Status: ${missionStatus}`
      );
    });
  });

  // Initialize solar system animation
  initSolarSystem();

  // Add stars to the sky
  addStars();

  // Make planet markers interactive
  const planetMarkers = document.querySelectorAll(".planet-marker");
  planetMarkers.forEach((marker) => {
    marker.style.cursor = "pointer";
    marker.style.transition = "all 0.3s ease";

    marker.addEventListener("mouseenter", function () {
      this.style.transform = "translate(-50%, -50%) scale(1.1)";
      this.style.boxShadow = "0 0 20px rgba(108, 99, 255, 0.7)";
    });

    marker.addEventListener("mouseleave", function () {
      this.style.transform = "translate(-50%, -50%) scale(1)";
      this.style.boxShadow = "0 0 15px rgba(108, 99, 255, 0.5)";
    });
  });
});

// Add stars to the sky
function addStars() {
  const skyElement = document.createElement("div");
  skyElement.className = "star-background";
  skyElement.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -5;
    pointer-events: none;
  `;

  // Create a style element for our animations
  const styleElement = document.createElement("style");
  styleElement.textContent = `
    @keyframes starTwinkle {
      0% { opacity: 0.2; transform: scale(0.8); }
      100% { opacity: 1; transform: scale(1); }
    }
    
    .sky-star {
      animation: starTwinkle 3s infinite alternate;
      position: absolute;
      border-radius: 50%;
    }
    
    .card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    }
  `;
  document.head.appendChild(styleElement);

  // Add the stars
  const stars = 300;

  for (let i = 0; i < stars; i++) {
    const star = document.createElement("div");
    star.className = "sky-star";

    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;

    // Random size
    const size = Math.random() * 2;

    // Random animation delay
    const delay = Math.random() * 3;

    star.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      background-color: rgba(255, 255, 255, ${0.5 + Math.random() * 0.5});
      animation-delay: ${delay}s;
    `;

    skyElement.appendChild(star);
  }

  document.body.insertBefore(skyElement, document.body.firstChild);
}

// Initialize solar system with proper orbital mechanics
function initSolarSystem() {
  const planets = {
    mercury: {
      element: document.querySelector(".mercury"),
      speed: 3,
      orbit: document.querySelector(".mercury-orbit"),
    },
    venus: {
      element: document.querySelector(".venus"),
      speed: 5,
      orbit: document.querySelector(".venus-orbit"),
    },
    earth: {
      element: document.querySelector(".earth"),
      speed: 8,
      orbit: document.querySelector(".earth-orbit"),
    },
    mars: {
      element: document.querySelector(".mars"),
      speed: 12,
      orbit: document.querySelector(".mars-orbit"),
    },
    jupiter: {
      element: document.querySelector(".jupiter"),
      speed: 20,
      orbit: document.querySelector(".jupiter-orbit"),
    },
    saturn: {
      element: document.querySelector(".saturn"),
      speed: 30,
      orbit: document.querySelector(".saturn-orbit"),
    },
  };

  // Set random starting positions
  Object.values(planets).forEach((planet) => {
    if (!planet.element || !planet.orbit) return;

    // Get orbit dimensions
    const orbitRect = planet.orbit.getBoundingClientRect();
    const orbitRadiusX = orbitRect.width / 2;
    const orbitRadiusY = orbitRect.height / 2;

    // Give each planet a random starting angle
    planet.angle = Math.random() * 360;

    // Set initial position
    updatePlanetPosition(planet, orbitRadiusX, orbitRadiusY);
  });

  // Animation function
  function animatePlanets() {
    const now = Date.now() / 1000;

    Object.values(planets).forEach((planet) => {
      if (!planet.element || !planet.orbit) return;

      // Get current orbit dimensions (in case of window resize)
      const orbitRect = planet.orbit.getBoundingClientRect();
      const orbitRadiusX = orbitRect.width / 2;
      const orbitRadiusY = orbitRect.height / 2;

      // Update angle based on speed (degrees per second)
      planet.angle = (planet.angle + 0.05 * planet.speed) % 360;

      // Update planet position
      updatePlanetPosition(planet, orbitRadiusX, orbitRadiusY);
    });

    requestAnimationFrame(animatePlanets);
  }

  // Start animation
  animatePlanets();
}

// Update a planet's position based on its angle
function updatePlanetPosition(planet, radiusX, radiusY) {
  const radians = (planet.angle * Math.PI) / 180;

  // Calculate position on the orbit
  const x = Math.cos(radians) * radiusX;
  const y = Math.sin(radians) * radiusY;

  // Position planet relative to the center of its orbit
  planet.element.style.top = `calc(50% + ${y}px)`;
  planet.element.style.left = `calc(50% + ${x}px)`;
  planet.element.style.transform = "translate(-50%, -50%)";
}
