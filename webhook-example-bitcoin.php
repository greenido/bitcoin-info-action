<?php
/**
* @author Ido Green | @greenido
* @date 4/2017
* @see https://blockchain.info/ or the simple api: https://blockchain.info/q
* https://blockchain.info/ticker
*/

// The real 5 lines sample
// error_log("\n== STARTING and Got: " . file_get_contents('php://input'));
// $price = file_get_contents('https://blockchain.info/q/24hrprice');
// $jsonStr = '{ "speech": "Right now the price of 1 bitcoin is '. $price .' USD ",
//    "source": "bitcoin-price-sample", "displayText": "Right now the price of 1 bitcoin is '. $price .' USD" }';
// header('Content-Type: application/json');
// echo $jsonStr; //json_encode($jsonStr);

//
// The better more real world example
//

//
// Entry point to all the different request that this webhook will get
//
function processMessage($update) {
    if( $update["result"]["action"] === "price") {
      $price = file_get_contents('https://blockchain.info/q/24hrprice');
      $tmpStr = "Right now the price of 1 bitcoin is $price USD";
        sendMessage(array(
            "source" => "bitcoin-price-sample",
            "speech" => $tmpStr,
            "displayText" => $tmpStr
        ));
    }
    elseif ($update["result"]["action"] === "total" ) {
      $totalBit = file_get_contents('https://blockchain.info/q/totalbc');
      $totalInB = $totalBit / 1000000000;
      $tmpStr = "Right now there are $totalInB billion bitcoins around the world.";
        sendMessage(array(
            "source" => "bitcoin-price-sample",
            "speech" => $tmpStr,
            "displayText" => $tmpStr
        ));
    }
    //
}

//
// Util function to return results
//
function sendMessage($parameters) {
  header('Content-Type: application/json');
  $retObj = json_encode($parameters);
  error_log("\n== returning: $retObj \n");
  echo $retObj;
}


//
// Start the party. Get the $_POST data and work with it.
//
$response = file_get_contents("php://input");
error_log("\n== STARTING and Got: $response \n\n");
$update = json_decode($response, true);
if (isset($update["result"]["action"])) {
    processMessage($update);
}
else {
  error_log("\nError: $update \n");
  // A simple 'error msg' that will guide the user to provide something that we can work with
  echo '{ "speech": "Sorry but I did not understand. Try: bitcoin price or how many bitcoin there are out there.",
    "source": "bitcoin-price-sample",
    "displayText": "Sorry but I did not understand. Try: bitcoin price or how many bitcoin there are out there." }';
}
