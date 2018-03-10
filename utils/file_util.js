var fileUtil = {};

var fs = require("fs");

/**
 * 确定目录是否存在，如果不存在则创建目录
 */
fileUtil.confirmPath = function( pathStr )
{
  if (!fs.existsSync(pathStr))
  {
      fs.mkdirSync(pathStr);
      console.log('create path : ' + pathStr);
    }
}


module.exports = fileUtil;
