<template>
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a v-on:click="$router.push('/home')" class="navbar-brand clickable">Skills Matrix</a>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li><a v-on:click="$router.push('/employees')" class="clickable">Employees</a></li>
                    <li><a v-on:click="$router.push('/skills')" class="clickable">Skills</a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>
