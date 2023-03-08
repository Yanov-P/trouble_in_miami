import Matter from 'matter-js';

export default class TroubleInMiami {

    constructor(elementToRenderGame: HTMLElement) {
        console.log(elementToRenderGame)
        var Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Composites = Matter.Composites,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            Composite = Matter.Composite,
            Bodies = Matter.Bodies;
        
        // create engine
        var engine = Engine.create(),
            world = engine.world;
        
        // create renderer
        var render = Render.create({
            element: elementToRenderGame,
            engine: engine,
            options: {
                width: elementToRenderGame.clientWidth,
                height: elementToRenderGame.clientHeight,
                showAngleIndicator: true
            }
        });
        
        Render.run(render);
        
        // create runner
        var runner = Runner.create();
        Runner.run(runner, engine);
        
        // add bodies
        // var stack = Composites.stack(100, 600 - 21 - 20 * 20, 10, 10, 20, 0, function(x, y) {
        //     return Bodies.circle(x, y, 20);
        // });
        
        Composite.add(world, [
            // walls
            Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
            Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
            Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
            Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),
            Bodies.circle(40, 40, 20)
        ]);
        
        // add mouse control
        var mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            });
        
        Composite.add(world, mouseConstraint);
        
        // keep the mouse in sync with rendering
        render.mouse = mouse;
        
        // fit the render viewport to the scene
        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: 800, y: 600 }
        });
    }

}