import MapObject from './MapObject.js';
import MapSprite from './MapSprite.js';

const Map = {
	example: () => {
		return {
			mapSprite: MapSprite.Wall.sandstone(495, 270, 990, 540)
		}
	},
	level_1: () => {
		return {
			bg: MapSprite.Space(495, 270, 990, 540),
			planet_0: MapObject.Planet(100, 270, 50, 3),
			planet_1: MapObject.Planet(890, 270, 50, 4, true),
			text_0: MapSprite.Text('press space to jump', 495, 500)
		}
	},
	level_2: () => {
		return {
			bg: MapSprite.Space(495, 270, 990, 540),
			planet_0: MapObject.Planet(100, 270, 50, 3),
			planet_1: MapObject.Planet(890, 270, 50, 4, true),
			text_0: MapSprite.Text('use the arrow keys to move', 495, 500)
		}
	},
	level_3: () => {
		return {
			bg: MapSprite.Space(495, 270, 990, 540),
			planet_0: MapObject.Planet(100, 100, 43, 7),
			planet_1: MapObject.Planet(495, -100, 200, 13, false, true),
			planet_2: MapObject.Planet(900, 100, 46, 12, true),
			text_0: MapSprite.Text('avoid the gas giant', 495, 500)
		}
	},
	deadScreen: () => {
		return {
			bg: MapSprite.DeadScreen(495, 270, 990, 540),
			text_0: MapSprite.Text('you died', 495, 270),
			text_1: MapSprite.Text('press F5', 495, 500)
		}
	},
	winScreen: () => {
		return {
			bg: MapSprite.DeadScreen(495, 270, 990, 540),
			text_0: MapSprite.Text('you won!', 495, 100),
			text_1: MapSprite.Text('well done!', 495, 440)
		}
	}
}

export default Map;