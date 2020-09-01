export default class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;
        this.intervalId = null;
        this.isPlaying = false;

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));

        this.view.renderStartScreen();
    }

    startTimer() {
        const speed = 1000 - this.game.getState().level * 100;
        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.update();
            }, speed > 0 ? speed : 100)
            console.log(this.intervalId)
        }
    }

    stopTimer() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    update() {
        this.game.movePieceDown();
        this.updateView();
    }

    pause() {
        this.isPlaying = false;
        this.stopTimer();
        this.updateView();
    }

    play() {
        this.isPlaying = true;
        //this.soundClick();
        this.startTimer();
        this.updateView();
    }
    reset() {
        this.game.reset();
        play();
    }

    updateView() {
        const state = this.game.getState();

        if (state.isGameOver) {
            this.view.renderEndScreen(state);
        } else if (!this.isPlaying) {
            this.view.renderPauseScreen();
        } else {
            this.view.renderMainScreen(state);
        }
    }
    soundClick() {
        var audio = new Audio(); // Создаём новый элемент Audio
        audio.src = 'tetris.mp3'; // Указываем путь к звуку "клика"
        audio.autoplay = true; // Автоматически запускаем
    }

    handleKeyDown(event) {
        const state = this.game.getState();

        switch (event.keyCode) {
            case 13: //ENTER
                if (state.isGameOver) {
                    this.restart();
                } else if (this.isPlaying) {
                    this.pause();
                } else {
                    this.play();
                }
                break;
            case 37: //LEFT ARROW
                this.game.movePieceLeft();
                this.updateView();
                break;
            case 38: //UP ARROW
                this.game.rotatePiece();
                this.updateView();
                break;
            case 39: //RIGHT ARROW
                this.game.movePieceRight();
                this.updateView();
                break;
            case 40: //DOWN ARROW
                this.stopTimer();
                this.game.movePieceDown();
                this.updateView();
                break;
        }
    }

    handleKeyUp(event) {
        switch (event.keyCode) {
            case 40:
                this.startTimer();
                break;
        }
    }

}