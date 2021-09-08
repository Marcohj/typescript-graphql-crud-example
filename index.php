<?php

$conn = mysqli_connect('localhost', 'i54095', 'Gx5AKCH8wn');
$database = mysqli_select_db($conn, 'i54095_01');


$output = '';


//collect
if (isset($_POST['search'])) {
    $searchq = $_POST['search'];
    $searchq = trim($searchq);

    $query = mysqli_query($conn,"SELECT * FROM ebc WHERE item_id LIKE '%$searchq%'");
    $count = mysqli_num_rows($query);
    if($count == 0) {
        $output = 'There was no search results!';
    }else{
        while($row = mysqli_fetch_array($query)) {
            $item_id = $row['item_id'];
            $qty = $row['qty'];
            $qtyedt = substr($qty, 0, -6);

            $output .='<div><br>'.$item_id.' - QTY IN STOCK: '.$qtyedt.'</div>';

        }
    }
}

?>
<!DOCTYPE html>
<html>
<head>
  <title>EBC Stock Lookup</title>
</head>
  
<body>
<p>EBC Lageropslag (BETA) - Sidst opdateret d. 27-07-2021:</p>

<form action="index.php" method="post">
    <input type ="text" name="search" placeholder="Indtast EBC Partnummer">
    <input type="submit" value="Search" />


</form>

<?php print("$output");?>

<br><br>
<?php
echo "Here is a list of EBC CSV Stock Data files:<br><br>";
$path = ".";
$dh = opendir($path);
$i=1;
while (($file = readdir($dh)) !== false) {
    if($file != "." && $file != ".." && $file != "index.php" && $file != "test" && $file != ".htaccess" && $file != "error_log" && $file != "cgi-bin") {
        echo "<a href='$path/$file'>$file</a><br /><br />";
        $i++;




    }
}
closedir($dh);


?> 

<br><br>
<p><a href="/ebc/test/">Show EBC Stock List in Browser (BETA)</a></p>


</body>
  
</html>