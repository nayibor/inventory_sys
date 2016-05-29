
/***
 * 
 * 
 * 
 **/



var backbone_stuff={
	
	 list_url:$("#product_list_back").val(),
	 archive_status:$("#search_prod").val(),
	 search_value:$("#search_prod").val(),
	//this is the initialization for the backbone object
	 init:function(){
	
	 _this=this;
	 _this.backbone_product_mod_init();
	
	 }, 
	 
			
	 backbone_product_mod_init:function(){
		
	 _this=this;	
	 
	 
	 //for settting up pagination model to pass around paging data
	 var PageModel = Backbone.Model.extend({
	 defaults: {
     query :null,
	 pagination: null,
	 url:_this.list_url
     }
     });
	 
	 //for setting up the basic product model stuff	
	 var ProductModel = Backbone.Model.extend({
	 defaults: {
     id:null,
	 product_name: null,
	 user_id:null
     }
     });
	   
	
	 //for basic collection object with meta facilities
	 var MetaCollection = Backbone.Collection.extend({
     _meta:[],
     parse: function(data) {
	 },
     meta: function(prop, value) {
        if (value === undefined) {
            return this._meta[prop]
        } else {
            this._meta[prop] = value;
        }
     }
	 });
	   	
	   	
	 //for collection object	
	 var ProductsCollection = MetaCollection.extend({
     url: _this.list_url,
     model: ProductModel,
     initialize: function() {
		 
	 this.on('page_data',this.reload_data);	 
	 },
     parse: function(data) {
	 this.meta('pagination',(data.pagination) ? data.pagination : {});
     this.meta('orig_url',_this.list_url);	
     return data.products;
     },
     reload_data:function(event){
	 alert("going crazy.!!"+event);
	 }
	 });		
	
	
	//view for pagination item
    
     var PaginateView= Backbone.View.extend({
	 tagname:'div',
	 id:'page_div',
	 model:PageModel,
	 template: _.template($('#paginate_tmpl').html()),
	 
	 render:function(){	 
		 	 
	 var pass_data={
	 query:this.model.get('query'),
	 url:this.model.get('url'),
	 paginate:this.model.get('pagination')
	 };
	 console.log(pass_data);
     var html = this.template(pass_data);
     this.$el.html(html);
     return this;
	 }
	 });
	
	
	//view for a single product_list_item
	 var ProductsItemView = Backbone.View.extend({
     tagName: 'tr',
     id:function(){return this.model.get( 'id')},
     className :function(){ return this.model.get( 'class_name')},
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
	 console.log("rendering");
	 _this_list=this;	
     var $list = this.$('#table_info_tbody').empty();
     var $page = this.$('#page_outer_div').empty();
     var i = 2 ; 
     this.collection.each(function(model_data) {
     model_data.set('class_name',(i%2==0) ? "even" :"odd");
     var item = new ProductsItemView({model: model_data});
     $list.append(item.render().$el);
     i++;
     }, this);
	
	 var val = $("#search_prod").val();
     var archive_status=$("#enable_archive_status").val();
     var query_string=val!="" ? "filter="+val+"&arch_stat="+archive_status : "filter=null"+"&arch_stat="+archive_status;
	 var page = new PaginateView({model:new PageModel({
	 query:query_string,
	 pagination:_this_list.collection.meta('pagination')})});
	 $page.append(page.render().$el);
     return this;
    
     },
    
     events: {
     'click #add_prod'   : 'onCreate',
     'click .tran_type'  : 'setupTransaction',
     'keyup #search_prod': 'searchKey',
     'click #search_butt': 'otherSearch',
     'click span.pglink a' : 'onPage'	 

     },
     
     searchPage:function(url){
		 
	 this.collection.url=url;
	 this.collection.fetch({wait:true,
     error:function(model,response,options){
		 console.log("error");
		 console.log(response.data);
		 },
     success:function(model,response,options){
        //pagination=(response.pagination) ? response.pagination : {};
		//console.log(this.pagination);
		}
		});	 
	 },
	 
	 searchKey:function(event){
	 event.preventDefault();
            if(event.which==13){
	 var val = $("#search_prod").val();
     var archive_status=$("#enable_archive_status").val();
     var query_string=val!="" ? "filter="+val+"&arch_stat="+archive_status : "filter=null"+"&arch_stat="+archive_status;	
     this.searchPage(this.collection.meta('orig_url')+"?"+query_string);
	 }
	 },
	 
     onPage:function(event){
	 event.preventDefault();
	 //console.log(event.currentTarget);
     this.searchPage(event.currentTarget.href);
	 },
	 
	 otherSearch:function(event){
     event.preventDefault();
	 var val = $("#search_prod").val();
     var archive_status=$("#enable_archive_status").val();
     var query_string=val!="" ? "filter="+val+"&arch_stat="+archive_status : "filter=null"+"&arch_stat="+archive_status;	
     this.searchPage(this.collection.meta('orig_url')+"?"+query_string);
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
	 product_list.fetch({wait:true,
     error:function(model,response,options){
		 console.log("error");
		 console.log(response.data);
		 },
     success:function(model,response,options){
        //pagination=(response.pagination) ? response.pagination : {};
		//console.log(this.pagination);
		}
		});
	 //product_list.reset(<%= @product_list.to_json %>);


 
}
}


$(document).ready(function(){

	backbone_stuff.init();

});
