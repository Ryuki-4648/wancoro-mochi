import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

import * as THREE from "three";
console.log(THREE); // Three.jsのモジュールが正常に読み込まれている


// シーン：3Dオブジェクトや光源などの要素を含む仮想的な空間を表す。カメラで撮影するためのステージのようなもの。
const scene = new THREE.Scene();

// カメラ：シーンのどの部分を表示するかを定義
// PerspectiveCamera(視野角, アスペクト比, 開始距離, 終了距離)
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

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

// レンダリング関数
renderer.render(scene, camera);



document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
