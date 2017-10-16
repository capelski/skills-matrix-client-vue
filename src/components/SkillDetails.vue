<template>
    <div>
        <div class="page-header">
            <h2 id="skill-page-title">{{ skill.Name }}</h2>
        </div>

        <form class="form-horizontal">

            <div class="form-group no-margin">
                <label for="Name">Name</label>
                <input id="skill-model-name" value="" class="form-control"/>
            </div>

            <h3>Skills</h3>
            <div id="skill-details-skills"></div>
            <div id="skill-details-add-skills"></div>

            <!-- Read actions -->
            <a id="skill-edit-button" class="btn btn-primary" href="#">Edit</a>
            <button id="skill-delete-button" type="button" class="btn btn-danger">Delete</button>

            <!-- Edit actions -->
            <button id="skill-save-button" type="button" class="btn btn-primary">Save</button>
            <a id="skill-cancel-button" class="btn btn-default" href="#">Cancel</a>
        </form>
        
        <hr />
        <button type="button" v-on:click="$router.push('/skills')">Skills list</button>
    </div>
</template>

<script>
    import { getInstance } from '@/service-locator';

    export default {
        data() {
            return {
                skill: {}
            };
        },
        created() {
            this.skillService = getInstance('SkillService');
            this.skillService.getById(this.$route.params.id).then(skill => this.skill = skill);
        }
    }
</script>
