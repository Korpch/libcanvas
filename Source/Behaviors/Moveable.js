/*
---

name: "Behaviors.Moveable"

description: "Provides interface for moveable objects"

license: "[GNU Lesser General Public License](http://opensource.org/licenses/lgpl-license.php)"

authors:
	- "Shock <shocksilien@gmail.com>"

requires:
	- LibCanvas
	- Behaviors.Animatable

provides: Behaviors.Moveable

...
*/
LibCanvas.namespace('Behaviors').Moveable = atom.Class({
	stopMoving : function () {
		if (this.stopMoving.fn) this.stopMoving.fn();
		return this;
	},
	moveTo    : function (point, speed) { // speed == pixels per sec
		this.stopMoving();
		point = LibCanvas.Point.from(point);
		var diff = this.getCoords().diff(point), shape = this.getShape();
		if (!speed) {
			shape.move(diff);
			return this;
		}
		var distance = Math.hypotenuse(diff.x, diff.y);
		this.stopMoving.fn = new LibCanvas.Behaviors.Animatable(function (change) {
			shape.move({
				x : diff.x * change,
				y : diff.y * change
			});
		}).animate({
			time : distance / speed * 1000,
			onFinish: this.fireEvent.bind(this, 'stopMove')
		}).stop;

		return this;
	}
});