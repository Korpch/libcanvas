/*
---

name: "Scene.Resources"

description: "LibCanvas.Scene"

license:
	- "[GNU Lesser General Public License](http://opensource.org/licenses/lgpl-license.php)"
	- "[MIT License](http://opensource.org/licenses/mit-license.php)"

authors:
	- "Shock <shocksilien@gmail.com>"

requires:
	- LibCanvas
	- Scene

provides: Scene.Resources

...
*/

Scene.Resources = Class(
/**
 * @lends LibCanvas.Scene.Resources#
 */
{

	/** @constructs */
	initialize: function (scene, rectangle) {
		this.scene = scene;
		this.lc    = scene.libcanvas;
		this._rectangle = rectangle;
	},

	getAudio: function (name) {
		return this.lc.getAudio( name );
	},

	getImage: function (name) {
		return this.lc.getImage( name );
	},

	imageExists: function (name) {
		return this.lc.imageExists( name );
	},

	/** @private */
	_mouse: null,

	get mouse () {
		if (this._mouse == null) {
			this._mouse = new Scene.Mouse( this.lc.mouse );
		}
		return this._mouse;
	},

	get keyboard () {
		return this.lc.keyboard;
	},

	get rectangle () {
		return this._rectangle || this.lc.ctx.rectangle;
	}
});