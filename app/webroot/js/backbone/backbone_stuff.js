
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
     id:null,
	 product_name: null,
	 user_id:null 
     }
     });
		
	//for collection object	
	 var ProductsCollection = Backbone.Collection.extend({
     url: _this.list_url,
     model: ProductModel,
     parse: function(data) {
     return data.products;
     }
	 });		
	
	
	//for a single product_list_item
	 var ProductsItemView = Backbone.View.extend({
     tagName: 'tr',
     className: 'even',
     template: _.template($('#prod_tmpl').html()),
     
     initialize: function() {
	 
	 this.listenTo(this.model, 'destroy', this.remove);
	 },
	 events: {
     'click .iconlock': 'onRemove',
     'click .edit_prod': 'onEdit'

	 },
	 
	 render: function() {	 
     
     var html = this.template(this.model.toJSON());
     this.$el.html(html);
     return this;
	 },
	 
	 onEdit:   function(evt){
	 },
	 onRemove: function(evt) {
		 
     this.model.destroy(
     /**error:function(model,response,options){
	 console.log("model could not be destroyed successfully");
	 },
     success:function(model,response,options){
	 console.log("model destroyed successfully");
	 }**/
	 );  
     }
	 });
	
	
	// View class for rendering the list of all products
    ////this is for the whole collection of the productlist
	
     var ProductListView = Backbone.View.extend({
	 el: '.tableWrapper',

     initialize: function() {
     
     this.listenTo(this.collection, 'sync', this.render);
	 },

    render: function() {
		
	_this=this;	
    var $list = this.$('#table_info_tbody').empty();
    //i=2;
    this.collection.each(function(model) {
    var item = new ProductsItemView({model: model});
   // item.className=(i%2==0)? "even" : "odd";
    $list.append(item.render().$el);
    i++;
    }, this);

    return this;
    },
    
    events: {
    'click #add_prod': 'onCreate',
    'click .tran_type': 'setupTransaction'
    },


    setupTransaction:function(evt){
		/**add_prod,add_sales,add_recv,add_inv,add_revr**/
		console.log(evt);
		
    },
    
    onCreate: function() {
		
    var $name = "product_name";
    var $user_id = 1;

    if ($name.val()) {
      this.collection.create({
      product_name: $name,
      user_id: $user_id
    });

    $name.val('');
    $job.val('');
    }
	}
	});
	
		

	//for creating instance of collection object and view object
   // use reset instead of fetch for bootstraping
	 var product_list = new ProductsCollection;
	 var productView = new ProductListView({collection: product_list});
	 product_list.fetch();
	 //product_list.reset(<%= @product_list.to_json %>);


  /**for fething data about collection object
     product_list.fetch().then(function() {
	 console.log("oldlenght"+product_list.length); // >> length: 1
	 console.log("sample_name+"+product_list.get(59).get('product_name'));
	 
	 product_list.create({product_name:'fresh_shit',user_id:1},
	 {wait:true,
     error:function(model,response,options){
		 console.log("there was an error during creation");
		 console.log(response.data);
		 },
     success:function(model,response,options){
	     console.log("newlenght"+product_list.length);	 
		}
		}
	 );
	 
	 });
	**/
}
}


$(document).ready(function(){

	backbone_stuff.init();

});
