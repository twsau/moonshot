import { Loader, Sprite, TilingSprite } from 'pixi.js';
import { DropShadowFilter } from 'pixi-filters';
import { Bodies, Body, Vertices } from 'matter-js';
import { Attractors } from 'matter-attractors';
import decomp from 'poly-decomp';
window.decomp = decomp;
const loader = Loader.shared;

const MapObject = {
	init: {
		sprite: sprite => {
			sprite.anchor.set(0.5);
			sprite.position.set(sprite.body.position.x, sprite.body.position.y);
		}
	},
	AsteroidBelt: (x, y, a) => {

	},
	Booster: (x, y, a) => {
		const booster = new Sprite(loader.resources['booster'].texture);
		booster.body = Bodies.rectangle(x, y, 20, 20, {
			isStatic: true,
			isSensor: true,
			label: 'booster',
			mass: 0.0001
		});
		Body.setAngle(booster.body, a * Math.PI / 180);
		booster.rotation = booster.body.angle;
		MapObject.init.sprite(booster);
		return booster;
	},
	Wall: (x, y, w, h, a) => {
		const wall = new TilingSprite(loader.resources['wall_sandstone'].texture, w, h);
		wall.body = Bodies.rectangle(x, y, w, h, {
			isStatic: true,
			mass: 1
		});
		if (a) {
			Body.rotate(wall.body, a * Math.PI / 180);
			wall.rotation = wall.body.angle;
		}
		MapObject.init.sprite(wall);
		return wall;
	},
	Planet: (x, y, r, num, target = false, lethal = false) => {
		const planet = new Sprite(loader.resources[`planet_${num}`].texture);
		planet.filters = [new DropShadowFilter({
			rotation: 135,
			distance: 10
		})];
		planet.width = r * 2;
		planet.height = r * 2;
		let label = 'planet';
		if (target) {
			label += ' target';
		} else if (lethal) {
			label += ' lethal';
		}
		planet.body = Bodies.circle(x, y, r, {
			isStatic: true,
			label: label,
			mass: 15 * r,
			plugin: {
				attractors: [
					Attractors.gravity
				]
			}
		});
		MapObject.init.sprite(planet);
		return planet;
	}
};

export default MapObject;