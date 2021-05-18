var scene2, renderer2, camera2, gui2, light2, stats2, controls2; // 场景 、 渲染器
var cube4, cube5, cube6;
var width2, height2; // div width height

function initRender2(){
    var div2 = document.getElementById("display");
    width2 = div2.clientWidth || div2.offsetWidth;
    height2 = div2.clientHeight || div2.offsetHeight;

    renderer2 = new THREE.WebGLRenderer({
        antialias: true,
        preserveDrawingBuffer: false
    });

    renderer2.setPixelRatio(window.devicePixelRatio);
    renderer2.setSize(width2, height2);
    renderer2.setClearColor(0xffffff);
    renderer2.shadowMap.enabled = true;

    // 指定节点
    document.getElementById("display2").appendChild(renderer2.domElement);
}

function initCamera2(){
    camera2 = new THREE.PerspectiveCamera(45, width2 / height2, 0.1, 1000);
    camera2.position.set(0,0,15);
}

function initScene2(){
    // 天空盒纹理
    var cubeTextureLoader = new THREE.CubeTextureLoader();
    cubeTextureLoader.setPath('static/textures/cube/space/');

    var cubeTexture2 = cubeTextureLoader.load([
        'right.jpg', 'left.jpg',
        'top.jpg','bottom.jpg',
        'front.jpg', 'back.jpg'
    ]);

    scene2 = new THREE.Scene(); // 第二场景
    scene2.background = cubeTexture2;
}

function initLight2(){
    scene2.add(new THREE.AmbientLight(0x444444)); // 场景2

    light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(0, 20, 20);
    light2.castShadow = true;
    light2.shadow.camera.top = 10;
    light2.shadow.camera.bottom = -10;
    light2.shadow.camera.left = -10;
    light2.shadow.camera.right = 10;

    // 平行光需要开启阴影投射
    light2.castShadow = true;
    scene2.add(light2); // 场景2
}

function initModel2() {
    // 辅助坐标系
    var helper2 = new THREE.AxesHelper(50);
    scene2.add(helper2);

    // 材质
    var material = new THREE.MeshStandardMaterial({color:0x00ffff});
    // 添加立方体
    var geometry = new THREE.BoxBufferGeometry(1,1,1);

    // 第一个立方体
    cube4 = new THREE.Mesh(geometry, material);
    scene2.add(cube4);

    // 第二个立方体
    cube5 = new THREE.Mesh(geometry,material);
    cube5.position.set(3,3,-2);
    scene2.add(cube5);

    // 第三个立方体
    cube6 = new THREE.Mesh(geometry,material);
    cube6.position.set(-3, 3, 2);

    scene2.add(cube6);
}

function initControls2(){
    controls2 = new THREE.OrbitControls(this.camera2, this.renderer2.domElement);
    // 设置控制器的中心点
    //controls.target.set( 0, 5, 0 );
    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls2.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    controls2.dampingFactor = 0.25;
    //是否可以缩放
    controls2.enableZoom = true;
    //是否自动旋转
    controls2.autoRotate = false;
    controls2.autoRotateSpeed = 0.5;
    //设置相机距离原点的最远距离
    controls2.minDistance = 1;
    //设置相机距离原点的最远距离
    controls2.maxDistance = 2000;
    //是否开启右键拖拽
    controls2.enablePan = true;
}

// 每帧额外的运算
function render2() {
    // 获取到窗口的一般高度和一半宽度
    let halfwidth = width / 2;
    let halfheight = height / 2;

    let vector4 = cube4.position.clone().project(camera2);
    let vector5 = cube5.position.clone().project(camera2);
    let vector6 = cube6.position.clone().project(camera2);

    // 修改标签 div 位置
    $(".four").css({
        left:vector4.x * halfwidth + halfwidth,
        top:-vector4.y * halfheight + halfheight
    });

    $(".five").css({
        left:vector5.x * halfwidth + halfwidth,
        top:-vector5.y * halfheight + halfheight
    });

    $(".six").css({
        left:vector6.x * halfwidth + halfwidth,
        top:-vector6.y * halfheight + halfheight
    });
}

function onWindowResize2() {
    camera2.aspect = width / height;
    camera2.updateProjectionMatrix();
    renderer2.setSize(width, height); // renderer2
}

function animate2() {
    // 每帧额外的运算
    render2();
    controls2.update();
    renderer2.render(scene2, camera2);
    requestAnimationFrame(animate2);
}

function draw2() {
    initRender2();
    initScene2();
    initCamera2();
    initLight2();
    initModel2();
    initControls2();

    animate2();
    window.onresize = onWindowResize2;
}