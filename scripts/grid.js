const Utility = (function() {
	function calculateWinner(arr) {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (var i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
				return arr[a];
			}
		}
		return null;
	}
	return {
		calWinner: calculateWinner,
	};
})();

const Grid = (function() {
	class Grid {
		constructor(context, heading, isOnePlayer, currentPlayer) {
			this.cellInstance = [];
			this.moves = new Array(9);
			this.currentPlayer = currentPlayer;
			this.player1 = currentPlayer;
			this.count = 0;
			this.context = context;
			this.heading = heading;
			this.isOnePlayer = isOnePlayer;
			this.init();
		}
		init() {
			this.createCell();
			this.intitialStatus();
			this.attachEvent();
		}
		createCell() {
			for (let i = 0; i < 9; i++) {
				let temp = new Cell(this.context, i);
				temp.init();
				this.cellInstance.push(temp);
			}
		}

		attachEvent() {
			this.context.on('click', '.cell', this.handleClick.bind(this));
			this.context.on('click', '.play-again', this.resetClick.bind(this));
		}
		intitialStatus() {
			this.status = `Current Player: ${this.currentPlayer}`;
			this.heading.html(this.status);
		}

		resetClick() {
			this.context.find('.replay').removeClass('gameOver');
			this.context.find('.cell').html('');
			this.moves = new Array(9);
			this.count = 0;
			this.currentPlayer = this.player1;
			this.intitialStatus();
		}

		checkWinner() {
			const winner = Utility.calWinner(this.moves);
			let isGameOver = false;
			if (winner) {
				this.status = 'Winner: ' + winner;
				this.context.find('.replay').addClass('gameOver');

				isGameOver = true;
			} else if (!winner && this.count === 9) {
				this.status = `Its a draw!`;
				this.context.find('.replay').addClass('gameOver');
				isGameOver = true;
			}
			this.heading.html(this.status);
			return isGameOver;
		}

		renderMove(i) {
			let icon = '<i class = "fa fa-circle-o"></i>';
			if (this.currentPlayer === 'X') {
				icon = '<i class = "fa fa-times"></i>';
			}
			this.context.find('#' + i).html(icon);
		}

		updateMove(i) {
			this.renderMove(i);
			this.moves[i] = this.currentPlayer;
			this.count++;
			if (!this.checkWinner()) {
				if (this.currentPlayer === 'X') {
					this.currentPlayer = 'O';
				} else {
					this.currentPlayer = 'X';
				}
				this.intitialStatus();
			}
		}

		generateComputerMove() {
			for (var i = 0; i < this.moves.length; i++) {
				if (!this.moves[i]) {
					this.updateMove(i);
					break;
				}
			}
		}

		handleClick(event) {
			const temp = event.target.id;
			if (this.context.find('#' + temp).html() === '') {
				this.updateMove(temp);
				if (this.isOnePlayer) {
					this.generateComputerMove();
				}
			}
		}
	}
	return Grid;
})();
