<!--

this template is a template for pagination 
combination of cakephp,underscore tempate
-->

<script type="text/template" id="transaction_item_tmp">

  <td class="item_name"><%= product_name %></td>
  <td class="item_stock_avail"><%= stock_available %></td>
  <td class="unit_price"><%= selling_price %></td>
  <td><input type="number" step="1" min="0" class="item_for_sale quant_sale"></td>
  <td class="cost">0</td>
  <td class="new_stock"></td>
  <td></td>
  <td><a class="inlineIcon preferences iconDelete remove_item" href="#">Remove</a></td>
</script>


