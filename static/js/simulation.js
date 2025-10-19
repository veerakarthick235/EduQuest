// Module-level variables for Matter.js
let engine;
let render;
let world;

function initSimulation() {
    const simContainer = document.getElementById('simulation-container');
    if (!simContainer) return;

    // --- Matter.js Setup ---
    const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint } = Matter;

    // Create engine
    engine = Engine.create();
    world = engine.world;

    // Create renderer
    render = Render.create({
        element: simContainer,
        engine: engine,
        options: {
            width: simContainer.clientWidth,
            height: 200, // Keep it simple
            wireframes: false,
            background: '#1a1a3a'
        }
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Add boundaries (ground)
    World.add(world, [
        Bodies.rectangle(simContainer.clientWidth / 2, 200, simContainer.clientWidth, 20, { isStatic: true, render: { fillStyle: '#00ffff' } })
    ]);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });
    World.add(world, mouseConstraint);
    render.mouse = mouse;

    // Add some simple shapes to play with
    addSimShapes();

    // Hook up the reset button
    document.getElementById('reset-sim-button').addEventListener('click', () => {
        World.clear(world, false); // Clear bodies, not constraints
        addSimShapes();
    });
}

function addSimShapes() {
    const { Bodies, World } = Matter;
    World.add(world, [
        Bodies.rectangle(100, 50, 40, 40, { render: { fillStyle: '#ff00ff' } }),
        Bodies.rectangle(150, 50, 80, 20, { render: { fillStyle: '#ffff00' } }),
        Bodies.circle(200, 40, 25, { render: { fillStyle: '#00ff00' } })
    ]);
}