var app = new Vue({
    el: '#app',
    data: {
        isGaming: false,
        quizzes: quizzes,
        questionNumber: 0,
        timeLimit: settings.timeLimit,
        playerPosition: {"x": 0.0, "z": 0.0},
        sectionStatus: [false, false, false, false],
        judgmentResult: "-"
    },
    methods: {
        startGame() {
            this.isGaming = true
            this.startTimer()
        },
        startTimer() {
            const self = this
            const interval = setInterval(function() {
                if (self.timeLimit === 0) {
                    clearInterval(interval)
                    setTimeout(self.checkResult(), settings.switchingTimeFromTimeLimit * 1000)
                } else {
                    self.timeLimit -= 1
                }
            }, 1000);
        },
        checkResult() {
            const self = this
            if (this.changePositionToSection() == this.quizzes[this.questionNumber].correct){
                this.judgmentResult = "◯"
            } else {
                this.judgmentResult = "×"
            }
            
            setTimeout(function() {
                self.judgmentResult = "-"
                self.timeLimit = settings.timeLimit
                self.questionNumber += 1
                if (self.questionNumber < self.quizzes.length) {
                    self.startTimer()
                } else {
                    self.isGaming = false
                    self.questionNumber = 0
                }
            }, settings.switchingTimeFromCheckAnswer * 1000)
        },
        checkCurrentSectionOfPlayer() {
            const currentSectionOfPlayer = this.changePositionToSection()
            if (currentSectionOfPlayer == 0) {
                this.sectionStatus = [true, false, false, false]
            } else if (currentSectionOfPlayer == 1) {
                this.sectionStatus = [false, true, false, false]
            } else if (currentSectionOfPlayer == 2) {
                this.sectionStatus = [false, false, true, false]
            } else if (currentSectionOfPlayer == 3) {
                this.sectionStatus = [false, false, false, true]
            } else {
                this.sectionStatus = [false, false, false, false]
            } 
        },
        changePositionToSection() {
            let  currentSectionOfPlayer = -1
            const xLength = settings.width
            const zLength = settings.height
            const　boundary1 = {
                "x": [0.0 + settings.widthAdjustValue, xLength / 2.0 + settings.widthAdjustValue], 
                "z": [-1.0 * zLength / 2.0 - settings.heightAdjustValue, 0.0 - settings.heightAdjustValue]
                }
            const　boundary2 = {
                "x": [-1.0 * xLength / 2.0 + settings.widthAdjustValue, 0.0 + settings.widthAdjustValue],
                "z": [-1.0 * zLength / 2.0 - settings.heightAdjustValue, 0.0 - settings.heightAdjustValue]
            }
            const　boundary3 = {
                "x": [0.0 + settings.widthAdjustValue, xLength / 2.0 + settings.widthAdjustValue], 
                "z": [-1.0 * zLength - settings.heightAdjustValue, -1.0 * zLength / 2.0 - settings.heightAdjustValue]
                }
            const　boundary4 = {
                "x": [-1.0 * xLength / 2.0 + settings.widthAdjustValue, 0.0 + settings.widthAdjustValue],
                "z": [-1.0 * zLength - settings.heightAdjustValue, -1.0 * zLength / 2.0 - settings.heightAdjustValue]
            }
            if (boundary1.x[0] < this.playerPosition.x && this.playerPosition.x < boundary1.x[1]) {
                if (boundary1.z[0] < this.playerPosition.z && this.playerPosition.z < boundary1.z[1]) {
                    currentSectionOfPlayer = 0
                } else  if (boundary3.z[0] < this.playerPosition.z && this.playerPosition.z < boundary3.z[1]) {
                    currentSectionOfPlayer = 2
                }                
            } else if (boundary2.x[0] < this.playerPosition.x && this.playerPosition.x < boundary2.x[1]) {
                if (boundary2.z[0] < this.playerPosition.z && this.playerPosition.z < boundary2.z[1]) {
                    currentSectionOfPlayer = 1
                } else  if (boundary4.z[0] < this.playerPosition.z && this.playerPosition.z < boundary4.z[1]) {
                    currentSectionOfPlayer = 3
                }                
            }
            return currentSectionOfPlayer
        }
    },
    computed: {
        choiceColor1(){
            return {
                choiceon: this.sectionStatus[0],
                choiceoff: !this.sectionStatus[0]
            }
        },
        choiceColor2(){
            return {
                choiceon: this.sectionStatus[1],
                choiceoff: !this.sectionStatus[1]
            }
        },
        choiceColor3(){
            return {
                choiceon: this.sectionStatus[2],
                choiceoff: !this.sectionStatus[2]
            }
        },
        choiceColor4(){
            return {
                choiceon: this.sectionStatus[3],
                choiceoff: !this.sectionStatus[3]
            }
        }
    },
    mounted: function() {
        const webSocket = new WebSocket('ws://127.0.0.1:5000')
        webSocket.addEventListener('open', _ => {
            console.log('WebSocket connected!')
        })
            
        webSocket.addEventListener('message', event => {
            const jsonData = JSON.parse(event.data)
            if (jsonData.sensordata.bodyTracking !== null && jsonData.sensordata.bodyTracking !== undefined) {
                const bodyTrackings = Object.values(jsonData.sensordata.bodyTracking.root)
                this.playerPosition.x = bodyTrackings[0]
                this.playerPosition.z = bodyTrackings[2]
                this.checkCurrentSectionOfPlayer()       
            }
        })
    }
});