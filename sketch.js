var dog,sadDog,happyDog;
var foodObj
var database
var foodS ;
var foodStock
var lastFed;

function preload(){
  sadDog=loadImage("dogImg.png");
  happyDog=loadImage("dogImg1.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.3;

 foodObj= new Food()

feed = createButton("Feed the dog")
feed.position(700,115);
feed.mousePressed(feedDog)

addFood = createButton("Add Food");
addFood.position(850,115);
addFood.mousePressed(addFoods)

readFoodStock()
}

function draw() {
  background(46,139,87);
  

  getTime()

  fill(255,255,254)
  textSize(30);
  textFont("Cambria");
  if(lastFed>=12){
  text("Last Fed : "+ lastFed%12 +"PM", 360,50 )
  } else if (lastFed == 0 ){
    text("Last Fed : 12 AM" , 360 ,50)
  }else{
    text("Last Fed : "+ lastFed + "AM", 360,50 )

  }

  foodObj.display();
  drawSprites();
}

//function to read food Stock
function readFoodStock(){
var readFood = database.ref('Food')
readFood.on("value",(data)=>{
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
})


}

//function to update food stock and last fed time
function getTime(){
  
    var Time  = database.ref('FeedTime')
    Time.on("value",(data)=>{
      lastFed = data.val();
      
    })
}



function feedDog(){
dog.addImage(happyDog);

if(foodObj.getFoodStock() <=0){
foodObj.updateFoodStock(foodObj.getFoodStock()* 0)
}
 else { 
  foodObj.updateFoodStock(foodObj.getFoodStock() - 1)
  
 }
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}



