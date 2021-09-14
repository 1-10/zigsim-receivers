Vue.component('choices', {
    props: ['choice1', 'choice2', 'choice3', 'choice4', 'color1', 'color2', 'color3', 'color4'],
    template: `
        <div class="choices">
            <div v-bind:class="color1">{{ choice1 }}</div>
            <div v-bind:class="color2">{{ choice2 }}</div>
            <div v-bind:class="color3">{{ choice3 }}</div>
            <div v-bind:class="color4">{{ choice4 }}</div>
        </div>
    `
})