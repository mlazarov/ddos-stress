<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>DDoS Stress CP</title>
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" >
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <div class="container">

      <div class="row">
        <div class="col-sm-6 col-sm-offset-3">
          <br/>
          <h1>DDoS Stress</h1>
          <br/>
          <form class="form-horizontal">
            <div class="form-group">
              <label for="url" class="col-sm-3 control-label">URL</label>
              <div class="col-sm-9">
                <input type="url" class="form-control" id="url" placeholder="http://" value="http://192.168.3.44/" required>
              </div>
            </div>
            <div class="form-group">
              <label for="req" class="col-sm-3 control-label">Req/s (per node)</label>
              <div class="col-sm-3">
                <input type="text" class="form-control" id="req" placeholder="10" required value="10">
              </div>
            </div>
           
            <div class="form-group">
              <div class="col-sm-offset-3 col-sm-9">
                <button type="button" class="btn btn-danger" id="run">Start</button>
                <button type="button" class="btn btn-success" id="stop">Stop</button>
		<div id="messages" class="pull-right"></div>
              </div>
            </div>
          </form>
          <h3>Status</h3>
          <div id="status"></div>
          <div id="zmessages"></div>
        </div>
      </div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script>
    $('#run').click(function(){
        $.ajax({
            url: "/run",
            type: 'post',
            data: {
                'url': $('#url').val(),
                'req': $('#req').val(),
                'len': $('#len').val()
                }
            }).done(function(data){
                $('#messages').html('<b>'+data.message+'</b>');
         });
    });
    $('#stop').click(function(){
        $.get("/stop",function(data){
            $('#messages').html('<b>'+data.message+'</b>');
        });
    });

    function getStats(){
        $.get("/stats",
            function(data){
                $('#status').html('<b>Active Nodes:</b> '+data.activeNodes+'<br/>');
        }).always(function(data,status) {
            if(status == 'success'){
                setTimeout(getStats,1000);
            }else{
                $('#status').html('<font color="red">Status unvaliable</font>');
                console.log("Error getting stats. Delaying stats pooling");
                setTimeout(getStats,5000);
           }
       });
    }
    setTimeout(getStats,1000);
    </script>
  </body>
</html>
