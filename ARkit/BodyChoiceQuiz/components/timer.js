Vue.component('timer', {
    props: ['timelimit'],
    template: `
        <div class="timer">{{ timelimit }}</div>
    `
})