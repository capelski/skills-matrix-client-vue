<template>
    <div>
        <div class="page-header">
            <div class="row align-bottom">
                <div class="col-xs-6">
                    <h2>Skills</h2>
                </div>
                <div class="col-xs-6 text-right m-bottom-10">
                    <a class="btn btn-primary" href="#">
                        Create
                    </a>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12">
                <p>
                    Suspendisse et metus ligula. Nulla laoreet imperdiet magna, quis egestas sem rhoncus vitae. In non maximus sem, eget accumsan risus. Nam porttitor lorem at purus mollis dictum. Vestibulum eleifend lorem non est consectetur, vel dignissim eros cursus. Aenean magna tortor, fringilla vitae vulputate sit amet, ornare et eros. Vestibulum eget suscipit elit
                </p>
            </div>
        </div>

        <ul>
            <li v-for="skill in skills" v-bind:key="skill.Id">
                {{ skill.Name }}
            </li>
        </ul>

        <button type="button" v-on:click="$router.push('home')">Return to home page</button>
    </div>
</template>

<script>
    import SkillService from '@/services/skill-service';

    export default {
        data () {
            return {
                skills: []
            };
        },
        created() {
            SkillService.getSkills().then(skills => this.skills = skills);
        }
    }
</script>
