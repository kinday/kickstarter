<?php

// get the filename or use default
$file = isset($_GET['url']) ? rtrim($_GET['url'], '/') : 'index.html';

// test if directory or send 404 header
if(!is_file($file)) {
  if(is_dir($file)) {
    $file .= '/index.html';
    }
  else {
    header( "HTTP/1.0 404 Not Found" );
    exit;
    }
  }

// set the timezone
date_default_timezone_set('Europe/Minsk');

// get the last-modified-date of passed file
$lastModified = filemtime($file);

// get a unique hash of passed file (etag)
$etagFile = md5_file($file);

// get the HTTP_IF_MODIFIED_SINCE header if set
$ifModifiedSince = ( isset( $_SERVER['HTTP_IF_MODIFIED_SINCE'] ) ? $_SERVER['HTTP_IF_MODIFIED_SINCE'] : false );

// get the HTTP_IF_NONE_MATCH header if set (etag: unique file hash)
$etagHeader = ( isset( $_SERVER['HTTP_IF_NONE_MATCH'] ) ? trim( $_SERVER['HTTP_IF_NONE_MATCH'] ) : false );

// set last-modified header
header( "Last-Modified: " . gmdate( "D, d M Y H:i:s", $lastModified ) . " GMT" );

// set etag-header
header( "Etag: $etagFile" );

// make sure caching is turned on
header( 'Cache-Control: public' );

// check if file has changed. If not, send 304 and exit
if ( @strtotime( $_SERVER['HTTP_IF_MODIFIED_SINCE'] ) == $lastModified || $etagHeader == $etagFile ) {
    header( "HTTP/1.1 304 Not Modified" );
    exit;
  }

// pass the contents of the file
include($file);

?>