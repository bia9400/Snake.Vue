
new Vue({
    el: "#app",
    data: {
        positionX: 0,
        positionY: 0,
        snakeArray: [{
            x: 0,
            y: 0
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
        bonusBall: "",
        control: false,
        catched: false,
        score: 0,
        difficolta: 0,
        difficultyPoints: 0,
        record: 0,
        counterBonusBall: 0,
    },
    methods: {
        resetPosition() {
            this.positionX = 0
            this.positionY = 0
            this.counterBonusBall = 0
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
                    this.snakeArrayPush()
                    console.log(this.snakeArray);

                    return true

                }
            }
        },
        snakeArrayPush() {
            this.snakeArray.push({
                x: this.positionX,
                y: this.positionY
            })
            /* Se tolgo i commenti e rimuovo il push sopra, riesco ad attaccare più quadratini al serpente, ma non avendo dato al V-for la posizione
                del nuovo array come coordinate, questo li attacchera in modo sbagliato...per capire meglio togliere il commento ed eliminare il push sopra */
            /* setTimeout(() => {
                this.snakeArray.push({
                    x: this.positionX,
                    y: this.positionY
                })
            }, 1); */

        },
        setRedall() {
            this.bonusBall = "background-color:red;"
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
                    this.counterBonusBall++
                    this.score += this.difficultyPoints;
                    if (this.counterBonusBall == 10) {

                        this.setRedall()

                    }
                    else if (this.counterBonusBall == 11) {
                        this.score += 80
                        this.counterBonusBall = 0
                        this.bonusBall = ""
                    }
                    else {
                        this.bonusBall = ""
                    }
                }

            }, 1);


        }
    },
    created() {
        window.addEventListener('keydown', this.snakeMovements)
    }

})