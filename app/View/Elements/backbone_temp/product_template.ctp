<!--

this template is a template for a product
-->

<script type="text/template" id="product_tmpl">

<form name="add_product_form" id="add_product_form" class="cmxform" action="">
    <div class='tableWrapper'>
        <div class='tableHeader' style="border: 0px !important;">
            <ul class='tableActions'>
                <li>
                    <label>   Name </label>       
                </li> 
                <li>
                   
                   <input type="text" class="check" required name="product_name" id="product_name"  value="<%= (product.product_name!=null) ? product.product_name : "" %>" />      
                   <input type="hidden" required name="id" id="id"  value="<%= (product.id!=null) ? product.id : "" %>" />      

                </li>
            </ul>  
            <!--
            <ul class='tableActions'>
                <li>
                    <label> Stock Available  </label> 
                </li>
                <li>
                  <input type='text'  class="stock_available check" required name="stock_available" id="stock_available" value="<%= (product.stock_available!=null) ? product.stock_available : "" %>" />   
                </li>
            </ul>
            -->  
            <ul class='tableActions'>
                <li>
                    <label> Quantity/Batch </label> 
                </li>
                <li>
                    <input type='number' min="1" step="1" max="10000000" class="quantity_crate check" required name=quantity_crate" id="quantity_crate"  data-orig="1" value="<%= (product.quantity_crate!=null) ? product.quantity_crate : 1 %>" />      
                </li>
            </ul>
            <ul class='tableActions'>
                <li>
                    <label> Category </label> 
                </li>
                <li>
                                    <select name="category_product" id="category_product">
                <%     for (var i=0;i < cat_data.length;i++){               %>
                            <option value="<%= cat_data[i].id %>"><%= cat_data[i].long_name  %></option>   
				<% } %>	
									</select>
                </li>
            </ul>
            <ul class='tableActions'>
                <li>
                    <label> Cost Price </label> 
                </li>
                <li>
                    <input type='number' min="0" step="0.00001" max="10000000" class="cost_price check" required name="cost_price" id="cost_price" data-orig="0.00" value="<%= (product.cost_price!=null) ? product.cost_price : "0.00" %>" />      
                </li>
            </ul>


            <ul class='tableActions'>
                <li>
                    <label> Selling Price </label> 
                </li>
                <li>
                    <input  type='number' min="0" step="0.00001" max="10000000" class='selling_price check'  required name="" id="selling_price" data-orig="0.00" value="<%= (product.selling_price!=null) ? product.selling_price : "0.00" %>" />      
                </li>
            </ul>


            <ul class='tableActions'>
                <li>
                    <label> Minimum Stock  </label> 
                </li>
                <li>
                    <input  type='number' min="1" step="1" max="10000000" class='min_stock_notif check'  required name="min_stock_notif" id="min_stock_notif" data-orig="0.00" value="<%= (product.min_stock_notif!=null) ? product.min_stock_notif : "0.00" %>" />      
                </li>
            </ul>

            <ul class='tableActions'>
                <li>
                    <label> Maximum Stock  </label> 
                </li>
                <li>
                    <input  type='number' min="1" step="1" max="10000000" class='max_stock_notif check'  required name="max_stock_notif" id="max_stock_notif" data-orig="0.00" value="<%= (product.max_stock_notif!=null) ? product.max_stock_notif : "0.00" %>" />      
                </li>
            </ul>
            <ul class='tableActions'>
                <li>
                </li>
                <li>
                </li>
                <li>
                </li>
            </ul>
            <ul class='tableActions'>
                <li>
                    <label>  </label> 
                </li>
                <li>
                </li>
            </ul>
            <div class='clear'></div>
            <div class='corner left'></div>
            <div class='corner right'></div>
        </div>

    </div>

</form>


</script>
