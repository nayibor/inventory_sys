
/***
 * 
 * 
 * 
 **/



var backbone_stuff={
	
	 list_url:$("#product_list_back").val(),
	 archive_status:$("#search_prod").val(),
	 search_value:$("#search_prod").val(),
	 prod_diag:$("#product-diag"),
	//this is the initialization for the backbone object
	 init:function(){
	
	 _this=this;
	 _this.configure_prod_diag();
	 _this.backbone_product_mod_init();
	
	 }, 
	 default_ajax:{wait:true,
	 beforeSend(){
     settings.disable_okbutt_mgdialg() ;
     settings.show_message("Retrieving Details..."); 
	 },
     error:function(collection,response,options){
	 settings.enable_okbutt_mgdialg();
	 settings.show_message("Error<br>"+"Please Try Again");	
	 },
     success:function(collections,response,options){
		  settings.close_message_diag();
          settings.enable_okbutt_mgdialg();
		}
		},
	 
	 //callback will have to be created which will be used for setting up the cancel and save functionality 
	 dialog_save_action:function(){
		
		 
		},
	 
	 configure_prod_diag:function(){
		 _this=this ;
		
		var diag = $(_this.prod_diag);
        diag.dialog({
			 autoOpen: false,
              title:"Add/Edit Product",
              width: 500,
              height: 300,
              closeOnEscape: false,
			modal: true,
			 buttons: {
                    "Cancel": function() {
                        $( this ).dialog( "close" );

                    },
                    "Save": function() {
	    			
	    		backbone_stuff.dialog_save_action();	
	    				
                    }
               
                }});
        diag.dialog('close');
                
	 },	
			
	 backbone_product_mod_init:function(){
		
	 _this_back=this;	
	 
	 
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
	 user_id:null,
	 cost_price:null,
	 selling_price:null,
	 min_stock_notif:null,
	 max_stock_notif:null,
	 stock_available:0,
	 archive_status:0
     }
     });
	   
	//for setting up the categories model which will be used  to load up category information which can be used 
   // for setting up a edit/empty model for stuff to be done 
	 var CatModel = Backbone.Model.extend({
	  defaults:{ 
	    id:null,	
	    long_name:null
		}	
		});
	 
	
	 //for basic collection extends  object with meta facilities
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
	   	
	   	
	  //for categories collection object
	 var CatCollection = MetaCollection.extend({
	  url:$("#product_cat").val(),
     model: CatModel,
     initialize: function() {
		 
	 },
      parse: function(data) {
	 this.meta('pagination',(data.pagination) ? data.pagination : {});
    
     return data.cat_list;
     }	 });
	  
	   	
	 //for collection object for product	
	 var ProductsCollection = MetaCollection.extend({
     url: _this_back.list_url,
     model: ProductModel,
     initialize: function() {
		 
	 },
     parse: function(data) {
	 this.meta('pagination',(data.pagination) ? data.pagination : {});
    
     return data.products;
     }
	 });		
	
	
	 //view for product_add item
	//accepts a product model as an input model
	
	 var ProductView= Backbone.View.extend({
	 tagname:'div',
	 id:'product_div',
	 model:ProductModel,
	 template: _.template($('#product_tmpl').html()),
	 
	 initialize:function(){
	 _this_prod_view=this;
	 backbone_stuff.dialog_save_action=function(){
	_this_prod_view.SaveProduct();
	 }; 
	 },
	 events: {

	 },
	 render:function(){	 
	 var pass_data={
	 product:this.model.toJSON(),
	 cat_data:catData.toJSON()
	 };
	 	 
     var html = this.template(pass_data);
     this.$el.html(html);
     return this;
	 },
	 
	 //this is used for performing validation before the model is saved
	 //this is for saving a product and adding it to the collection object
     SaveProduct:function(event){
	 _this_prod_view=this;
	  counter=0;	 
	  $(".check").each(function(){
      
            if(!(document.getElementById($(this).attr("id")).checkValidity()) ){
            $(this).css("border","solid #F44 2px"); 
            _this_prod_view.model.set($(this).attr("name"),'');
            counter++;
            }else
            {
            $(this).css("border","solid grey 1px");  
            _this_prod_view.model.set($(this).attr("name"),$(this).val());    
                     
			}
      })	;
      
      if(counter==0)
      {
	 product_list.create(_this_prod_view.model.toJSON(),
		{wait:true,
	 beforeSend(){
     settings.disable_okbutt_mgdialg() ;
     settings.show_message("Saving Data..."); 
	 },
     error:function(collection,response,options){
	 settings.enable_okbutt_mgdialg();
	 settings.show_message("Error<br>"+"Please Try Again");	
	 },
     success:function(collections,response,options){
		  settings.close_message_diag();
          settings.enable_okbutt_mgdialg();
          $(backbone_stuff.prod_diag).dialog('close');
          product_list.fetch();        
	 }});  		  
	 }  
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
	 //console.log(pass_data);
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
     'click .iconlock': 'onArch',
     'click .iconopen': 'onArch',
     'click .edit_prod': 'onEdit'

	 },
	 
	 render: function() {
		 
     var html = this.template(this.model.toJSON());
     this.$el.html(html);
     return this;
	 },
	 
	 onEdit:   function(event){
	 event.preventDefault();
	 var $product_data = $('#product-diag').empty();
	 this.model.fetch({wait:true,
	 beforeSend(){
     settings.disable_okbutt_mgdialg() ;
     settings.show_message("Retrieving Details..."); 
	 },
     error:function(model_data,response,options){
	 settings.enable_okbutt_mgdialg();
	 settings.show_message("Error<br>"+"Please Try Again");	
	 },
     success:function(model_data,response,options){
		  settings.close_message_diag();
          settings.enable_okbutt_mgdialg();
          var product_edit = new ProductView({model:model_data});
          $product_data.append(product_edit.render().$el);
          $(backbone_stuff.prod_diag).dialog('open');
          
		}
		}); 
	 },
	 
	 onArch:function(event){
		 
     console.log(this.model.get('archive_status'));
		 
	 },
	 
	 onRemove: function(event) {
		 
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


	 list_view_table:$('#table_info_tbody'),
	 list_paginate_view:$('#page_outer_div'),
	 

     initialize: function() {
	 _this_list=this;
     
     this.listenTo(this.collection, 'sync', this.render);
     //this.listenTo(this.collection, 'add', this.addOne);
     this.listenTo(this.collection, 'request', this.request_event);
     this.listenTo(this.collection, 'error', this.error_event);
     
     //this.listenTo(this.collection, 'add', this.addOne);
    
     
	 },
	 
	 request_event:function(){
	 
	 console.log("request_event fired");	 
     },
     
     error_event:function(){
	 
	 console.log("error event fired");	 
     },
	 
	 render: function(event) {
	 
	 console.log("sync event fired");
	 
	 
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
     'click #add_prod'   : 'onCreateDiag',
     'click .tran_type'  : 'setupTransaction',
     'keyup #search_prod': 'searchKey',
     'click #search_butt': 'otherSearch',
     'click span.pglink a' : 'onPage'

     },
     
     addOne:function(model_data){
	 
	 console.log("add event fired");
	 model_data.set('class_name',"odd");
     var item = new ProductsItemView({model: model_data});
     this.list_view_table.append(item.render().$el);
	 return true ; 
	 },
     
     searchPage:function(url){
		  
	 var val = $("#search_prod").val();
     var archive_status=$("#enable_archive_status").val();
     var query_string=val!="" ? "filter="+val+"&arch_stat="+archive_status : "filter=null"+"&arch_stat="+archive_status;	
   	 url_send=url+"?"+query_string;
	 console.log(url_send);
	 //this.collection.url=url_send;
	 this.collection.fetch({wait:true,
	 url:url_send,
	 beforeSend(){
     settings.disable_okbutt_mgdialg() ;
     settings.show_message("Retrieving Details..."); 
	 },
     error:function(collection,response,options){
	 settings.enable_okbutt_mgdialg();
	 settings.show_message("Error<br>"+"Please Try Again");	
	 
	 },
     success:function(collections,response,options){
		  settings.close_message_diag();
          settings.enable_okbutt_mgdialg();
		}
		});	 
	 },
	 
	 searchKey:function(event){
	 event.preventDefault();
            if(event.which==13){
	 this.searchPage(this.collection.url);
	 }
	 },
	 
     onPage:function(event){
	 event.preventDefault();
	 //console.log(event.currentTarget);
     this.searchPage(event.currentTarget.href);
	 },
	 
	 otherSearch:function(event){
     event.preventDefault();
	 this.searchPage(this.collection.url);
	 },
	 
     setupTransaction:function(evt){
		/**add_prod,add_sales,add_recv,add_inv,add_revr**/
		console.log(evt);
		
     },
    
    
     //supposed to load a new cateogry object and then use it as 
    //input for creating the add/edit product template
    onCreateDiag: function(event) {
		
	event.preventDefault();
    var $product = $('#product-diag').empty();
	catData.fetch(
	{wait:true,
	 beforeSend:function(){
     settings.disable_okbutt_mgdialg() ;
     settings.show_message("Retrieving Details..."); 
	 },
     error:function(model,response,options){
	 settings.enable_okbutt_mgdialg();
	 settings.show_message("Error<br>"+"Please Try Again");	
	 },
     success:function(model,response,options){
		  settings.close_message_diag();
          settings.enable_okbutt_mgdialg();
          var product = new ProductView({model:new ProductModel()});
          $product.append(product.render().$el);
          $(backbone_stuff.prod_diag).dialog('open');
          
	}
	}
	);
   
	}
	});
	
	//for creating instance of collection object and view object
   // use reset instead of fetch for bootstraping
   // cat data is also created but not instantiated
	 var catData=new CatCollection();
	 var product_list = new ProductsCollection();
	 var productView = new ProductListView({collection: product_list});
	 product_list.fetch(backbone_stuff.default_ajax);
	 //product_list.reset(<%= @product_list.to_json %>);


 
}
}


$(document).ready(function(){

	backbone_stuff.init();

});
