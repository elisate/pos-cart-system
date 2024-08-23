<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Database Connection Check</title>
</head>
<body>
    <div>
        <?php
        use Illuminate\Support\Facades\DB;

        if(DB::connection()->getPdo()){
            echo "Connected to the database and the database name is " . DB::connection()->getDatabaseName();
        } else {
            echo "Failed to connect to the database.";
        }
        ?>
    </div>
</body>
</html>
