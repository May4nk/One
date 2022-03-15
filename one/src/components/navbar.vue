<script>

</script>

<template>
<header>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class='container'>
        <router-link to='/'><img src= '../assets/jolly.ico' class='pics'></router-link>
        <div class='nav-title'> ne </div>
        <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item text-primary">
                <a class="nav-link">Go wild!</a>
            </li>
            <li class="nav-item">
                <router-link to='/events' class='nav-link'>Future</router-link>
            </li>
            <li class="nav-item">
                <a class="nav-link">Link</a>
            </li>
        </ul>
    </div>
    <div class='signin'>
        <router-link to='/space'><img src= '../assets/jolly.ico' class='sign-img'></router-link>
    </div>
</nav>
<hr class='container hr bg-info'/>
</header>
<body>
    <router-view/>
</body>
</template>

<style scoped>
@import '../assets/navbar.css';
</style>



