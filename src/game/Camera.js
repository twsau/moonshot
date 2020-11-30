import { Container } from 'pixi.js';

export default class Camera extends Container {
	constructor(bounds) {
		super();
		Object.assign(this, {
			bounds: bounds,
			panSpeed: 10,
			sortableChildren: true,
			target: null
		});
		document.addEventListener('keydown', e => {
			if (e.key == '+') {
				this.zoomIn();
			} else if (e.key == '-') {
				this.zoomOut();
			}	
		});
	}
	update() {
		if (!!this.target) {
			this.panToTarget();
		}
	}
	setTarget(target) {
		this.target = target;
	}
	panToTarget() {
		const coordinates = {
			x: (-this.target.x + this.bounds.width / 2) + (1 - this.scale.x) * this.bounds.width / 2.5,
			y: (-this.target.y + this.bounds.height / 2) + (1 - this.scale.y) * this.bounds.height / 1.33
		};
		const angle = Math.atan2(coordinates.y - this.y, coordinates.x - this.x);
		if (Math.hypot(this.x - coordinates.x, this.y - coordinates.y) > this.panSpeed) {
			this.position.set(
				this.x + Math.cos(angle) * this.panSpeed,
				this.y + Math.sin(angle) * this.panSpeed
			);
		} else {
			this.position.set(coordinates.x, coordinates.y);
		}
	}
	zoomIn() {
		if (this.scale.x < 2) {
			this.scale.set(this.scale.x + 0.01);
		}
	}
	zoomOut() {
		if (this.scale.x > 1) {
			this.scale.set(this.scale.y - 0.01);
		}
	}
}