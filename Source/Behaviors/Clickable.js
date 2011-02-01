/*
---

name: "Behaviors.Clickable"

description: "Provides interface for clickable canvas objects"

license: "[GNU Lesser General Public License](http://opensource.org/licenses/lgpl-license.php)"

authors:
	- "Shock <shocksilien@gmail.com>"

requires:
	- LibCanvas
	- Behaviors.MouseListener

provides: Behaviors.Clickable

...
*/

(function () {

var setValFn = function (name, val) {
	return function () {
		this[name] = val;
		this.fireEvent('statusChanged');
	}.context(this);
};

// Should extends drawable, implements mouseListener
LibCanvas.namespace('Behaviors').Clickable = atom.Class({
	clickable : function () { 
		this.listenMouse();

		var fn = setValFn.context(this);

		this.hover  = false;
		this.active = false;

		this.addEvent('mouseover', fn('hover', true));
		this.addEvent('mouseout' , fn('hover', false));
		this.addEvent('mousedown', fn('active', true));
		this.addEvent(['mouseup', 'away:mouseout', 'away:mouseup'],
			fn('active', false));
		return this;
	}
});
})();