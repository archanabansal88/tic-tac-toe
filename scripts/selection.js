const SelectionPlayer = (function() {
	class SelectionPlayer {
		constructor(context, title, button1, button2, onSelection) {
			this.context = context;
			this.title = title;
			this.button1 = button1;
			this.button2 = button2;
			this.onSelection = onSelection;
		}
		init() {
			this.createMarkUp();
			this.attachEvent();
		}
		createMarkUp() {
			const temp = `<h2 class="title">${this.title}</h2>\
											<div>\
												<button class='button button1'>${this.button1}</button>\
												<button class='button button2'>${this.button2}</button>\
											</div>`;
			this.context.html(temp);
		}
		attachEvent() {
			this.context.on('click', '.button', this.onSelection);
		}

		removeEvent() {
			this.context.off('click', '.button', this.onSelection);
		}
	}
	return SelectionPlayer;
})();
