import Matter, { Body } from 'matter-js';

export default class TroubleInMiami {

    private render: Matter.Render;
    private playerBody: Matter.Body;

    constructor(elementToRenderGame: HTMLElement) {
        var Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Composites = Matter.Composites,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            Composite = Matter.Composite,
            Bodies = Matter.Bodies;
        
        // create engine
        var engine = Engine.create({
            gravity: {
                scale: 0
            }
        });
        let world = engine.world;
        
        // create renderer
        this.render = Render.create({
            element: elementToRenderGame,
            engine: engine,
            options: {
                width: elementToRenderGame.clientWidth,
                height: elementToRenderGame.clientHeight,
                showAngleIndicator: true
            }
        });
        
        Render.run(this.render);
        
        // create runner
        var runner = Runner.create();
        Runner.run(runner, engine);
        
        // add bodies
        // var stack = Composites.stack(100, 600 - 21 - 20 * 20, 10, 10, 20, 0, function(x, y) {
        //     return Bodies.circle(x, y, 20);
        // });

        this.playerBody = Bodies.circle(40, 40, 20);
        
        Composite.add(world, [
            // walls
            Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
            Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
            Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
            Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),
            this.playerBody
        ]);
        
        // add mouse control
        var mouse = Mouse.create(this.render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 1,
                    render: {
                        visible: false
                    }
                }
            });
        
        Composite.add(world, mouseConstraint);
        
        // keep the mouse in sync with rendering
        this.render.mouse = mouse;
        
        // fit the render viewport to the scene
        Render.lookAt(this.render, {
            min: { x: 0, y: 0 },
            max: { x: 800, y: 600 }
        });

    }

    zoom(scaleIncrease: number) {
        this.render.bounds.min.x -= scaleIncrease;
        this.render.bounds.min.y -= scaleIncrease;
        this.render.bounds.max.x += scaleIncrease;
        this.render.bounds.max.y += scaleIncrease;
    }

    moveUp() {
        const newPosition: Matter.Vector = {x: this.playerBody.position.x, y: this.playerBody.position.y - 10};
        Body.setPosition(this.playerBody, newPosition);
    }

    moveDown() {
        const newPosition: Matter.Vector = {x: this.playerBody.position.x, y: this.playerBody.position.y + 10};
        Body.setPosition(this.playerBody, newPosition);
    }

    moveLeft() {
        const newPosition: Matter.Vector = {x: this.playerBody.position.x - 10, y: this.playerBody.position.y};
        Body.setPosition(this.playerBody, newPosition);
    }

    moveRight() {
        const newPosition: Matter.Vector = {x: this.playerBody.position.x + 10, y: this.playerBody.position.y};
        Body.setPosition(this.playerBody, newPosition);
    }

}