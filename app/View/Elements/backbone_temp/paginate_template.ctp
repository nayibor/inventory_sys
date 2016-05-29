

<script type="text/template" id="paginate_tmpl">
   
   <%   if(paginate.page==1 && !paginate.prevPage)  {    %>
    
    <span class="pglink"><< previous </span>
    <span class="pglink"><a href="<%= url+"?page="+(paginate.page+1)+"&"+query %>">next >></a></span>
    <span class="pglink"><a href="<%= url+"?page="+(paginate.pageCount)+"&"+query %>" rel="last">last ></a></span>
  
  <%    }else if(paginate.page > 1 && paginate.page < paginate.pageCount){    %>
   
    <span class="pglink"><a href="<%= url+"?page=1"+"&"+query %>">< first</a></span>
    <span class="pglink"><a href="<%= url+"?page="+(paginate.page-1)+"&"+query %>" rel="previous"><< previous</a></span>
    <span class="pglink"><a href="<%= url+"?page="+(paginate.page+1)+"&"+query %>" rel="next">next >></a></span>
    <span class="pglink"><a href="<%= url+"?page="+paginate.pageCount+"&"+query %>" rel="last">last ></a></span>

  <%    }else if(paginate.page==paginate.pageCount && !paginate.nextPage){    %>
   
    <span class="pglink"><a href="<%= url+"?"+query %>">< first</a></span>
    <span class="pglink"><a href="<%= url+"?page="+(paginate.page-1)+"&"+query %>"><< previous</a></span>
    <span class="pglink">next ></span>  
  <%   }					   %>
</script>
