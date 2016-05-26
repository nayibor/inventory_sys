
<?php


        $user_links = $this->Session->read('user_links');
        $user_roles = $this->Session->read('role_short_array');
        $mem_data = $this->Session->read('memberData');
        //print_r($user_links);
        //exit();
		$links_array = array();
		//$roles_array = array();


foreach ($user_links as $val) {
    $links_array[$val['Link']['link_category']][] = array('link_controller' => $val['Link']['link_controller'], 'link_action' => $val['Link']['link_action'], 'link_name' => $val['Link']['link_name']);
}
$categories = array_keys($links_array);
?>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
        <?php echo $this->Html->charset(); ?>
        <title>INVENTORY SYS</title>
        <?php
        //add below
       // css files
        echo $this->Html->css('login.css');
        echo $this->Html->css('form.css');
        echo $this->Html->css('main.css');
        echo  $this->Html->css('dashboard_notif.css');
        echo $this->Html->css('chosen.css');
        echo $this->Html->css('font-awesome.min.css');
        echo $this->Html->css('jquery/jquery-ui-1.11.4_jquery-ui.css');

      //jquery scripts and other stuff
        echo $this->Html->script('jquery/jquery-1.12.3.js');
     // echo $this->Html->script('jquery/jquery-migrate-1.4.0.js');  
        echo $this->Html->script('jquery/jquery-ui-1.11.4_jquery-ui.js');
        echo $this->Html->script('chosen.jquery.js');
 
       
       
       //chosen scripts for autocompletion features
      //settings scripts for custom dialogs,message boxes,confirmations
     //socket.io for printing functionality
     
       //this part is for the settings code
        echo $this->Html->script('settings.js');
       ///this part of the code is for the socket.io tests        
        echo $this->Html->script('socket.io/socket.io-1.3.5');
        echo $this->Html->script('socket.io/printClient');
     
     //backbone/underscore
       echo $this->Html->script('backbone/underscore.js');
	   echo $this->Html->script('backbone/backbone.js');

     
     
     
     
        ?>

        
    </head>
    <body class="hasInterface hasGradient hasSidebar">
        <input type="hidden" name="add_user_url" id="add_user_url" value="<?php echo $this->Html->url(array('controller' => 'User', 'action' => 'add_user')); ?>" />
        <input type="hidden" name="stock_notif_url" id="stock_notif_url" value="<?php echo $this->Html->url(array('controller' => 'Customer', 'action' => 'min_stock_notif')); ?>" />
	        <input type="hidden" name="update_pass_url" id="update_pass_url" value="<?php echo $this->Html->url(array('controller' => 'User', 'action' => 'update_password')); ?>" />
	        <input type="hidden" name="make_def_url" id="make_def_url" value="<?php echo $this->Html->url(array('controller' => 'Site', 'action' => 'change_def_site')); ?>" />

 
        <div id="oaHeader">
            <div id="oaNavigationExtraTop">

                <ul id="UL_1">

					                              <?php /** 				                              
        $user_roles = $this->Session->read('role_short_array');

                    if ( isset($user_roles) && (in_array('SADM', $user_roles))) {
                        ?>    

                        <li class="infoUser">
							<a href="<?php echo $this->Html->url(array('controller' => 'Admin', 'action' => 'change_inst')); ?>" class="change_inst" >Change Site</a>
					  </li>

                    <?php } 
    
                  **/   ?>
                    <li id="LI_77">
                        <a href="#" id="A_78"><i id="I_79"></i><span id="SPAN_80"></span></a>
                    </li>
                    <li id="LI_115">
                        <a href="#" id="A_116" ><span id="SPAN_118">                              
                                <?php
                                echo  $mem_data['User']['fname'];
// ." ".$_SESSION['memberData']['User']['lname']; 
                                ?> </span>
                            <i id="I_119" class="fa fa-cog"></i>
                        </a>
                        <ul id="UL_120">     
                            <li id="LI_124" >
                          <a class="infoUser stn" style="text-decoration:none;color: #444;" 
                          href="<?php echo $this->Html->url(array('controller' => 'Admin', 'action' => 'change_password')); ?>" >
                       <i id="I_126"></i>Change Password</a>
                            </li>
                               
                            <li id="LI_127" class="buttonLogout  footer">
                                <a href="<?php echo $this->Html->url(array('controller' => 'Dashboard', 'action' => 'logoutUser')); ?>" id="A_128">
                                    <i id="I_129"></i>Logout</a>
                            </li>
                        </ul>
                    </li>
                </ul>

            </div>


        </div>

        <div id="oaNavigation">
            <ul id="oaNavigationTabs">
                <li class="active first last">
                    <div class="left">
                        <div class="right">
                            <a href="#" accesskey="Home">Home</a>
                        </div></div>
                </li>

                <!--<li class="passive after-active">
                    <div class="left"><div class="right">
                            <a href="#" accesskey="Home"></a>
                        </div></div>
                </li>
                -->
            </ul>


        </div>
        <div id="firstLevelContent">
            <div id="secondLevelNavigation">
                <ul class="navigation first">


                    <?php
                    foreach ($categories as $cat) {
                        ?>

                        <li class="active">
                            <a href="#">
                                <?php echo $cat; ?>
                                <span class="top"></span>
                                <span class="bottom"></span>
                            </a>
                            <ul class="navigation">

                                <?php
                                foreach ($links_array[$cat] as $val) {
                                    ?>

                                    <li class="passive">
                                        <a href="<?php echo $this->Html->url(array("controller" => $val['link_controller'], "action" => $val['link_action'])); ?>">
                                            <?php echo $val['link_name'] ?>
                                            <span class="top"></span>
                                            <span class="bottom"></span>
                                        </a>
                                    </li>

                                    <?php
                                }
                                ?>
                            </ul></li>

                        <?php
                    }
                    ?>
                </ul>
            </div>

            <div id="secondLevelContent">
                <div id="thirdLevelHeader">
                    <div class="breadcrumb hasIcon iconBannersLarge ">
                        <h3 class="noBreadcrumb">

                            <span class="label"><?php echo $layout_title; ?></span>
                        </h3>
                    </div>
                </div>
                <div id="thirdLevelContent" style="min-height: 456px;">
                    <!--this is where status messages will be put
                    <div id="thirdLevelTools">
                        <div id="messagePlaceholder" class="messagePlaceholder"></div>
                        <ul class="contextContainer"></ul>
                    </div> -->
                    <?php echo $content_for_layout; ?>
                    <!--this is where the actual content of hte layout will also be put --->
                </div>
            </div>
        </div>
        <div name="setting_dialog-message" id="setting_dialog-message" title="Message">
            <p class="messsage">
            </p>
        </div>
        <div name="setting_dialog-confirm" id="setting_dialog-confirm  title="Confirmation">
             <p class="messsage">
            </p>
        </div>
    </body>
</html>
