import { Application, Graphics } from 'pixi.js';
import { Body, Engine, Events, Sleeping, use, World } from 'matter-js';
import 'matter-attractors';
use('matter-attractors');
import { CRTFilter, PixelateFilter } from 'pixi-filters';
import Camera from './Camera.js';
import Map from './Map/Map.js';
import Menu from './Menu.js';
import Player from './Player.js';
import './App.css';

const config = {
	antialias: true,
	height: 540,
	width: 990,
	view: document.querySelector('canvas')
}

export default class App extends Application {
	constructor() {
		super(config);
		Object.assign(this, {
			camera: new Camera(this.screen),
			engine: Engine.create(),
			mapObjects: [],
			menu: new Menu(() => {
				this.nextLevel();
			}),
			player: new Player(100, 100),
			stats: {
				level: 0
			}
		});
		handleCollision(this);
		this.engine.world.gravity.y = 0;
		World.add(this.engine.world, this.player.body);
		this.stage.filters = [new PixelateFilter(2), new CRTFilter()];
		this.camera.addChild(this.player);
		this.stage.addChild(this.camera, this.menu);
		this.ticker.add(delta => this.update(delta));
		Engine.run(this.engine);
	}
	update() {
		if (this.menu.visible) {
			this.menu.update(this.ticker.lastTime / 1500000 + 0.1);
			this.pause(true);
		} else {
			this.pause(false);
			this.player.update();
			this.camera.update();
		}
	}
	loadMapAsset(title) {
		if (title in Map) {
			let map = Map[title]();
			for (const [key, value] of Object.entries(map)) {
				this.mapObjects.push(value);
				this.camera.addChild(value);
				if (value.body) {
					World.add(this.engine.world, value.body);
				}
			}
		} else {
			console.log(`error: asset "${title}" does not exist`);
		}
	}
	nextLevel() {
		if (this.stats.level == spawn.length) {
			this.endGame();
		} else {
			this.levelComplete = false;
			this.player.visible = true;
			this.stats.level++;
			this.loadMapAsset(`level_${this.stats.level}`);
			Body.setPosition(this.player.body, {
				x: spawn[this.stats.level - 1].x,
				y: spawn[this.stats.level - 1].y
			});
			Body.setVelocity(this.player.body, {
				x: 0,
				y: 0
			});
		}
	}
	endLevel() {
		this.levelComplete = true;
		this.player.visible = false;
		this.mapObjects.forEach(obj => {
			this.camera.removeChild(obj);
			if (obj.body) {
				World.remove(this.engine.world, obj.body);
			}
		});
		setTimeout(() => {
			this.nextLevel();
		}, 300)
	}
	endGame() {
		this.loadMapAsset('winScreen');
	}
	pause(state) {
		for (const [key, value] of Object.entries(this.engine.world.bodies)) {
			Sleeping.set(value, state);
		}
	}
}

const handleCollision = app => {
	Events.on(app.engine, 'collisionStart', e => {
			e.pairs.forEach(pair => {
				const {bodyA: a, bodyB: b} = pair;
				if (a.label.includes('player') && b.label.includes('target') && !app.levelComplete || a.label.includes('target') && b.label.includes('player') && !app.levelComplete ) {
					app.endLevel();
				} else if (a.label.includes('player') && b.label.includes('lethal') || a.label.includes('lethal') && b.label.includes('player')) {
					app.loadMapAsset('deadScreen');
					app.camera.removeChild(app.player);
				} else if (a.label.includes('player') && b.label.includes('planet') || a.label.includes('planet') && b.label.includes('player')) {
					app.player.onGround = true;
					Body.setVelocity(app.player.body, {
						x: 0,
						y: 0
					});
				} else if (a.label.includes('player') && b.label.includes('booster')) {
					Body.setVelocity(app.player.body, {
						x: 3 * Math.cos(b.angle),
						y: 3 * Math.sin(b.angle)
					});
					Body.setPosition(app.player.body, {
						x: b.position.x,
						y: b.position.y
					});
				}
			});
		});
		Events.on(app.engine, 'collisionActive', e => {
			e.pairs.forEach(pair => {
				const {bodyA: a, bodyB: b} = pair;
				if (a.label.includes('player') && b.label.includes('planet') || a.label.includes('planet') && b.label.includes('player')) {
					let angle = Math.atan2(a.position.y - b.position.y, a.position.x - b.position.x);
					Body.setAngle(app.player.body, angle);
				}
			});
		});
		Events.on(app.engine, 'collisionEnd', e => {
			e.pairs.forEach(pair => {
				const {bodyA: a, bodyB: b} = pair;
				if (a.label.includes('player') && b.label.includes('planet') || a.label.includes('planet') && b.label.includes('player')) {
					app.player.onGround = false;
				}
			});
		});
}

const spawn = [
	{
		x: 100,
		y: 270
	},
	{
		x: 50,
		y: 270
	},
	{
		x: 50,
		y: 50
	}
];