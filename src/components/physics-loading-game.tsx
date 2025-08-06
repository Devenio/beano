"use client"

import { useEffect, useRef, useState } from "react";
import { Coffee, CupSoda, Utensils, ChefHat, Coffee as CoffeeIcon } from "lucide-react";

interface PhysicsObject {
  body: any;
  element: HTMLElement;
  iconType: string;
}

const PhysicsLoadingGame = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<any>(null);
  const objectsRef = useRef<PhysicsObject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const cafeIcons = [
    { type: "coffee", name: "coffee", color: "#8B4513" },
    { type: "soda", name: "soda", color: "#3B82F6" },
    { type: "utensils", name: "utensils", color: "#6B7280" },
    { type: "chef", name: "chef", color: "#F97316" },
    { type: "espresso", name: "espresso", color: "#059669" },
  ];

  useEffect(() => {
    const loadMatterJS = async () => {
      try {
        const Matter = await import("matter-js");
        const { Engine, Render, World, Bodies, Body, Composite, Vector, Events, Runner } = Matter;

        if (!containerRef.current) return;

        // Create engine
        const engine = Engine.create();
        engineRef.current = engine;

        // Create renderer
        const render = Render.create({
          element: containerRef.current,
          engine: engine,
          options: {
            width: 400,
            height: 300,
            wireframes: false,
            background: 'transparent',
            showAngleIndicator: false,
            showCollisions: false,
            showVelocity: false,
          }
        });

        // Create ground
        const ground = Bodies.rectangle(200, 290, 400, 20, { 
          isStatic: true,
          render: {
            fillStyle: '#f97316',
            strokeStyle: '#ea580c',
            lineWidth: 2
          }
        });

        // Create walls
        const leftWall = Bodies.rectangle(10, 150, 20, 300, { 
          isStatic: true,
          render: { fillStyle: '#f97316' }
        });
        const rightWall = Bodies.rectangle(390, 150, 20, 300, { 
          isStatic: true,
          render: { fillStyle: '#f97316' }
        });

        // Add bodies to world
        Composite.add(engine.world, [ground, leftWall, rightWall]);

        // Start renderer
        Render.run(render);

        // Start engine
        Runner.run(engine);

        // Create falling objects
        const createObject = () => {
          if (!gameStarted) return;

          const randomIcon = cafeIcons[Math.floor(Math.random() * cafeIcons.length)];
          const x = Math.random() * 300 + 50;
          
          const body = Bodies.circle(x, -20, 15, {
            restitution: 0.8,
            friction: 0.1,
            render: {
              fillStyle: '#ffffff',
              strokeStyle: '#e5e7eb',
              lineWidth: 2
            }
          });

          // Create DOM element for the icon
          const element = document.createElement('div');
          element.className = 'absolute flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-lg border-2 border-gray-200';
          element.style.left = `${x - 15}px`;
          element.style.top = `${-20}px`;
          
          // Create SVG icon based on type
          const svgContent = createIconSVG(randomIcon.type, randomIcon.color);
          element.innerHTML = svgContent;
          
          containerRef.current?.appendChild(element);
          
          objectsRef.current.push({ body, element, iconType: randomIcon.type });

          // Update element position
          const updatePosition = () => {
            const pos = body.position;
            element.style.left = `${pos.x - 15}px`;
            element.style.top = `${pos.y - 15}px`;
            element.style.transform = `rotate(${body.angle * (180 / Math.PI)}deg)`;
          };

          // Add event listener for position updates
          Events.on(engine, 'afterUpdate', updatePosition);

          // Check for scoring
          Events.on(engine, 'collisionStart', (event) => {
            event.pairs.forEach((pair: any) => {
              if (pair.bodyA === body || pair.bodyB === body) {
                if (pair.bodyA === ground || pair.bodyB === ground) {
                  setScore(prev => prev + 10);
                  // Remove object after scoring
                  setTimeout(() => {
                    Composite.remove(engine.world, body);
                    element.remove();
                    Events.off(engine, 'afterUpdate', updatePosition);
                    objectsRef.current = objectsRef.current.filter(obj => obj.body !== body);
                  }, 1000);
                }
              }
            });
          });
        };

        // Create objects periodically
        const interval = setInterval(createObject, 2000);

        // Cleanup
        return () => {
          clearInterval(interval);
          Render.stop(render);
          Engine.clear(engine);
          render.canvas.remove();
        };
      } catch (error) {
        console.error('Failed to load Matter.js:', error);
        setIsLoading(false);
      }
    };

    loadMatterJS();
  }, [gameStarted]);

  // Function to create SVG icons
  const createIconSVG = (type: string, color: string) => {
    switch (type) {
      case "coffee":
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
          <line x1="6" y1="2" x2="6" y2="4"/>
          <line x1="10" y1="2" x2="10" y2="4"/>
          <line x1="14" y1="2" x2="14" y2="4"/>
        </svg>`;
      case "soda":
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
        </svg>`;
      case "utensils":
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
          <path d="M9 14h.01"/>
          <path d="M15 14h.01"/>
          <path d="M9 18h.01"/>
          <path d="M15 18h.01"/>
        </svg>`;
      case "chef":
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 3h12l4 6-10 13L2 9z"/>
          <path d="M11 3 8 9l4 13 4-13-3-6"/>
          <path d="M2 9h20"/>
        </svg>`;
      case "espresso":
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
          <line x1="6" y1="2" x2="6" y2="4"/>
          <line x1="10" y1="2" x2="10" y2="4"/>
          <line x1="14" y1="2" x2="14" y2="4"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>`;
      default:
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
        </svg>`;
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl max-w-md w-full mx-4">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            🎮 بازی فیزیک کافه
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            آیتم‌های کافه را جمع‌آوری کنید!
          </p>
          
          {!gameStarted ? (
            <button
              onClick={startGame}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              شروع بازی
            </button>
          ) : (
            <div className="mb-4">
              <div className="text-2xl font-bold text-orange-500 mb-2">
                امتیاز: {score}
              </div>
              <div className="text-sm text-gray-500">
                آیتم‌ها را جمع‌آوری کنید
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <div 
            ref={containerRef} 
            className="w-full h-80 bg-gradient-to-b from-orange-50 to-orange-100 dark:from-gray-700 dark:to-gray-600 rounded-lg border-2 border-orange-200 dark:border-gray-600 overflow-hidden"
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="flex justify-center gap-4 mb-4 flex-wrap">
            {cafeIcons.map((icon, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                <div dangerouslySetInnerHTML={{ __html: createIconSVG(icon.type, icon.color) }} />
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  {icon.name}
                </span>
              </div>
            ))}
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400">
            آیتم‌ها از بالا می‌افتند. آن‌ها را جمع‌آوری کنید!
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicsLoadingGame; 