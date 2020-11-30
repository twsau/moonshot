import { Graphics } from 'pixi.js';
import { Bodies, Body } from 'matter-js';
import { Attractors } from 'matter-attractors';

export default class Player extends Graphics {
	constructor(x, y) {
		super();
		this.position.set(x, y);
		this.beginFill(0xffff00).drawRect(-2.5, -2.5, 5, 5).endFill();
		this.body = Bodies.circle(x, y, 5, {
			frictionAir: 0,
			label: 'player',
			plugin: {
				attractors: [
					Attractors.gravity
				]
			}
		});
		this.go = {
			up: false,
			down: false,
			left: false,
			right: false
		};
		this.onGround = false;
		this.speed = 0.5;
		this.jumpHeight = 3;
		this.zIndex = 1;
		inputEvents(this);
	}
	update() {
		this.move();
		this.position.set(this.body.position.x, this.body.position.y);
		this.rotation = this.body.angle;
	}
	move() {
		if (this.onGround) {
			if (this.go.left) {
				Body.setVelocity(this.body, {
					x: -this.speed,
					y: this.body.velocity.y
				})
			} else if (this.go.right) {
				Body.setVelocity(this.body, {
					x: this.speed,
					y: this.body.velocity.y
				})
			}
			if (this.go.up) {
				Body.setVelocity(this.body, {
					x: this.body.velocity.x,
					y: -this.speed
				});
			} else if (this.go.down) {
				Body.setVelocity(this.body, {
					x: this.body.velocity.x,
					y: this.speed
				});
			}
		}
	}
	jump() {
		if (this.onGround) {
			Body.setVelocity(this.body, {
				x: this.jumpHeight * Math.cos(this.body.angle),
				y: this.jumpHeight * Math.sin(this.body.angle)
			})
		}
	}
}

const inputEvents = player => {
	document.addEventListener('keydown', e => {
		if (e.key == ' ') {
			player.jump();
		}
		if (e.key == 'ArrowUp') {
			player.go.up = true;
		}
		if (e.key == 'ArrowDown') {
			player.go.down = true;
		}
		if (e.key == 'ArrowLeft') {
			player.go.left = true;
		}
		if (e.key == 'ArrowRight') {
			player.go.right = true;
		}
	});
	document.addEventListener('keyup', e => {
		if (e.key == 'ArrowUp') {
			player.go.up = false;
		}
		if (e.key == 'ArrowDown') {
			player.go.down = false;
		}
		if (e.key == 'ArrowLeft') {
			player.go.left = false;
		}
		if (e.key == 'ArrowRight') {
			player.go.right = false;
		}
	});
}