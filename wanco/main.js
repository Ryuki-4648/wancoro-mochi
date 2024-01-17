import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

console.log(THREE);


// シーン：3Dオブジェクトや光源などの要素を含む仮想的な空間を表す。カメラで撮影するためのステージのようなもの。
const scene = new THREE.Scene();

// カメラ：シーンのどの部分を表示するかを定義
// PerspectiveCamera(視野角, アスペクト比, 開始距離, 終了距離)
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

// カメラ位置の設定
camera.position.set(0, 0, 500);

// レンダラー：シーンを描画して実際の画面に表示するための機能を提供
const renderer = new THREE.WebGLRenderer({
  alpha: true,
});

// サイズ調整
renderer.setSize(window.innerWidth, window.innerHeight);

// レンダリングしたいDOM要素と紐付け
document.body.appendChild(renderer.domElement);

// ジオメトリ：3Dオブジェクトの形状を定義するためのクラス。色々な形状を作成できる。
const ballGeometry = new THREE.SphereGeometry(100, 64, 32); // SphereGeometry()は球体の形状を定義

// マテリアル：3Dオブジェクトが画面にレンダリングされるときの外観や質感を決定する
const ballMaterial = new THREE.MeshPhysicalMaterial();

// メッシュ化：ジオメトリ（形状）とマテリアル（材質）の組み合わせから構成される
const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
scene.add(ballMesh);

// 平行光源の追加
const directionalLight = new THREE.DirectionalLight(0xfffae8, 3);

// 光の当たる位置調整
directionalLight.position.set(0.4, 0.5, 1); 

// シーンに追加
scene.add(directionalLight);

// ポイント光源を追加
const pointLight = new THREE.PointLight(0xfffae8, 1);
pointLight.position.set(-200, -200, -200);
scene.add(pointLight);

// マウス操作
const Controls = new OrbitControls(camera, renderer.domElement);

// レンダリング関数
renderer.render(scene, camera);

// ポイント光源のアニメーション
function animate() {
  // ポジションを動的に指定
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  );
  // フレーム単位で関数実行
  requestAnimationFrame(animate);

  // レンダリング関数
  renderer.render(scene, camera);
}

 // ブラウザリサイズ対応
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener("resize", onWindowResize);
animate(); // アニメーション関数の実行



document.querySelector('#app').innerHTML = `
  <ul class="side-list">
    <li>
      <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
      </a>
    </li>
    <li>
      <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
      </a>
    </li>
    <li><h1>three.js</h1></li>
    <li>
    <div class="card">
      <button id="counter" type="button"></button>
      </div>
    </li>
    <li>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
    </li>
  </ul>
`

setupCounter(document.querySelector('#counter'))
