// Products CRUD Operations
// C - Create, R - Read, U - Update, D - Delete
export const productOperations={
    pizzas:[],
addInCart(pizzaId){
    /*
    
    Imperative Code
    for(var i=0;i<this.pizzas.length;i++){
        if(this.pizzas[i].id==pizzaId){
            return this.pizzas[i];
        }
    }
     */
    // Declrative Code
    // const pizza=this.pizzas.find(function(currentPizza){
    //    return currentPizza.id=pizzaId;
    // })
    const pizza=this.pizzas.find(currentPizza=>currentPizza.id==pizzaId);
    pizza.isInCart=true;
    console.log(this.pizzas);
},
removeFromCart(){

},
viewAll(){
    return this.pizzas.filter(pizza=>pizza.isInCart)
},
totalCompute(){

}
}
export default productOperations;