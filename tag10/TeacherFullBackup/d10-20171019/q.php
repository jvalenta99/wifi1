<?php
 usleep( mt_rand( 100*1000, 1000*1000) ); // 250ms verzögerung
 header('Access-Control-Allow-Origin: *');
 header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept' );
 header('Content-Type:application/json' );

if ( !isset( $_POST['anfrageart'] )) $_POST = $_GET;

$fragen = file_get_contents('fragen.json');
$f = json_decode( $fragen );
$f = $f->quiz;

$request =  new stdClass();
foreach( $_POST as $k => $v ) {
    $request->{$k} = $v;
}

// alle Fragen in einen Pool
/*$f_all = array();
foreach( $f as $k => $f_level ) {
    foreach( $f_level as $f_item ) {
      $f_item->level = $k;
      $f_all[] = $f_item;
    }
}*/

 $response = new stdClass();
 switch( $_POST['anfrageart'] ) {

   case "neuefrage":
     $level = $request->level;
     if ( count($f[$level]) == 0 ) {
       $response->error = "Level enthält keine Fragen.";
     } else {
       $id = mt_rand( 1, count($f[$level]) );

       $response->frageid = $level*1000 + $id;
       $response->frage = $f[$level][$id-1]->f;
       $response->antworten = array();

       for ( $i=0; $i<4; $i++ ) {
         $a = new stdClass();
         $a->antwortid = $i;
         $a->text =  $f[$level][$id-1]->a[$i];
         $response->antworten[] = $a;
       }
     }

   break;

   case "überprüfeantwort":
     $level = round($request->frageid / 1000);
     $id = $request->frageid % 1000;
     if ( !isset( $f[$level][$id-1]->c ) ) {
       $response->error = "Frage ID existiert nicht.";
     } else {
       $response->richtig = ( $request->antwortid == $f[$level][$id-1]->c);
       $response->richtigid = $f[$level][$id-1]->c;
     }
  break;

	case "highscore":

    if ( $request->name == '' || $request->punkte < 1 ) {
      $response->error = "Name und/oder Punkte fehlen.";
    } else {
      $highscore = file_get_contents('highscore.json');
      $highscore = json_decode( $highscore )->highscore;

      $new_highscore = array();
      $new_entry = new StdClass();
      $new_entry->name = $request->name;
      $new_entry->punkte = $request->punkte;
      $response->bestenliste=array();

      foreach( $highscore as $h ) {
        if ( $h->punkte < $request->punkte ) {
          $new_highscore[] = $new_entry;
          $new_entry = '';
        }
        $new_highscore[] = $h;
      }
      if (  $new_entry != '' ) {
          $new_highscore[] = $new_entry;
      }

      foreach( $new_highscore as $h ) {
          $response->bestenliste[] = $h;
      }

      $save = new StdClass();
      $save -> highscore = $new_highscore;

      $filehandler = fopen('highscore.json' , "w");
      fwrite($filehandler, json_encode( $save ));
      fclose($filehandler);
    }


	break;

   default:
    $response->error = "Unbekannte Anfrageart.";

 }

 echo json_encode( $response );
