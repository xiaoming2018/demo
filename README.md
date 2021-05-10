~~~~
1)系统架构
demo --
     -- src java源文件
     -- web 资源文件
          -- js 静态Three.js（REVISION = '128'）
               -- controls three.js 鼠标等控制操作文件
               -- libs  性能插件，dat.gui.min.js; stats.min.js等
          -- layui （前端页面设置）
               -- css 
               -- font
               -- layui.js  
          -- static
               -- 静态资源. images models
          -- WEB-INF
              -- web项目根目录
          -- index.jsp
          -- index.html
          
2) 项目内容
   -- 多模型的加载
   -- 相机添加（位置、朝向等姿态设置）
   -- 模型上帝视角、单一相机视角展示
   -- 场景信息导出（模型位置;相机的位置、朝向等信息 -- 后续渲染算法计算）
   
3） 功能设计
   -- 模型文件加载，构建树形资源管理
   -- 场景配置文件（视角可移动，左侧相机的移动与数据关联）
   -- 点击对应相机左侧展示区进行视角转换
   -- 全场景配置文件的导出
   
   
    