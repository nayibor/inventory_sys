<!--
   sales_sub_template.ctp
   
   Copyright 2016 Nuku <nuku@zenpalace>
   
   This program is free software; you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation; either version 2 of the License, or
   (at your option) any later version.
   
   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.
   
   You should have received a copy of the GNU General Public License
   along with this program; if not, write to the Free Software
   Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
   MA 02110-1301, USA.
   
   
-->

<script type="text/template" id="amt_tmpl">
<td></td>
<td></td>
<td style="font-weight: bold;">AMOUNT PAID</td>
<td><input type="number" step="0.00001" min="0" class="amount_paid_in" value="<%= amount_paid %>"></td>
<td class="amount_paid"></td>
<td>AMOUNT DUE</td>
<td></td>
<td class="amount_due_for_sale"><%= amount_due_for_sale %></td>
</script>
