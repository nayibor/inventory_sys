<!--

this template is a template for the main transaction template 
combination of cakephp,underscore tempate
-->

<script type="text/template" id="transaction_template">
   
<form name="add_sales_form" id="add_sales_form" class="cmxform" action="">
    <div class='tableWrapper' style="width: 100% !important;">
        <div class='tableHeader' style="border: 0px !important;">


            <ul class="tableActions ul_chz">
                <li>
                    <select placeholder="Please Select An Item" name="search_item" id="search_item" data-placeholder="Search  Item/s ..." style="display:none;" class="chosen-select"  tabindex="-1"> 
                        <option></option> 
                        <% for(var i=0;i<products.length;i++){ %>
                            <option
                                data-stock="<%= products[i].stock_available %>"
                                data-unit_price="<%= products[i].selling_price %>"
                                data-name="<%= products[i].product_name %>"
                                value="<%= products[i].id %>"
                                >
                                <%= products[i].product_name+" ("+products[i].stock_available+" )" %>
                            </option>
                        <% } %>
                    </select>
                </li>
            </ul>

            <ul class='tableActions'>

            </ul>

            <ul class="tableActions ul_chz sp_ul">
                <li >
                    <select placeholder="Please Select Supplier" id="supplier" name="supplier" data-placeholder="Please Select Supplier ..." style="display:none;" class="chosen-select"  tabindex="-1">         
						<option></option>
						<option value="0">Other</option>  
						<% for(var i=0;i<suppliers.length;i++){ %>                   
                        <option value="<%= suppliers[i].id %>"><%= suppliers[i].fname %></option>
                        <% } %>
                    </select>
                </li>

            </ul>


            <ul class="tableActions ul_chz rs_ul">
                <li>
                    <select placeholder="Please Select Reason" id="reverse_reason" name="reverse_reason" data-placeholder="Please Select Reason ..." style="display:none;" class="chosen-select"  tabindex="-1">         
                        <option></option>  
                        <option value="">Other</option>                   
						<% for(var i=0;i<reverse.length;i++){ %>                   
                            <option value="<%= reverse[i].id %>"><%= reverse[i].reason %></option>
                          <% } %>
                    </select>
                </li>

            </ul>


            <ul class='tableActions' style="width: 100%;">


                <div name="sales_info" id="sales_info" style="width: 100%;">
                    <table cellspacing="0" summary="">

                        <thead>
                        <th class="sortup">
                            Item
                        </th>
                        <th class="sortup">
                            Current Stock
                        </th>
                        <th >
                            Unit/Price
                        </th>
                        <th >
                            Quantity 
                        <th >Cost </th>
                        <th >New Stock </th>

                        <th ></th>
                        <th class="sortup"></th>
                        </thead>
                        <tbody>                 
                        </tbody>
                    </table>
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

