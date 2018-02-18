const Cell = (function() {
	class Cell {
		constructor(context, id) {
			this.context = context;
			this.id = id;
		}
		init() {
			this.createMarkUp();
		}
		createMarkUp() {
			const temp = `<div class='cell cell-${this.id}' id ='${this.id}'></div>`;
			this.context.find('.cell-container').append(temp);
		}
	}
	return Cell;
})();
