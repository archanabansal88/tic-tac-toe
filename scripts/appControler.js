const GameContainer = (function() {
	class GameContainer {
		constructor(context) {
			this.context = context;
			this.init();
		}
		init() {
			this.playerSelection = new SelectionPlayer(
				this.context,
				'How do you want to play ?',
				'One Player',
				'Two Player',
				this.onSelectedPlayer.bind(this)
			);
			this.playerSelection.init();
		}
		onSelectedPlayer(event) {
			if (event.target.innerHTML === 'One Player') {
				this.isOnePlayer = true;
			} else {
				this.isOnePlayer = false;
			}
			this.playerSelection.removeEvent();
			this.xOro = new SelectionPlayer(
				this.context,
				' Would you like X or O ?',
				'X',
				'O',
				this.handleInitialMove.bind(this)
			);
			this.xOro.init();
		}

		handleInitialMove(event) {
			this.xOro.removeEvent();
			this.context.hide();
			$('.grid-container').show();
			$('.status').show();
			new Grid($('.grid-container'), $('.status'), this.isOnePlayer, event.target.innerHTML);
		}
	}
	return GameContainer;
})();

(function() {
	new GameContainer($('.selection-container'));
})();


