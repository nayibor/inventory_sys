<table cellspacing='0' summary=''>
    <thead>
        <tr>

            <th class="sortup">
                Name
            </th>
            <th class="sortup">
                Email
            </th>
            <th  >
                Phone
            </th>
            <th  >
                Fax
            </th>
            <th> City</th>
            <th> Status</th>


            <th > </th>
            <th  >

            </th>
  <th></th>  
  <th></th>
            <th class='last alignRight'>

            </th>
        </tr>
    </thead>



    <tbody>
        <?php
        $row_color = 0;
        foreach ($sites as $val) {
            ?>

            <tr 
                name="<?php echo $val['Site']['site_name'] ?>"
                id="<?php echo $val['Site']['id'] ?>" 
                class='<?php echo ($row_color % 2 == 0) ? "even" : "odd"; ?>'>


                <td>
                    <?php echo $val['Site']['site_name']; ?>

                </td>
                <td>
                    <?php echo $val['Site']['email']; ?>

                </td>

                <td>
                    <?php echo $val['Site']['phone']; ?>
                </td>
                <td>
                    <?php
                    echo $val['Site']['fax'];
                    ?>
                </td>

                <td>

                    <?php echo $val['Site']['city']; ?>

                </td>

                <td>

                    <?php echo ($val['Site']['site_lock'] == "1") ? "Active" : "Locked"; ?>

                </td>

                <td>
                    <ul class='rowActions'>
                        <li>
                            <a href='#' class='inlineIcon preferences edit_site'>Edit</a>
                        </li>
                        <li>
                            <?php if ($val['Site']['site_lock'] =="0") { ?>
                                <a href='#' class='inlineIcon preferences iconopen unlock'>UnLock</a>
                            <?php } else if ($val['Site']['site_lock'] =="1") { ?>
                                <a href='#' class='inlineIcon preferences iconlock lock'>Lock</a>

                            <?php } ?></li> 
                      <!--
                        <li>
                         <?php if ($val['Site']['id'] ==$site_id) { ?>
                                <a href='#' class='inlineIcon  iconopen unlock'>Default</a>
                            <?php } else if ($val['Site']['site_active_status'] != $site_id) { ?>
                                <a href='#' class='inlineIcon iconlock change_default'>Make Default</a>
                            <?php } ?></li> 
                         -->  
                    </ul>
                </td>            
                <td></td> <td></td> <td></td> <td></td>
            </tr>
            <?php
            $row_color++;
        }
        ?>

</table>

<div id="page_div">
    <?php
    echo $this->Paginator->first('< first ', array('class' => 'pglink'), null, array('class' => 'pglink'));
    echo $this->Paginator->prev('<< previous ', array('class' => 'pglink'), null, array('class' => 'pglink'));
    echo $this->Paginator->next('next >> ', array('class' => 'pglink'), null, array('class' => 'pglink'));
    echo $this->Paginator->last('last > ', array('class' => 'pglink'), null, array('class' => 'pglink'));
    ?>
</div>
