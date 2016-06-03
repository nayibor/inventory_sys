
<script type="text/template" id="prod_tmpl">
<td><%= product_name %></td>
<td><%= stock_available %></td>
<td><%= quantity_crate %></td>
<td>0</td>
<td>0</td>
<td><%= min_stock_notif %></td>
<td><%= max_stock_notif %></td>
<td><%= category %></td>
<td><%= cost_price  %></td>
<td><%= selling_price  %></td>
<td>
<ul class="rowActions">
<li><a href="#" class="inlineIcon preferences edit_prod">Edit</a></li>
<%   if (archive_status == "0") { %>
<li><a href="#" class="inlineIcon preferences iconlock">Archive</a></li>
<% } else if (archive_status == "1") { %>
<li><a href="#" class="inlineIcon preferences iconopen">UnArchive</a></li>
<% } %>

</ul>
</td>
<td></td>
<td></td> 
<td></td>
</script>


