import { Container, Graphics, Loader, Text, Sprite } from 'pixi.js';
import { DropShadowFilter, GodrayFilter } from 'pixi-filters';
const loader = Loader.shared;

export default class extends Container {

	constructor(play) {
		super();
		Object.assign(this, {
			x: 0,
			y: 0,
			w: 990,
			h: 540
		});
		Object.assign(this, {
			backdrop: new Graphics(),
			bg: element.bg({x: 0, y: 0, w: 990, h: 540}),
			logo: element.logo(this),
			play: play,
			screens: {
				main: screen.main(this),
				highscores: screen.highscores(this),
				options: screen.options(this),
				credits: screen.credits(this)
			}
		});
		this.logo.filters = [new DropShadowFilter({
			color: 0x00ffff,
			distance: 10,
			blur: 3
		})];
		this.backdrop.width = 990;
		this.backdrop.height = 540;
		this.backdrop.filters = [
			new GodrayFilter(),
		];
		this.addChild(this.backdrop, this.bg, this.logo);
		for (const [key, value] of Object.entries(this.screens)) {
			this.addChild(value);
		}
	}

	update(time) {
		this.logo.filters[0].rotation = -Math.sin(time * 100) * 360;
		this.backdrop.filters[0].seed = Math.random();
		this.backdrop.filters[0].time += 0.005;
		this.backdrop.clear().beginFill(0x000000).drawRect(this.x, this.y, this.w, this.h).endFill();
			this.bg.clear();
		for (let i = 0; i < 300; i++) {
			let p = {
				x: i * Math.cos(time * i) + 495,
				y: i * Math.sin(time * i) + 270,
				r: (i / 100 * Math.cos(i - time) + 30 * i / 255) * Math.cos(time) / 2,
				o: 0.1,
				l: 15 * i / 255,
			};
			this.bg.lineStyle(p.l, 0xff00ff, p.o).beginFill(0x00ffff, p.o).arc(p.x, p.y, p.r, 0, Math.PI * 2).endFill();
		}
	}
}

const display = (screen, menu) => {
		if (screen == 'play') {
			menu.play();
			menu.visible = false;
		} else {
			for (const [key, value] of Object.entries(menu.screens)) {
				value.visible = key == screen ? true : false;
			}
		}
	}

	const element = {
		border: menu => {
			let border = new Graphics();
			border.lineStyle(1, 0xffffff).beginFill(0x007777, 0.5).drawRect(menu.w / 2 - 60, 0, 120, 70);
			return border;
		},
		button: (content, callback, menu) => {
			let button = new Container();
			button.interactive = true;
			button.on('pointerdown', e => {
				callback(content, menu);
			});
			let border = element.border(menu);
			let text = element.text(content, menu);
			button.addChild(border, text);
			return button;
		},
		logo: menu => {
			let logo = new Sprite(loader.resources['logo'].texture);
			logo.anchor.set(0.5);
			logo.scale.set(0.5);
			logo.position.set(menu.w / 2, 70);
			return logo;
		},
		bg: bounds => {
			let bg = new Graphics();
			bg.size = bounds.w > bounds.h ? bounds.w / 20 : bounds.h / 15;
			return bg;
		},
		text: (content, menu) => {
			let text = new Text(content, config.textStyle);
			text.anchor.set(0.5);
			text.position.set(menu.w / 2, 35);
			return text;
		}
	}

	const screen = {
		build: (screen, items) => {
			let i = 0;
			for (const [key, value] of Object.entries(items)) {
				value.y = 150 + i * 80;
				i++;
				screen.addChild(value);
			}
			return screen;
		},
		credits: menu => {
			let credits = new Container();
			credits.visible = false;
			let items = {
				author: element.text('author: twsau', menu),
				url: element.text('twsau.co.uk', menu),
				planets: element.text('planets: Viktor.Hahn@web.de', menu),
				back: element.button('main', display, menu)
			}
			return screen.build(credits, items);
		},
		dead: menu => {
			let dead = new Container();
			dead.visible = false;
			let items = {
				msg: element.text('you died', menu),
				suggest: element.text('refresh the page to try again', menu)
			};
			return screen.build(dead, items);
		},
		highscores: menu => {
			let highscores = new Container();
			highscores.visible = false;
			let items = {
				main: element.button('main', display, menu)
			};
			return screen.build(highscores, items);
		},
		main: menu => {
			let main = new Container();
			let items = {
				version: element.text('version 0.1', menu),
				play: element.button('play', display, menu),
				options: element.button('options', display, menu),
				credits: element.button('credits', display, menu),
			};
			return screen.build(main, items);
		},
		options: menu => {
			let options = new Container();
			options.visible = false;
			let items = {
				save: element.button('main', display, menu)
			};
			return screen.build(options, items);
		}
	}


	const config = {
		textStyle: {fill: 0xffffff, fontFamily: 'Press Start 2P', fontSize: 15}
	}