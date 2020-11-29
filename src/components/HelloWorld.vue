<template>
  <div class="hello">
    
    <h1>{{showOverView?"Overview":'Upcoming'}}</h1>
    <h1> https://objective-feynman-9ea09d.netlify.app/</h1>
    <button class='button' @click="showOverView = !showOverView"> Toggle</button>
    <div class="wrapper">
      <a :href="recipe.link" v-for="recipe in todayR" :key="recipe.name"  :style="{backgroundImage:`url(${recipe.img})`}" class="recipe">
       {{recipe.date.format("DD.MM.")}}   {{recipe.name}}
       <!-- <img v-if="recipe.img" :src="recipe.img" alt="This is food"> -->
      </a>
    </div>
  </div>
</template>
      
<script>
import moment from 'moment';
export default {
  name: 'HelloWorld',
  data() {
    return {
      recipes: [],
      showOverView:false,
    }
  },
  computed: {
    todayR(){
      return this.recipes.filter(element=>{
      return this.showOverView || element.date.isSameOrAfter(moment().startOf('day'))
      })
    }

  },

  methods: {
  },
  async mounted() {
    const response = await fetch("https://spreadsheets.google.com/feeds/list/1uPnaG4tQiDQ07f8_yPKIOlU1v2BquKOmzKabP1Adh-Y/1/public/values?alt=json")
  var data = await response.json()
  data.feed.entry.forEach(element => {
    console.log(element)
    var matches = element.gsx$link.$t.match(/rezepte\/(\d+)/)
    if(matches){
      var recipeid = matches[1]
      // console.log(element.gsx$name.$t)
      this.recipes.push({
        name:element.gsx$name.$t,
        link:element.gsx$link.$t, 
        date:moment(element.gsx$date.$t, "DD.MM.YYYY"),
        img:element.gsx$bild.$t?`https://img.chefkoch-cdn.de/rezepte/${recipeid}/bilder/${element.gsx$bild.$t}/crop-600x400/ueberbackene-putenschnitzel-nach-suedtiroler-art.jpg`:''
      })
    }
  });
    
  },
}
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(1fr, 2fr));
  max-width: 1000px;
  margin: 0 auto;
}
.recipe {
  background: papayawhip;
  border-radius: 30%;
  border: 2px solid rgb(255, 255, 255);
  padding: 20px;
  box-shadow: 1px 1px 1px #000;
  text-shadow: 3px 3px #000000;
  text-decoration: none;
  color: white;
  font-size: 5vw;
  font-weight: bold;
  min-height: 500px;
  padding-top: 100px;
  background-size: cover;
  /* animation:flashyshit 10s infinite ease-in-out */
  
}

.recipe img {
  width: 100%;
  
}
button {
  margin-bottom: 30px;
  width: 350px;
  height: 60px;
  border: 1px solid black;
  border-radius: 5px;
  background: gray;
  font-weight: bold;
  font-size: 2.5em;
  color: rgb(0, 0, 0);
  box-shadow: 0 6px 6px #06f;
  outline:none;
}
button:active {
  /* set time duration to your needs */
  animation: gradient 6000ms;
  background: #f88;
  color: #fff;
  box-shadow: none;
}
/* 
@keyframes flashyshit{
    0%{  transform: rotate(0deg) rotateY(0deg) rotateZ(0deg) scale(1)  }
    33%{transform: rotate(90deg) rotateY(89deg) rotateZ(90deg) scale(2.827); border-color: hotpink; } 
    66%{transform: rotate(180deg) rotateY(-179deg) rotateZ(180deg) scale(.10); border-color: rgb(0, 174, 255);} 
    100%{  transform: rotate(360deg) rotateY(359deg) rotateX(-360deg) scale(1)}

} */



</style>