
new Vue({
    el: "#app",
    data: {
        positionX: 0,
        positionY: 0,
        snakeArray: [{
            x: this.positionX,
            y: this.positionY
        }],
        selected: "",
        products: [
            { id: 1, name: 'Easy' },
            { id: 2, name: 'Medium' },
            { id: 3, name: 'Hard' },
            { id: 4, name: "GasGasGaaaaas!!!" }
        ],
        ballRandomX: 150,
        ballRandomY: 200,
        
        control: false,
        catched: false,
        score: 0,
        difficolta: 0,
        difficultyPoints: 0,
        record: 0,
    },
    methods: {
        resetPosition() {
            this.positionX = 0
            this.positionY = 0
        },
        isrecord(value) {
            if (value > this.record) {
                this.record = value
            }
        },
        setdifficulty() {
            if (this.selected.id == 1) {
                this.difficolta = 1.5
                this.difficultyPoints = 10
            }
            else if (this.selected.id == 2) {
                this.difficolta = 2.5
                this.difficultyPoints = 20
            }
            else if (this.selected.id == 3) {
                this.difficolta = 3.5
                this.difficultyPoints = 50
            }
            else if (this.selected.id == 4) {
                this.difficolta = 5
                this.difficultyPoints = 100
            }
            else {
                alert("inserisci una difficoltà")
            }
            this.randomPosition()
        },
        randomPosition() {

            this.ballRandomX = Math.floor(Math.random() * 1480);
            this.ballRandomY = Math.floor(Math.random() * 780);
            console.log(this.ballRandomX, this.ballRandomY);
        },
        isGotcha(ballX, ballY, snakeX, snakeY) {
            if (snakeX <= ballX + 20 && snakeX >= ballX - 20) {
                if (snakeY <= ballY + 20 && snakeY >= ballY - 20) {
                    this.snakeLenght()
                    console.log(this.snakeArray);
                    return true
                }
            }
        },
        snakeLenght() {
            this.snakeArray.push({
                x:this.positionX,
                y:this.positionY
            })

        },

        snakeMovements(event) {
            console.log(this.positionX, this.positionY);

            if (this.control == true) { clearInterval(myIntervall) }

            myIntervall = setInterval(() => {

                if (event.key == "ArrowUp") {

                    if (this.positionY < -3) {
                        this.isrecord(this.score)
                        clearInterval(myIntervall)
                        alert("hai perso")
                        this.resetPosition()

                        this.score = 0;
                    }
                    this.positionY += -this.difficolta

                    this.control = true

                }
                else if (event.key == "ArrowDown") {
                    if (this.positionY >= 770) {
                        this.isrecord(this.score)
                        clearInterval(myIntervall)
                        alert("hai perso")
                        this.resetPosition()
                        this.score = 0;
                    }
                    this.positionY += +this.difficolta
                    this.control = true
                }
                else if (event.key == "ArrowRight") {
                    if (this.positionX >= 1480) {
                        this.isrecord(this.score)
                        clearInterval(myIntervall)
                        alert("hai perso")
                        this.resetPosition()
                        this.score = 0;
                    }
                    this.positionX += +this.difficolta
                    this.control = true

                }
                else if (event.key == "ArrowLeft") {
                    if (this.positionX <= 0) {
                        this.isrecord(this.score)
                        clearInterval(myIntervall)
                        alert("hai perso")
                        this.resetPosition()
                        this.score = 0;
                    }
                    this.positionX += -this.difficolta
                    this.control = true
                }
                if (this.isGotcha(this.ballRandomX, this.ballRandomY, this.positionX, this.positionY)) {
                    this.randomPosition()
                    this.score += this.difficultyPoints;
                }

            }, 1);


        }
    },
    created() {
        window.addEventListener('keydown', this.snakeMovements)
    }

})