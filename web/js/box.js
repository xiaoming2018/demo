var scene, renderer, camera, gui, light, stats, controls;
var cube, cube2, cube3;
var width, height; // div

function initRender(){
    var div = document.getElementById("display");

    width = div.clientWidth || div.offsetWidth;
    height = div.clientHeight || div.offsetHeight;

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        preserveDrawingBuffer: false // 是否保存绘图缓冲
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0xeeeeee);
    renderer.shadowMap.enabled = true;
    // point the dom for renderer
    document.getElementById("display1").appendChild(renderer.domElement);
}

function initCamera(){
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 15);
}

function initScene(){
    // 天空盒纹理
    var cubeTextureLoader = new THREE.CubeTextureLoader();
    cubeTextureLoader.setPath('static/textures/cube/space/');

    var cubeTexture = cubeTextureLoader.load([
        'right.jpg', 'left.jpg',
        'top.jpg','bottom.jpg',
        'front.jpg', 'back.jpg'
    ]);
    scene = new THREE.Scene();
    scene.background = cubeTexture; // 第一场景
}

// // 初始化dat.GUI 简化实验流程
// function initGUI(){
//     gui = {};
//     var datGUI = new dat.GUI();
// }

function initLight(){
    scene.add(new THREE.AmbientLight(0x444444));

    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 20, 20);
    light.castShadow = true;
    light.shadow.camera.top = 10;
    light.shadow.camera.bottom = -10;
    light.shadow.camera.left = -10;
    light.shadow.camera.right = 10;

    // 平行光需要开启阴影投射
    light.castShadow = true;
    scene.add(light);
}

function initModel() {
    // 辅助坐标系
    var helper = new THREE.AxesHelper(50);
    scene.add(helper);

    // 材质
    var material = new THREE.MeshStandardMaterial({color:0x00ffff});
    // 添加立方体
    var geometry = new THREE.BoxBufferGeometry(1,1,1);

    // 第一个立方体
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // 第二个立方体
    cube2 = new THREE.Mesh(geometry,material);
    cube2.position.set(3,3,-2);
    scene.add(cube2);

    // 第三个立方体
    cube3 = new THREE.Mesh(geometry,material);
    cube3.position.set(-3, 3, 2);
    scene.add(cube3);
}

// // 初始化性能插件
// function initStats(){
//     stats = new Stats();
//     document.getElementById("display").appendChild(stats.dom);
//     //document.body.appendChild(stats.dom);
// }

function initControls(){
    controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    // 设置控制器的中心点
    //controls.target.set( 0, 5, 0 );
    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    controls.dampingFactor = 0.25;
    //是否可以缩放
    controls.enableZoom = true;
    //是否自动旋转
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.5;
    //设置相机距离原点的最远距离
    controls.minDistance = 1;
    //设置相机距离原点的最远距离
    controls.maxDistance = 2000;
    //是否开启右键拖拽
    controls.enablePan = true;
}

// 每帧额外的运算
function render() {
    // 获取到窗口的一般高度和一半宽度
    let halfwidth = width / 2;
    let halfheight = height / 2;

    let vector1 = cube.position.clone().project(camera);
    let vector2 = cube2.position.clone().project(camera);
    let vector3 = cube3.position.clone().project(camera);

    // 修改标签 div 位置
    $(".one").css({
        left:vector1.x * halfwidth + halfwidth,
        top:-vector1.y * halfheight + halfheight
    });

    $(".two").css({
        left:vector2.x * halfwidth + halfwidth,
        top:-vector2.y * halfheight + halfheight
    });

    $(".three").css({
        left:vector3.x * halfwidth + halfwidth,
        top:-vector3.y * halfheight + halfheight
    });
}

function onWindowResize() {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

function animate() {
    // 每帧额外的运算
    render();
    // 更新性能插件
    //stats.update();
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

function draw() {
    //initGUI();
    initRender();
    initScene();
    initCamera();
    initLight();
    initModel();
    initControls();
    //initStats();

    animate();
    window.onresize = onWindowResize;
}