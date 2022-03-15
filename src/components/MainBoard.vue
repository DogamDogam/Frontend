<template>
    <div id="mainboard">
        <b-container class="body">
            <b-row id="header-page" cols="2">
                <b-cow >
                    <button>sort</button>
                </b-cow>
                <b-cow style="text-align: right">
                    <button>write post</button>
                    <button>dearling list</button>
                    <button>login</button>
                </b-cow>
            </b-row>
            <b-row id="main-page" cols="2">
                <b-cow >
                    post list
                </b-cow>
                <b-cow>
                    <view-post></view-post>
                </b-cow>
            </b-row>
        </b-container>
    </div>
</template>

<style scoped>
.body {
    max-width: 100%;
}
#header-page b-cow {
    padding: 0;
    background: aquamarine;
}
#main-page b-cow {
    padding: 0;
    background: pink;
}
</style>
