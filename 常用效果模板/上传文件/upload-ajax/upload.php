<?php
   //1:创建变量保存上传目录
   $file_path = "./uploads/";
   $file_up = $file_path.basename($_FILES["upload"]["name"]);
   //2:判断类型图片
   //3:大小
   //4:移动 move_uploaded_file(临时文件/目录)
   $t = $_FILES["upload"]["tmp_name"];
   if(move_uploaded_file($t,$file_up)){
     echo "success";
   }else{
     echo "fail";
   }
?>