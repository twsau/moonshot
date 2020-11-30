import App from './game/App.js';
import { Loader, utils } from 'pixi.js';
import * as WebFont from 'webfontloader';
const loader = Loader.shared;

const manifest = {
	booster: './asset/img/booster.png',
	deadscreen: './asset/img/deadscreen.png',
	logo: './asset/img/logo.png',
	planet_0: './asset/img/planets/0.png',
	planet_1: './asset/img/planets/1.png',
	planet_2: './asset/img/planets/2.png',
	planet_3: './asset/img/planets/3.png',
	planet_4: './asset/img/planets/4.png',
	planet_5: './asset/img/planets/5.png',
	planet_6: './asset/img/planets/6.png',
	planet_7: './asset/img/planets/7.png',
	planet_8: './asset/img/planets/8.png',
	planet_9: './asset/img/planets/9.png',
	planet_10: './asset/img/planets/10.png',
	planet_11: './asset/img/planets/11.png',
	planet_12: './asset/img/planets/12.png',
	planet_13: './asset/img/planets/13.png',
	planet_14: './asset/img/planets/14.png',
	space: './asset/img/bg.png',
	wall_sandstone: './asset/img/wall_sandstone.png'
};

const preload = () => {
	for (const [key, value] of Object.entries(manifest)) {
		loader.add(key, value);
	}
};

const load = () => {
	loader.load(() => {
		WebFont.load({
			google: {
				families: [
					'Press Start 2P'
				]
			},
			active: e => {
				utils.skipHello();
				const app = new App();
			}
		})
	})
};

preload();
load();