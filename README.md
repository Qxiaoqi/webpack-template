## webpack

一个多页应用模板

注意：需通过[xq-cli](https://github.com/Qxiaoqi/xq-cli)创建，该项目需要经过模板渲染之后才是正常结构

### 文件结构

<pre>
├─template
│  ├─build  # webpack配置文件
│  └─src    
│      ├─components # 组件（使用pug/ejs等时可用）
│      │  ├─head  
│      │  └─header
│      ├─lib        # 公共方法
│      ├─style      # 公共样式
│      └─views      # 页面
│          ├─about  # about页面
│          └─index  # index页面
</pre>

可按照上图所示结构进行开发

### 支持功能

* 根据view下文件夹页面数量，自动生成多入口

* 支持pug，方便重复组件抽离复用

* 支持less/sass选择，可根据需求配置

### 已装webpack插件

* css分离（MiniCssExtractPlugin）

* 代码分离，目前模板只是简单的将引入两次以上的部分，单独打包。后期如果业务复杂，可根据业务情况，自行配置。（optimization）

* 清空文件夹（CleanWebpackPlugin）

* pug/less/scss根据需求，引入相关loader

### 关键文件介绍

#### meta.js

模板的主要配置，其中包含了xq-cli中的问答部分`prompts`，文件可选过滤`filters`，生成文件前的最后方法（比如自动npm i）`complete`