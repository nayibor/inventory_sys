
/***
 * 
 * 
 * 
 **/



var backbone_stuff={
	
	list_url:$("#product_list_back").val(),

	//this is the initialization for the backbone object
	 init:function(){
	
	 _this=this;
	 _this.backbone_product_mod_init();
	
	 }, 
			
	 backbone_product_mod_init:function(){
			
	 _this=this;		
	 var ProductModel = Backbone.Model.extend({
	 defaults: {
	 id: null,
	 product_name: null,
	 stock_available: null
     }
     });
		
	 var ProductsCollection = Backbone.Collection.extend({
     url: _this.list_url,
     model: ProductModel,
     parse: function(data) {
     return data.products;
     }
	 });		
	
	 var product_list = new ProductsCollection();

     product_list.fetch().then(function() {
	 console.log(product_list.length); // >> length: 1
	 console.log(product_list.get(59));
	 });
	 	
	}
};


$(document).ready(function(){

	backbone_stuff.init();

});
