import { Loader, Sprite, Text, TilingSprite } from 'pixi.js';
import { DropShadowFilter } from 'pixi-filters';
const loader = Loader.shared;

const MapSprite = {
	init: {
		sprite: (sprite, x, y) => {
			sprite.anchor.set(0.5);
			sprite.position.set(x, y);
		}
	},
	DeadScreen: (x, y, w, h) => {
		let deadscreen = new Sprite(loader.resources['deadscreen'].texture);
		deadscreen.width = 990;
		deadscreen.height = 540;
		MapSprite.init.sprite(deadscreen, x, y);
		return deadscreen;
	},
	Space: (x, y, w, h) => {
		let space = new Sprite(loader.resources['space'].texture);
		space.width = 990;
		space.height = 540;
		MapSprite.init.sprite(space, x, y);
		return space;
	},
	Text: (content, x, y) => {
		let text = new Text(content, {
			fill: 0x00ffff,
			fontFamily: 'Press Start 2P'
		});
		text.filters = [
			new DropShadowFilter({
				alpha: 1,
				blur: 0,
				color: 0x770000,
				distance: 5,
				rotation: 135
			})
		]
		MapSprite.init.sprite(text, x, y);
		return text;
	},
	Wall: {
		sandstone: (x, y, w, h, a) => {
			let wall = new TilingSprite(loader.resources['wall_sandstone'].texture, w, h);
			if (a) {
				wall.angle = a;
			}
			MapSprite.init.sprite(wall, x, y);
			return wall;
		}
	}
}

export default MapSprite;